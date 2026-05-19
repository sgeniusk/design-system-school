// 온톨로지 그래프 렌즈 — 개념·분석·학습 경로를 하나의 지식 그래프로 시각화하는 라우트.
import type { Metadata } from "next";
import { Container } from "@/components/Layout";
import { PageHead } from "@/components/Section";
import { OntologyGraph } from "@/components/OntologyGraph";
import { graphData, getGraphStats } from "@/lib/graph";

export const metadata: Metadata = {
  title: "온톨로지 — 디자인 지식 그래프",
  description:
    "위키의 개념과 패턴, 컬렉션의 분석, 배우기의 경로가 어떻게 연결되는지 한눈에 보는 인터랙티브 지식 그래프.",
};

export default function OntologyPage() {
  const stats = getGraphStats();

  return (
    <>
      <PageHead
        eyebrow="Ontology"
        title="하나의 그래프로 보는 디자인 지식"
        lede="위키의 개념과 패턴, 컬렉션의 분석, 배우기의 경로 — 모든 콘텐츠는 사실 하나의 온톨로지입니다. 노드에 마우스를 올려 연결을 따라가 보세요."
      />

      <Container className="py-8">
        <dl className="flex flex-wrap gap-x-10 gap-y-4 rounded-xl border border-line bg-bg-soft/50 px-6 py-5">
          {[
            { k: "개념 노드", v: stats.concepts },
            { k: "패턴 노드", v: stats.patterns },
            { k: "분석 노드", v: stats.analyses },
            { k: "학습 경로", v: stats.paths },
            { k: "고유 연결", v: stats.edges },
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
        <OntologyGraph nodes={graphData.nodes} edges={graphData.edges} />
      </Container>
    </>
  );
}
