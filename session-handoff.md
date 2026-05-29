# Session Handoff

> 세션 끝낼 때 다음 세션(에이전트·사람 누구든)이 cold start로 이어받을 수 있도록 남기는 인수인계.
> `progress.md`가 "지금까지 무엇이 됐나"라면, 이 파일은 "다음 사람이 첫 1분 안에 알아야 할 것".

## Last Updated

2026-05-29

## Current Objective

Phase 4~9 모두 완료. `feature_list.json`의 `active_feature`는 비어 있다 (null). 그동안 쌓인 planned가 모두 done으로 정리됐다. 다음 라운드의 첫 결정은 새 active를 선정하는 것 — 거의 모든 planned가 소진됐으니 사용자가 새 아이디어를 적는 라운드부터 시작하는 게 자연스러움.

## In my head right now (다음 세션이 이 부분은 다시 읽지 않아도 됨)

- 노드 타입은 concept · pattern · analysis 세 개의 1급 타입. LearnPath는 그래프 시각화에서만 `path` 노드로 보임.
- `/wiki/[slug]`는 concept·pattern 슬러그를 한 네임스페이스에서 resolve. 현재 충돌 없음.
- 색 매핑: concept=indigo(`accent`), pattern=amber(`gold`), analysis=coral(`pop`), path=teal(`mint`).
- 다크 모드는 `[data-theme="dark"]`가 토큰을 갈아끼우는 방식.
- 그래프 결정론적 force 레이아웃 — `src/lib/graph.ts`가 모듈 로드 시 1회 계산해 export.
- 검증은 `npm run check` (lint + typecheck + build) 한 줄로 끝. 별도 test runner 없음.
- Vercel은 `USE_DEFAULT_DIST=1`로 표준 `.next` 사용, 로컬은 `.next.nosync`.
- **Phase 9 변경분 워킹 트리에 대기** — `scripts/extract-design-spec.ts`·`scripts/README.md` 신규 + `feature_list.json`·`progress.md`·`session-handoff.md` 갱신.
- 그래프 엣지 4축이 모두 닫힘 — concept-concept · pattern-(concept/pattern) · analysis-(concept/pattern) · path-(concept/pattern). 새 노드 타입 추가 시 이 6종 분기 패턴이 템플릿.

## What just shipped (Phase 6·7·8·9 push 완료 + Phase 10 워킹 트리)

- **Phase 6** (`d178bda`) — TokenDemo가 `getComputedStyle` + `MutationObserver`로 라이브 CSS 변수 읽음. 칩 배경은 `rgb(var(--token))`로 자동 테마 반응. gold 토큰 포함.
- **Phase 7** (`ccddc1d`) — `SIBLING_SITE` 상수 (https://ai-builder-school-2.vercel.app/). 헤더 ThemeToggle 옆 + 푸터 brand 영역에 외부 링크. md+에서 라벨 노출, 모바일은 아이콘만.
- **Phase 8** (`6346f4a`) — OntologyGraph가 `matchMedia('(max-width: 640px)')`·`matchMedia('(hover: none)')` 감지. 좁은 화면에서 더 큰 노드(16+1.9)와 라벨(17px). 터치 디바이스 두 번 탭 패턴 (첫 탭 armed, 두 번째 탭 router.push). armed 상태는 accent stroke 두께 4 + '탭하면 이동 →' 라벨.
- **Phase 9** (`5926c25`) — `scripts/extract-design-spec.ts`: fetch + meta·색·폰트 추출 + AnalysisDesignSpec TS 객체 직렬화. TODO 마커로 사람 검수 부분 표시. `scripts/README.md`에 자동/수동 경계 표 + 신규 analysis 추가 흐름.
- **Phase 10** (커밋 대기) — `OntologyGraph.tsx`에 `EDGE_STROKE: Record<GraphEdgeKind, string>` 매핑. 6종 엣지가 4색(amber/coral/teal/회색)으로 묶임. hover 시 동일 색을 opacity 0.95로 강조. 필터 범례 아래 한 줄 안내 추가.

## Files to read first (다음 세션)

1. `feature_list.json` — `active_feature`가 null. 남은 planned는 `design-md-extract-validate` 하나 (도구 실전 검증).
2. `progress.md` — Recommended Next Step + 후보로 떠오른 아이디어 5개 메모.
3. 사용자 의도 확인 후 시작.

## Decisions already made

- TokenDemo: CSS 변수 single-source-of-truth 유지. JS에 hex 다시 적지 않고 `getComputedStyle`로 정직하게 노출.
- 헤더 외부 링크: 텍스트+아이콘 (데스크탑), 아이콘만 (모바일). 별도 모바일 메뉴를 새로 만들지 않고 푸터에서 보완.
- OntologyGraph 두 번 탭 패턴: `(hover: none)` 미디어쿼리로 디바이스 식별. armed 상태 = setHoveredId와 같은 효과 + 별도 시각 강조. 키보드는 호버 모델과 분리 (Enter/Space 즉시 이동, 접근성 유지).
- 추출 도구: 빌드 외부 도구 (`scripts/`)로 분리. tsconfig include는 잡지만 빌드 결과에는 안 들어감. `npx tsx`로 실행 (devDep 추가 없이).
- Phase 9의 `done_criteria` 중 "신규 analysis 노드에 검증 적용"은 별도 항목 `design-md-extract-validate`로 분리 — 콘텐츠 추가는 단일 자율 사이클로 끝내기 어려운 작업.

## Open questions for the user (필요 시 확인)

1. **Phase 9 커밋·푸시 허락**: scripts 2개 + 상태 파일 3개. 메시지 후보: `Phase 9: design-spec extraction tool`.
2. **새 active_feature**: `design-md-extract-validate`로 갈지, 새 아이디어 등록 라운드를 가질지. 후보 5개가 progress.md에 메모됨.
3. **그래프 엣지 시각 차별화**: 6종 엣지가 모두 회색. 종류별 색 분기를 follow-up planned로 등록할지.

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

1. `./init.sh` 실행.
2. `git status` — 미커밋 변경이 있다면 Phase 9 산출물. 사용자에게 커밋 여부 확인.
3. `feature_list.json`의 `active_feature` 선정 — `progress.md`의 후보 5개와 `design-md-extract-validate` 중 하나, 또는 새 아이디어 등록 라운드.
4. 선정 후 `active_feature` 값 갱신하고 작업 시작.
