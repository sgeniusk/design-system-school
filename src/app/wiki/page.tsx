import type { Metadata } from "next";
import { Container } from "@/components/Layout";
import { PageHead } from "@/components/Section";
import { ConceptCard } from "@/components/ConceptCard";
import { PatternCard } from "@/components/PatternCard";
import { CATEGORY_LABEL, PATTERN_CATEGORY_LABEL } from "@/lib/types";
import type { ConceptCategory, PatternCategory } from "@/lib/types";
import { getConcepts, getOntologyStats, getPatterns } from "@/lib/content";

export const metadata: Metadata = {
  title: "위키 — 디자인 개념과 패턴의 온톨로지",
  description:
    "디자인 기초·UI/UX 개념과 재사용 가능한 UI 패턴의 위키. 색·타이포·여백·토큰·컴포넌트·접근성, 그리고 빈 상태·폼 검증·모달 같은 패턴이 서로 링크되어 있습니다.",
};

const CATEGORY_ORDER: ConceptCategory[] = [
  "system",
  "foundation",
  "color",
  "typography",
  "layout",
  "accessibility",
];

const PATTERN_CATEGORY_ORDER: PatternCategory[] = [
  "layout",
  "navigation",
  "input",
  "feedback",
  "disclosure",
];

export default function WikiPage() {
  const concepts = getConcepts();
  const patterns = getPatterns();
  const stats = getOntologyStats();

  return (
    <>
      <PageHead
        eyebrow="Wiki"
        title="디자인 개념과 패턴의 온톨로지"
        lede="디자인 기초·UI/UX 개념을 노드로 정리하고, 그 개념을 조합해 반복 문제를 푸는 UI 패턴을 함께 모았습니다. 개념은 이론, 패턴은 재사용 가능한 해법 — 모든 노드는 서로 링크됩니다."
      />

      <Container className="py-8">
        <dl className="flex flex-wrap gap-x-10 gap-y-4 rounded-xl border border-line bg-bg-soft/50 px-6 py-5">
          {[
            { k: "개념 노드", v: stats.concepts },
            { k: "패턴 노드", v: stats.patterns },
            { k: "분석 노드", v: stats.analyses },
            { k: "노드 간 연결", v: stats.edges },
          ].map((s) => (
            <div key={s.k}>
              <dt className="text-[12px] text-ink-faint">{s.k}</dt>
              <dd className="font-mono text-[22px] font-bold text-ink">
                {s.v}
              </dd>
            </div>
          ))}
        </dl>
      </Container>

      <Container className="pb-4">
        {/* 개념 — 이론 */}
        <div className="flex items-center gap-2.5">
          <span className="h-2.5 w-2.5 rounded-pill bg-accent" aria-hidden />
          <h2 className="text-[18px] font-bold tracking-tight text-ink">
            개념
          </h2>
          <span className="text-[13px] text-ink-faint">
            디자인을 떠받치는 이론과 원리
          </span>
        </div>
        {CATEGORY_ORDER.map((cat) => {
          const items = concepts.filter((c) => c.category === cat);
          if (items.length === 0) return null;
          return (
            <section key={cat} className="mt-10 first:mt-6">
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
      </Container>

      <Container className="pb-16 pt-16">
        {/* 패턴 — 재사용 가능한 해법 */}
        <div className="flex items-center gap-2.5">
          <span className="h-2.5 w-2.5 rounded-pill bg-gold" aria-hidden />
          <h2 className="text-[18px] font-bold tracking-tight text-ink">
            패턴
          </h2>
          <span className="text-[13px] text-ink-faint">
            컴포넌트를 조합해 반복 문제를 푸는 UI 해법
          </span>
        </div>
        {PATTERN_CATEGORY_ORDER.map((cat) => {
          const items = patterns.filter((p) => p.category === cat);
          if (items.length === 0) return null;
          return (
            <section key={cat} className="mt-10 first:mt-6">
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
      </Container>
    </>
  );
}
