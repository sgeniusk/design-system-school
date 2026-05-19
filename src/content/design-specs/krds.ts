// KRDS 디자인 분석 스펙 — analysis 노드 krds의 시각화·DESIGN.md 정본.
import type { AnalysisDesignSpec } from "@/lib/types";

export const krdsSpec = {
  slug: "krds",
  name: "KRDS",
  summary:
    "대한민국 디지털 정부 디자인 시스템. 접근성과 보편성이 1급 요구사항.",
  disclaimer:
    "공개 화면 관찰·분석에 기반한 학습용 근사치다. KRDS의 공식 스펙이 아니다.",
  principles: [
    "**디지털 포용.** 모든 국민이 동일한 서비스를 경험할 수 있어야 한다.",
    "**접근성 우선.** WCAG 준수가 점검 항목이 아니라 출발점이다.",
    "**신뢰와 명료함.** 행정 화면은 오해가 사고로 이어진다.",
    "다크 모드를 기본 스타일 층에 포함한다.",
  ],
  colors: [
    {
      label: "Brand",
      swatches: [
        { token: "primary", hex: "#256EF4", note: "핵심 행동·링크", on: "#ffffff" },
        {
          token: "primary-dark",
          hex: "#1A4FB8",
          note: "hover·active",
          on: "#ffffff",
        },
      ],
    },
    {
      label: "Neutral",
      swatches: [
        { token: "text-strong", hex: "#1E2124", note: "제목", on: "#ffffff" },
        { token: "text", hex: "#3D4046", note: "본문", on: "#ffffff" },
        { token: "text-mute", hex: "#6D7079", note: "보조", on: "#ffffff" },
        { token: "border", hex: "#D6D8DD", note: "", on: "#16171D" },
        { token: "surface-soft", hex: "#F4F5F7", note: "", on: "#16171D" },
        { token: "background", hex: "#FFFFFF", note: "", on: "#16171D" },
      ],
    },
    {
      label: "Semantic",
      swatches: [
        { token: "danger", hex: "#E63946", note: "오류", on: "#ffffff" },
        { token: "warning", hex: "#F2A600", note: "경고", on: "#16171D" },
        { token: "success", hex: "#1A8E5F", note: "성공", on: "#ffffff" },
        { token: "info", hex: "#256EF4", note: "안내", on: "#ffffff" },
      ],
    },
  ],
  font: "Pretendard GOV (정부용 Pretendard 변형) 계열",
  typeScale: [
    { label: "title", size: "24–32px", weight: "700", sampleSizePx: 30 },
    { label: "heading", size: "18–20px", weight: "700", sampleSizePx: 20 },
    {
      label: "body",
      size: "16–17px",
      weight: "400",
      sampleSizePx: 16,
      note: "본문이 작지 않다 (고령 사용자 전제)",
    },
    { label: "caption", size: "14px", weight: "400", sampleSizePx: 14 },
  ],
  typographyNote: "line-height 1.6 이상",
  spacing: {
    base: "8pt",
    scale: [4, 8, 12, 16, 24, 32, 48],
    note: "폼 입력 요소 사이 16–24px로 넉넉히",
  },
  radii: [
    { name: "radius", px: 8, note: "절제된 둥글기, 단정함 우선" },
    { name: "radius-button", px: 8 },
  ],
  elevationNote: "Elevation은 단계로 토큰화 (0 / 1 / 2 / 3).",
  components: {
    items: [
      "식별",
      "내비게이션",
      "레이아웃",
      "액션",
      "선택",
      "피드백",
      "도움말",
      "입력",
      "설정",
      "콘텐츠",
    ],
    note: "기본 패턴 — 폼·에러·필터링·확인. 서비스 패턴 — 로그인·검색·신청·정책 정보 안내.",
  },
  aiUsage:
    "이 시스템을 흉내 낼 때: 모든 텍스트/배경 조합은 명도 대비 4.5:1 이상을 만족하도록 검증. 명도 대비를 먼저 확인. 모든 인터랙티브 요소에 또렷한 키보드 포커스 표시. 터치 타깃 44px 이상. 본문 글자를 작게 만들지 말 것. 에러·경고 색을 일관되게.",
} satisfies AnalysisDesignSpec;
