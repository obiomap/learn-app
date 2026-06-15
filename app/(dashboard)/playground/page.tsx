"use client";

import { useState } from "react";
import CodeEditor from "@/components/editor/CodeEditor";
import OutputPanel from "@/components/editor/OutputPanel";

const STARTER = `// Welcome to the Playground!
// Write any JavaScript here and run it.

console.log("Hello from the playground!");
`;

export default function PlaygroundPage() {
  const [code, setCode] = useState(STARTER);
  const [output, setOutput] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [running, setRunning] = useState(false);

  function runCode() {
    setRunning(true);
    setOutput([]);
    setError(null);

    try {
      const lines: string[] = [];
      const sandbox = {
        console: {
          log: (...args: any[]) => lines.push(args.map(String).join(" ")),
          error: (...args: any[]) => lines.push("Error: " + args.map(String).join(" ")),
          warn: (...args: any[]) => lines.push("Warn: " + args.map(String).join(" ")),
        },
      };
      const fn = new Function(...Object.keys(sandbox), code);
      fn(...Object.values(sandbox));
      setOutput(lines);
    } catch (e: any) {
      setError(e.message ?? String(e));
    } finally {
      setRunning(false);
    }
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-6 py-3.5 flex items-center justify-between shadow-sm shrink-0">
        <div>
          <h1 className="font-bold text-gray-900">Playground</h1>
          <p className="text-gray-400 text-xs mt-0.5">Free-form JavaScript sandbox</p>
        </div>
        <button
          onClick={runCode}
          disabled={running}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold text-sm px-4 py-2 rounded-lg shadow-sm shadow-blue-200 transition-all"
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
              Run Code
            </>
          )}
        </button>
      </div>

      {/* Split: Editor (left) + Output (right) */}
      <div className="flex-1 grid grid-cols-2 min-h-0">
        {/* Left — editor */}
        <div className="flex flex-col border-r border-gray-100 min-h-0">
          <div className="bg-gray-800 px-4 py-2 flex items-center gap-2 shrink-0">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
            </div>
            <span className="text-xs text-gray-400 font-mono ml-1">playground.js</span>
          </div>
          <div className="flex-1 min-h-0">
            <CodeEditor value={code} onChange={setCode} language="javascript" height="100%" />
          </div>
        </div>

        {/* Right — output */}
        <div className="flex flex-col bg-gray-950 min-h-0">
          <div className="bg-gray-800 px-4 py-2 flex items-center gap-2 shrink-0">
            <div className="w-2 h-2 rounded-full bg-green-400" />
            <span className="text-xs text-gray-400 font-mono">Output</span>
            {running && (
              <span className="ml-auto flex items-center gap-1.5 text-xs text-yellow-400">
                <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Running…
              </span>
            )}
          </div>
          <div className="flex-1 overflow-y-auto p-5 font-mono text-sm min-h-0">
            {error ? (
              <div className="flex gap-2">
                <span className="text-red-400 shrink-0">✕</span>
                <p className="text-red-400 whitespace-pre-wrap leading-relaxed">{error}</p>
              </div>
            ) : output.length > 0 ? (
              <div className="space-y-1">
                {output.map((line, i) => (
                  <div key={i} className="flex gap-2">
                    <span className="text-gray-600 select-none text-xs pt-0.5 w-5 text-right shrink-0">{i + 1}</span>
                    <p className="text-green-300 whitespace-pre-wrap leading-relaxed">{line}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 italic">Run your code to see output here…</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
