"use client";
// 인터랙티브 토큰 데모 — 이 사이트가 실제로 쓰는 토큰을 살아있는 예시로 보여준다.
import { useState } from "react";

type Tab = "color" | "type" | "space" | "radius";

const TABS: { id: Tab; label: string }[] = [
  { id: "color", label: "색" },
  { id: "type", label: "타이포" },
  { id: "space", label: "여백" },
  { id: "radius", label: "반경" },
];

const COLORS = [
  { name: "--accent", hex: "#5B43F5", note: "개념 · 위키", on: "#fff" },
  { name: "--pop", hex: "#FF5C38", note: "분석 · 컬렉션", on: "#fff" },
  { name: "--mint", hex: "#0FB5A6", note: "학습 경로", on: "#fff" },
  { name: "--ink", hex: "#16171D", note: "본문 텍스트", on: "#fff" },
  { name: "--ink-mute", hex: "#70717C", note: "보조 텍스트", on: "#fff" },
  { name: "--bg-soft", hex: "#F1F1F4", note: "보조 배경", on: "#16171D" },
  { name: "--border", hex: "#E7E7EC", note: "테두리", on: "#16171D" },
  { name: "--surface", hex: "#FFFFFF", note: "카드 배경", on: "#16171D" },
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

export function TokenDemo() {
  const [tab, setTab] = useState<Tab>("color");
  const [copied, setCopied] = useState<string | null>(null);

  function copy(value: string) {
    navigator.clipboard?.writeText(value);
    setCopied(value);
    setTimeout(() => setCopied(null), 1100);
  }

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-surface shadow-soft">
      <div className="flex gap-1 border-b border-line bg-bg-soft/60 p-2">
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
      </div>

      <div className="p-6">
        {tab === "color" ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {COLORS.map((c) => (
              <button
                key={c.name}
                type="button"
                onClick={() => copy(c.hex)}
                className="group text-left"
              >
                <div
                  className="flex h-20 items-end rounded-lg border border-line p-2.5 transition-transform group-hover:-translate-y-1"
                  style={{ background: c.hex }}
                >
                  <span
                    className="font-mono text-[11px] font-medium"
                    style={{ color: c.on }}
                  >
                    {copied === c.hex ? "복사됨" : c.hex}
                  </span>
                </div>
                <p className="mt-2 font-mono text-[11.5px] text-ink">{c.name}</p>
                <p className="text-[11.5px] text-ink-faint">{c.note}</p>
              </button>
            ))}
          </div>
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
