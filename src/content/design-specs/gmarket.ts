// G마켓(GDS) 디자인 분석 스펙 — analysis 노드 gmarket의 시각화·DESIGN.md 정본.
import type { AnalysisDesignSpec } from "@/lib/types";

export const gmarketSpec = {
  slug: "gmarket",
  name: "Gmarket (GDS)",
  summary:
    "대규모 이커머스 디자인 시스템. 브랜드 정체성·사용성·일관성, 그리고 전환.",
  disclaimer:
    "공개 화면 관찰·분석에 기반한 학습용 근사치다. GDS의 공식 스펙이 아니다.",
  principles: [
    "**브랜드 일관성.** 매일 바뀌는 상품·기획전을 그래도 G마켓처럼 묶는다.",
    "**정보 밀도를 견디는 설계.** 가격·할인·별점·배송이 한 카드에 공존한다.",
    "**전환 중심.** 핵심 행동(구매·장바구니)이 시각적으로 가장 강하다.",
  ],
  colors: [
    {
      label: "Brand",
      swatches: [
        {
          token: "primary",
          hex: "#329CFF",
          note: "핵심 행동·링크·강조",
          on: "#ffffff",
        },
        {
          token: "primary-strong",
          hex: "#1F7FE0",
          note: "hover·active",
          on: "#ffffff",
        },
      ],
    },
    {
      label: "Neutral",
      swatches: [
        {
          token: "text-strong",
          hex: "#222222",
          note: "제목·로고",
          on: "#ffffff",
        },
        { token: "text", hex: "#616161", note: "본문", on: "#ffffff" },
        { token: "text-mute", hex: "#757575", note: "보조", on: "#ffffff" },
        {
          token: "text-faint",
          hex: "#9E9E9E",
          note: "비활성·placeholder",
          on: "#16171D",
        },
        { token: "border", hex: "#E0E0E0", note: "", on: "#16171D" },
        { token: "surface-soft", hex: "#F5F5F5", note: "", on: "#16171D" },
        { token: "background", hex: "#FFFFFF", note: "", on: "#16171D" },
      ],
    },
    {
      label: "Semantic",
      swatches: [
        {
          token: "sale",
          hex: "#FA2828",
          note: "할인율·세일 (커머스 특화)",
          on: "#ffffff",
        },
        { token: "success", hex: "#2BA84A", note: "", on: "#ffffff" },
        { token: "warning", hex: "#FF8A00", note: "", on: "#16171D" },
      ],
    },
  ],
  font: "Gmarket Sans (브랜드 전용 폰트, 공개 배포) + 시스템 폰트 폴백",
  typeScale: [
    {
      label: "display",
      size: "28–40px",
      weight: "700",
      sampleSizePx: 40,
      note: "프로모션 배너의 강한 목소리",
    },
    { label: "heading", size: "18–22px", weight: "500–700", sampleSizePx: 22 },
    { label: "body", size: "14–16px", weight: "400", sampleSizePx: 16 },
    {
      label: "price",
      size: "16–20px",
      weight: "700",
      sampleSizePx: 20,
      note: "가격은 따로 강조",
    },
  ],
  spacing: {
    base: "4/8",
    scale: [4, 8, 12, 16, 20, 24, 32],
    note: "상품 카드 그리드 간격 8–16px (밀도 높음)",
  },
  radii: [
    { name: "radius-card", px: 10 },
    { name: "radius-button", px: 7 },
  ],
  elevationNote: "카드 그림자 얕게, 호버 시 살짝 들어 올림.",
  components: {
    items: [
      "Accordion",
      "Badge",
      "Banner",
      "Button",
      "Chip",
      "Dialog",
      "Dropdown",
      "Heading",
      "Info box",
      "Item card",
      "Label",
      "List",
      "Navigation",
      "Popover",
      "Selection control",
      "Sheet",
      "Slide",
      "Tab",
      "Text field",
      "Thumbnail",
    ],
    note: "22개 카테고리 중 주요 항목. 정보 밀도가 높은 커머스 UI 전반을 덮는다.",
  },
  aiUsage:
    "이 시스템을 흉내 낼 때: 정보 밀도를 두려워하지 말 것 — 단, 가격과 행동 버튼은 위계 최상단에. 세일/할인 색을 따로 둘 것. 강조 파랑은 전환 지점에 집중. Gmarket Sans 굵은 무게로 배너 헤드라인을 만든다.",
} satisfies AnalysisDesignSpec;
