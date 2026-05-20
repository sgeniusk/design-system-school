import type { Metadata } from "next";
import { Container } from "@/components/Layout";
import { PageHead } from "@/components/Section";
import { WikiBrowser } from "@/components/WikiBrowser";
import { getConcepts, getOntologyStats, getPatterns } from "@/lib/content";

export const metadata: Metadata = {
  title: "위키 — 디자인 개념과 패턴의 온톨로지",
  description:
    "디자인 기초·UI/UX 개념과 재사용 가능한 UI 패턴의 위키. 색·타이포·여백·토큰·컴포넌트·접근성, 그리고 빈 상태·폼 검증·모달 같은 패턴이 서로 링크되어 있습니다.",
};

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

      <Container className="pb-20">
        <WikiBrowser concepts={concepts} patterns={patterns} />
      </Container>
    </>
  );
}
