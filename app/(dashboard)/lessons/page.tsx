import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getJSLessons, getPythonLessons, getSQLLessons, getDataAnalystLessons, getMLLessons, getCybersecurityLessons, getExcelLessons } from "@/data/lessons";
import LessonCard from "@/components/lessons/LessonCard";
import LessonRecommender from "@/components/lessons/LessonRecommender";

export default async function LessonsPage() {
  const session = await getServerSession(authOptions);
  const userId = (session!.user as any).id as string;
  const isPro = (session!.user as any).subscriptionStatus === "pro";

  const progress = await prisma.lessonProgress.findMany({ where: { userId } });
  const completedIds = new Set(progress.filter((p) => p.completed).map((p) => p.lessonId));

  const jsLessons  = getJSLessons();
  const pyLessons  = getPythonLessons();
  const sqlLessons = getSQLLessons();
  const daLessons  = getDataAnalystLessons();
  const mlLessons  = getMLLessons();
  const cyLessons  = getCybersecurityLessons();
  const xlLessons  = getExcelLessons();

  const jsCompleted  = jsLessons.filter((l)  => completedIds.has(l.id)).length;
  const pyCompleted  = pyLessons.filter((l)  => completedIds.has(l.id)).length;
  const sqlCompleted = sqlLessons.filter((l) => completedIds.has(l.id)).length;
  const daCompleted  = daLessons.filter((l)  => completedIds.has(l.id)).length;
  const mlCompleted  = mlLessons.filter((l)  => completedIds.has(l.id)).length;
  const cyCompleted  = cyLessons.filter((l)  => completedIds.has(l.id)).length;
  const xlCompleted  = xlLessons.filter((l)  => completedIds.has(l.id)).length;
  const totalCompleted = jsCompleted + pyCompleted + sqlCompleted + daCompleted + mlCompleted + cyCompleted + xlCompleted;
  const totalLessons   = jsLessons.length + pyLessons.length + sqlLessons.length + daLessons.length + mlLessons.length + cyLessons.length + xlLessons.length;

  function ProgressBar({ pct, color }: { pct: number; color: string }) {
    return (
      <div className="w-full bg-gray-100 rounded-full h-1.5 mt-2">
        <div className={`h-1.5 rounded-full transition-all ${color}`} style={{ width: `${pct}%` }} />
      </div>
    );
  }

  function UpgradeBanner() {
    return (
      <div className="mt-3 rounded-xl bg-gradient-to-r from-violet-600 to-purple-700 p-4 text-white">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-sm">Unlock Python, SQL & more</p>
            <p className="text-xs text-purple-200 mt-0.5">All lessons + AI tutor hints for $9.99/mo.</p>
          </div>
          <Link
            href="/pricing"
            className="shrink-0 bg-white text-purple-700 font-semibold text-sm px-4 py-2 rounded-lg hover:bg-purple-50 transition-colors whitespace-nowrap"
          >
            Go Pro →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-gray-50">
      <div className="max-w-5xl mx-auto px-6 md:px-10 py-8">

        {/* ── Page header ── */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Lessons</h1>
            <p className="text-gray-500 mt-0.5 text-sm">Pick a track and start coding.</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-900">{totalCompleted}<span className="text-gray-400 text-lg font-normal">/{totalLessons}</span></p>
            <p className="text-xs text-gray-400 mt-0.5">lessons completed</p>
          </div>
        </div>

        {/* ── Track stat cards ── */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4 mb-10">
          {/* JavaScript */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <span className="text-sm font-semibold text-gray-900">JavaScript</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 mt-2">{jsCompleted}<span className="text-gray-400 text-base font-normal">/{jsLessons.length}</span></p>
            <ProgressBar pct={jsLessons.length > 0 ? Math.round((jsCompleted / jsLessons.length) * 100) : 0} color="bg-amber-400" />
          </div>

          {/* Python */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-sm font-semibold text-gray-900">Python</span>
              {!isPro && <span className="ml-auto text-[10px] font-bold uppercase tracking-wide text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded">Pro</span>}
            </div>
            <p className="text-2xl font-bold text-gray-900 mt-2">
              {isPro ? pyCompleted : "–"}<span className="text-gray-400 text-base font-normal">/{pyLessons.length}</span>
            </p>
            {isPro && <ProgressBar pct={pyLessons.length > 0 ? Math.round((pyCompleted / pyLessons.length) * 100) : 0} color="bg-emerald-400" />}
          </div>

          {/* SQL */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-8 h-8 rounded-lg bg-cyan-50 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2 1.5 3 4 3h8c2.5 0 4-1 4-3V7c0-2-1.5-3-4-3H8C5.5 4 4 5 4 7z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 7c0 2 1.5 3 4 3h8c2.5 0 4-1 4-3" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 12c0 2 1.5 3 4 3h8c2.5 0 4-1 4-3" />
                </svg>
              </div>
              <span className="text-sm font-semibold text-gray-900">SQL</span>
              {!isPro && <span className="ml-auto text-[10px] font-bold uppercase tracking-wide text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded">Pro</span>}
            </div>
            <p className="text-2xl font-bold text-gray-900 mt-2">
              {isPro ? sqlCompleted : "–"}<span className="text-gray-400 text-base font-normal">/{sqlLessons.length}</span>
            </p>
            {isPro && <ProgressBar pct={sqlLessons.length > 0 ? Math.round((sqlCompleted / sqlLessons.length) * 100) : 0} color="bg-cyan-400" />}
          </div>

          {/* Data Analyst */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-8 h-8 rounded-lg bg-violet-50 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6m0 13l-4-4m4 4l4-4M15 5v13m0-13l-4 4m4-4l4 4" />
                </svg>
              </div>
              <span className="text-sm font-semibold text-gray-900">Data Analyst</span>
              {!isPro && <span className="ml-auto text-[10px] font-bold uppercase tracking-wide text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded">Pro</span>}
            </div>
            <p className="text-2xl font-bold text-gray-900 mt-2">
              {isPro ? daCompleted : "–"}<span className="text-gray-400 text-base font-normal">/{daLessons.length}</span>
            </p>
            {isPro && <ProgressBar pct={daLessons.length > 0 ? Math.round((daCompleted / daLessons.length) * 100) : 0} color="bg-violet-400" />}
          </div>

          {/* AI / ML */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-sm font-semibold text-gray-900">AI / ML</span>
              {!isPro && <span className="ml-auto text-[10px] font-bold uppercase tracking-wide text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded">Pro</span>}
            </div>
            <p className="text-2xl font-bold text-gray-900 mt-2">
              {isPro ? mlCompleted : "–"}<span className="text-gray-400 text-base font-normal">/{mlLessons.length}</span>
            </p>
            {isPro && <ProgressBar pct={mlLessons.length > 0 ? Math.round((mlCompleted / mlLessons.length) * 100) : 0} color="bg-rose-400" />}
          </div>

          {/* Cybersecurity */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <span className="text-sm font-semibold text-gray-900">Cybersecurity</span>
              {!isPro && <span className="ml-auto text-[10px] font-bold uppercase tracking-wide text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded">Pro</span>}
            </div>
            <p className="text-2xl font-bold text-gray-900 mt-2">
              {isPro ? cyCompleted : "–"}<span className="text-gray-400 text-base font-normal">/{cyLessons.length}</span>
            </p>
            {isPro && <ProgressBar pct={cyLessons.length > 0 ? Math.round((cyCompleted / cyLessons.length) * 100) : 0} color="bg-red-500" />}
          </div>

          {/* Excel */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-6a1 1 0 011-1h4a1 1 0 011 1v6m-6 0h6m-6 0H6a1 1 0 01-1-1V6a1 1 0 011-1h12a1 1 0 011 1v10a1 1 0 01-1 1h-3" />
                </svg>
              </div>
              <span className="text-sm font-semibold text-gray-900">Excel</span>
              {!isPro && <span className="ml-auto text-[10px] font-bold uppercase tracking-wide text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded">Pro</span>}
            </div>
            <p className="text-2xl font-bold text-gray-900 mt-2">
              {isPro ? xlCompleted : "–"}<span className="text-gray-400 text-base font-normal">/{xlLessons.length}</span>
            </p>
            {isPro && <ProgressBar pct={xlLessons.length > 0 ? Math.round((xlCompleted / xlLessons.length) * 100) : 0} color="bg-green-600" />}
          </div>
        </div>

        {/* ── JavaScript track ── */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-6 rounded-full bg-amber-400 shrink-0" />
            <h2 className="font-bold text-gray-900">JavaScript</h2>
            <span className="text-xs text-gray-400">{jsCompleted} of {jsLessons.length} completed</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
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

        {/* ── Python track ── */}
        <section className="mb-10">
          <LessonRecommender />
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-6 rounded-full bg-emerald-400 shrink-0" />
            <h2 className="font-bold text-gray-900">Python</h2>
            <span className="text-xs text-gray-400">
              {isPro ? `${pyCompleted} of ${pyLessons.length} completed` : "Pro plan required"}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
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

        {/* ── SQL track ── */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-6 rounded-full bg-cyan-400 shrink-0" />
            <h2 className="font-bold text-gray-900">SQL</h2>
            <span className="text-xs text-gray-400">
              {isPro ? `${sqlCompleted} of ${sqlLessons.length} completed` : "Pro plan required"}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
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

        {/* ── Data Analyst track ── */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-6 rounded-full bg-violet-400 shrink-0" />
            <h2 className="font-bold text-gray-900">Data Analyst</h2>
            <span className="text-xs text-gray-400">
              {isPro ? `${daCompleted} of ${daLessons.length} completed` : "Pro plan required"}
            </span>
          </div>
          <p className="text-sm text-gray-500 mb-4">SQL + Python (pandas) — the analyst&apos;s everyday toolkit, project by project.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {daLessons.map((lesson) => (
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

        {/* ── AI / ML track ── */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-6 rounded-full bg-rose-400 shrink-0" />
            <h2 className="font-bold text-gray-900">AI / ML</h2>
            <span className="text-xs text-gray-400">
              {isPro ? `${mlCompleted} of ${mlLessons.length} completed` : "Pro plan required"}
            </span>
          </div>
          <p className="text-sm text-gray-500 mb-4">NumPy, linear regression, classification, and clustering with scikit-learn.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {mlLessons.map((lesson) => (
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

        {/* ── Cybersecurity track ── */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-6 rounded-full bg-red-500 shrink-0" />
            <h2 className="font-bold text-gray-900">Cybersecurity</h2>
            <span className="text-xs text-gray-400">
              {isPro ? `${cyCompleted} of ${cyLessons.length} completed` : "Pro plan required"}
            </span>
          </div>
          <p className="text-sm text-gray-500 mb-4">Hashing, ciphers, password policies, HMAC, and recognising injection attacks — defensive fundamentals.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {cyLessons.map((lesson) => (
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

        {/* ── Excel track ── */}
        <section className="pb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-6 rounded-full bg-green-600 shrink-0" />
            <h2 className="font-bold text-gray-900">Excel</h2>
            <span className="text-xs text-gray-400">
              {isPro ? `${xlCompleted} of ${xlLessons.length} completed` : "Pro plan required"}
            </span>
          </div>
          <p className="text-sm text-gray-500 mb-4">SUM, IF, VLOOKUP, COUNTIF, and pivot tables — every formula reproduced in pandas so the logic is transparent and scriptable.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {xlLessons.map((lesson) => (
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
    </div>
  );
}
