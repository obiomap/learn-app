import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { lessons } from "@/data/lessons";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const userId = (session!.user as any).id as string;
  const isPro = (session!.user as any).subscriptionStatus === "pro";
  const firstName = session?.user?.name?.split(" ")[0] ?? "Learner";

  const progress = await prisma.lessonProgress.findMany({ where: { userId } });
  const completedIds = new Set(progress.filter((p) => p.completed).map((p) => p.lessonId));

  const accessibleLessons = lessons.filter((l) => l.tier === "free" || isPro);
  const completedCount = accessibleLessons.filter((l) => completedIds.has(l.id)).length;
  const totalCount = accessibleLessons.length;
  const pct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const jsLessons = lessons.filter((l) => l.track === "javascript");
  const jsCompleted = jsLessons.filter((l) => completedIds.has(l.id)).length;
  const pyLessons = lessons.filter((l) => l.track === "python");
  const pyCompleted = pyLessons.filter((l) => completedIds.has(l.id)).length;

  const nextLesson = accessibleLessons.find((l) => !completedIds.has(l.id));
  const recentCompleted = accessibleLessons
    .filter((l) => completedIds.has(l.id))
    .slice(-3)
    .reverse();

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="p-8 max-w-4xl">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          {greeting}, {firstName} 👋
        </h1>
        <p className="text-gray-500 mt-1 text-sm">
          {completedCount === 0
            ? "Ready to start your coding journey?"
            : `You’ve completed ${completedCount} lesson${completedCount !== 1 ? "s" : ""} — keep going!`}
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <StatCard
          label="Lessons Done"
          value={`${completedCount} / ${totalCount}`}
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          color="blue"
        />
        <StatCard
          label="JavaScript"
          value={`${jsCompleted} / ${jsLessons.length}`}
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          }
          color="yellow"
        />
        <StatCard
          label="Python"
          value={isPro ? `${pyCompleted} / ${pyLessons.length}` : "Pro only"}
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          }
          color="green"
          locked={!isPro}
        />
      </div>

      {/* Progress bar */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-semibold text-gray-900">Overall Progress</h2>
            <p className="text-xs text-gray-400 mt-0.5">{isPro ? "Pro plan · all tracks" : "Free plan · JavaScript track"}</p>
          </div>
          <div className="text-right">
            <span className="text-3xl font-bold text-gray-900">{pct}</span>
            <span className="text-gray-400 text-lg">%</span>
          </div>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
          <div
            className="h-2.5 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-700"
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-xs text-gray-400">{completedCount} completed</span>
          <span className="text-xs text-gray-400">{totalCount - completedCount} remaining</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Next lesson */}
        {nextLesson ? (
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white shadow-lg shadow-blue-200">
            <p className="text-xs font-semibold text-blue-200 uppercase tracking-widest mb-3">Continue Learning</p>
            <h3 className="font-bold text-lg leading-snug mb-1">{nextLesson.title}</h3>
            <p className="text-sm text-blue-100 mb-5 line-clamp-2">{nextLesson.description}</p>
            <Link
              href={`/lessons/${nextLesson.id}`}
              className="inline-flex items-center gap-2 bg-white text-blue-700 font-semibold text-sm px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Start lesson
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white shadow-lg shadow-green-200">
            <div className="text-4xl mb-3">🎉</div>
            <h3 className="font-bold text-lg mb-1">All done!</h3>
            <p className="text-sm text-green-100">You&apos;ve completed all available lessons. Amazing work!</p>
          </div>
        )}

        {/* Upgrade / Pro badge */}
        {!isPro ? (
          <div className="bg-gradient-to-br from-violet-600 to-purple-700 rounded-2xl p-6 text-white shadow-lg shadow-purple-200">
            <div className="inline-flex items-center gap-1.5 bg-white/20 rounded-full px-3 py-1 text-xs font-semibold mb-3">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Upgrade to Pro
            </div>
            <h3 className="font-bold text-lg mb-1">Unlock everything</h3>
            <p className="text-sm text-purple-100 mb-5">Python track, AI tutor hints, and 20+ lessons.</p>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 bg-white text-purple-700 font-semibold text-sm px-4 py-2 rounded-lg hover:bg-purple-50 transition-colors"
            >
              View Pro plan →
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="inline-flex items-center gap-1.5 bg-purple-100 text-purple-700 rounded-full px-3 py-1 text-xs font-bold mb-3">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Pro Member
            </div>
            <h3 className="font-bold text-gray-900 mb-1">Full access active</h3>
            <p className="text-sm text-gray-500 mb-4">All lessons, Python track, and unlimited AI hints are unlocked.</p>
            <Link href="/billing" className="text-sm text-blue-600 hover:underline font-medium">
              Manage billing →
            </Link>
          </div>
        )}
      </div>

      {/* Recent completions */}
      {recentCompleted.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Recently Completed</h2>
          <div className="space-y-3">
            {recentCompleted.map((lesson) => (
              <Link
                key={lesson.id}
                href={`/lessons/${lesson.id}`}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
              >
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{lesson.title}</p>
                  <p className="text-xs text-gray-400 capitalize">{lesson.track}</p>
                </div>
                <svg className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
  color,
  locked,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  color: "blue" | "yellow" | "green";
  locked?: boolean;
}) {
  const colors = {
    blue: "bg-blue-50 text-blue-600",
    yellow: "bg-amber-50 text-amber-500",
    green: "bg-emerald-50 text-emerald-600",
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <div className={`inline-flex p-2 rounded-xl mb-3 ${colors[color]}`}>{icon}</div>
      <p className={`text-xl font-bold ${locked ? "text-gray-300" : "text-gray-900"}`}>{value}</p>
      <p className="text-xs text-gray-400 mt-0.5">{label}</p>
    </div>
  );
}
