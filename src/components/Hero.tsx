// 홈 히어로 — 동적·적극적 톤. 오른쪽에 온톨로지 그래프 비주얼.
import Link from "next/link";
import { Container } from "@/components/Layout";

const NODES = [
  { label: "색채", x: 18, y: 16, kind: "c", delay: "0s" },
  { label: "타이포그래피", x: 60, y: 9, kind: "c", delay: "0.6s" },
  { label: "디자인 토큰", x: 38, y: 40, kind: "c", delay: "1.2s" },
  { label: "토스 분석", x: 73, y: 47, kind: "a", delay: "0.3s" },
  { label: "여백", x: 12, y: 64, kind: "c", delay: "0.9s" },
  { label: "KRDS 분석", x: 56, y: 76, kind: "a", delay: "1.5s" },
];

// 그래프 엣지 (노드 인덱스 쌍)
const EDGES: [number, number][] = [
  [0, 2],
  [1, 2],
  [2, 3],
  [0, 4],
  [2, 5],
  [3, 5],
];

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="dot-grid absolute inset-0 opacity-60" aria-hidden />
      <div
        className="absolute -right-40 -top-40 h-[460px] w-[460px] rounded-full opacity-25 blur-3xl surface-gradient"
        aria-hidden
      />
      <Container className="relative grid gap-12 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-28">
        <div className="animate-rise-in">
          <p className="eyebrow text-accent-ink">
            AI Builder School의 형제 사이트
          </p>
          <h1 className="mt-5 text-[clamp(38px,6vw,66px)] font-extrabold leading-[1.04] tracking-[-0.035em] text-ink">
            디자인을 배우고,
            <br />
            분석하고,
            <br />
            <span className="text-gradient">시스템으로 남긴다.</span>
          </h1>
          <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-ink-mute">
            Design System School은 디자인 기초·UI/UX를 가르치고, 성공한 디자인을
            해부하고, 그 결과를 AI 코딩 에이전트가 그대로 쓰는{" "}
            <strong className="font-semibold text-ink">DESIGN.md</strong>로
            남기는 온톨로지 기반 디자인 지식 플랫폼입니다. AI 시대의 나만의
            브랜드 디자이너가 되는 곳.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/learn"
              className="rounded-pill bg-ink px-6 py-3.5 text-[14.5px] font-semibold text-bg transition-transform hover:-translate-y-0.5"
            >
              학습 시작하기 →
            </Link>
            <Link
              href="/wiki"
              className="rounded-pill border border-line-strong bg-surface px-6 py-3.5 text-[14.5px] font-semibold text-ink transition-colors hover:border-ink"
            >
              위키 둘러보기
            </Link>
          </div>
          <dl className="mt-10 flex gap-8">
            {[
              { k: "개념 노드", v: "10" },
              { k: "디자인 분석", v: "4" },
              { k: "학습 경로", v: "2" },
            ].map((s) => (
              <div key={s.k}>
                <dt className="text-[12px] text-ink-faint">{s.k}</dt>
                <dd className="font-mono text-[26px] font-bold text-ink">
                  {s.v}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative hidden lg:block" aria-hidden>
          <div className="relative h-full min-h-[420px] rounded-2xl border border-line bg-surface/70 shadow-soft backdrop-blur-sm">
            <span className="eyebrow absolute left-5 top-5 text-ink-faint">
              Design Ontology
            </span>
            <svg className="absolute inset-0 h-full w-full">
              {EDGES.map(([a, b], i) => (
                <line
                  key={i}
                  x1={`${NODES[a].x + 6}%`}
                  y1={`${NODES[a].y + 6}%`}
                  x2={`${NODES[b].x + 6}%`}
                  y2={`${NODES[b].y + 6}%`}
                  stroke="rgb(var(--border-strong))"
                  strokeWidth="1.5"
                  strokeDasharray="3 4"
                />
              ))}
            </svg>
            {NODES.map((n) => (
              <span
                key={n.label}
                className="absolute animate-float rounded-pill border px-3 py-1.5 text-[12.5px] font-semibold shadow-soft"
                style={{
                  left: `${n.x}%`,
                  top: `${n.y}%`,
                  animationDelay: n.delay,
                  background:
                    n.kind === "c"
                      ? "rgb(var(--accent-soft))"
                      : "rgb(var(--pop-soft))",
                  borderColor:
                    n.kind === "c" ? "rgb(var(--accent))" : "rgb(var(--pop))",
                  color:
                    n.kind === "c"
                      ? "rgb(var(--accent-ink))"
                      : "rgb(var(--pop-ink))",
                }}
              >
                {n.label}
              </span>
            ))}
            <div className="absolute bottom-5 left-5 right-5 flex gap-4 text-[11.5px] text-ink-faint">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-pill bg-accent" /> 개념
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-pill bg-pop" /> 분석
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
