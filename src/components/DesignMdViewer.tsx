"use client";
// DESIGN.md 원문 뷰어 — 보기 + 복사 + 다운로드.
import { useState } from "react";

export function DesignMdViewer({
  filename,
  content,
}: {
  filename: string;
  content: string;
}) {
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard?.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  }

  function download() {
    const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-ink shadow-lift">
      <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-pill bg-pop" aria-hidden />
        <span className="font-mono text-[13px] text-bg">{filename}</span>
        <div className="ml-auto flex gap-2">
          <button
            type="button"
            onClick={copy}
            className="rounded-md border border-white/15 px-3 py-1.5 text-[12.5px] font-medium text-bg/90 transition-colors hover:bg-white/10"
          >
            {copied ? "복사됨" : "복사"}
          </button>
          <button
            type="button"
            onClick={download}
            className="rounded-md bg-pop px-3 py-1.5 text-[12.5px] font-semibold text-white transition-transform hover:-translate-y-0.5"
          >
            다운로드
          </button>
        </div>
      </div>
      <pre className="max-h-[460px] overflow-auto px-5 py-4 font-mono text-[12.5px] leading-[1.7] text-bg/85">
        {content}
      </pre>
    </div>
  );
}
