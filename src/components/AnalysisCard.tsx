// 분석 노드 카드 — 컬렉션으로 링크. 액센트는 coral.
import Link from "next/link";
import { DELIVERY_LABEL, INDUSTRY_LABEL } from "@/lib/types";
import type { AnalysisNode } from "@/lib/types";

export function AnalysisCard({ analysis }: { analysis: AnalysisNode }) {
  return (
    <Link
      href={`/collection/${analysis.slug}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-line bg-surface transition-all hover:-translate-y-1 hover:border-pop/40 hover:shadow-glow-pop"
    >
      <div
        className="flex h-24 items-end justify-between p-4"
        style={{
          background: `linear-gradient(135deg, ${analysis.brandColor} 0%, ${analysis.brandColor}99 100%)`,
        }}
      >
        <span className="rounded-pill bg-black/25 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
          {INDUSTRY_LABEL[analysis.industry]}
        </span>
        <span className="font-mono text-[11px] text-white/80">
          {DELIVERY_LABEL[analysis.delivery]}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-[17px] font-bold tracking-tight text-ink">
          {analysis.title}
        </h3>
        <p className="mt-1 text-[12.5px] text-ink-faint">{analysis.org}</p>
        <p className="mt-3 flex-1 text-[13.5px] leading-relaxed text-ink-mute">
          {analysis.summary}
        </p>
        <p className="mt-4 border-t border-line pt-3 text-[12.5px] font-medium text-pop-ink">
          {analysis.takeaway}
        </p>
      </div>
    </Link>
  );
}
