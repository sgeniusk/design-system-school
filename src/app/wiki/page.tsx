import type { Metadata } from "next";
import { Container } from "@/components/Layout";
import { PageHead } from "@/components/Section";
import { ConceptCard } from "@/components/ConceptCard";
import { CATEGORY_LABEL } from "@/lib/types";
import type { ConceptCategory } from "@/lib/types";
import { getConcepts, getOntologyStats } from "@/lib/content";

export const metadata: Metadata = {
  title: "위키 — 디자인 개념 온톨로지",
  description:
    "디자인 기초·UI/UX 개념의 위키. 색·타이포·여백·토큰·컴포넌트·접근성 등 모든 개념이 서로 링크되어 있습니다.",
};

const CATEGORY_ORDER: ConceptCategory[] = [
  "system",
  "foundation",
  "color",
  "typography",
  "layout",
  "accessibility",
];

export default function WikiPage() {
  const concepts = getConcepts();
  const stats = getOntologyStats();

  return (
    <>
      <PageHead
        eyebrow="Wiki"
        title="디자인 개념의 온톨로지"
        lede="디자인 기초와 UI/UX의 핵심 개념을 노드로 정리했습니다. 모든 노드는 서로 링크되고, 컬렉션의 분석과도 연결됩니다. 아무 데서나 시작해도 됩니다."
      />

      <Container className="py-8">
        <dl className="flex flex-wrap gap-x-10 gap-y-4 rounded-xl border border-line bg-bg-soft/50 px-6 py-5">
          {[
            { k: "개념 노드", v: stats.concepts },
            { k: "분석 노드", v: stats.analyses },
            { k: "학습 경로", v: stats.paths },
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

      <Container className="pb-16">
        {CATEGORY_ORDER.map((cat) => {
          const items = concepts.filter((c) => c.category === cat);
          if (items.length === 0) return null;
          return (
            <section key={cat} className="mt-12 first:mt-4">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-pill bg-accent" aria-hidden />
                <h2 className="eyebrow text-ink-faint">
                  {CATEGORY_LABEL[cat]}
                </h2>
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
    </>
  );
}
