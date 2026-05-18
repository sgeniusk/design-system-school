# KRDS — DESIGN.md

> 대한민국 디지털 정부 디자인 시스템. 접근성과 보편성이 1급 요구사항.
> ⚠️ 공개 화면 관찰·분석에 기반한 학습용 근사치다. KRDS의 공식 스펙이 아니다.

## Identity & Principles

- **디지털 포용.** 모든 국민이 동일한 서비스를 경험할 수 있어야 한다.
- **접근성 우선.** WCAG 준수가 점검 항목이 아니라 출발점이다.
- **신뢰와 명료함.** 행정 화면은 오해가 사고로 이어진다.
- 다크 모드를 기본 스타일 층에 포함한다.

## Color

### Brand
- `primary`: #256EF4 — 핵심 행동·링크
- `primary-dark`: #1A4FB8 — hover·active

### Neutral
- `text-strong`: #1E2124 — 제목
- `text`: #3D4046 — 본문
- `text-mute`: #6D7079 — 보조
- `border`: #D6D8DD
- `surface-soft`: #F4F5F7
- `background`: #FFFFFF

### Semantic (또렷하게)
- `danger`: #E63946 — 오류
- `warning`: #F2A600 — 경고
- `success`: #1A8E5F — 성공
- `info`: #256EF4 — 안내

> 모든 텍스트/배경 조합은 명도 대비 4.5:1 이상을 만족하도록 검증한다.

## Typography

- Font: Pretendard GOV (정부용 Pretendard 변형) 계열
- `title`: 24–32px / 700
- `heading`: 18–20px / 700
- `body`: 16–17px / 400 — 본문이 작지 않다 (고령 사용자 전제)
- `caption`: 14px / 400
- line-height 1.6 이상

## Spacing

- 8pt 기반: 4 · 8 · 12 · 16 · 24 · 32 · 48
- 폼 입력 요소 사이 16–24px로 넉넉히

## Radius & Elevation

- `radius`: 8px (절제된 둥글기, 단정함 우선)
- `radius-button`: 8px
- Elevation은 단계로 토큰화 (0 / 1 / 2 / 3)

## Components & Patterns

- 컴포넌트: 식별 · 내비게이션 · 레이아웃 · 액션 · 선택 · 피드백 · 도움말 · 입력 · 설정 · 콘텐츠
- 기본 패턴: 폼 · 에러 · 필터링 · 확인
- 서비스 패턴: 로그인 · 검색 · 신청 · 정책 정보 안내

## Usage for AI agents

이 시스템을 흉내 낼 때: 명도 대비를 먼저 확인. 모든 인터랙티브 요소에 또렷한 키보드 포커스 표시. 터치 타깃 44px 이상. 본문 글자를 작게 만들지 말 것. 에러·경고 색을 일관되게.
