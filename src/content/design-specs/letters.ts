// Letters 디자인 분석 스펙 — analysis 노드 letters의 시각화·DESIGN.md 정본.
import type { AnalysisDesignSpec } from "@/lib/types";

export const lettersSpec = {
  slug: "letters",
  name: "Letters",
  summary:
    "의료진의 행정 문서 부담을 AI로 줄여주는 제품 'Letters'의 마케팅 사이트. Framer로 만든 단일 브랜드 블루 기반 디자인.",
  disclaimer:
    "공개 화면 관찰·분석에 기반한 학습용 근사치다. Letters의 공식 디자인 스펙이 아니다.",
  principles: [
    "**제품의 약속이 톤을 정한다.** 'Patients, not Paperwork' — 의료진을 안심시키는 부드럽고 신뢰감 있는 인상.",
    "**Framer가 곧 퍼블리싱 도구.** 코드가 아니라 디자인 툴 안에서 사이트를 만들고 바로 배포한다.",
    "**절제된 한 가지 색.** 의미색 팔레트 없이 브랜드 블루 하나로 강조·링크·CTA를 모두 처리한다.",
    "**넓은 라운딩과 파랑 틴트 그림자.** 중립 검정 그림자 대신 브랜드 블루로 물들인 다층 그림자로 따뜻한 깊이감.",
  ],
  colors: [
    {
      label: "Brand",
      swatches: [
        {
          token: "primary",
          hex: "#2597D0",
          note: "핵심 행동·링크·강조",
          on: "#ffffff",
        },
        {
          token: "primary-deep",
          hex: "#1F7EAD",
          note: "hover·pressed",
          on: "#ffffff",
        },
        {
          token: "accent-bright",
          hex: "#0099FF",
          note: "보조 강조·하이라이트",
          on: "#ffffff",
        },
        {
          token: "primary-soft",
          hex: "#C0EAFF",
          note: "강조 배경·틴트",
          on: "#16171D",
        },
      ],
    },
    {
      label: "Neutral",
      swatches: [
        { token: "text-strong", hex: "#000000", note: "제목", on: "#ffffff" },
        { token: "text", hex: "#151515", note: "본문", on: "#ffffff" },
        { token: "text-mute", hex: "#60606C", note: "보조 본문", on: "#ffffff" },
        { token: "text-subtle", hex: "#8B8B8B", note: "캡션", on: "#16171D" },
        { token: "placeholder", hex: "#93939F", note: "플레이스홀더·비활성", on: "#16171D" },
        { token: "surface-soft", hex: "#F5F5F5", note: "옅은 면", on: "#16171D" },
        { token: "background", hex: "#FFFFFF", note: "기본 배경", on: "#16171D" },
      ],
    },
  ],
  font: "Open Runde (Inter 보조 · 'The Doctor' 손글씨 액센트)",
  typeScale: [
    { label: "display", size: "44px", weight: "600", sampleSizePx: 44, note: "히어로" },
    { label: "title", size: "28px", weight: "500", sampleSizePx: 28 },
    { label: "heading", size: "20px", weight: "600", sampleSizePx: 20 },
    { label: "subhead", size: "18px", weight: "400", sampleSizePx: 18 },
    { label: "body", size: "16px", weight: "400", sampleSizePx: 16 },
    { label: "caption", size: "14px", weight: "400", sampleSizePx: 14 },
    { label: "fine", size: "12px", weight: "400", sampleSizePx: 12 },
  ],
  typographyNote:
    "음수 자간(tracking)을 일관되게 적용 — 디스플레이는 -1.76px까지 좁힌다. line-height는 본문 약 1.4, 디스플레이 약 1.1.",
  spacing: {
    base: "8pt",
    scale: [4, 8, 12, 16, 20, 24, 32, 40],
    note: "Framer Stack 간격에서 추출 — 4·8 혼용 베이스에 큰 단계는 40으로.",
  },
  radii: [
    { name: "radius-sm", px: 16, note: "버튼·작은 카드" },
    { name: "radius-card", px: 18 },
    { name: "radius-panel", px: 48, note: "히어로·대형 패널" },
    { name: "radius-pill", px: 100, note: "칩·태그·아바타" },
  ],
  elevationNote:
    "그림자가 중립 검정이 아니라 브랜드 블루(rgba(22,106,196,…))로 물들어 있다. 0.4px / 1.6px / 7px 3단 레이어로 부드러운 깊이.",
  components: {
    items: [
      "내비게이션 바",
      "히어로 섹션",
      "기능 소개 섹션",
      "가격 카드",
      "CTA 버튼",
      "닥터 프로필",
    ],
    note: "자동 추출에서는 nav만 명확히 잡혔다. 나머지는 마케팅 랜딩 페이지 구조에서 추정한 항목으로, 검수가 필요하다.",
  },
  aiUsage:
    "이 사이트는 Framer로 만든 마케팅 랜딩 페이지다. 흉내 낼 때: 브랜드 블루(#2597D0) 한 가지로 강조를 통일하고 의미색 팔레트를 따로 두지 말 것. 모서리는 넓게(카드 18px, 칩 pill 100px, 대형 패널 48px). 그림자는 검정 대신 브랜드 블루 틴트로 부드럽게. 타이포는 음수 자간으로 또렷하게 좁히고, 의료 제품의 안심되는 톤을 유지한다.",
} satisfies AnalysisDesignSpec;
