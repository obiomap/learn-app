"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";

interface UpgradeModalProps {
  open: boolean;
  onClose: () => void;
}

export default function UpgradeModal({ open, onClose }: UpgradeModalProps) {
  const [loading, setLoading] = useState(false);

  async function handleUpgrade() {
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/checkout", { method: "POST" });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch {
      setLoading(false);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
        <div className="text-center mb-6">
          <div className="text-5xl mb-3">🚀</div>
          <h2 className="text-2xl font-bold text-gray-900">Unlock Pro Access</h2>
          <p className="text-gray-500 mt-2">
            Get unlimited lessons, Python support, and AI-powered hints.
          </p>
        </div>

        <ul className="space-y-3 mb-8">
          {[
            "All 20+ lessons (JavaScript + Python)",
            "Run Python code in your browser",
            "Unlimited AI tutor hints",
            "Track your progress",
          ].map((feature) => (
            <li key={feature} className="flex items-center gap-3 text-sm text-gray-700">
              <span className="text-green-500 font-bold">✓</span>
              {feature}
            </li>
          ))}
        </ul>

        <div className="text-center mb-6">
          <span className="text-4xl font-bold text-gray-900">$9.99</span>
          <span className="text-gray-500">/month</span>
        </div>

        <Button size="lg" className="w-full mb-3" onClick={handleUpgrade} loading={loading}>
          Start Pro — $9.99/mo
        </Button>
        <button
          onClick={onClose}
          className="w-full text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          Maybe later
        </button>
      </div>
    </div>
  );
}
