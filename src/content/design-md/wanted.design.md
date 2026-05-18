# Wanted — DESIGN.md

> 채용·커리어 매칭 플랫폼. Figma Community로 공개된 Figma 네이티브 디자인 시스템.
> ⚠️ 공개 화면·Figma 파일 관찰·분석에 기반한 학습용 근사치다. 원티드의 공식 스펙이 아니다.

## Identity & Principles

- **디자이너의 도구 안에 시스템이 산다.** Figma 파일 자체가 단일 진실 공급원.
- **신뢰와 전문성.** 커리어 결정을 돕는 제품의 톤.
- **변수 기반.** 색·간격이 Figma 변수로 묶여 테마 전환·일괄 수정이 쉽다.

## Color

### Brand
- `primary`: #3366FF — 핵심 행동·링크·선택
- `primary-strong`: #2348C8 — hover·active
- `primary-soft`: #EAF0FF — 강조 배경

### Neutral
- `text-strong`: #1B1D28 — 제목
- `text`: #3F4250 — 본문
- `text-mute`: #767A88 — 보조
- `border`: #E2E4EA
- `surface-soft`: #F5F6F8
- `background`: #FFFFFF

### Semantic
- `danger`: #EF4452
- `success`: #14B26B
- `warning`: #F5A623

## Typography

- Font: 깔끔한 한국어 산세리프 (Pretendard 계열)
- `display`: 24–32px / 700
- `heading`: 18–20px / 600–700
- `body`: 15–16px / 400
- `caption`: 13px / 400

## Spacing

- 4/8 기반: 4 · 8 · 12 · 16 · 24 · 32 · 40
- Figma의 Auto Layout 간격과 토큰을 맞춘다

## Radius & Elevation

- `radius-card`: 12px
- `radius-button`: 8px
- `radius-pill`: 999px — 태그·필터 칩
- 그림자 토큰: elevation-1 / elevation-2

## Components

채용 도메인 중심 — 공고 카드 · 회사 카드 · 프로필 · 리스트 · 폼 · 태그/칩 · 버튼 · 입력 필드. Figma 컴포넌트의 variant/state로 정리.

## Delivery note

이 시스템의 원천은 웹 문서가 아니라 **Figma 파일**이다. 코드로 옮길 때는 Figma 변수 → 코드 토큰 동기화 파이프라인이 필요하다.

## Usage for AI agents

이 시스템을 흉내 낼 때: 색·간격을 하드코딩하지 말고 토큰 변수로. `primary`는 전문적인 파랑 하나로 절제. 카드 radius 12px, 칩은 pill. 채용 도메인의 카드형 레이아웃을 기본 뼈대로.
