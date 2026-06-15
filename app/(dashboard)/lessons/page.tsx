import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getJSLessons, getPythonLessons, getSQLLessons } from "@/data/lessons";
import LessonCard from "@/components/lessons/LessonCard";

export default async function LessonsPage() {
  const session = await getServerSession(authOptions);
  const userId = (session!.user as any).id as string;
  const isPro = (session!.user as any).subscriptionStatus === "pro";

  const progress = await prisma.lessonProgress.findMany({ where: { userId } });
  const completedIds = new Set(progress.filter((p) => p.completed).map((p) => p.lessonId));

  const jsLessons = getJSLessons();
  const pyLessons = getPythonLessons();
  const sqlLessons = getSQLLessons();

  const jsCompleted = jsLessons.filter((l) => completedIds.has(l.id)).length;
  const pyCompleted = pyLessons.filter((l) => completedIds.has(l.id)).length;
  const sqlCompleted = sqlLessons.filter((l) => completedIds.has(l.id)).length;

  function TrackProgress({ completed, total, color }: { completed: number; total: number; color: string }) {
    const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
    return (
      <div className="flex items-center gap-2">
        <div className="w-24 bg-gray-100 rounded-full h-1.5">
          <div className={`h-1.5 rounded-full transition-all ${color}`} style={{ width: `${pct}%` }} />
        </div>
        <span className="text-xs text-gray-400 w-8 text-right">{pct}%</span>
      </div>
    );
  }

  function UpgradeBanner() {
    return (
      <div className="mt-4 rounded-xl bg-gradient-to-r from-violet-600 to-purple-700 p-5 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-sm">Unlock Python, SQL & more</p>
            <p className="text-xs text-purple-200 mt-0.5">All lessons and AI tutor hints for $9.99/mo.</p>
          </div>
          <Link
            href="/pricing"
            className="shrink-0 bg-white text-purple-700 font-semibold text-sm px-4 py-2 rounded-lg hover:bg-purple-50 transition-colors"
          >
            Go Pro →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Lessons</h1>
        <p className="text-gray-500 mt-1 text-sm">Pick a track and start coding.</p>
      </div>

      {/* JavaScript track */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center">
              <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <div>
              <h2 className="font-semibold text-gray-900 text-base">JavaScript</h2>
              <p className="text-xs text-gray-400">{jsCompleted} of {jsLessons.length} completed</p>
            </div>
          </div>
          <TrackProgress completed={jsCompleted} total={jsLessons.length} color="bg-amber-400" />
        </div>
        <div className="space-y-2">
          {jsLessons.map((lesson) => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              completed={completedIds.has(lesson.id)}
              locked={lesson.tier === "pro" && !isPro}
            />
          ))}
        </div>
      </section>

      {/* Python track */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center">
              <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h2 className="font-semibold text-gray-900 text-base">Python</h2>
              <p className="text-xs text-gray-400">
                {isPro ? `${pyCompleted} of ${pyLessons.length} completed` : "Pro plan required"}
              </p>
            </div>
          </div>
          {isPro && <TrackProgress completed={pyCompleted} total={pyLessons.length} color="bg-emerald-400" />}
        </div>
        <div className="space-y-2">
          {pyLessons.map((lesson) => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              completed={completedIds.has(lesson.id)}
              locked={!isPro}
            />
          ))}
        </div>
        {!isPro && <UpgradeBanner />}
      </section>

      {/* SQL track */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-50 flex items-center justify-center">
              <svg className="w-5 h-5 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2 1.5 3 4 3h8c2.5 0 4-1 4-3V7c0-2-1.5-3-4-3H8C5.5 4 4 5 4 7z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 7c0 2 1.5 3 4 3h8c2.5 0 4-1 4-3" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 12c0 2 1.5 3 4 3h8c2.5 0 4-1 4-3" />
              </svg>
            </div>
            <div>
              <h2 className="font-semibold text-gray-900 text-base">SQL</h2>
              <p className="text-xs text-gray-400">
                {isPro ? `${sqlCompleted} of ${sqlLessons.length} completed` : "Pro plan required"}
              </p>
            </div>
          </div>
          {isPro && <TrackProgress completed={sqlCompleted} total={sqlLessons.length} color="bg-cyan-400" />}
        </div>
        <div className="space-y-2">
          {sqlLessons.map((lesson) => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              completed={completedIds.has(lesson.id)}
              locked={!isPro}
            />
          ))}
        </div>
        {!isPro && <UpgradeBanner />}
      </section>
    </div>
  );
}
