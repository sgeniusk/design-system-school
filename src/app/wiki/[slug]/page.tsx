import type { Metadata } from "next";
import type { ComponentType } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Layout";
import { NodeLinks } from "@/components/NodeLinks";
import type { NodeLinkGroup } from "@/components/NodeLinks";
import {
  CATEGORY_LABEL,
  DIFFICULTY_LABEL,
  PATTERN_CATEGORY_LABEL,
} from "@/lib/types";
import {
  getAnalysesForConcept,
  getAnalysesForPattern,
  getConcept,
  getConcepts,
  getConceptsForPattern,
  getPathsForConcept,
  getPathsForPattern,
  getPattern,
  getPatterns,
  getPatternsForConcept,
  getRelatedConcepts,
  getRelatedPatterns,
} from "@/lib/content";
import { getConceptBody, getPatternBody } from "@/content/bodies";

// 위키 라우트는 개념(concept)과 패턴(pattern) 노드를 한 네임스페이스에서 다룬다.
export function generateStaticParams() {
  return [
    ...getConcepts().map((c) => ({ slug: c.slug })),
    ...getPatterns().map((p) => ({ slug: p.slug })),
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const concept = getConcept(slug);
  if (concept) {
    return { title: `${concept.title} — 위키`, description: concept.summary };
  }
  const pattern = getPattern(slug);
  if (pattern) {
    return { title: `${pattern.title} — 위키 패턴`, description: pattern.summary };
  }
  return { title: "노드를 찾을 수 없음" };
}

export default async function WikiNodePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const concept = getConcept(slug);
  if (concept) return <ConceptView slug={slug} />;
  const pattern = getPattern(slug);
  if (pattern) return <PatternView slug={slug} />;
  notFound();
}

/** 개념 노드 상세 — 액센트는 indigo. */
function ConceptView({ slug }: { slug: string }) {
  const concept = getConcept(slug);
  if (!concept) notFound();

  const Body = getConceptBody(slug);
  const related = getRelatedConcepts(slug);
  const patterns = getPatternsForConcept(slug);
  const analyses = getAnalysesForConcept(slug);
  const paths = getPathsForConcept(slug);

  const groups: NodeLinkGroup[] = [
    {
      label: "연관 개념",
      accent: "accent",
      items: related.map((c) => ({ href: `/wiki/${c.slug}`, title: c.title })),
    },
    {
      label: "이 개념을 쓰는 패턴",
      accent: "gold",
      items: patterns.map((p) => ({
        href: `/wiki/${p.slug}`,
        title: p.title,
        sub: PATTERN_CATEGORY_LABEL[p.category],
      })),
      emptyText: "아직 연결된 패턴이 없습니다.",
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
      items: paths.map((p) => ({ href: `/learn/${p.slug}`, title: p.title })),
      emptyText: "포함된 경로가 없습니다.",
    },
  ];

  return (
    <NodeShell
      kind="개념"
      badge={CATEGORY_LABEL[concept.category]}
      badgeClass="bg-accent-soft text-accent-ink"
      title={concept.title}
      meta={`${concept.titleEn} · ${DIFFICULTY_LABEL[concept.difficulty]} · ${concept.readingMinutes}분`}
      summary={concept.summary}
      groups={groups}
      Body={Body}
    />
  );
}

/** 패턴 노드 상세 — 액센트는 amber(gold). */
function PatternView({ slug }: { slug: string }) {
  const pattern = getPattern(slug);
  if (!pattern) notFound();

  const Body = getPatternBody(slug);
  const concepts = getConceptsForPattern(slug);
  const relatedPatterns = getRelatedPatterns(slug);
  const analyses = getAnalysesForPattern(slug);
  const paths = getPathsForPattern(slug);

  const groups: NodeLinkGroup[] = [
    {
      label: "이 패턴이 기대는 개념",
      accent: "accent",
      items: concepts.map((c) => ({
        href: `/wiki/${c.slug}`,
        title: c.title,
        sub: CATEGORY_LABEL[c.category],
      })),
      emptyText: "연결된 개념이 없습니다.",
    },
    {
      label: "연관 패턴",
      accent: "gold",
      items: relatedPatterns.map((p) => ({
        href: `/wiki/${p.slug}`,
        title: p.title,
        sub: PATTERN_CATEGORY_LABEL[p.category],
      })),
      emptyText: "연결된 패턴이 없습니다.",
    },
    {
      label: "이 패턴을 보여주는 분석",
      accent: "pop",
      items: analyses.map((a) => ({
        href: `/collection/${a.slug}`,
        title: a.title,
        sub: a.org,
      })),
      emptyText: "아직 연결된 분석이 없습니다.",
    },
    {
      label: "이 패턴이 포함된 학습 경로",
      accent: "mint",
      items: paths.map((p) => ({ href: `/learn/${p.slug}`, title: p.title })),
      emptyText: "포함된 경로가 없습니다.",
    },
  ];

  return (
    <NodeShell
      kind="패턴"
      badge={PATTERN_CATEGORY_LABEL[pattern.category]}
      badgeClass="bg-gold-soft text-gold-ink"
      title={pattern.title}
      meta={`${pattern.titleEn} · ${DIFFICULTY_LABEL[pattern.difficulty]} · ${pattern.readingMinutes}분`}
      summary={pattern.summary}
      problem={pattern.problem}
      groups={groups}
      Body={Body}
    />
  );
}

/** 위키 노드 상세의 공통 셸 — 헤더 + 본문 + 상호 링크 사이드바. */
function NodeShell({
  kind,
  badge,
  badgeClass,
  title,
  meta,
  summary,
  problem,
  groups,
  Body,
}: {
  kind: string;
  badge: string;
  badgeClass: string;
  title: string;
  meta: string;
  summary: string;
  problem?: string;
  groups: NodeLinkGroup[];
  Body: ComponentType | undefined;
}) {
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
            <span className="font-mono text-[12.5px] text-ink-faint">
              {kind}
            </span>
            <span className="text-ink-faint">/</span>
            <span
              className={`rounded-pill px-2.5 py-0.5 text-[11.5px] font-semibold ${badgeClass}`}
            >
              {badge}
            </span>
          </div>
          <h1 className="mt-4 text-[clamp(30px,4.4vw,46px)] font-extrabold leading-tight tracking-[-0.03em] text-ink">
            {title}
          </h1>
          <p className="mt-2 font-mono text-[13px] text-ink-faint">{meta}</p>
          <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-ink-mute">
            {summary}
          </p>
        </Container>
      </header>

      <Container className="py-14">
        {problem ? (
          <div className="mb-10 rounded-xl border border-gold/30 bg-gold-soft/50 px-6 py-5">
            <p className="eyebrow text-gold-ink">이 패턴이 푸는 문제</p>
            <p className="mt-1.5 text-[15.5px] font-medium leading-relaxed text-ink">
              {problem}
            </p>
          </div>
        ) : null}
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
