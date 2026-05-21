# Progress

> 세션 간 living document. 변경·증거·다음 단계를 누적 기록한다. 한 세션을 마치기 전 갱신한다.

## Last Updated

2026-05-21

## Current State

배포·온톨로지·UI·교차 엣지까지 모두 가동 중인 상태.

- GitHub `sgeniusk/design-system-school` (public) → Vercel `gomgomee-s-projects/design-system-school` 자동 배포.
- 라이브: https://design-system-school.vercel.app (이번 세션 변경분은 커밋 보류 — 사용자 허가 대기).
- 그래프 통계: 개념 21 · 패턴 6 · 분석 5 · 학습 경로 2. 이번 세션에서 analysis→pattern 엣지 8개 추가.
- 4 노드 타입(concept/pattern/analysis/path) × 의미색(indigo/amber/coral/teal) 매핑 안착.
- 라이트·다크 모드 토글 작동 (theming 개념을 사이트가 직접 실증).
- 위키에 sticky 검색 + 카테고리 점프 앵커.
- 홈에 '패턴 미리보기' 섹션 + 푸터에 패턴/Letters 링크.
- analysis 상세 페이지(`/collection/[slug]`)에 amber 카드 '이 사이트가 보여주는 패턴'. pattern 위키(`/wiki/[slug]`)에 pop 그룹 '이 패턴을 보여주는 분석'.

## Current Objective

`active_feature`가 비어 있다. 다음 세션 첫 작업은 `feature_list.json`의 `planned` 중 하나를 선택해 `active_feature`로 올리는 것. 후보 정리는 아래 "Recommended Next Step".

## What was done in the last session(s)

| 커밋 | 내용 |
|---|---|
| `c32b962` | Letters analysis 노드 |
| `53fa923` | Phase 1 — pattern 노드 타입 + amber 토큰 + 시드 6개 |
| `274cfe0` | Phase 2 — concept 11개 확장 (behavior/content/engineering 카테고리) |
| `bd5e898` | Phase 3a — WikiBrowser 검색·점프 + 홈 패턴 섹션 + 브랜드 폴리시 |
| `c57d16f` | Phase 3b — 다크 모드 (theming 토큰 갈아끼우기) |
| `e00a097` | 프로젝트 하니스 (feature_list·progress·handoff·init.sh) |
| _커밋 대기_ | analysis→pattern 엣지 — 5개 analyses에 demonstratesPatterns 채움 + 두 페이지 UI 추가 |

## Recommended Next Step

`active_feature`를 다음 중 하나로 정하고 시작.

1. **`learn-path-with-patterns`** — 권장. 그래프의 마지막 닫히지 않은 축(path→pattern). 스키마 변경 + 시각화 한 곳까지.
2. **`tokendemo-theme-aware`** — 작고 명확. 라이트·다크 토큰 값 실시간 노출.
3. **`ontology-graph-mobile-polish`** — 모바일 UX 개선. 좌표 산정 변경 가능성 있어 회귀 주의.
4. **`ai-builder-school-cross-link`** — 헤더 외부 링크. 10분 안.
5. **`design-md-auto-extraction`** — 스크립트 도구. 디자인 분석 자동화 실험.

사용자에게 1번을 우선 추천. 다른 작은 항목(2·4)을 함께 묶는 것도 가능.

## Blockers

없음.

## Files most recently touched (이번 세션)

- `src/lib/types.ts` — `AnalysisNode.demonstratesPatterns?: string[]` 추가.
- `src/content/ontology.ts` — 5개 analyses에 demonstratesPatterns 채움.
- `src/lib/content.ts` — `getPatternsForAnalysis`·`getAnalysesForPattern` + 통계 식 갱신.
- `src/lib/graph.ts` — `GraphEdgeKind`에 `analysis-pattern` 추가, `buildEdges`에 추가.
- `src/app/collection/[slug]/page.tsx` — 사이드바에 amber 카드.
- `src/app/wiki/[slug]/page.tsx` PatternView — pop 그룹 추가.

## Verification Evidence

- `npm run check` (이번 세션 종료 직전): exit 0, 44 static pages, `/ontology` 8.13 kB (이전 8.07 kB).
- `/wiki/[slug]` 27 paths 유지 (개념 21 + 패턴 6). `/collection/[slug]` 5 paths 유지.
- 라이브 커밋 보류 — 사용자가 commit·push 명시 허가 후 진행.

## Next Session

세부 cold start 절차는 `session-handoff.md` 참고. 핵심 한 줄: `./init.sh` 돌리고 `feature_list.json`의 `active_feature` 선정부터 시작.
