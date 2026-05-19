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

// ── 디자인 분석 스펙 — analysis 노드의 구조화된 디자인 데이터(시각화 정본) ──

/** 색 한 칸 — 토큰명·HEX·용도·칩 위 텍스트 대비색. */
export interface ColorSwatch {
  token: string;
  hex: string;
  note: string;
  /** 칩 위 텍스트 대비색 — "#ffffff" 또는 "#16171D". */
  on: string;
}

/** 색 그룹 — 브랜드·중립·의미. */
export interface ColorGroup {
  label: "Brand" | "Neutral" | "Semantic";
  swatches: ColorSwatch[];
}

/** 타입 스케일 한 단계. size·weight는 범위 표기가 가능해 string. */
export interface TypeStep {
  label: string;
  size: string;
  weight: string;
  /** 라이브 샘플 렌더용 대표 px 값. */
  sampleSizePx: number;
  note?: string;
}

/** 간격 스케일 — 베이스 단위와 단계 배열. */
export interface SpacingSpec {
  base: string;
  scale: number[];
  note?: string;
}

/** 반경 한 단계. */
export interface RadiusStep {
  name: string;
  px: number;
  note?: string;
}

/** 컴포넌트 명세 — 이름 목록과 설명. */
export interface ComponentSpec {
  items: string[];
  note: string;
}

/** 분석 디자인 스펙 — design-md 헤딩 구조에 1:1 대응. design-md 마크다운의 정본. */
export interface AnalysisDesignSpec {
  /** AnalysisNode.slug와 일치. */
  slug: string;
  /** DESIGN.md 제목용 표시명 — 예: "Toss", "Gmarket (GDS)". */
  name: string;
  /** design-md 상단 blockquote 1줄 설명. */
  summary: string;
  /** "공개 화면 관찰 기반 학습용 근사치" 면책 문구. */
  disclaimer: string;
  /** Identity & Principles. */
  principles: string[];
  /** Color — Brand/Neutral/Semantic 그룹. */
  colors: ColorGroup[];
  font: string;
  typeScale: TypeStep[];
  /** line-height·word-break 등 부가 타이포 규칙. */
  typographyNote?: string;
  spacing: SpacingSpec;
  radii: RadiusStep[];
  elevationNote?: string;
  components: ComponentSpec;
  /** Usage for AI agents. */
  aiUsage: string;
}
