# scripts/

빌드 외부에서 돌리는 도구 모음.

## `extract-design-spec.ts`

웹사이트 URL을 받아 `AnalysisDesignSpec` 객체 초안을 만든다. 새 analysis 노드의 시작점.

### 사용법

```bash
# stdout으로 초안 출력
npx tsx scripts/extract-design-spec.ts https://linear.app

# 파일로 바로 저장 (slug·name 명시)
npx tsx scripts/extract-design-spec.ts https://linear.app \
  --slug linear --name "Linear" \
  --out src/content/design-specs/linear.ts
```

`tsx`가 없다면 npx가 자동으로 받아 실행한다. 자주 쓰면 `npm i -D tsx`로 고정해도 된다.

### 자동 추출 vs 사람 검수 — 경계

| 영역 | 자동 추출 | 사람 검수 필요 |
|---|---|---|
| `summary` | meta description / og:description | 다듬어야 자연스러움 |
| `colors` (hex 빈도 상위 8) | Brand 3 + Neutral 5 후보 | Brand vs Neutral vs Semantic 분류, 토큰 이름 부여 |
| `font` | Google Fonts link, font-family 선언 1순위 | 본문/디스플레이 분리 |
| `principles` | ❌ | 100% 사람 |
| `typeScale` | ❌ | px·weight·label 직접 측정 |
| `spacing` · `radii` | ❌ | 실측 또는 화면 관찰 |
| `components` | ❌ | 관찰된 패턴 직접 정리 |
| `aiUsage` | ❌ | AI 에이전트에게 줄 안내문 직접 작성 |

자동 추출은 "시작 시간을 줄이는" 도구일 뿐. 디자인 분석의 핵심인 *어떤 결정이 어떤 효과를 내는가*는 여전히 사람이 작성한다.

### 한계

- JavaScript가 동적으로 주입하는 색은 못 잡는다 (CSS-in-JS 동적 토큰, 인라인 style 추가)
- shadow·radius·spacing 같은 실측 값은 브라우저 inspector가 필요하다
- 색의 *의미* (어떤 게 brand·neutral·semantic)는 컨텍스트 판단

### 다음 단계 (신규 analysis 노드 추가 흐름)

1. 도구를 한 번 돌려서 `src/content/design-specs/<slug>.ts` 초안 작성
2. 파일에 깔린 `TODO:` 표시를 하나씩 제거하면서 검수
3. `src/content/design-specs/index.ts` 매핑 등록
4. `src/content/ontology.ts`의 `analyses` 배열에 노드 추가 (org · industry · delivery · demonstrates · demonstratesPatterns)
5. `src/content/analyses/<slug>.mdx` 본문 작성
6. `src/content/bodies.ts`에 본문 컴포넌트 매핑
7. `npm run check` 통과 확인

이 흐름의 검증 작업은 `feature_list.json`의 `design-md-extract-validate` 항목 (도구를 실제 한 사이트로 돌려보고 새 analysis를 끝까지 추가) 참고.
