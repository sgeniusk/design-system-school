import type { Metadata } from "next";
import { Container } from "@/components/Layout";
import { PageHead } from "@/components/Section";
import { AnalysisCard } from "@/components/AnalysisCard";
import { getAnalyses, getGlobalReferences } from "@/lib/content";

export const metadata: Metadata = {
  title: "컬렉션 — 디자인 분석 카탈로그",
  description:
    "토스·KRDS·G마켓·원티드 등 성공한 디자인 시스템을 해부한 분석 카탈로그. 각 항목은 AI 코딩 에이전트가 쓰는 DESIGN.md를 산출합니다.",
};

export default function CollectionPage() {
  const analyses = getAnalyses();
  const globals = getGlobalReferences();

  return (
    <>
      <PageHead
        eyebrow="Collection"
        accent="pop"
        title="성공한 디자인을, 같은 양식으로 해부한다"
        lede="좋아 보이는 디자인을 막연히 감탄하는 대신, 무엇이 왜 작동하는지 일정한 양식으로 분석합니다. 각 분석은 AI 코딩 에이전트가 쓰는 DESIGN.md를 함께 산출합니다."
      />

      <Container className="py-14">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-pill bg-pop" aria-hidden />
          <h2 className="eyebrow text-ink-faint">한국의 디자인 시스템</h2>
        </div>
        <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {analyses.map((a) => (
            <AnalysisCard key={a.slug} analysis={a} />
          ))}
        </div>

        <div className="mt-16 flex items-center gap-2">
          <span className="h-2 w-2 rounded-pill bg-ink-faint" aria-hidden />
          <h2 className="eyebrow text-ink-faint">글로벌 보너스 — 더 보기</h2>
        </div>
        <p className="mt-2 max-w-2xl text-[14px] text-ink-mute">
          한국 사례를 충분히 본 뒤에는, 디자인 시스템의 사실상 교과서인 글로벌
          시스템도 둘러보세요.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {globals.map((g) => (
            <a
              key={g.name}
              href={g.url}
              target="_blank"
              rel="noreferrer"
              className="group rounded-lg border border-line bg-surface p-5 transition-all hover:-translate-y-1 hover:border-ink/30 hover:shadow-soft"
            >
              <p className="text-[12px] text-ink-faint">{g.org}</p>
              <h3 className="mt-1 text-[16px] font-bold text-ink">
                {g.name}
                <span className="ml-1 font-mono text-[12px] text-ink-faint transition-transform group-hover:translate-x-0.5">
                  ↗
                </span>
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-ink-mute">
                {g.note}
              </p>
            </a>
          ))}
        </div>
      </Container>
    </>
  );
}
