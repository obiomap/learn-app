"use client";

import { useState } from "react";
import Link from "next/link";
import PricingCard from "@/components/subscription/PricingCard";

export default function PricingPage() {
  const [loading, setLoading] = useState(false);

  async function handleProUpgrade() {
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/checkout", { method: "POST" });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else if (data.error === "Unauthorized") window.location.href = "/signup";
    } catch {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between max-w-6xl mx-auto">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-gray-900">
          <span>💻</span> CodeLearn
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm text-gray-600 hover:text-gray-900">Sign in</Link>
          <Link href="/signup" className="text-sm px-4 py-2 rounded-lg bg-brand-600 text-white hover:bg-brand-700 transition-colors">
            Sign up free
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Simple, Honest Pricing</h1>
          <p className="text-xl text-gray-500">Start free. Upgrade when you&apos;re ready.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <PricingCard
            name="Free"
            price="$0"
            description="Perfect for getting started"
            features={[
              "5 JavaScript lessons",
              "In-browser code execution",
              "Playground sandbox",
              "Progress tracking",
            ]}
            cta="Get Started Free"
            onSelect={() => (window.location.href = "/signup")}
          />
          <PricingCard
            name="Pro"
            price="$9.99"
            period="/month"
            description="Everything for serious learners"
            features={[
              "All 20+ lessons",
              "JavaScript + Python track",
              "Run Python in your browser",
              "Unlimited AI tutor hints",
              "Priority support",
            ]}
            cta="Start Pro"
            highlighted
            onSelect={handleProUpgrade}
            loading={loading}
          />
        </div>

        <p className="text-center text-sm text-gray-400 mt-10">
          Cancel anytime. No hidden fees. Billed monthly.
        </p>
      </div>
    </div>
  );
}
