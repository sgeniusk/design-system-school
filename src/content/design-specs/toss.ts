// 토스 디자인 분석 스펙 — analysis 노드 toss의 시각화·DESIGN.md 정본.
import type { AnalysisDesignSpec } from "@/lib/types";

export const tossSpec = {
  slug: "toss",
  name: "Toss",
  summary:
    "핀테크 슈퍼앱. 인지 부하를 최소화하는 극단적 단순함의 디자인 언어.",
  disclaimer:
    "공개 화면 관찰·분석에 기반한 학습용 근사치다. 토스의 공식 스펙이 아니다.",
  principles: [
    "**명료함 > 화려함.** 한 화면은 하나의 일만 시킨다.",
    "**덜어내기.** 컴포넌트, 색, 텍스트 — 의심스러우면 뺀다.",
    "**신뢰는 차분함에서 온다.** 금융 앱은 흥분시키지 않는다.",
    "한 화면의 주행동은 화면 하단 고정 CTA(BottomCTA) 하나로 모은다.",
  ],
  colors: [
    {
      label: "Brand",
      swatches: [
        {
          token: "toss-blue",
          hex: "#3182F6",
          note: "핵심 행동·링크·선택 상태에만 사용",
          on: "#ffffff",
        },
      ],
    },
    {
      label: "Neutral",
      swatches: [
        { token: "grey-900", hex: "#191F28", note: "제목 텍스트", on: "#ffffff" },
        { token: "grey-800", hex: "#333D4B", note: "", on: "#ffffff" },
        { token: "grey-700", hex: "#4E5968", note: "본문 텍스트", on: "#ffffff" },
        { token: "grey-600", hex: "#6B7684", note: "보조 텍스트", on: "#ffffff" },
        { token: "grey-500", hex: "#8B95A1", note: "placeholder", on: "#16171D" },
        { token: "grey-400", hex: "#B0B8C1", note: "", on: "#16171D" },
        { token: "grey-300", hex: "#D1D6DB", note: "테두리", on: "#16171D" },
        { token: "grey-200", hex: "#E5E8EB", note: "구분선", on: "#16171D" },
        { token: "grey-100", hex: "#F2F4F6", note: "보조 배경", on: "#16171D" },
        { token: "background", hex: "#FFFFFF", note: "", on: "#16171D" },
      ],
    },
    {
      label: "Semantic",
      swatches: [
        { token: "danger", hex: "#F04452", note: "오류·위험 동작", on: "#ffffff" },
        { token: "success", hex: "#00C471", note: "완료·성공", on: "#ffffff" },
      ],
    },
  ],
  font: "Pretendard 계열 한국어 산세리프",
  typeScale: [
    {
      label: "display",
      size: "24–28px",
      weight: "700",
      sampleSizePx: 28,
      note: "화면 제목",
    },
    { label: "heading", size: "19–20px", weight: "700", sampleSizePx: 20 },
    {
      label: "body",
      size: "15–17px",
      weight: "400–500",
      sampleSizePx: 16,
      note: "본문",
    },
    {
      label: "caption",
      size: "13px",
      weight: "400",
      sampleSizePx: 13,
      note: "보조",
    },
  ],
  typographyNote: "line-height 1.5 이상, word-break: keep-all",
  spacing: {
    base: "8pt",
    scale: [4, 8, 12, 16, 24, 32, 40],
    note: "화면 좌우 기본 여백 24px. 요소 사이를 넉넉히 — 한 화면에 욱여넣지 않는다.",
  },
  radii: [
    { name: "radius-card", px: 18 },
    { name: "radius-button", px: 14 },
  ],
  elevationNote: "그림자는 절제. 카드는 얕은 그림자 또는 1px 테두리.",
  components: {
    items: [
      "Badge",
      "Border",
      "BottomCTA",
      "Button",
      "Asset",
      "ListRow",
      "ListHeader",
      "Navigation",
      "Paragraph",
      "Tab",
      "Top",
    ],
    note: "버튼·행(ListRow)은 터치 타깃이 크다 (높이 48–56px). 컴포넌트 수를 의도적으로 적게 유지한다.",
  },
  aiUsage:
    "이 시스템을 흉내 낼 때: 색은 거의 회색조로 두고 toss-blue는 화면당 한두 번만. 여백을 아끼지 말 것. 버튼을 크게. 화면마다 명확한 주행동 하나를 하단에 고정.",
} satisfies AnalysisDesignSpec;
