# Toss — DESIGN.md

> 핀테크 슈퍼앱. 인지 부하를 최소화하는 극단적 단순함의 디자인 언어.
> ⚠️ 공개 화면 관찰·분석에 기반한 학습용 근사치다. 토스의 공식 스펙이 아니다.

## Identity & Principles

- **명료함 > 화려함.** 한 화면은 하나의 일만 시킨다.
- **덜어내기.** 컴포넌트, 색, 텍스트 — 의심스러우면 뺀다.
- **신뢰는 차분함에서 온다.** 금융 앱은 흥분시키지 않는다.
- 한 화면의 주행동은 화면 하단 고정 CTA(BottomCTA) 하나로 모은다.

## Color

### Brand
- `toss-blue`: #3182F6 — 핵심 행동·링크·선택 상태에만 사용

### Neutral (grey scale)
- `grey-900`: #191F28 — 제목 텍스트
- `grey-800`: #333D4B
- `grey-700`: #4E5968 — 본문 텍스트
- `grey-600`: #6B7684 — 보조 텍스트
- `grey-500`: #8B95A1 — placeholder
- `grey-400`: #B0B8C1
- `grey-300`: #D1D6DB — 테두리
- `grey-200`: #E5E8EB — 구분선
- `grey-100`: #F2F4F6 — 보조 배경
- `background`: #FFFFFF

### Semantic
- `danger`: #F04452 — 오류·위험 동작
- `success`: #00C471 — 완료·성공

## Typography

- Font: Pretendard 계열 한국어 산세리프
- `display`: 24–28px / 700 — 화면 제목
- `heading`: 19–20px / 700
- `body`: 15–17px / 400–500 — 본문
- `caption`: 13px / 400 — 보조
- line-height: 1.5 이상, `word-break: keep-all`

## Spacing

- 8pt 기반. 스케일: 4 · 8 · 12 · 16 · 24 · 32 · 40
- 화면 좌우 기본 여백 24px
- 요소 사이를 넉넉히 — 한 화면에 욱여넣지 않는다

## Radius & Elevation

- `radius-card`: 16–20px
- `radius-button`: 12–16px
- 그림자는 절제. 카드는 얕은 그림자 또는 1px 테두리

## Components (core 11)

Badge · Border · BottomCTA · Button · Asset · ListRow · ListHeader · Navigation · Paragraph · Tab · Top

- 버튼·행(ListRow)은 터치 타깃이 크다 (높이 48–56px)
- 컴포넌트 수를 의도적으로 적게 유지한다

## Usage for AI agents

이 시스템을 흉내 낼 때: 색은 거의 회색조로 두고 `toss-blue`는 화면당 한두 번만. 여백을 아끼지 말 것. 버튼을 크게. 화면마다 명확한 주행동 하나를 하단에 고정.
