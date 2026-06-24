import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white">
      {/* Nav */}
      <nav className="border-b border-white/10 px-6 py-4 flex items-center justify-between max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <span className="text-2xl">💻</span>
          <span className="font-bold text-xl">CodeLearn</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/pricing" className="text-sm text-blue-200 hover:text-white transition-colors">
            Pricing
          </Link>
          <Link
            href="/login"
            className="text-sm px-4 py-2 rounded-lg border border-white/20 hover:bg-white/10 transition-colors"
          >
            Sign in
          </Link>
          <Link
            href="/signup"
            className="text-sm px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 transition-colors font-medium"
          >
            Get Started Free
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-24 pb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 rounded-full px-4 py-1.5 text-sm text-blue-200 mb-8">
          <span>✨</span> Free to start — no credit card required
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
          Learn to Code,<br />One Step at a Time
        </h1>
        <p className="text-xl text-blue-100/80 max-w-2xl mx-auto mb-10">
          Interactive coding lessons built for beginners. Write real code in your browser,
          get instant feedback, and unlock AI-powered hints when you&apos;re stuck.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/signup"
            className="px-8 py-4 rounded-xl bg-brand-600 hover:bg-brand-700 font-semibold text-lg transition-all hover:scale-105 shadow-lg shadow-brand-500/25"
          >
            Start Learning Free →
          </Link>
          <Link
            href="/pricing"
            className="px-8 py-4 rounded-xl border border-white/20 hover:bg-white/10 font-medium text-lg transition-colors"
          >
            View Pricing
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-6">
        {[
          {
            icon: "⚡",
            title: "Run Code Instantly",
            desc: "Execute JavaScript and Python directly in your browser. No installs, no setup.",
          },
          {
            icon: "📚",
            title: "Guided Challenges",
            desc: "Step-by-step lessons with clear objectives, starter code, and instant validation.",
          },
          {
            icon: "🤖",
            title: "AI Tutor",
            desc: "Stuck? Your AI tutor gives personalized hints without spoiling the solution.",
          },
        ].map((f) => (
          <div key={f.title} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
            <div className="text-3xl mb-4">{f.icon}</div>
            <h3 className="font-bold text-lg mb-2">{f.title}</h3>
            <p className="text-blue-100/70 text-sm leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* Tracks */}
      <section className="max-w-6xl mx-auto px-6 py-8 pb-24">
        <h2 className="text-3xl font-bold text-center mb-3">Six Tracks to Choose From</h2>
        <p className="text-center text-blue-100/70 mb-10">Start with the basics or jump straight into a career path.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-yellow-500/10 border border-yellow-400/30 rounded-2xl p-6">
            <div className="text-4xl mb-3">🟡</div>
            <h3 className="font-bold text-xl mb-1">JavaScript</h3>
            <p className="text-blue-100/70 text-sm mb-4">The language of the web. Start free, go pro for advanced topics.</p>
            <div className="text-xs text-yellow-300">Free + Pro lessons</div>
          </div>
          <div className="bg-emerald-500/10 border border-emerald-400/30 rounded-2xl p-6">
            <div className="text-4xl mb-3">🐍</div>
            <h3 className="font-bold text-xl mb-1">Python</h3>
            <p className="text-blue-100/70 text-sm mb-4">Clean, readable, powerful. Perfect for scripts, automation, and AI.</p>
            <div className="text-xs text-emerald-300">Pro plan required</div>
          </div>
          <div className="bg-cyan-500/10 border border-cyan-400/30 rounded-2xl p-6">
            <div className="text-4xl mb-3">🗄️</div>
            <h3 className="font-bold text-xl mb-1">SQL</h3>
            <p className="text-blue-100/70 text-sm mb-4">Query real databases. From SELECT basics to window functions and CTEs.</p>
            <div className="text-xs text-cyan-300">Pro plan required</div>
          </div>
          <div className="bg-violet-500/10 border border-violet-400/30 rounded-2xl p-6 relative overflow-hidden">
            <span className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider bg-violet-400/20 text-violet-200 border border-violet-400/30 px-2 py-0.5 rounded-full">
              New
            </span>
            <div className="text-4xl mb-3">📊</div>
            <h3 className="font-bold text-xl mb-1">Data Analyst</h3>
            <p className="text-blue-100/70 text-sm mb-4">SQL + Python (pandas) — the analyst&apos;s everyday toolkit, project by project.</p>
            <div className="text-xs text-violet-300">Pro plan required</div>
          </div>
          <div className="bg-rose-500/10 border border-rose-400/30 rounded-2xl p-6 relative overflow-hidden">
            <span className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider bg-rose-400/20 text-rose-200 border border-rose-400/30 px-2 py-0.5 rounded-full">
              New
            </span>
            <div className="text-4xl mb-3">🤖</div>
            <h3 className="font-bold text-xl mb-1">AI / ML</h3>
            <p className="text-blue-100/70 text-sm mb-4">NumPy, linear regression, classification, and clustering with scikit-learn.</p>
            <div className="text-xs text-rose-300">Pro plan required</div>
          </div>
          <div className="bg-red-500/10 border border-red-400/30 rounded-2xl p-6 relative overflow-hidden">
            <span className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider bg-red-400/20 text-red-200 border border-red-400/30 px-2 py-0.5 rounded-full">
              New
            </span>
            <div className="text-4xl mb-3">🛡️</div>
            <h3 className="font-bold text-xl mb-1">Cybersecurity</h3>
            <p className="text-blue-100/70 text-sm mb-4">Hashing, ciphers, HMAC, password rules, and spotting injection attacks.</p>
            <div className="text-xs text-red-300">Pro plan required</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 text-center text-sm text-blue-200/50">
        © {new Date().getFullYear()} CodeLearn. Built for curious beginners.
      </footer>
    </div>
  );
}
