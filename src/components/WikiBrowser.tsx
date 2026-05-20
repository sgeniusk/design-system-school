"use client";
// 위키 라우트의 검색·카테고리 점프 클라이언트 아일랜드 — 개념과 패턴을 한 화면에서 찾는다.
import { useMemo, useState } from "react";
import { ConceptCard } from "@/components/ConceptCard";
import { PatternCard } from "@/components/PatternCard";
import { CATEGORY_LABEL, PATTERN_CATEGORY_LABEL } from "@/lib/types";
import type {
  ConceptCategory,
  ConceptNode,
  PatternCategory,
  PatternNode,
} from "@/lib/types";

const CONCEPT_ORDER: ConceptCategory[] = [
  "system",
  "foundation",
  "color",
  "typography",
  "layout",
  "behavior",
  "content",
  "engineering",
  "accessibility",
];

const PATTERN_ORDER: PatternCategory[] = [
  "layout",
  "navigation",
  "input",
  "feedback",
  "disclosure",
];

function conceptHit(c: ConceptNode, q: string): boolean {
  if (!q) return true;
  return (
    c.title.toLowerCase().includes(q) ||
    c.titleEn.toLowerCase().includes(q) ||
    c.summary.toLowerCase().includes(q) ||
    CATEGORY_LABEL[c.category].toLowerCase().includes(q)
  );
}

function patternHit(p: PatternNode, q: string): boolean {
  if (!q) return true;
  return (
    p.title.toLowerCase().includes(q) ||
    p.titleEn.toLowerCase().includes(q) ||
    p.summary.toLowerCase().includes(q) ||
    p.problem.toLowerCase().includes(q) ||
    PATTERN_CATEGORY_LABEL[p.category].toLowerCase().includes(q)
  );
}

export function WikiBrowser({
  concepts,
  patterns,
}: {
  concepts: ConceptNode[];
  patterns: PatternNode[];
}) {
  const [raw, setRaw] = useState("");
  const q = raw.trim().toLowerCase();

  const conceptMatches = useMemo(
    () => concepts.filter((c) => conceptHit(c, q)),
    [concepts, q],
  );
  const patternMatches = useMemo(
    () => patterns.filter((p) => patternHit(p, q)),
    [patterns, q],
  );

  const total = conceptMatches.length + patternMatches.length;
  const noResults = q !== "" && total === 0;

  return (
    <>
      {/* 검색·점프 바 — 본문 위에 sticky로 머무른다. */}
      <div className="sticky top-16 z-40 -mx-6 mb-10 border-y border-line bg-bg/90 px-6 py-3 backdrop-blur sm:-mx-8 sm:px-8">
        <div className="mx-auto flex max-w-shell items-center gap-3">
          <span aria-hidden className="font-mono text-[13px] text-ink-faint">
            ⌕
          </span>
          <input
            type="search"
            value={raw}
            onChange={(e) => setRaw(e.target.value)}
            placeholder="개념·패턴 검색 — 제목·영문명·요약 어디든"
            aria-label="개념과 패턴 검색"
            className="flex-1 bg-transparent text-[14.5px] text-ink outline-none placeholder:text-ink-faint"
          />
          {q ? (
            <button
              type="button"
              onClick={() => setRaw("")}
              className="font-mono text-[12px] text-ink-faint hover:text-ink"
              aria-label="검색 지우기"
            >
              {total}개 · 지우기
            </button>
          ) : (
            <span className="hidden font-mono text-[12px] text-ink-faint sm:inline">
              개념 {concepts.length} · 패턴 {patterns.length}
            </span>
          )}
        </div>
      </div>

      {noResults ? (
        <div className="rounded-xl border border-line bg-bg-soft/40 px-6 py-10 text-center">
          <p className="text-[15px] text-ink">
            &ldquo;<span className="font-semibold">{raw}</span>&rdquo;에 맞는
            노드가 없습니다.
          </p>
          <button
            type="button"
            onClick={() => setRaw("")}
            className="mt-3 font-mono text-[13px] text-accent-ink hover:underline"
          >
            검색 지우고 전체 보기 →
          </button>
        </div>
      ) : null}

      {/* 개념 */}
      {conceptMatches.length > 0 ? (
        <section>
          <div className="flex items-center gap-2.5">
            <span className="h-2.5 w-2.5 rounded-pill bg-accent" aria-hidden />
            <h2 className="text-[18px] font-bold tracking-tight text-ink">
              개념
            </h2>
            <span className="text-[13px] text-ink-faint">
              디자인을 떠받치는 이론과 원리
            </span>
            <span className="ml-auto font-mono text-[12px] text-ink-faint">
              {conceptMatches.length}개
            </span>
          </div>
          {CONCEPT_ORDER.map((cat) => {
            const items = conceptMatches.filter((c) => c.category === cat);
            if (items.length === 0) return null;
            return (
              <section
                key={cat}
                id={`cat-${cat}`}
                className="mt-10 scroll-mt-36 first:mt-6"
              >
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-pill bg-accent" aria-hidden />
                  <h3 className="eyebrow text-ink-faint">
                    {CATEGORY_LABEL[cat]}
                  </h3>
                </div>
                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((c) => (
                    <ConceptCard key={c.slug} concept={c} />
                  ))}
                </div>
              </section>
            );
          })}
        </section>
      ) : null}

      {/* 패턴 */}
      {patternMatches.length > 0 ? (
        <section className="mt-20">
          <div className="flex items-center gap-2.5">
            <span className="h-2.5 w-2.5 rounded-pill bg-gold" aria-hidden />
            <h2 className="text-[18px] font-bold tracking-tight text-ink">
              패턴
            </h2>
            <span className="text-[13px] text-ink-faint">
              컴포넌트를 조합해 반복 문제를 푸는 UI 해법
            </span>
            <span className="ml-auto font-mono text-[12px] text-ink-faint">
              {patternMatches.length}개
            </span>
          </div>
          {PATTERN_ORDER.map((cat) => {
            const items = patternMatches.filter((p) => p.category === cat);
            if (items.length === 0) return null;
            return (
              <section
                key={cat}
                id={`pat-${cat}`}
                className="mt-10 scroll-mt-36 first:mt-6"
              >
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-pill bg-gold" aria-hidden />
                  <h3 className="eyebrow text-ink-faint">
                    {PATTERN_CATEGORY_LABEL[cat]}
                  </h3>
                </div>
                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((p) => (
                    <PatternCard key={p.slug} pattern={p} />
                  ))}
                </div>
              </section>
            );
          })}
        </section>
      ) : null}
    </>
  );
}
