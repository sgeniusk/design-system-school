# CLAUDE.md — Design System School

> 이 프로젝트에서 작업하는 코딩 에이전트를 위한 운영 가이드.
> 자세한 진행 상태는 `progress.md`·`feature_list.json`·`session-handoff.md`에 있다.

## Quick facts

- 프로젝트: **Design System School** — 온톨로지 기반 디자인 지식 플랫폼. AI Builder School의 형제 사이트.
- 스택: Next.js 15 App Router · React 19 · TypeScript 5 · Tailwind 3 · MDX 3 (remark-gfm)
- 빌드 디렉터리는 로컬에서 `.next.nosync` (iCloud 동기화 회피). 절대 `.next`로 되돌리지 말 것. Vercel은 환경변수 `USE_DEFAULT_DIST=1`로 표준 `.next`를 사용한다.
- UI 카피는 한국어. 코드·변수·파일명은 영어.
- 콘텐츠는 데이터 주도. DB·백엔드 없음. git으로 성장한다.
- 라이브: https://design-system-school.vercel.app (GitHub push → Vercel 자동 배포)

## Startup Workflow

Before writing code, do these in order:

1. Read `feature_list.json` — `active_feature` 한 개를 확인. 없거나 모호하면 사용자에게 어떤 `planned`를 active로 올릴지 묻는다.
2. Read `progress.md` — Last Updated / Current State / Recommended Next Step.
3. Read `session-handoff.md` — 직전 세션의 미해결 결정·열린 질문.
4. `./init.sh`를 한 번 돌려 현재 빌드가 깨끗한지 확인.
5. Stay in scope — active feature 하나만 손댄다. 새로 떠오른 일은 코드가 아니라 `feature_list.json`에 `planned` 항목으로 적는다.

## Verification Commands

```bash
./init.sh           # 의존성 + lint + typecheck + build 한 번에 (사실상의 test 게이트)
npm install
npm run dev         # http://localhost:3000
npm run lint
npm run typecheck
npm run build
npm run check       # lint + typecheck + build
```

`npm`만 사용 (pnpm 금지). 경로에 공백이 있으니 인용 부호로 감쌀 것.

이 프로젝트엔 별도 test runner가 없다. `npm run check`가 lint·typecheck·build를 직렬로 돌려 사실상의 회귀 테스트 역할을 한다. 컴포넌트·라우트가 SSG 단계에서 실제 렌더되므로 빌드 통과 = 페이지 정적 생성 성공.

## Definition of Done

A feature is done only when:

- [ ] 변경된 모든 파일에서 `npm run check`가 통과한다 (exit 0).
- [ ] `feature_list.json`의 해당 feature가 `status: done`으로 갱신되고 짧은 `evidence`(커밋 해시 + URL 한 줄)가 기록된다.
- [ ] `progress.md`의 Last Updated·Current State·Recommended Next Step이 다음 세션을 위해 갱신된다.
- [ ] 새 노드 추가 시 `ontology.ts` 등록 + 본문 파일 + (analysis면) design-spec까지 같은 커밋에 함께 들어 있다.
- [ ] 라이브 사이트에서 사람이 한 번 확인한다.

## State files

| 파일 | 역할 |
|---|---|
| `feature_list.json` | 모든 feature(완료·진행·예정)의 단일 진실 공급원. id·name·description·status·dependencies·done_criteria·files. |
| `progress.md` | 세션 간 living document. Current State·What was done·Recommended Next Step·Verification Evidence. |
| `session-handoff.md` | 세션 끝낼 때 다음 세션이 cold start하도록 남기는 인수인계. Blockers·Files·Next Session. |

## 제품 모델 — 하나의 그래프, 네 가지 노드 타입

모든 콘텐츠는 디자인 지식 그래프(온톨로지)의 노드다.

- **노드 타입**
  - `concept` — 디자인 기초·UI/UX 위키 항목 (이론). `src/content/concepts/<slug>.mdx`
  - `pattern` — 컴포넌트를 조합해 반복 UI 문제를 푸는 재사용 해법. `src/content/patterns/<slug>.mdx`
  - `analysis` — 성공한 디자인을 해부한 사례. `src/content/analyses/<slug>.mdx` + DESIGN.md 산출
  - `LearnPath` — 학습 경로(노드를 큐레이션한 순서). 그래프에서 `path` 노드로 시각화. `src/content/paths.ts`
- **라우트(렌즈)** — 배우기(`/learn`)·위키(`/wiki`, concept+pattern 통합)·컬렉션(`/collection`)·온톨로지 그래프(`/ontology`)
- 그래프의 단일 진실 공급원은 `src/content/ontology.ts`. 노드·엣지·카테고리가 전부 여기서 정의된다.

## 콘텐츠 스키마

- `src/lib/types.ts` — `ConceptNode`·`PatternNode`·`AnalysisNode`·`LearnPath`·`AnalysisDesignSpec`·그래프 타입
- `src/content/ontology.ts` — concepts·patterns·analyses 배열 + 엣지(`relatedConcepts`·`relatedPatterns`·`demonstrates`)
- `src/content/paths.ts` — 학습 경로
- `src/content/design-specs/<slug>.ts` — `analysis` 노드의 디자인 스펙(색·타이포·여백·radius·컴포넌트)
- `src/content/bodies.ts` — slug → MDX 본문 컴포넌트 매핑
- `src/lib/content.ts` — 노드 조회·역참조·경로 헬퍼
- `src/lib/graph.ts` — 온톨로지를 그래프 뷰용 노드·엣지로 변환 + 결정론적 force 레이아웃

## 노드 색 규칙 (의미 있는 색)

- 개념(concept) = `accent` (indigo)
- 패턴(pattern) = `gold` (amber)
- 분석(analysis) = `pop` (coral)
- 학습 경로(path) = `mint` (teal)

색이 노드 타입을 인코딩한다. 새 UI에서도 이 매핑을 지킬 것. 토큰은 `src/app/globals.css`의 `:root` + `[data-theme="dark"]`에서 정의된다.

## DESIGN.md 규칙

- 모든 `analysis` 노드는 `src/content/design-specs/<slug>.ts`에 `AnalysisDesignSpec` 객체를 가진다. 색·타이포·여백·radius·컴포넌트의 **단일 진실 공급원(정본)**.
- DESIGN.md 마크다운은 `src/lib/design-md.ts`의 `specToMarkdown()`이 spec에서 **생성**한다. 별도 `.design.md` 파일은 두지 않는다.
- 상세 페이지의 시각화와 DESIGN.md 텍스트는 같은 spec에서 나온다. 데이터는 spec 한 곳에서만 수정한다.
- 새 `analysis` 노드를 추가하면 `ontology.ts` 등록 + `analyses/<slug>.mdx` 본문 + `design-specs/<slug>.ts` + `design-specs/index.ts` 매핑을 같은 변경에서 함께 만든다.

## 다크 모드 규칙

- 컴포넌트는 의미 토큰만 쓴다 (`bg-bg`, `text-ink`, `bg-accent-soft`, `text-pop-ink` 등). raw hex는 브랜드 마크·analysis brandColor·하드코딩 그라데이션 같은 정체성 표현에만.
- 새 토큰을 추가하면 라이트(`:root`)와 다크(`[data-theme="dark"]`) 양쪽에 정의한다.
- 명도 대비는 두 테마에서 모두 검증한다.

## 작업 규칙 (working rules)

1. **One feature at a time.** 한 세션은 하나의 active feature만 손댄다. 다른 일이 떠오르면 코드가 아니라 `feature_list.json`에 `planned`로 적는다.
2. 비자명한 변경 전에 건드릴 파일과 검증 방법을 먼저 정리한다.
3. 콘텐츠는 `src/content/`에. 컴포넌트 JSX에 카피를 하드코딩하지 않는다.
4. 새 노드를 추가하면 `ontology.ts` 등록 + 본문 파일을 같은 변경에서 함께 만든다.
5. `npm run check`가 통과해야 "완료"라고 말한다.

## Stay in scope — Stop points (사용자 확인 필요)

다음은 active feature 안에서도 사용자에게 한 번 확인을 받는다.

- 새 프레임워크·런타임·DB·백엔드 라우트·외부 서비스 도입.
- 기존 노드(개념·패턴·분석)·학습 경로 삭제 또는 slug 변경.
- `src/content/` 또는 `src/lib/` 파일 이름 변경.
- `next.config.mjs`의 `distDir` 수정 (`.next.nosync` ↔ `.next` 로직 유지).
- `package.json` 의존성 추가·삭제·업그레이드.
- git `commit`·`push` (사용자가 명시적으로 요청한 경우 외엔 멈춘다).
- 다크/라이트 색 토큰 값 변경 — 대비·접근성 영향 큼.

## End of Session

Before ending the session, 다음을 한다:

1. `feature_list.json` 갱신 — 변경된 status, evidence 한 줄.
2. `progress.md` 갱신 — Last Updated·Current State·Recommended Next Step·Verification Evidence.
3. `session-handoff.md` 갱신 — 머리에 든 컨텍스트·결정·열린 질문을 다음 세션에 넘긴다.
4. 사용자가 commit·push를 명시적으로 허락하면 커밋한다.

## 향후 (deferred)

`feature_list.json`의 `status: planned` 항목을 단일 출처로 본다. 대표 예:

- analysis → pattern 엣지 (analyses가 pattern도 demonstrate하도록 확장)
- TokenDemo가 현재 테마에 맞춰 실제 토큰 값을 노출
- LearnPath가 pattern도 큐레이션 단계에 포함
- DESIGN.md 자동 추출 도구
- AI Builder School 상단바 상호 링크
