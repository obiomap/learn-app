import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { anthropic, TUTOR_SYSTEM_PROMPT } from "@/lib/claude";
import { getLessonById } from "@/data/lessons";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = session.user as any;
  if (user.subscriptionStatus !== "pro") {
    return NextResponse.json({ error: "Pro subscription required" }, { status: 403 });
  }

  const { lessonId, code } = await req.json();
  const lesson = getLessonById(lessonId);

  const userMessage = lesson
    ? `I'm working on the lesson "${lesson.title}". The objective is: ${lesson.objective}\n\nHere is my current code:\n\`\`\`\n${code}\n\`\`\`\n\nCan you give me a hint?`
    : `Here is my current code:\n\`\`\`\n${code}\n\`\`\`\n\nCan you give me a hint?`;

  const stream = await anthropic.messages.stream({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 512,
    system: TUTOR_SYSTEM_PROMPT,
    messages: [{ role: "user", content: userMessage }],
  });

  const readable = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        if (
          chunk.type === "content_block_delta" &&
          chunk.delta.type === "text_delta"
        ) {
          controller.enqueue(new TextEncoder().encode(chunk.delta.text));
        }
      }
      controller.close();
    },
  });

  return new NextResponse(readable, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
