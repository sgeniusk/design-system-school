# Gmarket (GDS) — DESIGN.md

> 대규모 이커머스 디자인 시스템. 브랜드 정체성·사용성·일관성, 그리고 전환.
> ⚠️ 공개 화면 관찰·분석에 기반한 학습용 근사치다. GDS의 공식 스펙이 아니다.

## Identity & Principles

- **브랜드 일관성.** 매일 바뀌는 상품·기획전을 그래도 G마켓처럼 묶는다.
- **정보 밀도를 견디는 설계.** 가격·할인·별점·배송이 한 카드에 공존한다.
- **전환 중심.** 핵심 행동(구매·장바구니)이 시각적으로 가장 강하다.

## Color

### Brand
- `primary`: #329CFF — 핵심 행동·링크·강조
- `primary-strong`: #1F7FE0 — hover·active

### Neutral
- `text-strong`: #222222 — 제목·로고
- `text`: #616161 — 본문
- `text-mute`: #757575 — 보조
- `text-faint`: #9E9E9E — 비활성·placeholder
- `border`: #E0E0E0
- `surface-soft`: #F5F5F5
- `background`: #FFFFFF

### Semantic
- `sale`: #FA2828 — 할인율·세일 (커머스 특화)
- `success`: #2BA84A
- `warning`: #FF8A00

## Typography

- Font: **Gmarket Sans** (브랜드 전용 폰트, 공개 배포) + 시스템 폰트 폴백
- `display`: 28–40px / 700 — 프로모션 배너의 강한 목소리
- `heading`: 18–22px / 500–700
- `body`: 14–16px / 400
- `price`: 16–20px / 700 — 가격은 따로 강조

## Spacing

- 4/8 기반: 4 · 8 · 12 · 16 · 20 · 24 · 32
- 상품 카드 그리드 간격 8–16px (밀도 높음)

## Radius & Elevation

- `radius-card`: 8–12px
- `radius-button`: 6–8px
- 카드 그림자 얕게, 호버 시 살짝 들어 올림

## Components (22 categories)

Accordion · Badge · Banner · Button · Chip · Dialog · Dropdown · Heading · Info box · Item card · Label · List · Navigation · Popover · Selection control · Sheet · Slide · Tab · Text field · Thumbnail …

## Usage for AI agents

이 시스템을 흉내 낼 때: 정보 밀도를 두려워하지 말 것 — 단, 가격과 행동 버튼은 위계 최상단에. 세일/할인 색을 따로 둘 것. 강조 파랑은 전환 지점에 집중. Gmarket Sans 굵은 무게로 배너 헤드라인을 만든다.
