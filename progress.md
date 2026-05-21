# Progress

> 세션 간 living document. 변경·증거·다음 단계를 누적 기록한다. 한 세션을 마치기 전 갱신한다.

## Last Updated

2026-05-21

## Current State

배포·온톨로지·UI·교차 엣지·학습 경로·토큰 데모·모바일 그래프·외부 링크·추출 도구까지 모두 가동.

- GitHub `sgeniusk/design-system-school` (public) → Vercel 자동 배포. Phase 4·5·6·7·8 모두 push 완료. Phase 9는 워킹 트리에서 커밋 대기.
- 라이브: https://design-system-school.vercel.app
- 그래프 통계: 개념 21 · 패턴 6 · 분석 5 · 학습 경로 2. 엣지 4축이 모두 닫힘 (concept-concept · pattern-(concept/pattern) · analysis-(concept/pattern) · path-(concept/pattern)).
- 4 노드 타입(concept/pattern/analysis/path) × 의미색(indigo/amber/coral/teal) 매핑 안착.
- 라이트·다크 모드 토글 작동. TokenDemo가 라이브 토큰 값을 실제로 노출 (라이트·다크 즉시 갱신).
- OntologyGraph가 모바일에서 더 큰 노드·라벨, 터치 디바이스에서는 두 번 탭 패턴.
- 헤더·푸터에 AI Builder School 외부 링크.
- `scripts/extract-design-spec.ts` — URL → AnalysisDesignSpec 초안 도구 (자동 추출 + TODO 마커).

## Current Objective

`active_feature`가 비어 있다. 큰 작업 4개(Phase 4~8)·도구 1개(Phase 9)를 끝낸 상태. 다음 라운드는 follow-up 한 가지(`design-md-extract-validate` — 추출 도구 실전 검증)와 사용자가 새로 떠올린 아이디어에서 시작.

## What was done in the last session(s)

| 커밋 | 내용 |
|---|---|
| `c32b962` | Letters analysis 노드 |
| `53fa923` | Phase 1 — pattern 노드 타입 + amber 토큰 + 시드 6개 |
| `274cfe0` | Phase 2 — concept 11개 확장 (behavior/content/engineering 카테고리) |
| `bd5e898` | Phase 3a — WikiBrowser 검색·점프 + 홈 패턴 섹션 + 브랜드 폴리시 |
| `c57d16f` | Phase 3b — 다크 모드 (theming 토큰 갈아끼우기) |
| `e00a097` | 프로젝트 하니스 (feature_list·progress·handoff·init.sh) |
| `7b526d9` | Phase 4 — analysis→pattern 엣지 |
| `28ffe8a` | Phase 5 — LearnPath steps + path→pattern 엣지 + UI 두 타입 분기 |
| `d178bda` | Phase 6 — TokenDemo theme-aware (getComputedStyle + MutationObserver) |
| `ccddc1d` | Phase 7 — AI Builder School cross-link (헤더·푸터) |
| `6346f4a` | Phase 8 — OntologyGraph 모바일 폴리시 (matchMedia · 두 번 탭) |
| _커밋 대기_ | Phase 9 — extract-design-spec.ts 도구 + README + feature_list/progress/handoff 갱신 |

## Recommended Next Step

`active_feature`를 다음 중 하나로 정하고 시작.

1. **`design-md-extract-validate`** — 권장하지 않음 (큼·결정 다수). 도구 사용 실전 검증. 새 사이트 선정·analysis 노드 추가까지 끝.
2. **사용자 새 아이디어** — 그래프 4축이 닫힌 이 시점이 자연스러운 정리 지점. 그동안 떠오른 후보를 `feature_list.json`에 `planned`로 적어두는 라운드를 먼저 가지는 게 좋을 수도.

후보로 떠오른 것들 (아직 planned 아님 — 사용자 동의 시 추가):

- 새 analysis 노드 (Linear·Stripe·Vercel·Notion·Pretendard 같은 잘 알려진 디자인 시스템). `design-md-extract-validate`로 한 번 검증 후 본격 확장
- OntologyGraph 엣지 종류별 색 분기 (지금은 6종 엣지가 모두 회색 — 시각적 분류 정보 누락)
- `/ontology` 페이지 상단에 "이 그래프는 무엇을 보여주나" 설명 카드
- 위키 노드 페이지의 "한 줄 정의" 카드 (summary가 본문 위에 평문으로만 있음)
- 홈 페이지 hero에 그래프 미니 미리보기 (clickable preview)

## Blockers

없음.

## Files most recently touched (Phase 9)

- `scripts/extract-design-spec.ts` — URL fetch + 색·폰트·meta 추출 + AnalysisDesignSpec TS 객체 직렬화.
- `scripts/README.md` — 자동/수동 경계 표 + 신규 analysis 노드 추가 흐름.
- `feature_list.json` — 4개 planned → done 마킹 + `design-md-extract-validate` 신규 항목 추가 + active_feature null.

## Verification Evidence

- Phase 6: commit `d178bda` · `/#tokens` 라이트·다크 토글 즉시 반응 확인.
- Phase 7: commit `ccddc1d` · 헤더·푸터에 외부 링크 노출.
- Phase 8: commit `6346f4a` · `/ontology` 8.18 → 8.5 kB (matchMedia + armed state 추가 영향).
- Phase 9: 도구 파일 + README 작성, npm run check 통과 (44 static pages, lint·typecheck·build clean). 도구는 빌드 외부 — 검증은 사용자가 실제 URL로 실행해보고 결과 확인.

## Next Session

세부 cold start 절차는 `session-handoff.md` 참고. 핵심 한 줄: `./init.sh` 돌리고 `feature_list.json`의 `active_feature` 선정 (또는 새 아이디어를 planned로 추가)부터 시작.
