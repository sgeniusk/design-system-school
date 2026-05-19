// 온톨로지 노드 조회·역참조·경로 헬퍼.
import { analyses, concepts, globalReferences } from "@/content/ontology";
import { paths } from "@/content/paths";
import { designSpecs } from "@/content/design-specs";
import type {
  AnalysisDesignSpec,
  AnalysisNode,
  ConceptNode,
  LearnPath,
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

/** 한 분석이 보여주는 개념 노드들. */
export function getConceptsForAnalysis(slug: string): ConceptNode[] {
  const analysis = getAnalysis(slug);
  if (!analysis) return [];
  return analysis.demonstrates
    .map((s) => getConcept(s))
    .filter((c): c is ConceptNode => Boolean(c));
}

/** 한 개념이 포함된 학습 경로들. */
export function getPathsForConcept(slug: string): LearnPath[] {
  return paths.filter((p) => p.conceptSlugs.includes(slug));
}

/** 경로 안에서 개념 노드를 순서대로. */
export function getPathConcepts(pathSlug: string): ConceptNode[] {
  const p = getPath(pathSlug);
  if (!p) return [];
  return p.conceptSlugs
    .map((s) => getConcept(s))
    .filter((c): c is ConceptNode => Boolean(c));
}

/** 한 분석의 디자인 스펙 — 시각화·DESIGN.md 생성의 정본. */
export function getDesignSpec(slug: string): AnalysisDesignSpec | undefined {
  return designSpecs[slug];
}

/** 온톨로지 전체 통계. */
export function getOntologyStats() {
  const edges =
    concepts.reduce((sum, c) => sum + c.relatedConcepts.length, 0) +
    analyses.reduce((sum, a) => sum + a.demonstrates.length, 0);
  return {
    concepts: concepts.length,
    analyses: analyses.length,
    paths: paths.length,
    edges,
  };
}
