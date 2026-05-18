// 디자인 지식 그래프(온톨로지)의 노드·경로 스키마.

export type NodeType = "concept" | "analysis";

export type ConceptCategory =
  | "foundation"
  | "color"
  | "typography"
  | "layout"
  | "system"
  | "accessibility";

export type Industry =
  | "fintech"
  | "public"
  | "ecommerce"
  | "recruit"
  | "global";

export type Delivery = "docs-site" | "figma" | "code-package";

export type Difficulty = "intro" | "core" | "advanced";

/** 개념 노드 — 디자인 기초·UI/UX 위키 항목. */
export interface ConceptNode {
  type: "concept";
  slug: string;
  title: string;
  titleEn: string;
  category: ConceptCategory;
  summary: string;
  difficulty: Difficulty;
  readingMinutes: number;
  /** 연관 개념 슬러그 — 위키 상호 링크의 원천. */
  relatedConcepts: string[];
}

/** 분석 노드 — 성공한 디자인을 해부한 사례. */
export interface AnalysisNode {
  type: "analysis";
  slug: string;
  title: string;
  org: string;
  industry: Industry;
  delivery: Delivery;
  summary: string;
  /** 원문 URL. */
  url: string;
  /** 이 분석이 보여주는 개념 슬러그 — 분석→개념 엣지. */
  demonstrates: string[];
  /** content/design-md 안의 파일명. */
  designMd: string;
  /** 대표 브랜드 색 (카드 액센트). */
  brandColor: string;
  /** 한 줄 요약 태그라인. */
  takeaway: string;
}

export type GraphNode = ConceptNode | AnalysisNode;

/** 학습 경로 — 개념 노드를 큐레이션한 순서. */
export interface LearnPath {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  level: "intro" | "core";
  /** 순서가 있는 개념 슬러그 목록. */
  conceptSlugs: string[];
}

/** 글로벌 보너스 사례 — 가벼운 참고 카드. */
export interface GlobalReference {
  name: string;
  org: string;
  url: string;
  note: string;
}

export const INDUSTRY_LABEL: Record<Industry, string> = {
  fintech: "핀테크",
  public: "공공",
  ecommerce: "이커머스",
  recruit: "채용",
  global: "글로벌",
};

export const DELIVERY_LABEL: Record<Delivery, string> = {
  "docs-site": "문서 사이트",
  figma: "Figma 라이브러리",
  "code-package": "코드 패키지",
};

export const CATEGORY_LABEL: Record<ConceptCategory, string> = {
  foundation: "기초 원리",
  color: "색채",
  typography: "타이포그래피",
  layout: "레이아웃",
  system: "시스템",
  accessibility: "접근성",
};

export const DIFFICULTY_LABEL: Record<Difficulty, string> = {
  intro: "입문",
  core: "핵심",
  advanced: "심화",
};
