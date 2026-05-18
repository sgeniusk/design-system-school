// 디자인 지식 그래프의 단일 진실 공급원.
// 모든 개념·분석 노드와 그 관계(relatedConcepts, demonstrates)를 등록한다.
import type { AnalysisNode, ConceptNode, GlobalReference } from "@/lib/types";

export const concepts: ConceptNode[] = [
  {
    type: "concept",
    slug: "design-system",
    title: "디자인 시스템이란",
    titleEn: "What is a Design System",
    category: "system",
    summary:
      "스타일 가이드도, 단순 UI 키트도 아니다. 원칙·토큰·컴포넌트·패턴·가이드라인이 쌓인 살아있는 계층 구조.",
    difficulty: "intro",
    readingMinutes: 6,
    relatedConcepts: ["design-tokens", "components", "patterns-guidelines"],
  },
  {
    type: "concept",
    slug: "design-tokens",
    title: "디자인 토큰",
    titleEn: "Design Tokens",
    category: "system",
    summary:
      "색·간격·반경 같은 디자인 결정을 이름 붙은 변수로 저장한 것. 디자인과 코드를 잇는 가장 작은 단위.",
    difficulty: "core",
    readingMinutes: 7,
    relatedConcepts: ["design-system", "color", "spacing"],
  },
  {
    type: "concept",
    slug: "color",
    title: "색채",
    titleEn: "Color",
    category: "color",
    summary:
      "브랜드 색, 의미를 가진 색(semantic), 명도 단계. 색은 장식이 아니라 정보의 위계를 만든다.",
    difficulty: "intro",
    readingMinutes: 7,
    relatedConcepts: ["design-tokens", "visual-hierarchy", "accessibility"],
  },
  {
    type: "concept",
    slug: "typography",
    title: "타이포그래피",
    titleEn: "Typography",
    category: "typography",
    summary:
      "타입 스케일, 위계, 한국어 본문의 가독성. 화면의 90%는 글자다.",
    difficulty: "intro",
    readingMinutes: 7,
    relatedConcepts: ["visual-hierarchy", "spacing", "design-tokens"],
  },
  {
    type: "concept",
    slug: "spacing",
    title: "여백과 간격",
    titleEn: "Spacing",
    category: "layout",
    summary:
      "8pt 같은 간격 스케일. 여백은 빈 공간이 아니라 요소를 묶고 가르는 도구다.",
    difficulty: "intro",
    readingMinutes: 6,
    relatedConcepts: ["layout-grid", "design-tokens", "visual-hierarchy"],
  },
  {
    type: "concept",
    slug: "layout-grid",
    title: "레이아웃과 그리드",
    titleEn: "Layout & Grid",
    category: "layout",
    summary:
      "그리드·정렬·반응형. 화면을 예측 가능한 골격 위에 올리는 법.",
    difficulty: "core",
    readingMinutes: 7,
    relatedConcepts: ["spacing", "visual-hierarchy", "components"],
  },
  {
    type: "concept",
    slug: "visual-hierarchy",
    title: "시각적 위계",
    titleEn: "Visual Hierarchy",
    category: "foundation",
    summary:
      "크기·색·여백·대비로 '먼저 볼 것'을 정하는 일. 모든 디자인 결정의 목적지.",
    difficulty: "intro",
    readingMinutes: 6,
    relatedConcepts: ["color", "typography", "spacing"],
  },
  {
    type: "concept",
    slug: "components",
    title: "컴포넌트",
    titleEn: "Components",
    category: "system",
    summary:
      "버튼·입력창처럼 재사용하는 UI 조각. 상태(state)와 변형(variant)으로 설계한다.",
    difficulty: "core",
    readingMinutes: 7,
    relatedConcepts: ["design-system", "patterns-guidelines", "layout-grid"],
  },
  {
    type: "concept",
    slug: "patterns-guidelines",
    title: "패턴과 가이드라인",
    titleEn: "Patterns & Guidelines",
    category: "system",
    summary:
      "컴포넌트를 언제·어떻게 조합하는지에 대한 합의. 시스템이 '판단'을 담는 층.",
    difficulty: "core",
    readingMinutes: 6,
    relatedConcepts: ["components", "design-system", "accessibility"],
  },
  {
    type: "concept",
    slug: "accessibility",
    title: "접근성",
    titleEn: "Accessibility",
    category: "accessibility",
    summary:
      "명도 대비, 키보드, 스크린리더, 터치 타깃. 모두가 쓸 수 있어야 좋은 디자인이다.",
    difficulty: "core",
    readingMinutes: 7,
    relatedConcepts: ["color", "patterns-guidelines", "visual-hierarchy"],
  },
];

export const analyses: AnalysisNode[] = [
  {
    type: "analysis",
    slug: "toss",
    title: "토스 — Apps in Toss",
    org: "비바리퍼블리카 (Toss)",
    industry: "fintech",
    delivery: "docs-site",
    summary:
      "토스 슈퍼앱 안에서 외부 개발자가 미니앱을 만들도록 제공하는 플랫폼 SDK형 디자인 시스템.",
    url: "https://developers-apps-in-toss.toss.im/design/components.html",
    demonstrates: ["design-system", "components", "spacing", "visual-hierarchy"],
    designMd: "toss.design.md",
    brandColor: "#3182F6",
    takeaway: "극단적 단순함은 기능이다 — 덜어내서 빠르게.",
  },
  {
    type: "analysis",
    slug: "krds",
    title: "KRDS — 디지털 정부 디자인 시스템",
    org: "행정안전부",
    industry: "public",
    delivery: "docs-site",
    summary:
      "대한민국 정부 공공서비스의 표준 디자인 시스템. 접근성과 거버넌스가 1급 요구사항.",
    url: "https://www.krds.go.kr/html/site/index.html",
    demonstrates: ["design-system", "accessibility", "patterns-guidelines", "color"],
    designMd: "krds.design.md",
    brandColor: "#256EF4",
    takeaway: "접근성을 먼저 두면 시스템 전체가 단단해진다.",
  },
  {
    type: "analysis",
    slug: "gmarket",
    title: "GDS — G마켓 디자인 시스템",
    org: "지마켓 (신세계/SSG)",
    industry: "ecommerce",
    delivery: "docs-site",
    summary:
      "대규모 이커머스의 상품 진열·전환·프로모션 UI를 표준화한 커머스형 디자인 시스템.",
    url: "https://gds.gmarket.co.kr/",
    demonstrates: ["design-system", "components", "color", "typography"],
    designMd: "gmarket.design.md",
    brandColor: "#329CFF",
    takeaway: "브랜드와 전환 목표가 시스템의 모든 결정에 새겨진다.",
  },
  {
    type: "analysis",
    slug: "wanted",
    title: "원티드 디자인 시스템",
    org: "원티드랩 (Wanted)",
    industry: "recruit",
    delivery: "figma",
    summary:
      "Figma Community 파일로 공개된 채용 플랫폼의 디자인 시스템. 디자인 툴이 곧 시스템.",
    url: "https://www.figma.com/community/file/wanted-design-system",
    demonstrates: ["design-system", "design-tokens", "components"],
    designMd: "wanted.design.md",
    brandColor: "#3366FF",
    takeaway: "Figma 파일 자체가 단일 진실 공급원이 될 수 있다.",
  },
];

/** 글로벌 보너스 — 위키·컬렉션에서 가벼운 참고로 노출. */
export const globalReferences: GlobalReference[] = [
  {
    name: "Material Design",
    org: "Google",
    url: "https://m3.material.io/",
    note: "토큰·컴포넌트·모션까지 가장 방대한 공개 시스템. 디자인 시스템의 사실상 교과서.",
  },
  {
    name: "Human Interface Guidelines",
    org: "Apple",
    url: "https://developer.apple.com/design/human-interface-guidelines",
    note: "컴포넌트 명세보다 '원칙과 판단'을 가르치는 가이드라인 중심 시스템.",
  },
  {
    name: "Polaris",
    org: "Shopify",
    url: "https://polaris.shopify.com/",
    note: "상거래 관리자 화면을 위한 시스템. 콘텐츠(글쓰기) 가이드가 강하다.",
  },
  {
    name: "Carbon",
    org: "IBM",
    url: "https://carbondesignsystem.com/",
    note: "오픈소스 엔터프라이즈 시스템. 디자인 토큰 구조의 모범 사례.",
  },
];
