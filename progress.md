# Progress

> 세션 간 living document. 변경·증거·다음 단계를 누적 기록한다. 한 세션을 마치기 전 갱신한다.

## Last Updated

2026-05-21

## Current State

배포·온톨로지·UI 세 축이 모두 가동 중인 상태.

- GitHub `sgeniusk/design-system-school` (public) → Vercel `gomgomee-s-projects/design-system-school` 자동 배포.
- 라이브: https://design-system-school.vercel.app
- 그래프 통계: 개념 21 · 패턴 6 · 분석 5 · 학습 경로 2 · 고유 연결 105.
- 4 노드 타입(concept/pattern/analysis/path) × 의미색(indigo/amber/coral/teal) 매핑 안착.
- 라이트·다크 모드 토글 작동 (theming 개념을 사이트가 직접 실증).
- 위키에 sticky 검색 + 카테고리 점프 앵커.
- 홈에 '패턴 미리보기' 섹션 + 푸터에 패턴/Letters 링크.

## Current Objective

`analysis-pattern-edges` feature 완료 — analysis 노드가 pattern도 demonstrate하도록 스키마·페이지·그래프를 확장한다. 자세한 완료 기준은 `feature_list.json`.

## What was done in the last session(s)

| 커밋 | 내용 |
|---|---|
| `c32b962` | Letters analysis 노드 |
| `53fa923` | Phase 1 — pattern 노드 타입 + amber 토큰 + 시드 6개 |
| `274cfe0` | Phase 2 — concept 11개 확장 (behavior/content/engineering 카테고리) |
| `bd5e898` | Phase 3a — WikiBrowser 검색·점프 + 홈 패턴 섹션 + 브랜드 폴리시 |
| `c57d16f` | Phase 3b — 다크 모드 (theming 토큰 갈아끼우기) |

## Recommended Next Step

`analysis-pattern-edges`를 다음 순서로 진행.

1. `src/lib/types.ts` — `AnalysisNode`에 `demonstratesPatterns: string[]` 필드 추가 (선택형 시작 → 필수로 굳히기).
2. `src/content/ontology.ts` — 기존 5개 analyses에 적절한 pattern slug 연결. 후보:
   - **toss**: `card-grid`, `navigation-bar`
   - **krds**: `form-validation`, `navigation-bar`
   - **gmarket**: `card-grid`, `data-table`
   - **wanted**: `card-grid`
   - **letters**: `empty-state`
3. `src/lib/content.ts` — `getPatternsForAnalysis(slug)`·`getAnalysesForPattern(slug)`.
4. `src/lib/graph.ts` — `GraphEdgeKind`에 `analysis-pattern` 추가, `buildEdges`에서 연결, `getGraphStats` 영향 확인.
5. `src/app/collection/[slug]/page.tsx` — 상세 페이지에 '이 사이트가 보여주는 패턴' 섹션 (amber 도트).
6. `src/app/wiki/[slug]/page.tsx` — pattern view의 NodeLinks에 '이 패턴을 보여주는 분석' 그룹 (pop 도트).
7. `npm run check` → commit → push → 라이브 확인.

## Blockers

없음. 스키마 fork 결정만 미리 — `demonstrates`를 split할지(`demonstratesConcepts` + `demonstratesPatterns`) 아니면 새 필드만 추가할지. 현재 코드 호환성과 다음 세션 사용성 보고 결정.

## Files most recently touched

다크 모드·위키·홈 라운드에서 손댄 파일.

- `src/app/layout.tsx` — 사전 페인트 스크립트, suppressHydrationWarning.
- `src/components/ThemeToggle.tsx` — sun/moon 토글.
- `src/app/globals.css` — `[data-theme="dark"]` 토큰 블록.
- `src/components/WikiBrowser.tsx` — sticky 검색 + 카테고리 섹션.
- `src/app/wiki/page.tsx` — WikiBrowser로 단순화.
- `src/app/page.tsx` — 'Patterns' 섹션 + featuredPatterns.
- `src/components/Layout.tsx` — BrandMark amber dot, 푸터 4열, ThemeToggle 배치.
- `src/components/Section.tsx` — Accent 타입에 `gold` 추가.

## Verification Evidence

- 마지막 `npm run check` (Phase 3b 직전): exit 0, 33 static pages, `/wiki/[slug]` 27 paths.
- 라이브 smoke: `curl https://design-system-school.vercel.app/wiki/empty-state` → 200, "이 패턴이 푸는 문제" 콜아웃 노출. `curl /wiki/microcopy` → 200, title "마이크로카피 — 위키 · Design System School". `/ontology` 통계 dl에 "패턴 노드 6" 노출.
- 라이브 자동 배포: GitHub push 후 ~1분에 production 도메인 롤오버 (이전 검증).

## Next Session

세부 cold start 절차는 `session-handoff.md` 참고. 핵심 한 줄: `./init.sh` 돌리고 `feature_list.json`의 `active_feature`(`analysis-pattern-edges`)부터 시작.
