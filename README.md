# Design System School

온톨로지 기반 디자인 지식 플랫폼. **AI Builder School의 형제 사이트**다.

AI Builder School이 "AI로 만드는 빌더"를 기른다면, Design System School은 "AI 시대의 나만의 브랜드 디자이너"를 기른다. 디자인 기초·UI/UX를 배우고, 성공한 디자인을 분석하고, 그 결과를 AI 코딩 에이전트가 바로 쓰는 **DESIGN.md**로 산출한다.

## 핵심 개념 — 하나의 그래프, 세 개의 렌즈

모든 콘텐츠는 디자인 지식 그래프(온톨로지)의 노드다.

- **개념(Concept)** — 디자인 기초·UI/UX 위키 항목 (`src/content/concepts/`)
- **분석(Analysis)** — 성공한 디자인을 해부한 사례 (`src/content/analyses/`)

같은 그래프를 세 가지로 본다.

- **배우기(Learn)** `/learn` — 개념을 큐레이션한 학습 경로
- **위키(Wiki)** `/wiki` — 온톨로지 탐색, 노드 상호 링크
- **컬렉션(Collection)** `/collection` — 분석 카탈로그, 각 항목이 DESIGN.md 산출

그래프 정의의 단일 진실 공급원은 `src/content/ontology.ts`다.

## 개발

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npm run typecheck
npm run build
npm run check      # lint + typecheck + build
```

빌드 디렉터리는 `.next.nosync` (iCloud 동기화 회피). 경로에 공백이 있으니 인용 부호로 감쌀 것.

## 콘텐츠 추가

- **개념** — `src/content/concepts/<slug>.mdx` 작성 + `ontology.ts`에 노드 등록.
- **분석** — `src/content/analyses/<slug>.mdx` + `src/content/design-md/<slug>.design.md` 작성 + `ontology.ts`에 노드 등록.
- DB·백엔드는 없다. 콘텐츠는 git으로 성장한다.

## 스택

Next.js 15 App Router · React 19 · TypeScript 5 · Tailwind 3 · MDX 3 (remark-gfm)
