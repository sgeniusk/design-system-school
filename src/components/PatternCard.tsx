// 패턴 노드 카드 — 위키로 링크. 액센트는 amber(gold).
import Link from "next/link";
import { PATTERN_CATEGORY_LABEL, DIFFICULTY_LABEL } from "@/lib/types";
import type { PatternNode } from "@/lib/types";

export function PatternCard({
  pattern,
  index,
}: {
  pattern: PatternNode;
  index?: number;
}) {
  return (
    <Link
      href={`/wiki/${pattern.slug}`}
      className="group relative flex flex-col rounded-lg border border-line bg-surface p-5 transition-all hover:-translate-y-1 hover:border-gold/40 hover:shadow-glow-gold"
    >
      <div className="flex items-center justify-between">
        <span className="rounded-pill bg-gold-soft px-2.5 py-1 text-[11px] font-semibold text-gold-ink">
          {PATTERN_CATEGORY_LABEL[pattern.category]}
        </span>
        {typeof index === "number" ? (
          <span className="font-mono text-[12px] text-ink-faint">
            {String(index + 1).padStart(2, "0")}
          </span>
        ) : null}
      </div>
      <h3 className="mt-3 text-[17px] font-bold tracking-tight text-ink">
        {pattern.title}
      </h3>
      <p className="mt-2 flex-1 text-[13.5px] leading-relaxed text-ink-mute">
        {pattern.summary}
      </p>
      <p className="mt-4 border-t border-line pt-3 text-[12.5px] font-medium text-gold-ink">
        {pattern.problem}
      </p>
      <div className="mt-3 flex items-center gap-2 text-[12px] text-ink-faint">
        <span>{DIFFICULTY_LABEL[pattern.difficulty]}</span>
        <span aria-hidden>·</span>
        <span>{pattern.readingMinutes}분</span>
        <span className="ml-auto font-mono text-gold transition-transform group-hover:translate-x-1">
          →
        </span>
      </div>
    </Link>
  );
}
