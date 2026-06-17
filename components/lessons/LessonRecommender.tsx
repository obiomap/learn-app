"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";

interface Recommendation {
  id: string;
  title: string;
  description: string;
  score: number;
}

export default function LessonRecommender() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setSearched(true);
    try {
      const res = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const data = await res.json();
      setResults(data.recommendations ?? []);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mb-8 bg-emerald-50 border border-emerald-100 rounded-2xl p-5">
      <p className="text-sm font-semibold text-emerald-800 mb-3">Find a Python lesson</p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='e.g. "how do I handle errors?" or "I want to learn about loops"'
          className="flex-1 rounded-lg border border-emerald-200 bg-white px-3 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />
        <button
          type="submit"
          disabled={loading || !query.trim()}
          className="shrink-0 bg-emerald-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-emerald-700 disabled:opacity-50 transition-colors"
        >
          {loading ? "…" : "Find"}
        </button>
      </form>

      {searched && !loading && (
        <div className="mt-3">
          {results.length === 0 ? (
            <p className="text-xs text-gray-500">No matching lessons found. Try different keywords.</p>
          ) : (
            <ul className="space-y-2">
              {results.map((r) => (
                <li key={r.id} className="flex items-start gap-3 bg-white rounded-xl border border-emerald-100 p-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">{r.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{r.description}</p>
                  </div>
                  <Link
                    href={`/lessons/${r.id}`}
                    className="shrink-0 text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg hover:bg-emerald-100 transition-colors"
                  >
                    Go →
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
