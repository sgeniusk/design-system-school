# Session Handoff

> 세션 끝낼 때 다음 세션(에이전트·사람 누구든)이 cold start로 이어받을 수 있도록 남기는 인수인계.
> `progress.md`가 "지금까지 무엇이 됐나"라면, 이 파일은 "다음 사람이 첫 1분 안에 알아야 할 것".

## Last Updated

2026-05-21

## Current Objective

`analysis-pattern-edges` 완료. `feature_list.json`의 `active_feature`는 비어 있다 (null). 다음 세션의 첫 결정은 어떤 `planned`를 active로 올릴지 — `progress.md`의 Recommended Next Step에 5개 후보 정리.

## In my head right now (다음 세션이 이 부분은 다시 읽지 않아도 됨)

- 노드 타입은 concept · pattern · analysis 세 개의 1급 타입. LearnPath는 그래프 시각화에서만 `path` 노드로 보임.
- `/wiki/[slug]`는 concept 슬러그와 pattern 슬러그를 **한 네임스페이스에서** resolve. 현재 슬러그 충돌 없음.
- 색 매핑: concept=indigo(`accent`), pattern=amber(`gold`), analysis=coral(`pop`), path=teal(`mint`).
- 다크 모드는 `[data-theme="dark"]`가 토큰을 갈아끼우는 방식. 컴포넌트 추가 수정 없이 새 토큰만 양쪽에 정의하면 됨.
- 그래프는 `src/lib/graph.ts`가 모듈 로드 시 결정론적 force 레이아웃을 한 번 계산해 `graphData`로 export. 시드 PRNG라 SSR/CSR 일치.
- 검증은 `npm run check` (lint + typecheck + build) 한 줄로 끝. 별도 test runner 없음.
- Vercel은 환경변수 `USE_DEFAULT_DIST=1`이 있어 표준 `.next`를 사용하고, 로컬은 `.next.nosync` 유지 (`next.config.mjs`가 분기).
- **이번 세션 변경분은 아직 커밋되지 않음** — 워킹 트리에 6개 파일 수정 + 3개 상태 파일 갱신. 사용자가 `commit`·`push`를 명시적으로 허락하면 진행.

## What just shipped (in working tree, uncommitted)

`analysis-pattern-edges` 전 항목 완료.

- 스키마: `AnalysisNode.demonstratesPatterns?: string[]` (optional 시작 — 5개 모두 채워졌으니 다음 라운드에서 필수로 굳혀도 됨).
- 데이터: toss→[card-grid, navigation-bar], krds→[form-validation, navigation-bar], gmarket→[card-grid, data-table], wanted→[card-grid], letters→[empty-state]. 총 8개 새 엣지.
- 헬퍼: `getPatternsForAnalysis(slug)`·`getAnalysesForPattern(slug)` + `getOntologyStats` 엣지 합계 식 갱신.
- 그래프: `GraphEdgeKind`에 `analysis-pattern` 추가, `buildEdges`에서 analysis 루프 안에 `demonstratesPatterns` 처리.
- UI: `/collection/[slug]` 사이드바 두 번째 카드(amber dot, "이 사이트가 보여주는 패턴"). `/wiki/[slug]` PatternView NodeLinks 세 번째 그룹(pop dot, "이 패턴을 보여주는 분석").

## Files to read first (다음 세션)

1. `feature_list.json` — `active_feature`가 null. `planned` 중 무엇을 올릴지 결정.
2. `progress.md` — Recommended Next Step에 5개 후보 + 권장(`learn-path-with-patterns`).
3. 선택한 active feature의 `files` 배열에서 시작.

## Decisions already made

- `analysis-pattern-edges`의 스키마는 **optional 필드 + 5개 모두 채움** 패턴으로 굳었다. 다음에 새 analysis 추가 시 관행적으로 함께 채울 것. 강제 필수화는 별도 작은 작업으로 미룸.
- OntologyGraph 시각화는 새 엣지 종류 추가 시 별도 색·스타일 없이 기존 stroke로 렌더 (kind는 데이터에 남아 있으니 나중에 필요하면 색 분기 가능).

## Open questions for the user (필요 시 확인)

1. **커밋·푸시 허락**: 이번 세션 변경 6+3개 파일을 커밋해도 되는지. 메시지 후보: `Phase 4: analysis→pattern edges` 또는 `feat: cross-link analyses to patterns`.
2. **다음 active feature**: 권장 `learn-path-with-patterns` 또는 사용자가 다른 것을 골라도 됨.
3. (선택) **OntologyGraph 새 엣지에 시각 차별화 줄지** — 현재는 색·스타일 동일. 필요하면 amber 톤으로 분기 가능.

## Blockers

없음. 커밋 허가만 받으면 라이브 검증까지 한 번에 진행.

## Restart Path (clean cold start, 1분 안에)

```bash
cd "/Users/taewookkim/Design System School"
./init.sh
cat feature_list.json | head -40
cat progress.md
```

추가로 `git status`로 미커밋 변경을 먼저 확인하면 더 빠르다.

## Next Session — 첫 행동

1. `./init.sh` 실행 (clean build 확인).
2. `git status` — 미커밋 변경 6+3개가 있다면 이번 세션 산출물. 사용자에게 커밋 여부 확인.
3. `feature_list.json`의 `active_feature` 선정 — `progress.md` Recommended Next Step의 5개 후보 중 하나.
4. 선정 후 `active_feature` 값 갱신하고 작업 시작.
