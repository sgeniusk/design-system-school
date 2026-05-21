# Session Handoff

> 세션 끝낼 때 다음 세션(에이전트·사람 누구든)이 cold start로 이어받을 수 있도록 남기는 인수인계.
> `progress.md`가 "지금까지 무엇이 됐나"라면, 이 파일은 "다음 사람이 첫 1분 안에 알아야 할 것".

## Last Updated

2026-05-21

## Current Objective

`learn-path-with-patterns` 완료. `feature_list.json`의 `active_feature`는 다시 비어 있다 (null). 남은 planned 4개 중 하나를 골라 다음 라운드 시작.

## In my head right now (다음 세션이 이 부분은 다시 읽지 않아도 됨)

- 노드 타입은 concept · pattern · analysis 세 개의 1급 타입. LearnPath는 그래프 시각화에서만 `path` 노드로 보임.
- `/wiki/[slug]`는 concept 슬러그와 pattern 슬러그를 **한 네임스페이스에서** resolve. 현재 슬러그 충돌 없음.
- 색 매핑: concept=indigo(`accent`), pattern=amber(`gold`), analysis=coral(`pop`), path=teal(`mint`).
- 다크 모드는 `[data-theme="dark"]`가 토큰을 갈아끼우는 방식. 컴포넌트 추가 수정 없이 새 토큰만 양쪽에 정의하면 됨.
- 그래프는 `src/lib/graph.ts`가 모듈 로드 시 결정론적 force 레이아웃을 한 번 계산해 `graphData`로 export. 시드 PRNG라 SSR/CSR 일치.
- 검증은 `npm run check` (lint + typecheck + build) 한 줄로 끝. 별도 test runner 없음.
- Vercel은 환경변수 `USE_DEFAULT_DIST=1`이 있어 표준 `.next`를 사용하고, 로컬은 `.next.nosync` 유지 (`next.config.mjs`가 분기).
- **Phase 5 변경분은 아직 커밋되지 않음** — 워킹 트리에 7개 src 파일 + 3개 상태 파일 갱신. 사용자가 `commit`·`push`를 명시적으로 허락하면 진행.
- 그래프 엣지 4축이 모두 닫혔다 — concept-concept · pattern-(concept/pattern) · analysis-(concept/pattern) · path-(concept/pattern). 앞으로 추가될 새 노드 타입은 이 6개 엣지 종류에 맞춰 분기하면 됨.

## What just shipped (in working tree, uncommitted)

`learn-path-with-patterns` 완료.

- 스키마: `LearnPath.conceptSlugs: string[]` → `LearnPath.steps: LearnPathStep[]`로 완전 마이그레이션. `LearnPathStep = { type: 'concept' | 'pattern', slug }`.
- 데이터: `design-basics`는 concept 6개 그대로 (mint 톤만). `build-a-system`은 concept 6 + pattern 3 (`empty-state`, `form-validation`, `card-grid`)으로 확장 — "토큰에서 패턴까지" 태그라인이 데이터로 실증됨.
- 헬퍼: `getPathSteps(slug): LearnPathStepNode[]` 신규 (`{ type, node }` 펼친 형태). `getPathsForPattern(slug)` 신규. `getPathsForConcept(slug)` 내부 갱신 (steps에서 type=concept 검색). 통계 식에 paths.steps 합계 포함.
- 그래프: `GraphEdgeKind`에 `path-pattern` 추가. `buildEdges`의 path 루프가 `step.type` 분기.
- UI 두 화면:
  - `/learn` (목록): 카드 chip이 step.type에 따라 mint/gold 분기. 카운트가 "N개 단계 · 개념 X · 패턴 Y" 표기.
  - `/learn/[path]` (상세): ol 단계가 type별 색 분기 (mint/gold 번호 칩 + 카테고리 라벨). pattern 단계는 `패턴 · {PatternCategory}` 형식.
- `/wiki/[slug]` PatternView에 mint 그룹 "이 패턴이 포함된 학습 경로" 추가 (3개 패턴은 build-a-system 경로 노출).

## Files to read first (다음 세션)

1. `feature_list.json` — `active_feature`가 null. 4개 planned 중 무엇을 올릴지 결정.
2. `progress.md` — Recommended Next Step에 4개 후보 + 권장(`tokendemo-theme-aware`).
3. 선택한 active feature의 `files` 배열에서 시작.

## Decisions already made

- LearnPath 마이그레이션은 backward-compat 없이 **완전 교체**. 외부 의존이 없는 내부 컨텐츠라 가능했음. 데이터·헬퍼·UI·그래프 모두 한 번에.
- `getPathSteps`는 `LearnPathStepNode = { type, node }` 형태로 펼쳐서 리턴 — UI가 step별 type 분기를 자연스럽게 처리.
- TS narrowing 패턴: `step.type === "pattern"` 인라인 비교 안에서만 `step.node`가 narrow됨. `const isPattern = ...`이나 `const node = step.node`로 추출하면 union 평탄해져서 카테고리 lookup이 깨짐. 인라인 ternary 유지가 정답.

## Open questions for the user (필요 시 확인)

1. **커밋·푸시 허락**: Phase 5 변경 (7 src + 3 state)을 커밋해도 되는지. 메시지 후보: `Phase 5: learn paths include patterns` 또는 `feat: paths now mix concepts and patterns`.
2. **다음 active feature**: 권장 `tokendemo-theme-aware`, 또는 `ai-builder-school-cross-link`(10분)를 함께 묶어도 됨.

## Blockers

없음. 커밋 허가만 받으면 라이브 검증까지 한 번에 진행.

## Restart Path (clean cold start, 1분 안에)

```bash
cd "/Users/taewookkim/Design System School"
./init.sh
git status
cat feature_list.json | head -40
cat progress.md
```

## Next Session — 첫 행동

1. `./init.sh` 실행 (clean build 확인).
2. `git status` — 미커밋 변경이 있다면 Phase 5 산출물. 사용자에게 커밋 여부 확인.
3. `feature_list.json`의 `active_feature` 선정 — `progress.md` Recommended Next Step의 4개 후보 중 하나.
4. 선정 후 `active_feature` 값 갱신하고 작업 시작.
