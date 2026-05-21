"use client";
// 인터랙티브 토큰 데모 — 이 사이트가 실제로 쓰는 토큰을 살아있는 예시로 보여준다.
// 색 hex는 :root / [data-theme="dark"]의 CSS 변수에서 직접 읽어와, 테마 전환 시 자동 갱신된다.
import { useEffect, useState } from "react";

type Tab = "color" | "type" | "space" | "radius";

const TABS: { id: Tab; label: string }[] = [
  { id: "color", label: "색" },
  { id: "type", label: "타이포" },
  { id: "space", label: "여백" },
  { id: "radius", label: "반경" },
];

interface ColorToken {
  /** CSS 변수명. */
  name: string;
  /** SSR·hydration 직전 fallback (라이트 모드 hex). */
  fallback: string;
  note: string;
}

const COLORS: ColorToken[] = [
  { name: "--accent", fallback: "#5B43F5", note: "개념 · 위키" },
  { name: "--gold", fallback: "#E09A16", note: "패턴" },
  { name: "--pop", fallback: "#FF5C38", note: "분석 · 컬렉션" },
  { name: "--mint", fallback: "#0FB5A6", note: "학습 경로" },
  { name: "--ink", fallback: "#16171D", note: "본문 텍스트" },
  { name: "--ink-mute", fallback: "#70717C", note: "보조 텍스트" },
  { name: "--bg-soft", fallback: "#F1F1F4", note: "보조 배경" },
  { name: "--border", fallback: "#E7E7EC", note: "테두리" },
  { name: "--surface", fallback: "#FFFFFF", note: "카드 배경" },
];

const TYPE = [
  { px: 44, weight: 800, label: "display", sample: "디자인은 결정이다" },
  { px: 32, weight: 700, label: "title", sample: "디자인은 결정이다" },
  { px: 24, weight: 700, label: "heading", sample: "디자인은 결정이다" },
  { px: 20, weight: 600, label: "subhead", sample: "디자인은 결정이다" },
  { px: 16, weight: 400, label: "body", sample: "디자인은 결정이다 — 화면의 90%는 글자다." },
  { px: 13, weight: 400, label: "caption", sample: "디자인은 결정이다 — 보조 설명에 쓰는 크기" },
];

const SPACE = [4, 8, 12, 16, 24, 32, 48];
const RADIUS = [
  { name: "sm", px: 9 },
  { name: "base", px: 14 },
  { name: "lg", px: 20 },
  { name: "pill", px: 999 },
];

/** "R G B" 공백 분리 triplet → hex. CSS 변수의 RGB 표기 형식과 1:1. */
function rgbTripletToHex(triplet: string): string | null {
  const parts = triplet.trim().split(/\s+/).map((n) => parseInt(n, 10));
  if (parts.length !== 3 || parts.some((n) => Number.isNaN(n))) return null;
  return (
    "#" +
    parts
      .map((n) => Math.max(0, Math.min(255, n)).toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase()
  );
}

/** hex 배경 위에 가독성 있는 글자색을 자동 선택. */
function bestForeground(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  if (Number.isNaN(r) || Number.isNaN(g) || Number.isNaN(b)) return "#FFFFFF";
  const lum = 0.299 * r + 0.587 * g + 0.114 * b;
  return lum > 150 ? "#16171D" : "#FFFFFF";
}

export function TokenDemo() {
  const [tab, setTab] = useState<Tab>("color");
  const [copied, setCopied] = useState<string | null>(null);
  // CSS 변수에서 추출한 실제 hex — 라이트·다크 모두 정직하게 노출.
  const [tokenHex, setTokenHex] = useState<Record<string, string>>({});
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const root = document.documentElement;

    function readTokens() {
      const cs = getComputedStyle(root);
      const next: Record<string, string> = {};
      for (const c of COLORS) {
        const raw = cs.getPropertyValue(c.name);
        const hex = rgbTripletToHex(raw);
        if (hex) next[c.name] = hex;
      }
      setTokenHex(next);
      setTheme(root.dataset.theme === "dark" ? "dark" : "light");
    }

    readTokens();
    // 다크 모드 토글 시 즉시 갱신.
    const obs = new MutationObserver(readTokens);
    obs.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    return () => obs.disconnect();
  }, []);

  function copy(value: string) {
    navigator.clipboard?.writeText(value);
    setCopied(value);
    setTimeout(() => setCopied(null), 1100);
  }

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-surface shadow-soft">
      <div className="flex flex-wrap items-center gap-1 border-b border-line bg-bg-soft/60 p-2">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`rounded-md px-4 py-2 text-[13.5px] font-semibold transition-colors ${
              tab === t.id
                ? "bg-ink text-bg"
                : "text-ink-mute hover:bg-bg-soft hover:text-ink"
            }`}
          >
            {t.label}
          </button>
        ))}
        {tab === "color" ? (
          <span className="ml-auto rounded-pill bg-bg-soft px-2.5 py-1 font-mono text-[11.5px] text-ink-faint">
            현재 테마 · {theme === "dark" ? "다크" : "라이트"}
          </span>
        ) : null}
      </div>

      <div className="p-6">
        {tab === "color" ? (
          <>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {COLORS.map((c) => {
                const hex = tokenHex[c.name] ?? c.fallback;
                const fg = bestForeground(hex);
                return (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => copy(hex)}
                    className="group text-left"
                    aria-label={`${c.name} 토큰 값 ${hex} 복사`}
                  >
                    <div
                      className="flex h-20 items-end rounded-lg border border-line p-2.5 transition-transform group-hover:-translate-y-1"
                      style={{ background: `rgb(var(${c.name}))` }}
                    >
                      <span
                        className="font-mono text-[11px] font-medium"
                        style={{ color: fg }}
                      >
                        {copied === hex ? "복사됨" : hex}
                      </span>
                    </div>
                    <p className="mt-2 font-mono text-[11.5px] text-ink">{c.name}</p>
                    <p className="text-[11.5px] text-ink-faint">{c.note}</p>
                  </button>
                );
              })}
            </div>
            <p className="mt-4 text-[12.5px] text-ink-faint">
              칩 위 hex와 복사되는 값은 현재 테마의 실제 토큰 값. 우상단 sun/moon으로 테마를 바꾸면 즉시 갱신된다.
            </p>
          </>
        ) : null}

        {tab === "type" ? (
          <div className="grid gap-4">
            {TYPE.map((t) => (
              <div
                key={t.label}
                className="flex items-baseline gap-4 border-b border-line pb-3 last:border-0"
              >
                <span className="w-24 shrink-0 font-mono text-[11.5px] text-ink-faint">
                  {t.label} · {t.px}
                </span>
                <span
                  className="truncate text-ink"
                  style={{ fontSize: t.px, fontWeight: t.weight, lineHeight: 1.2 }}
                >
                  {t.sample}
                </span>
              </div>
            ))}
          </div>
        ) : null}

        {tab === "space" ? (
          <div className="grid gap-3">
            {SPACE.map((s) => (
              <div key={s} className="flex items-center gap-4">
                <span className="w-16 shrink-0 font-mono text-[12px] text-ink-faint">
                  {s}px
                </span>
                <span
                  className="h-7 rounded-md bg-accent"
                  style={{ width: s * 4 }}
                />
                <span className="font-mono text-[11.5px] text-ink-faint">
                  space-{s / 4}
                </span>
              </div>
            ))}
            <p className="mt-1 text-[12.5px] text-ink-faint">
              모두 4의 배수다. 선택지를 좁히면 고민이 사라진다.
            </p>
          </div>
        ) : null}

        {tab === "radius" ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {RADIUS.map((r) => (
              <div key={r.name} className="text-center">
                <div
                  className="mx-auto h-24 w-full border-2 border-accent bg-accent-soft"
                  style={{ borderRadius: r.px }}
                />
                <p className="mt-2 font-mono text-[12px] text-ink">
                  {r.name}
                </p>
                <p className="text-[11.5px] text-ink-faint">
                  {r.px === 999 ? "999px" : `${r.px}px`}
                </p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
