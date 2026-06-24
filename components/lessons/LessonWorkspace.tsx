"use client";

import { useState, useCallback, useRef } from "react";
import { Lesson } from "@/data/lessons";
import CodeEditor from "@/components/editor/CodeEditor";
import OutputPanel from "@/components/editor/OutputPanel";
import AIAssistant from "@/components/editor/AIAssistant";
import UpgradeModal from "@/components/subscription/UpgradeModal";
import Link from "next/link";

interface Props {
  lesson: Lesson;
  initialCode: string;
  initialCompleted: boolean;
  isPro: boolean;
}

declare global {
  interface Window {
    loadPyodide?: (options: { indexURL: string }) => Promise<any>;
    pyodide?: any;
    initSqlJs?: (options: { locateFile: (f: string) => string }) => Promise<any>;
  }
}

export default function LessonWorkspace({ lesson, initialCode, initialCompleted, isPro }: Props) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [running, setRunning] = useState(false);
  const [completed, setCompleted] = useState(initialCompleted);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [saving, setSaving] = useState(false);
  const pyodideRef = useRef<any>(null);
  const sqlRef = useRef<any>(null);

  async function loadPyodide() {
    if (pyodideRef.current) return pyodideRef.current;
    if (!window.loadPyodide) {
      await new Promise<void>((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js";
        script.onload = () => resolve();
        script.onerror = () => reject(new Error("Failed to load Pyodide"));
        document.head.appendChild(script);
      });
    }
    const py = await window.loadPyodide!({ indexURL: "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/" });
    pyodideRef.current = py;
    return py;
  }

  async function loadSqlJs() {
    if (sqlRef.current) return sqlRef.current;
    if (!window.initSqlJs) {
      await new Promise<void>((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/npm/sql.js@1.10.2/dist/sql-wasm.js";
        script.onload = () => resolve();
        script.onerror = () => reject(new Error("Failed to load sql.js"));
        document.head.appendChild(script);
      });
    }
    const SQL = await window.initSqlJs!({
      locateFile: (f: string) => `https://cdn.jsdelivr.net/npm/sql.js@1.10.2/dist/${f}`,
    });
    sqlRef.current = SQL;
    return SQL;
  }

  async function runCode() {
    setRunning(true);
    setOutput([]);
    setError(null);

    const runtime = lesson.runtime ?? (lesson.track as "javascript" | "python" | "sql");

    try {
      if (runtime === "sql") {
        const SQL = await loadSqlJs();
        const db = new SQL.Database();
        if (lesson.setupSql) db.run(lesson.setupSql);
        const results: any[] = db.exec(code);
        const lines: string[] = [];
        for (const result of results) {
          lines.push(result.columns.join(" | "));
          for (const row of result.values) {
            lines.push(row.map(String).join(" | "));
          }
        }
        if (lines.length === 0) lines.push("Query executed successfully. No rows returned.");
        db.close();
        setOutput(lines);
        checkOutput(lines.join("\n"));
      } else if (runtime === "javascript") {
        const lines: string[] = [];
        const sandbox = {
          console: {
            log: (...args: any[]) => lines.push(args.map(String).join(" ")),
            error: (...args: any[]) => lines.push("Error: " + args.map(String).join(" ")),
          },
        };
        const fn = new Function(...Object.keys(sandbox), code);
        fn(...Object.values(sandbox));
        setOutput(lines);
        checkOutput(lines.join("\n"));
      } else {
        const py = await loadPyodide();
        if (lesson.pyPackages && lesson.pyPackages.length > 0) {
          await py.loadPackage(lesson.pyPackages);
        }
        const lines: string[] = [];
        py.globals.set("print_output", (text: string) => lines.push(text));
        await py.runPythonAsync(`
import sys
from js import print_output

class _Capture:
    def write(self, text):
        if text.strip():
            print_output(text.rstrip())
    def flush(self): pass

sys.stdout = _Capture()
sys.stderr = _Capture()
`);
        await py.runPythonAsync(code);
        setOutput(lines);
        checkOutput(lines.join("\n"));
      }
    } catch (e: any) {
      setError(e.message ?? String(e));
    } finally {
      setRunning(false);
    }
  }

  function checkOutput(actual: string) {
    const expected = lesson.expectedOutput.trim();
    if (actual.trim() === expected) {
      setCompleted(true);
      saveProgress(true);
    }
  }

  const saveProgress = useCallback(
    async (isCompleted = completed) => {
      setSaving(true);
      try {
        await fetch("/api/progress", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ lessonId: lesson.id, completed: isCompleted, code }),
        });
      } finally {
        setSaving(false);
      }
    },
    [code, completed, lesson.id]
  );

  return (
    <>
      <UpgradeModal open={showUpgrade} onClose={() => setShowUpgrade(false)} />
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-100 px-6 py-3.5 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3 min-w-0">
            <Link
              href="/lessons"
              className="flex items-center gap-1.5 text-gray-400 hover:text-gray-600 transition-colors text-sm shrink-0"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Lessons
            </Link>
            <span className="text-gray-200">/</span>
            <h1 className="font-semibold text-gray-900 text-sm truncate">{lesson.title}</h1>
            <span className={`shrink-0 inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${
              lesson.tier === "pro" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"
            }`}>
              {lesson.tier === "pro" ? "Pro" : "Free"}
            </span>
            {completed && (
              <span className="shrink-0 inline-flex items-center gap-1 bg-green-100 text-green-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide">
                <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Done
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => saveProgress()}
              disabled={saving}
              className="inline-flex items-center gap-1.5 text-gray-500 hover:text-gray-700 disabled:opacity-50 text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-all"
            >
              {saving ? (
                <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : (
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                </svg>
              )}
              Save
            </button>
            <button
              onClick={runCode}
              disabled={running}
              className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold text-sm px-4 py-1.5 rounded-lg shadow-sm shadow-blue-200 transition-all"
            >
              {running ? (
                <>
                  <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Running…
                </>
              ) : (
                <>
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Run
                </>
              )}
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 grid grid-cols-2 gap-0 overflow-hidden">
          {/* Left: lesson content */}
          <div className="border-r border-gray-100 overflow-y-auto p-6 bg-white space-y-6">

            {/* Description */}
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">About this lesson</p>
              <p className="text-sm text-gray-600 leading-relaxed">{lesson.description}</p>
            </div>

            {/* Explanation */}
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Explanation</p>
              <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{lesson.explanation}</div>
            </div>

            {/* Examples */}
            {lesson.examples && lesson.examples.length > 0 && (
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Examples</p>
                <div className="space-y-3">
                  {lesson.examples.map((ex, i) => (
                    <div key={i} className="rounded-xl overflow-hidden border border-gray-100">
                      <div className="bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-500 border-b border-gray-100">
                        {ex.label}
                      </div>
                      <pre className="bg-gray-900 text-green-300 px-4 py-3 text-xs font-mono whitespace-pre-wrap leading-relaxed overflow-x-auto">
                        {ex.code}
                      </pre>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Mini project */}
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Mini Project</p>
              <div className="bg-amber-50 border border-amber-100 rounded-xl p-3.5 text-sm text-amber-800 leading-relaxed">
                {lesson.project}
              </div>
            </div>

            {/* Objective */}
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Objective</p>
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-3.5 text-sm text-blue-800 leading-relaxed whitespace-pre-line">
                {lesson.objective}
              </div>
            </div>

            {/* Expected output */}
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Expected Output</p>
              <pre className="bg-gray-900 text-green-300 rounded-xl p-4 text-xs font-mono whitespace-pre-wrap leading-relaxed">
                {lesson.expectedOutput}
              </pre>
            </div>

            {/* Completion banner */}
            {completed && (
              <div className="bg-green-50 border border-green-100 rounded-xl p-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-green-800">Lesson complete!</p>
                  <p className="text-xs text-green-600 mt-0.5">Great work — your progress has been saved.</p>
                </div>
              </div>
            )}
          </div>

          {/* Right: editor + output + AI */}
          <div className="overflow-y-auto p-5 bg-gray-50 space-y-4">
            <div className="rounded-xl border border-gray-200 overflow-hidden shadow-sm">
              <div className="bg-gray-800 px-4 py-2 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                </div>
                <span className="text-xs text-gray-400 font-mono ml-1">
                  {(() => {
                    const r = lesson.runtime ?? lesson.track;
                    if (r === "python") return "solution.py";
                    if (r === "sql") return "query.sql";
                    return "solution.js";
                  })()}
                </span>
              </div>
              <CodeEditor value={code} onChange={setCode} language={lesson.runtime ?? (lesson.track as "javascript" | "python" | "sql")} height="300px" />
            </div>
            <OutputPanel output={output} error={error} isRunning={running} />
            <AIAssistant
              lessonId={lesson.id}
              lessonTitle={lesson.title}
              code={code}
              isPro={isPro}
              onUpgrade={() => setShowUpgrade(true)}
            />
          </div>
        </div>
      </div>
    </>
  );
}
