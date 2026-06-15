import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getLessonById } from "@/data/lessons";
import LessonWorkspace from "@/components/lessons/LessonWorkspace";

interface Props {
  params: { id: string };
}

export default async function LessonPage({ params }: Props) {
  const session = await getServerSession(authOptions);
  const userId = (session!.user as any).id as string;
  const isPro = (session!.user as any).subscriptionStatus === "pro";

  const lesson = getLessonById(params.id);
  if (!lesson) notFound();

  if (lesson.tier === "pro" && !isPro) redirect("/pricing");

  const progress = await prisma.lessonProgress.findUnique({
    where: { userId_lessonId: { userId, lessonId: lesson.id } },
  });

  return (
    <LessonWorkspace
      lesson={lesson}
      initialCode={progress?.code ?? lesson.starterCode}
      initialCompleted={progress?.completed ?? false}
      isPro={isPro}
    />
  );
}
