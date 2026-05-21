# Progress

> 세션 간 living document. 변경·증거·다음 단계를 누적 기록한다. 한 세션을 마치기 전 갱신한다.

## Last Updated

2026-05-21

## Current State

배포·온톨로지·UI·교차 엣지·학습 경로까지 모두 가동.

- GitHub `sgeniusk/design-system-school` (public) → Vercel 자동 배포. Phase 4 커밋 `7b526d9` push 완료, Phase 5 (learn-path-with-patterns)는 워킹 트리에서 커밋 대기.
- 라이브: https://design-system-school.vercel.app
- 그래프 통계: 개념 21 · 패턴 6 · 분석 5 · 학습 경로 2. 이번 세션에서 analysis→pattern 8개 + path→pattern 3개 추가.
- 4 노드 타입(concept/pattern/analysis/path) × 의미색(indigo/amber/coral/teal) 매핑 안착.
- 라이트·다크 모드 토글 작동 (theming 개념을 사이트가 직접 실증).
- 위키에 sticky 검색 + 카테고리 점프 앵커.
- 홈에 '패턴 미리보기' 섹션 + 푸터에 패턴/Letters 링크.
- analysis 상세 페이지(`/collection/[slug]`)에 amber 카드 '이 사이트가 보여주는 패턴'. pattern 위키(`/wiki/[slug]`)에 pop 그룹 '이 패턴을 보여주는 분석' + mint 그룹 '이 패턴이 포함된 학습 경로'.
- `build-a-system` 학습 경로가 concept 6 + pattern 3 (empty-state·form-validation·card-grid)으로 확장.

## Current Objective

`active_feature`가 다시 비어 있다. 남은 planned 후보 중 하나를 골라 다음 라운드 시작.

## What was done in the last session(s)

| 커밋 | 내용 |
|---|---|
| `c32b962` | Letters analysis 노드 |
| `53fa923` | Phase 1 — pattern 노드 타입 + amber 토큰 + 시드 6개 |
| `274cfe0` | Phase 2 — concept 11개 확장 (behavior/content/engineering 카테고리) |
| `bd5e898` | Phase 3a — WikiBrowser 검색·점프 + 홈 패턴 섹션 + 브랜드 폴리시 |
| `c57d16f` | Phase 3b — 다크 모드 (theming 토큰 갈아끼우기) |
| `e00a097` | 프로젝트 하니스 (feature_list·progress·handoff·init.sh) |
| `7b526d9` | Phase 4 — analysis→pattern 엣지 (5개 analyses에 demonstratesPatterns 채움) |
| _커밋 대기_ | Phase 5 — LearnPath steps 마이그레이션 + path→pattern 엣지 + UI 두 타입 분기 |

## Recommended Next Step

`active_feature`를 다음 중 하나로 정하고 시작.

1. **`tokendemo-theme-aware`** — 권장. 작고 명확. 라이트·다크 토큰 값 실시간 노출. 다크 모드와 토큰 교과서 페이지의 닫는 작업.
2. **`ontology-graph-mobile-polish`** — 모바일 UX 개선. 좌표 산정 변경 가능성 있어 회귀 주의.
3. **`ai-builder-school-cross-link`** — 헤더 외부 링크. 10분 안.
4. **`design-md-auto-extraction`** — 스크립트 도구. 디자인 분석 자동화 실험.

사용자에게 1번 우선 추천. 3번은 작은 보너스로 함께 묶기 좋음.

## Blockers

없음.

## Files most recently touched (Phase 5)

- `src/lib/types.ts` — `LearnPathStep` 신규, `LearnPath.conceptSlugs → steps`.
- `src/content/paths.ts` — `build-a-system`에 pattern 3개 추가, 두 경로 모두 steps 표기.
- `src/lib/content.ts` — `getPathSteps`·`getPathsForPattern` 신규, `getPathsForConcept` 내부 갱신, 통계에 path-steps 포함.
- `src/lib/graph.ts` — `GraphEdgeKind`에 `path-pattern` 추가, buildEdges step.type 분기.
- `src/app/learn/page.tsx` — 카드 chip에 gold 분기, 카운트 "단계 · 개념 N · 패턴 M".
- `src/app/learn/[path]/page.tsx` — ol 단계 카드 색 분기 (mint/gold), step.type 인라인 narrow.
- `src/app/wiki/[slug]/page.tsx` PatternView — mint 그룹 '이 패턴이 포함된 학습 경로' 추가.

## Verification Evidence

- `npm run check` (이번 세션 종료 직전): exit 0, 44 static pages, `/ontology` 8.18 kB (이전 8.13 kB → path-pattern 엣지 3개 영향).
- `/wiki/[slug]` 27 paths 유지, `/learn/[path]` 2 paths 유지 (`build-a-system`이 9 step으로 확장).
- TS narrowing 한 번 깨졌다가 step.type 인라인 비교로 해결.
- 라이브 커밋 보류 — Phase 5 변경분은 사용자 commit·push 허가 후 진행.

## Next Session

세부 cold start 절차는 `session-handoff.md` 참고. 핵심 한 줄: `./init.sh` 돌리고 `feature_list.json`의 `active_feature` 선정부터 시작.
