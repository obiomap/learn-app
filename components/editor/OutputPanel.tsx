"use client";

interface OutputPanelProps {
  output: string[];
  error: string | null;
  isRunning: boolean;
  className?: string;
}

export default function OutputPanel({ output, error, isRunning, className = "" }: OutputPanelProps) {
  return (
    <div className={`rounded-xl border border-gray-700 bg-gray-900 overflow-hidden flex flex-col ${className}`}>
      <div className="bg-gray-800 px-4 py-2.5 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400" />
          <span className="text-xs text-gray-400 font-mono">Output</span>
        </div>
        {isRunning && (
          <span className="flex items-center gap-1.5 text-xs text-yellow-400">
            <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Running…
          </span>
        )}
      </div>
      <div className="p-4 font-mono text-sm flex-1 overflow-y-auto min-h-[120px]">
        {error ? (
          <p className="text-red-400 whitespace-pre-wrap">{error}</p>
        ) : output.length > 0 ? (
          output.map((line, i) => (
            <p key={i} className="text-green-300 whitespace-pre-wrap leading-relaxed">
              {line}
            </p>
          ))
        ) : (
          <p className="text-gray-500 italic">Run your code to see output here…</p>
        )}
      </div>
    </div>
  );
}
