// 개념 노드 카드 — 위키로 링크. 액센트는 indigo.
import Link from "next/link";
import { CATEGORY_LABEL, DIFFICULTY_LABEL } from "@/lib/types";
import type { ConceptNode } from "@/lib/types";

export function ConceptCard({
  concept,
  index,
}: {
  concept: ConceptNode;
  index?: number;
}) {
  return (
    <Link
      href={`/wiki/${concept.slug}`}
      className="group relative flex flex-col rounded-lg border border-line bg-surface p-5 transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-glow"
    >
      <div className="flex items-center justify-between">
        <span className="rounded-pill bg-accent-soft px-2.5 py-1 text-[11px] font-semibold text-accent-ink">
          {CATEGORY_LABEL[concept.category]}
        </span>
        {typeof index === "number" ? (
          <span className="font-mono text-[12px] text-ink-faint">
            {String(index + 1).padStart(2, "0")}
          </span>
        ) : null}
      </div>
      <h3 className="mt-3 text-[17px] font-bold tracking-tight text-ink">
        {concept.title}
      </h3>
      <p className="mt-2 flex-1 text-[13.5px] leading-relaxed text-ink-mute">
        {concept.summary}
      </p>
      <div className="mt-4 flex items-center gap-2 text-[12px] text-ink-faint">
        <span>{DIFFICULTY_LABEL[concept.difficulty]}</span>
        <span aria-hidden>·</span>
        <span>{concept.readingMinutes}분</span>
        <span className="ml-auto font-mono text-accent transition-transform group-hover:translate-x-1">
          →
        </span>
      </div>
    </Link>
  );
}
