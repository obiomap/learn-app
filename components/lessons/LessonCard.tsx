import Link from "next/link";
import { Lesson } from "@/data/lessons";
import { cn } from "@/lib/utils";

interface LessonCardProps {
  lesson: Lesson;
  completed: boolean;
  locked: boolean;
}

const trackAccent: Record<string, string> = {
  javascript:     "border-l-amber-400",
  python:         "border-l-emerald-400",
  sql:            "border-l-cyan-400",
  "data-analyst": "border-l-violet-400",
  "ai-ml":        "border-l-rose-400",
  cybersecurity:  "border-l-red-500",
  excel:          "border-l-green-600",
};

export default function LessonCard({ lesson, completed, locked }: LessonCardProps) {
  const accent = locked ? "border-l-gray-200" : completed ? "border-l-green-400" : (trackAccent[lesson.track] ?? "border-l-blue-400");

  const card = (
    <div
      className={cn(
        "flex items-center gap-3 px-4 py-3.5 rounded-xl border border-l-[3px] transition-all",
        accent,
        locked
          ? "bg-gray-50 border-gray-100 cursor-not-allowed"
          : completed
          ? "bg-white border-gray-100 shadow-sm hover:shadow-md"
          : "bg-white border-gray-100 shadow-sm hover:shadow-md hover:border-r-blue-100 hover:border-t-blue-100 hover:border-b-blue-100 cursor-pointer group"
      )}
    >
      {/* Status circle */}
      <div
        className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold",
          locked
            ? "bg-gray-100 text-gray-400"
            : completed
            ? "bg-green-100 text-green-600"
            : "bg-blue-50 text-blue-600"
        )}
      >
        {locked ? (
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        ) : completed ? (
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          lesson.order
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className={cn(
            "text-sm font-semibold truncate leading-tight",
            locked ? "text-gray-400" : "text-gray-900"
          )}>
            {lesson.title}
          </p>
          {lesson.tier === "pro" && (
            <span className="inline-flex items-center gap-1 bg-purple-100 text-purple-700 text-[9px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded shrink-0">
              <svg className="w-2 h-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Pro
            </span>
          )}
        </div>
        <p className={cn(
          "text-xs mt-0.5 truncate",
          locked ? "text-gray-400" : "text-gray-500"
        )}>
          {lesson.description}
        </p>
      </div>

      {/* Arrow */}
      {!locked && (
        <svg
          className={cn(
            "w-4 h-4 shrink-0 transition-colors",
            completed ? "text-green-400 group-hover:text-green-500" : "text-gray-300 group-hover:text-blue-400"
          )}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      )}
    </div>
  );

  if (locked) return card;
  return <Link href={`/lessons/${lesson.id}`}>{card}</Link>;
}
