// 온톨로지 노드 조회·역참조·경로 헬퍼.
import { analyses, concepts, globalReferences, patterns } from "@/content/ontology";
import { paths } from "@/content/paths";
import { designSpecs } from "@/content/design-specs";
import type {
  AnalysisDesignSpec,
  AnalysisNode,
  ConceptNode,
  LearnPath,
  PatternNode,
} from "@/lib/types";

export function getConcepts(): ConceptNode[] {
  return concepts;
}

export function getConcept(slug: string): ConceptNode | undefined {
  return concepts.find((c) => c.slug === slug);
}

export function getAnalyses(): AnalysisNode[] {
  return analyses;
}

export function getAnalysis(slug: string): AnalysisNode | undefined {
  return analyses.find((a) => a.slug === slug);
}

export function getPatterns(): PatternNode[] {
  return patterns;
}

export function getPattern(slug: string): PatternNode | undefined {
  return patterns.find((p) => p.slug === slug);
}

export function getPaths(): LearnPath[] {
  return paths;
}

export function getPath(slug: string): LearnPath | undefined {
  return paths.find((p) => p.slug === slug);
}

export function getGlobalReferences() {
  return globalReferences;
}

/** 한 개념의 연관 개념 노드들. */
export function getRelatedConcepts(slug: string): ConceptNode[] {
  const concept = getConcept(slug);
  if (!concept) return [];
  return concept.relatedConcepts
    .map((s) => getConcept(s))
    .filter((c): c is ConceptNode => Boolean(c));
}

/** 이 개념을 보여주는 분석 노드들 (analysis.demonstrates의 역참조). */
export function getAnalysesForConcept(slug: string): AnalysisNode[] {
  return analyses.filter((a) => a.demonstrates.includes(slug));
}

/** 한 패턴이 기대는 개념 노드들. */
export function getConceptsForPattern(slug: string): ConceptNode[] {
  const pattern = getPattern(slug);
  if (!pattern) return [];
  return pattern.relatedConcepts
    .map((s) => getConcept(s))
    .filter((c): c is ConceptNode => Boolean(c));
}

/** 한 패턴의 연관 패턴 노드들. */
export function getRelatedPatterns(slug: string): PatternNode[] {
  const pattern = getPattern(slug);
  if (!pattern) return [];
  // 무방향: 내가 가리킨 패턴 + 나를 가리킨 패턴 모두 모아 중복 제거.
  const slugs = new Set(pattern.relatedPatterns);
  for (const p of patterns) {
    if (p.relatedPatterns.includes(slug)) slugs.add(p.slug);
  }
  slugs.delete(slug);
  return [...slugs]
    .map((s) => getPattern(s))
    .filter((p): p is PatternNode => Boolean(p));
}

/** 이 개념을 쓰는 패턴 노드들 (pattern.relatedConcepts의 역참조). */
export function getPatternsForConcept(slug: string): PatternNode[] {
  return patterns.filter((p) => p.relatedConcepts.includes(slug));
}

/** 한 분석이 보여주는 개념 노드들. */
export function getConceptsForAnalysis(slug: string): ConceptNode[] {
  const analysis = getAnalysis(slug);
  if (!analysis) return [];
  return analysis.demonstrates
    .map((s) => getConcept(s))
    .filter((c): c is ConceptNode => Boolean(c));
}

/** 한 분석이 보여주는 패턴 노드들. */
export function getPatternsForAnalysis(slug: string): PatternNode[] {
  const analysis = getAnalysis(slug);
  if (!analysis?.demonstratesPatterns) return [];
  return analysis.demonstratesPatterns
    .map((s) => getPattern(s))
    .filter((p): p is PatternNode => Boolean(p));
}

/** 이 패턴을 보여주는 분석 노드들 (analysis.demonstratesPatterns의 역참조). */
export function getAnalysesForPattern(slug: string): AnalysisNode[] {
  return analyses.filter((a) => a.demonstratesPatterns?.includes(slug) ?? false);
}

/** 학습 단계 — UI에서 노드 정보와 함께 다루기 좋은 형태로 펼친 값. */
export type LearnPathStepNode =
  | { type: "concept"; node: ConceptNode }
  | { type: "pattern"; node: PatternNode };

/** 한 개념이 포함된 학습 경로들. */
export function getPathsForConcept(slug: string): LearnPath[] {
  return paths.filter((p) =>
    p.steps.some((s) => s.type === "concept" && s.slug === slug),
  );
}

/** 한 패턴이 포함된 학습 경로들. */
export function getPathsForPattern(slug: string): LearnPath[] {
  return paths.filter((p) =>
    p.steps.some((s) => s.type === "pattern" && s.slug === slug),
  );
}

/** 경로 안의 단계를 순서대로 — concept·pattern 노드를 함께. */
export function getPathSteps(pathSlug: string): LearnPathStepNode[] {
  const p = getPath(pathSlug);
  if (!p) return [];
  const out: LearnPathStepNode[] = [];
  for (const step of p.steps) {
    if (step.type === "concept") {
      const node = getConcept(step.slug);
      if (node) out.push({ type: "concept", node });
    } else {
      const node = getPattern(step.slug);
      if (node) out.push({ type: "pattern", node });
    }
  }
  return out;
}

/** 한 분석의 디자인 스펙 — 시각화·DESIGN.md 생성의 정본. */
export function getDesignSpec(slug: string): AnalysisDesignSpec | undefined {
  return designSpecs[slug];
}

/** 온톨로지 전체 통계. edges는 방향성 관계의 합 — 정확한 고유 엣지 수는 graph.ts의 getGraphStats. */
export function getOntologyStats() {
  const edges =
    concepts.reduce((sum, c) => sum + c.relatedConcepts.length, 0) +
    analyses.reduce(
      (sum, a) =>
        sum + a.demonstrates.length + (a.demonstratesPatterns?.length ?? 0),
      0,
    ) +
    patterns.reduce(
      (sum, p) => sum + p.relatedConcepts.length + p.relatedPatterns.length,
      0,
    ) +
    paths.reduce((sum, p) => sum + p.steps.length, 0);
  return {
    concepts: concepts.length,
    analyses: analyses.length,
    patterns: patterns.length,
    paths: paths.length,
    edges,
  };
}
