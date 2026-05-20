# Session Handoff

> 세션 끝낼 때 다음 세션(에이전트·사람 누구든)이 cold start로 이어받을 수 있도록 남기는 인수인계.
> `progress.md`가 "지금까지 무엇이 됐나"라면, 이 파일은 "다음 사람이 첫 1분 안에 알아야 할 것".

## Last Updated

2026-05-21

## Current Objective

`feature_list.json` → `active_feature` = **`analysis-pattern-edges`** — analysis가 pattern도 demonstrate하도록 스키마·페이지 확장.

## In my head right now (다음 세션이 이 부분은 다시 읽지 않아도 됨)

- 노드 타입은 concept · pattern · analysis 세 개의 1급 타입. LearnPath는 그래프 시각화에서만 `path` 노드로 보임.
- `/wiki/[slug]`는 concept 슬러그와 pattern 슬러그를 **한 네임스페이스에서** resolve. 현재 슬러그 충돌 없음.
- 색 매핑: concept=indigo(`accent`), pattern=amber(`gold`), analysis=coral(`pop`), path=teal(`mint`).
- 다크 모드는 `[data-theme="dark"]`가 토큰을 갈아끼우는 방식. 컴포넌트 추가 수정 없이 새 토큰만 양쪽에 정의하면 됨.
- 그래프는 `src/lib/graph.ts`가 모듈 로드 시 결정론적 force 레이아웃을 한 번 계산해 `graphData`로 export. 시드 PRNG라 SSR/CSR 일치.
- 검증은 `npm run check` (lint + typecheck + build) 한 줄로 끝. 별도 test runner 없음.
- Vercel은 환경변수 `USE_DEFAULT_DIST=1`이 있어 표준 `.next`를 사용하고, 로컬은 `.next.nosync` 유지 (`next.config.mjs`가 분기).

## Files to read first

1. `feature_list.json` — `active_feature`의 `done_criteria`·`files`.
2. `progress.md` — Recommended Next Step.
3. `src/lib/types.ts` — `AnalysisNode` 정의가 스키마 변경의 출발점.
4. `src/content/ontology.ts` — 5개 analyses와 6개 patterns 한자리에 있음.
5. `src/app/collection/[slug]/page.tsx` — analysis 상세 페이지 구조 (패턴 섹션을 어디에 넣을지 결정).
6. `src/components/NodeLinks.tsx` — `Accent` 타입은 이미 `gold` 포함, pop 그룹에 pattern→analysis 역참조를 추가하면 됨.

## Decisions already made

- analysis→pattern 엣지는 **별도 필드** `demonstratesPatterns`로 추가한다 (기존 `demonstrates`는 concept 전용으로 유지). 마이그레이션 비용 없음 + 의미 분리 명확.
- 그래프 엣지 종류는 `analysis-pattern` 신규 추가 (concept-concept · analysis-concept · pattern-concept · pattern-pattern · path-concept · **analysis-pattern**).
- pattern 페이지의 새 NodeLinks 그룹 라벨은 "이 패턴을 보여주는 분석", accent=`pop`.
- analysis 페이지의 새 섹션 라벨은 "이 사이트가 보여주는 패턴", amber 도트.

## Open questions for the user (필요 시 확인)

1. `demonstratesPatterns`를 모든 analysis에 필수로 둘지, optional로 둘지. 시작은 optional, 5개 analyses에 모두 채우고 나면 필수로 굳히는 게 자연스러움.
2. analysis 상세 페이지 안에서 '패턴' 섹션 위치 — 색·타이포·여백 같은 design spec 섹션의 위/아래 어디.
3. pattern slug 매핑 후보(`progress.md`의 Recommended Next Step에 적은 안)가 적절한지 사람의 한 번 검토.

## Blockers

없음. 위 질문 1·2·3은 진행하면서 작은 결정이라 막힘은 아님.

## Restart Path (clean cold start, 1분 안에)

```bash
cd "/Users/taewookkim/Design System School"
./init.sh
cat feature_list.json | head -40
cat progress.md
```

위 셋만 거치면 이번 세션의 컨텍스트가 95% 회복된다. 추가 정보가 필요하면 `git log --oneline -10`.

## Next Session — 첫 행동

1. `./init.sh` 실행 (clean build 확인).
2. `feature_list.json`의 `active_feature` 확인.
3. 위 Decisions·Open questions 한 번 읽고 사용자에게 1번(필수/optional) 한 가지만 묻는다. 2·3은 코드 보면서 같이 정해도 됨.
4. `progress.md`의 Recommended Next Step 1번부터 진행.
