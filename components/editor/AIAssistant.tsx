"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";

interface AIAssistantProps {
  lessonId: string;
  lessonTitle: string;
  code: string;
  isPro: boolean;
  onUpgrade: () => void;
}

export default function AIAssistant({
  lessonId,
  lessonTitle,
  code,
  isPro,
  onUpgrade,
}: AIAssistantProps) {
  const [hint, setHint] = useState("");
  const [loading, setLoading] = useState(false);

  async function getHint() {
    if (!isPro) {
      onUpgrade();
      return;
    }

    setLoading(true);
    setHint("");

    try {
      const res = await fetch("/api/ai-hint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lessonId, lessonTitle, code }),
      });

      if (!res.ok) throw new Error("Failed to get hint");
      if (!res.body) return;

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        setHint((prev) => prev + decoder.decode(value, { stream: true }));
      }
    } catch {
      setHint("Sorry, I couldn't get a hint right now. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-lg border border-purple-200 bg-purple-50">
      <div className="px-4 py-3 border-b border-purple-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg">🤖</span>
          <span className="font-medium text-purple-900 text-sm">AI Tutor</span>
          {!isPro && (
            <span className="text-xs bg-purple-200 text-purple-700 px-2 py-0.5 rounded-full">Pro</span>
          )}
        </div>
        <Button size="sm" onClick={getHint} loading={loading} className="bg-purple-600 hover:bg-purple-700">
          {isPro ? "Get a Hint" : "Upgrade for Hints"}
        </Button>
      </div>

      <div className="p-4 min-h-[120px]">
        {hint ? (
          <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{hint}</p>
        ) : (
          <p className="text-sm text-purple-400 italic">
            {isPro
              ? "Stuck? Click 'Get a Hint' and I'll guide you without giving away the answer!"
              : "Upgrade to Pro to get personalized hints from your AI tutor."}
          </p>
        )}
      </div>
    </div>
  );
}
