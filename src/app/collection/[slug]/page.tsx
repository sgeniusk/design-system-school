import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Layout";
import { DesignMdViewer } from "@/components/DesignMdViewer";
import { ColorPalette } from "@/components/analysis/ColorPalette";
import { TypeScale } from "@/components/analysis/TypeScale";
import { SpacingRadius } from "@/components/analysis/SpacingRadius";
import { ComponentList } from "@/components/analysis/ComponentList";
import { PrinciplesPanel } from "@/components/analysis/PrinciplesPanel";
import { DELIVERY_LABEL, INDUSTRY_LABEL } from "@/lib/types";
import {
  getAnalyses,
  getAnalysis,
  getConceptsForAnalysis,
  getDesignSpec,
} from "@/lib/content";
import { specToMarkdown } from "@/lib/design-md";
import { getAnalysisBody } from "@/content/bodies";

export function generateStaticParams() {
  return getAnalyses().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const analysis = getAnalysis(slug);
  if (!analysis) return { title: "분석을 찾을 수 없음" };
  return {
    title: `${analysis.title} — 컬렉션`,
    description: analysis.summary,
  };
}

/** 분석 페이지의 시각화 섹션 제목 — eyebrow + 큰 제목. */
function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-pill bg-pop" aria-hidden />
        <h2 className="eyebrow text-ink-faint">{eyebrow}</h2>
      </div>
      <h3 className="mt-2 text-[22px] font-bold tracking-tight text-ink">
        {title}
      </h3>
    </div>
  );
}

export default async function AnalysisPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const analysis = getAnalysis(slug);
  if (!analysis) notFound();

  const Body = getAnalysisBody(slug);
  const concepts = getConceptsForAnalysis(slug);
  const spec = getDesignSpec(slug);
  const designMd = spec ? specToMarkdown(spec) : null;

  return (
    <>
      <header className="border-b border-line">
        <div
          className="h-2 w-full"
          style={{ background: analysis.brandColor }}
          aria-hidden
        />
        <Container className="py-14">
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/collection"
              className="font-mono text-[12.5px] text-ink-mute hover:text-ink"
            >
              컬렉션
            </Link>
            <span className="text-ink-faint">/</span>
            <span className="rounded-pill bg-pop-soft px-2.5 py-0.5 text-[11.5px] font-semibold text-pop-ink">
              {INDUSTRY_LABEL[analysis.industry]}
            </span>
            <span className="rounded-pill border border-line px-2.5 py-0.5 text-[11.5px] text-ink-mute">
              {DELIVERY_LABEL[analysis.delivery]}
            </span>
          </div>
          <h1 className="mt-4 text-[clamp(30px,4.4vw,46px)] font-extrabold leading-tight tracking-[-0.03em] text-ink">
            {analysis.title}
          </h1>
          <p className="mt-2 text-[13px] text-ink-faint">{analysis.org}</p>
          <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-ink-mute">
            {analysis.summary}
          </p>
          <a
            href={analysis.url}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex rounded-pill border border-line-strong bg-surface px-4 py-2 text-[13px] font-medium text-ink transition-colors hover:border-ink"
          >
            원문 보기 ↗
          </a>
        </Container>
      </header>

      <Container className="py-14">
        {spec ? (
          <>
            <section>
              <SectionTitle eyebrow="Color" title="브랜드를 이루는 색" />
              <ColorPalette groups={spec.colors} />
            </section>

            <section className="mt-16">
              <SectionTitle eyebrow="Typography" title="글자의 위계" />
              <TypeScale
                font={spec.font}
                scale={spec.typeScale}
                note={spec.typographyNote}
              />
            </section>

            <section className="mt-16">
              <SectionTitle eyebrow="Spacing & Radius" title="간격과 형태" />
              <SpacingRadius
                spacing={spec.spacing}
                radii={spec.radii}
                elevationNote={spec.elevationNote}
              />
            </section>

            <section className="mt-16">
              <SectionTitle eyebrow="Components" title="컴포넌트" />
              <ComponentList components={spec.components} />
            </section>

            <section className="mt-16">
              <SectionTitle eyebrow="Principles" title="원칙과 AI 사용법" />
              <PrinciplesPanel
                principles={spec.principles}
                aiUsage={spec.aiUsage}
              />
            </section>
          </>
        ) : null}

        <div className="mt-16 grid gap-12 border-t border-line pt-14 lg:grid-cols-[1fr_320px]">
          <article className="reader max-w-reader">
            {Body ? (
              <Body />
            ) : (
              <p className="text-ink-mute">
                분석 본문이 아직 준비되지 않았습니다.
              </p>
            )}
          </article>

          <aside className="grid gap-7 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-xl border border-line bg-bg-soft/40 p-6">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-pill bg-accent" aria-hidden />
                <h2 className="eyebrow text-ink-faint">보여주는 개념</h2>
              </div>
              <ul className="mt-3 grid gap-1.5">
                {concepts.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/wiki/${c.slug}`}
                      className="group flex items-center gap-2 rounded-md -mx-2.5 px-2.5 py-2 transition-colors hover:bg-surface"
                    >
                      <span className="text-[14px] font-medium text-ink group-hover:text-accent-ink">
                        {c.title}
                      </span>
                      <span className="ml-auto font-mono text-[12px] text-ink-faint transition-transform group-hover:translate-x-0.5">
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        {spec && designMd ? (
          <section className="mt-16">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-pill bg-pop" aria-hidden />
              <h2 className="eyebrow text-ink-faint">산출물 · DESIGN.md</h2>
            </div>
            <h3 className="mt-2 text-[22px] font-bold tracking-tight text-ink">
              이 분석을 AI 코딩 에이전트에게 넘기기
            </h3>
            <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-ink-mute">
              아래 DESIGN.md를 다운로드해 프로젝트 루트에 두고 Claude Code·Cursor
              같은 에이전트에게 가리키면, 이 디자인 언어로 UI를 만듭니다.{" "}
              <Link href="/design-md" className="text-pop-ink hover:underline">
                DESIGN.md란?
              </Link>
            </p>
            <div className="mt-5">
              <DesignMdViewer
                filename={analysis.designMd}
                content={designMd}
              />
            </div>
          </section>
        ) : null}

        <div className="mt-12">
          <Link
            href="/collection"
            className="font-mono text-[13.5px] text-ink-mute hover:text-ink"
          >
            ← 전체 컬렉션
          </Link>
        </div>
      </Container>
    </>
  );
}
