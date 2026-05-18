import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Layout";
import { PageHead, Section, SectionHeading } from "@/components/Section";
import { getAnalyses } from "@/lib/content";

export const metadata: Metadata = {
  title: "DESIGN.md란 무엇인가",
  description:
    "DESIGN.md는 한 브랜드의 시각 언어를 AI 코딩 에이전트가 읽을 수 있는 마크다운으로 정리한 포맷입니다. 배운 디자인을 만드는 데까지 잇는 다리.",
};

const ANATOMY = [
  { k: "Identity & Principles", v: "이 디자인이 무엇을 중요하게 보는가" },
  { k: "Color", v: "브랜드·중립·의미 색 토큰" },
  { k: "Typography", v: "폰트와 타입 스케일" },
  { k: "Spacing", v: "간격 스케일 (보통 8pt 기반)" },
  { k: "Radius & Elevation", v: "반경과 그림자 토큰" },
  { k: "Components", v: "핵심 컴포넌트 목록과 규칙" },
  { k: "Usage for AI agents", v: "에이전트가 따라야 할 구체 지침" },
];

const STEPS = [
  {
    n: "01",
    t: "분석에서 내려받기",
    b: "컬렉션의 분석 페이지에서 DESIGN.md를 다운로드합니다.",
  },
  {
    n: "02",
    t: "프로젝트 루트에 두기",
    b: "내 프로젝트 폴더 최상단에 DESIGN.md 파일을 둡니다.",
  },
  {
    n: "03",
    t: "에이전트에게 가리키기",
    b: "Claude Code·Cursor에게 \"DESIGN.md를 따라 UI를 만들어줘\"라고 합니다.",
  },
];

export default function DesignMdPage() {
  const analyses = getAnalyses();

  return (
    <>
      <PageHead
        eyebrow="DESIGN.md"
        accent="pop"
        title="배운 디자인을, 기계가 읽는 한 장으로"
        lede="DESIGN.md는 한 브랜드의 시각 언어 — 색·타이포·여백·컴포넌트 — 를 AI 코딩 에이전트가 그대로 읽어 쓰는 마크다운 포맷입니다. 디자인을 배우는 것과 만드는 것 사이의 다리입니다."
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="What"
              title="명세서가 아니라, 공유 언어"
              accent="pop"
            />
            <div className="grid gap-4 text-[15px] leading-relaxed text-ink-mute">
              <p>
                예전에는 디자인을 개발자에게 넘길 때 긴 명세 문서나 Figma 링크를
                건넸습니다. 이제는 AI 코딩 에이전트가 그 일을 합니다. 문제는
                에이전트가 &lsquo;우리다운 디자인&rsquo;을 모른다는 것입니다.
              </p>
              <p>
                DESIGN.md는 그 간극을 메웁니다. 색 토큰, 타입 스케일, 여백 규칙,
                컴포넌트 원칙을 구조화된 마크다운 한 장에 적어 두면, 에이전트가
                매번 같은 디자인 언어로 UI를 만듭니다.
              </p>
              <p>
                이것은 AI Builder School이 가르치는{" "}
                <strong className="text-ink">
                  &lsquo;스키마가 곧 도구&rsquo;
                </strong>{" "}
                라는 생각의 디자인 버전입니다. 잘 정리된 디자인 결정은, 그
                자체로 AI를 다루는 도구가 됩니다.
              </p>
            </div>
          </div>
          <pre className="overflow-x-auto rounded-xl border border-line bg-ink px-6 py-5 font-mono text-[12.5px] leading-[1.75] text-bg/85">
{`# Toss — DESIGN.md

## Color
- toss-blue: #3182F6   (핵심 행동에만)
- grey-900: #191F28    (제목)
- grey-700: #4E5968    (본문)

## Spacing
- 8pt scale: 4 8 12 16 24 32

## Principles
- 명료함 > 화려함
- 한 화면, 하나의 주행동`}
          </pre>
        </div>
      </Section>

      <Section className="bg-bg-soft/50">
        <SectionHeading
          eyebrow="Anatomy"
          title="DESIGN.md 한 장에 담기는 것"
          accent="pop"
        />
        <div className="grid gap-3 sm:grid-cols-2">
          {ANATOMY.map((a) => (
            <div
              key={a.k}
              className="flex items-baseline gap-3 rounded-lg border border-line bg-surface px-4 py-3"
            >
              <span className="font-mono text-[12.5px] font-semibold text-pop-ink">
                {a.k}
              </span>
              <span className="text-[13.5px] text-ink-mute">{a.v}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="How to use"
          title="세 단계면 끝"
          accent="pop"
        />
        <div className="grid gap-5 sm:grid-cols-3">
          {STEPS.map((s) => (
            <div
              key={s.n}
              className="rounded-xl border border-line bg-surface p-6"
            >
              <span className="font-mono text-[13px] font-bold text-pop">
                {s.n}
              </span>
              <h3 className="mt-2 text-[16px] font-bold text-ink">{s.t}</h3>
              <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-mute">
                {s.b}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-line bg-bg-soft/60 p-8 text-center">
          <h3 className="text-[20px] font-bold tracking-tight text-ink">
            바로 받아 보세요
          </h3>
          <p className="mx-auto mt-2 max-w-md text-[14px] text-ink-mute">
            컬렉션의 네 가지 분석은 모두 다운로드 가능한 DESIGN.md를 갖고
            있습니다.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-2.5">
            {analyses.map((a) => (
              <Link
                key={a.slug}
                href={`/collection/${a.slug}`}
                className="rounded-pill border border-line-strong bg-surface px-4 py-2 text-[13px] font-medium text-ink transition-colors hover:border-pop hover:text-pop-ink"
              >
                {a.title}
              </Link>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
