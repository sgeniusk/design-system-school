import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Layout";
import { PageHead } from "@/components/Section";
import { getPathConcepts, getPaths } from "@/lib/content";

export const metadata: Metadata = {
  title: "배우기 — 학습 경로",
  description:
    "디자인 개념을 큐레이션한 순서로 배우는 학습 경로. 입문부터 나만의 디자인 시스템 만들기까지.",
};

const LEVEL_LABEL = { intro: "입문", core: "핵심" } as const;

export default function LearnPage() {
  const paths = getPaths();

  return (
    <>
      <PageHead
        eyebrow="Learn"
        accent="mint"
        title="순서가 있으면, 막막함이 줄어든다"
        lede="위키의 개념을 아무 데서나 읽어도 되지만, 처음이라면 경로를 따르세요. 각 경로는 개념 노드를 의미 있는 순서로 엮은 큐레이션입니다."
      />

      <Container className="py-14">
        <div className="grid gap-6">
          {paths.map((path, i) => {
            const concepts = getPathConcepts(path.slug);
            return (
              <Link
                key={path.slug}
                href={`/learn/${path.slug}`}
                className="group grid gap-6 rounded-xl border border-line bg-surface p-6 transition-all hover:-translate-y-1 hover:border-mint/40 hover:shadow-soft sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[12px] text-mint-ink">
                      경로 {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="rounded-pill bg-mint-soft px-2.5 py-0.5 text-[11px] font-semibold text-mint-ink">
                      {LEVEL_LABEL[path.level]}
                    </span>
                  </div>
                  <h2 className="mt-2 text-[22px] font-bold tracking-tight text-ink">
                    {path.title}
                  </h2>
                  <p className="mt-1 text-[13.5px] text-ink-faint">
                    {path.tagline}
                  </p>
                  <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-ink-mute">
                    {path.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {concepts.map((c, idx) => (
                      <span
                        key={c.slug}
                        className="rounded-pill border border-line bg-bg-soft px-2.5 py-1 text-[12px] text-ink-soft"
                      >
                        <span className="font-mono text-ink-faint">
                          {idx + 1}
                        </span>{" "}
                        {c.title}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-3 lg:flex-col lg:items-end">
                  <span className="font-mono text-[40px] font-bold leading-none text-mint">
                    {concepts.length}
                  </span>
                  <span className="text-[12px] text-ink-faint">개념</span>
                  <span className="font-mono text-[14px] text-mint-ink transition-transform group-hover:translate-x-1">
                    경로 시작 →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </>
  );
}
