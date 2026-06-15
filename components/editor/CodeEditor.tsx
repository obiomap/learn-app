"use client";

import Editor from "@monaco-editor/react";

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language?: "javascript" | "python" | "sql";
  height?: string;
}

export default function CodeEditor({
  value,
  onChange,
  language = "javascript",
  height = "300px",
}: CodeEditorProps) {
  return (
    <Editor
      height={height}
      language={language}
      value={value}
      onChange={(v) => onChange(v ?? "")}
      theme="vs-dark"
      options={{
        fontSize: 14,
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        lineNumbers: "on",
        renderLineHighlight: "line",
        tabSize: language === "python" ? 4 : 2,
        wordWrap: "on",
        automaticLayout: true,
      }}
    />
  );
}
