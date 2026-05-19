import Link from "next/link";
import { Hero } from "@/components/Hero";
import { Container } from "@/components/Layout";
import { Section, SectionHeading } from "@/components/Section";
import { TokenDemo } from "@/components/TokenDemo";
import { AnalysisCard } from "@/components/AnalysisCard";
import { getAnalyses } from "@/lib/content";

const LAYERS = [
  { name: "원칙", en: "Principles", desc: "무엇을 중요하게 볼지에 대한 합의", w: "100%" },
  { name: "토큰", en: "Tokens", desc: "색·간격·반경 — 가장 작은 디자인 결정", w: "84%" },
  { name: "컴포넌트", en: "Components", desc: "버튼·입력창처럼 재사용하는 UI 조각", w: "68%" },
  { name: "패턴", en: "Patterns", desc: "컴포넌트를 조합해 반복 문제를 푸는 방식", w: "52%" },
  { name: "가이드라인", en: "Guidelines", desc: "언제 무엇을 쓸지에 대한 판단", w: "36%" },
];

const LENSES = [
  {
    href: "/learn",
    eyebrow: "Learn",
    title: "배우기",
    desc: "개념을 큐레이션한 학습 경로. 용어가 낯선 사람을 위한 순서가 있다.",
    soft: "rgb(var(--mint-soft))",
    ink: "rgb(var(--mint-ink))",
  },
  {
    href: "/wiki",
    eyebrow: "Wiki",
    title: "위키",
    desc: "디자인 개념과 UI 패턴의 온톨로지. 모든 노드가 서로 링크되고 분석과 연결된다.",
    soft: "rgb(var(--accent-soft))",
    ink: "rgb(var(--accent-ink))",
  },
  {
    href: "/collection",
    eyebrow: "Collection",
    title: "컬렉션",
    desc: "성공한 디자인의 분석 카탈로그. 각 항목이 DESIGN.md를 산출한다.",
    soft: "rgb(var(--pop-soft))",
    ink: "rgb(var(--pop-ink))",
  },
];

export default function HomePage() {
  const analyses = getAnalyses();

  return (
    <>
      <Hero />

      {/* 디자인 시스템이란 — 다섯 개의 층 */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="What is a Design System"
              title={<>디자인 시스템은 &lsquo;UI 키트&rsquo;가 아니다</>}
              lede="버튼 모음이 아니라, 하나의 제품을 여러 사람이 일관되게 만들기 위한 합의의 묶음입니다. 아래에서 위로 다섯 개의 층이 쌓입니다."
            />
            <p className="text-[15px] leading-relaxed text-ink-mute">
              아래층이 흔들리면 위층이 전부 흔들립니다. 그래서 토큰이 먼저고,
              가이드라인이 마지막입니다. 이 사이트의 위키는 이 다섯 층을 개념
              노드로 풀어둔 것입니다.
            </p>
            <Link
              href="/wiki/design-system"
              className="mt-6 inline-flex font-mono text-[13.5px] font-medium text-accent-ink hover:underline"
            >
              개념 노드에서 자세히 →
            </Link>
          </div>
          <div className="grid gap-2.5">
            {LAYERS.map((l, i) => (
              <div
                key={l.name}
                className="rounded-lg border border-line bg-surface p-4 transition-transform hover:translate-x-1"
                style={{ width: l.w, minWidth: "min(100%, 280px)" }}
              >
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-[11px] text-ink-faint">
                    L{LAYERS.length - i}
                  </span>
                  <span className="text-[15px] font-bold text-ink">
                    {l.name}
                  </span>
                  <span className="font-mono text-[11px] text-ink-faint">
                    {l.en}
                  </span>
                </div>
                <p className="mt-1 text-[12.5px] text-ink-mute">{l.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* 세 개의 렌즈 */}
      <Section className="bg-bg-soft/50">
        <SectionHeading
          eyebrow="One Graph, Three Lenses"
          title="하나의 그래프, 세 개의 렌즈"
          lede="모든 콘텐츠는 디자인 지식 그래프의 노드입니다. 같은 그래프를 세 가지 방식으로 봅니다."
        />
        <div className="grid gap-5 sm:grid-cols-3">
          {LENSES.map((lens) => (
            <Link
              key={lens.href}
              href={lens.href}
              className="group rounded-xl border border-line bg-surface p-6 transition-all hover:-translate-y-1.5 hover:shadow-soft"
            >
              <span
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg font-mono text-[15px] font-bold"
                style={{ background: lens.soft, color: lens.ink }}
              >
                {lens.title[0]}
              </span>
              <p
                className="eyebrow mt-4"
                style={{ color: lens.ink }}
              >
                {lens.eyebrow}
              </p>
              <h3 className="mt-1 text-[20px] font-bold tracking-tight text-ink">
                {lens.title}
              </h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-ink-mute">
                {lens.desc}
              </p>
              <span
                className="mt-4 inline-block font-mono text-[13px] transition-transform group-hover:translate-x-1"
                style={{ color: lens.ink }}
              >
                →
              </span>
            </Link>
          ))}
        </div>
      </Section>

      {/* 해부학 — TokenDemo */}
      <Section>
        <SectionHeading
          eyebrow="Anatomy"
          title="디자인 시스템 해부하기"
          lede="색·타이포·여백·반경. 디자인 시스템의 부품을 직접 만져 보세요. 아래 토큰은 설명용 예시가 아니라, 지금 이 사이트가 실제로 쓰는 토큰입니다."
        />
        <TokenDemo />
        <p className="mt-4 text-[13px] text-ink-faint">
          탭을 눌러 색·타이포·여백·반경 토큰을 살펴보세요. 색은 클릭하면 HEX가
          복사됩니다.
        </p>
      </Section>

      {/* 컬렉션 미리보기 */}
      <Section className="bg-bg-soft/50">
        <div className="flex items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Collection"
            title="한국의 디자인 시스템 4선"
            lede="성격이 다른 네 개의 시스템. 핀테크·공공·이커머스·채용 — 각각 무엇을 잘하는지 해부했습니다."
            accent="pop"
          />
          <Link
            href="/collection"
            className="mb-10 hidden shrink-0 font-mono text-[13.5px] font-medium text-pop-ink hover:underline sm:inline"
          >
            전체 컬렉션 →
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {analyses.map((a) => (
            <AnalysisCard key={a.slug} analysis={a} />
          ))}
        </div>
      </Section>

      {/* DESIGN.md 다리 */}
      <Section>
        <div className="overflow-hidden rounded-2xl border border-line bg-ink">
          <Container className="px-8 py-14 sm:px-12">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="eyebrow text-pop">DESIGN.md</p>
                <h2 className="mt-3 text-[clamp(24px,3.2vw,34px)] font-bold leading-tight tracking-tight text-bg">
                  배운 디자인을, AI가 쓰는 포맷으로
                </h2>
                <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-bg/70">
                  여기서 분석한 모든 디자인은 DESIGN.md로 산출됩니다. 색·타이포·
                  여백·컴포넌트를 구조화한 마크다운 한 장이면, Claude Code·Cursor
                  같은 AI 코딩 에이전트가 그 디자인 언어로 UI를 만듭니다.
                  배우기에서 끝나지 않고, 만드는 데까지 이어집니다.
                </p>
                <Link
                  href="/design-md"
                  className="mt-6 inline-flex rounded-pill bg-pop px-5 py-3 text-[14px] font-semibold text-white transition-transform hover:-translate-y-0.5"
                >
                  DESIGN.md란 무엇인가 →
                </Link>
              </div>
              <pre className="hidden rounded-xl border border-white/10 bg-black/40 px-5 py-4 font-mono text-[12px] leading-[1.7] text-bg/80 lg:block">
{`# Toss — DESIGN.md
## Color
- toss-blue: #3182F6
## Spacing
- 8pt scale
## Principles
- 명료함 > 화려함`}
              </pre>
            </div>
          </Container>
        </div>
      </Section>
    </>
  );
}
