# CLAUDE.md — Design System School

> 이 프로젝트에서 작업하는 코딩 에이전트를 위한 운영 가이드.

## Quick facts

- 프로젝트: **Design System School** — 온톨로지 기반 디자인 지식 플랫폼. AI Builder School의 형제 사이트.
- 스택: Next.js 15 App Router · React 19 · TypeScript 5 · Tailwind 3 · MDX 3 (remark-gfm)
- 빌드 디렉터리는 `.next.nosync` (iCloud 동기화 회피) — 절대 `.next`로 되돌리지 말 것.
- UI 카피는 한국어. 코드·변수·파일명은 영어.
- 콘텐츠는 데이터 주도. DB·백엔드 없음. git으로 성장한다.

## 명령어

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npm run typecheck
npm run build
npm run check      # lint + typecheck + build
```

`npm`만 사용(pnpm 금지). 경로에 공백이 있으니 인용 부호로 감쌀 것.

## 제품 모델 — 하나의 그래프, 세 개의 렌즈

모든 콘텐츠는 디자인 지식 그래프(온톨로지)의 노드다.

- **노드 타입**
  - `concept` — 디자인 기초·UI/UX 위키 항목. `src/content/concepts/<slug>.mdx`
  - `analysis` — 성공한 디자인 해부 사례. `src/content/analyses/<slug>.mdx` + DESIGN.md 산출
- **세 개의 렌즈** — 배우기(`/learn`)·위키(`/wiki`)·컬렉션(`/collection`)
- 그래프의 단일 진실 공급원은 `src/content/ontology.ts`. 노드·엣지·카테고리가 전부 여기서 정의된다.

## 콘텐츠 스키마

- `src/lib/types.ts` — `Concept` · `Analysis` · `LearnPath` · `AnalysisDesignSpec` · 그래프 타입
- `src/content/ontology.ts` — 노드 + 엣지(관계) 등록
- `src/content/paths.ts` — 학습 경로
- `src/content/design-specs/<slug>.ts` — `analysis` 노드의 디자인 스펙(색·타이포·여백·radius·컴포넌트)
- `src/lib/content.ts` — 노드 조회·역참조·경로 헬퍼

## 노드 색 규칙 (의미 있는 색)

- 개념(concept) = `accent` (indigo)
- 분석(analysis) = `pop` (coral)
- 학습 경로(path) = `mint` (teal)

색은 노드 타입을 인코딩한다. 새 UI에서도 이 매핑을 지킬 것.

## DESIGN.md 규칙

- 모든 `analysis` 노드는 `src/content/design-specs/<slug>.ts`에 `AnalysisDesignSpec` 객체를 가진다. 색·타이포·여백·radius·컴포넌트의 **단일 진실 공급원(정본)**.
- DESIGN.md 마크다운은 `src/lib/design-md.ts`의 `specToMarkdown()`이 spec에서 **생성**한다. 별도 `.design.md` 파일은 두지 않는다.
- 상세 페이지의 시각화와 DESIGN.md 텍스트는 같은 spec에서 나온다. 데이터는 spec 한 곳에서만 수정한다.
- 새 `analysis` 노드를 추가하면 `ontology.ts` 등록 + `analyses/<slug>.mdx` 본문 + `design-specs/<slug>.ts` + `design-specs/index.ts` 매핑을 같은 변경에서 함께 만든다.

## 작업 규칙

1. 비자명한 변경 전에 건드릴 파일과 검증 방법을 먼저 정리한다.
2. 콘텐츠는 `src/content/`에. 컴포넌트 JSX에 카피를 하드코딩하지 않는다.
3. 새 노드를 추가하면 `ontology.ts` 등록 + 본문 파일을 같은 변경에서 함께 만든다.
4. `npm run check`가 통과해야 "완료"라고 말한다.

## Stop points (진행 전 확인)

- 새 프레임워크·런타임·DB·백엔드 라우트·외부 서비스 도입.
- 기존 노드(개념·분석)·학습 경로 삭제.
- `src/content/` 또는 `src/lib/` 파일 이름 변경.
- `next.config.mjs`의 `distDir` 수정 (`.next.nosync` 유지).
- `package.json` 의존성 추가·삭제·업그레이드.
- git `commit`·`push` 등.

## 향후 (deferred)

- 패턴(pattern) 노드 타입, 인터랙티브 온톨로지 그래프 뷰.
- AI Builder School 상단바에 이 사이트 링크 추가 (배포 URL 확보 후).
- DESIGN.md 자동 추출 도구.
