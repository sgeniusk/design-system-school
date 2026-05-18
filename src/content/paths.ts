// 학습 경로 — 개념 노드를 큐레이션한 순서.
import type { LearnPath } from "@/lib/types";

export const paths: LearnPath[] = [
  {
    slug: "design-basics",
    title: "디자인 입문 — 처음 만나는 디자인 시스템",
    tagline: "용어가 낯선 사람을 위한 첫 경로",
    description:
      "'디자인 시스템'이라는 말이 막연하다면 여기서 시작한다. 시스템이 무엇인지, 색·타이포·여백이 어떻게 위계를 만드는지, 그리고 왜 접근성이 출발점인지를 순서대로 익힌다.",
    level: "intro",
    conceptSlugs: [
      "design-system",
      "color",
      "typography",
      "spacing",
      "visual-hierarchy",
      "accessibility",
    ],
  },
  {
    slug: "build-a-system",
    title: "나만의 디자인 시스템 만들기",
    tagline: "토큰에서 패턴까지, 직접 쌓아 올리는 경로",
    description:
      "기초를 넘어 작게라도 내 시스템을 만들고 싶을 때. 토큰을 정의하고, 색·타이포·여백 스케일을 정하고, 컴포넌트와 패턴으로 올려 AI 에이전트가 쓸 DESIGN.md까지 잇는다.",
    level: "core",
    conceptSlugs: [
      "design-tokens",
      "color",
      "typography",
      "spacing",
      "components",
      "patterns-guidelines",
    ],
  },
];
