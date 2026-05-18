import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Layout";
import { NodeLinks } from "@/components/NodeLinks";
import type { NodeLinkGroup } from "@/components/NodeLinks";
import { CATEGORY_LABEL, DIFFICULTY_LABEL } from "@/lib/types";
import {
  getAnalysesForConcept,
  getConcept,
  getConcepts,
  getPathsForConcept,
  getRelatedConcepts,
} from "@/lib/content";
import { getConceptBody } from "@/content/bodies";

export function generateStaticParams() {
  return getConcepts().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const concept = getConcept(slug);
  if (!concept) return { title: "개념을 찾을 수 없음" };
  return {
    title: `${concept.title} — 위키`,
    description: concept.summary,
  };
}

export default async function ConceptPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const concept = getConcept(slug);
  if (!concept) notFound();

  const Body = getConceptBody(slug);
  const related = getRelatedConcepts(slug);
  const analyses = getAnalysesForConcept(slug);
  const paths = getPathsForConcept(slug);

  const groups: NodeLinkGroup[] = [
    {
      label: "연관 개념",
      accent: "accent",
      items: related.map((c) => ({
        href: `/wiki/${c.slug}`,
        title: c.title,
      })),
    },
    {
      label: "이 개념을 보여주는 분석",
      accent: "pop",
      items: analyses.map((a) => ({
        href: `/collection/${a.slug}`,
        title: a.title,
        sub: a.org,
      })),
      emptyText: "아직 연결된 분석이 없습니다.",
    },
    {
      label: "이 개념이 속한 학습 경로",
      accent: "mint",
      items: paths.map((p) => ({
        href: `/learn/${p.slug}`,
        title: p.title,
      })),
      emptyText: "포함된 경로가 없습니다.",
    },
  ];

  return (
    <>
      <header className="border-b border-line dot-grid">
        <Container className="py-14">
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/wiki"
              className="font-mono text-[12.5px] text-ink-mute hover:text-ink"
            >
              위키
            </Link>
            <span className="text-ink-faint">/</span>
            <span className="rounded-pill bg-accent-soft px-2.5 py-0.5 text-[11.5px] font-semibold text-accent-ink">
              {CATEGORY_LABEL[concept.category]}
            </span>
          </div>
          <h1 className="mt-4 text-[clamp(30px,4.4vw,46px)] font-extrabold leading-tight tracking-[-0.03em] text-ink">
            {concept.title}
          </h1>
          <p className="mt-2 font-mono text-[13px] text-ink-faint">
            {concept.titleEn} · {DIFFICULTY_LABEL[concept.difficulty]} ·{" "}
            {concept.readingMinutes}분
          </p>
          <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-ink-mute">
            {concept.summary}
          </p>
        </Container>
      </header>

      <Container className="py-14">
        <div className="grid gap-12 lg:grid-cols-[1fr_280px]">
          <article className="reader max-w-reader">
            {Body ? (
              <Body />
            ) : (
              <p className="text-ink-mute">본문이 아직 준비되지 않았습니다.</p>
            )}
          </article>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-xl border border-line bg-bg-soft/40 p-6">
              <NodeLinks groups={groups} />
            </div>
          </aside>
        </div>
      </Container>
    </>
  );
}
