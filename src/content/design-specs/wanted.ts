// 원티드 디자인 분석 스펙 — analysis 노드 wanted의 시각화·DESIGN.md 정본.
import type { AnalysisDesignSpec } from "@/lib/types";

export const wantedSpec = {
  slug: "wanted",
  name: "Wanted",
  summary:
    "채용·커리어 매칭 플랫폼. Figma Community로 공개된 Figma 네이티브 디자인 시스템.",
  disclaimer:
    "공개 화면·Figma 파일 관찰·분석에 기반한 학습용 근사치다. 원티드의 공식 스펙이 아니다.",
  principles: [
    "**디자이너의 도구 안에 시스템이 산다.** Figma 파일 자체가 단일 진실 공급원.",
    "**신뢰와 전문성.** 커리어 결정을 돕는 제품의 톤.",
    "**변수 기반.** 색·간격이 Figma 변수로 묶여 테마 전환·일괄 수정이 쉽다.",
  ],
  colors: [
    {
      label: "Brand",
      swatches: [
        {
          token: "primary",
          hex: "#3366FF",
          note: "핵심 행동·링크·선택",
          on: "#ffffff",
        },
        {
          token: "primary-strong",
          hex: "#2348C8",
          note: "hover·active",
          on: "#ffffff",
        },
        {
          token: "primary-soft",
          hex: "#EAF0FF",
          note: "강조 배경",
          on: "#16171D",
        },
      ],
    },
    {
      label: "Neutral",
      swatches: [
        { token: "text-strong", hex: "#1B1D28", note: "제목", on: "#ffffff" },
        { token: "text", hex: "#3F4250", note: "본문", on: "#ffffff" },
        { token: "text-mute", hex: "#767A88", note: "보조", on: "#ffffff" },
        { token: "border", hex: "#E2E4EA", note: "", on: "#16171D" },
        { token: "surface-soft", hex: "#F5F6F8", note: "", on: "#16171D" },
        { token: "background", hex: "#FFFFFF", note: "", on: "#16171D" },
      ],
    },
    {
      label: "Semantic",
      swatches: [
        { token: "danger", hex: "#EF4452", note: "", on: "#ffffff" },
        { token: "success", hex: "#14B26B", note: "", on: "#ffffff" },
        { token: "warning", hex: "#F5A623", note: "", on: "#16171D" },
      ],
    },
  ],
  font: "깔끔한 한국어 산세리프 (Pretendard 계열)",
  typeScale: [
    { label: "display", size: "24–32px", weight: "700", sampleSizePx: 30 },
    { label: "heading", size: "18–20px", weight: "600–700", sampleSizePx: 20 },
    { label: "body", size: "15–16px", weight: "400", sampleSizePx: 16 },
    { label: "caption", size: "13px", weight: "400", sampleSizePx: 13 },
  ],
  spacing: {
    base: "4/8",
    scale: [4, 8, 12, 16, 24, 32, 40],
    note: "Figma의 Auto Layout 간격과 토큰을 맞춘다",
  },
  radii: [
    { name: "radius-card", px: 12 },
    { name: "radius-button", px: 8 },
    { name: "radius-pill", px: 999, note: "태그·필터 칩" },
  ],
  elevationNote: "그림자 토큰 — elevation-1 / elevation-2.",
  components: {
    items: [
      "공고 카드",
      "회사 카드",
      "프로필",
      "리스트",
      "폼",
      "태그/칩",
      "버튼",
      "입력 필드",
    ],
    note: "채용 도메인 중심. Figma 컴포넌트의 variant/state로 정리.",
  },
  aiUsage:
    "이 시스템의 원천은 웹 문서가 아니라 Figma 파일이다. 코드로 옮길 때는 Figma 변수 → 코드 토큰 동기화 파이프라인이 필요하다. 흉내 낼 때: 색·간격을 하드코딩하지 말고 토큰 변수로. primary는 전문적인 파랑 하나로 절제. 카드 radius 12px, 칩은 pill. 채용 도메인의 카드형 레이아웃을 기본 뼈대로.",
} satisfies AnalysisDesignSpec;
