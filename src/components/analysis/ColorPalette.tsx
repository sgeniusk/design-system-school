"use client";
// 디자인 분석의 색상 팔레트 — 칩 클릭 시 HEX를 클립보드에 복사.
import { useState } from "react";
import type { ColorGroup } from "@/lib/types";

export function ColorPalette({ groups }: { groups: ColorGroup[] }) {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopied(hex);
    setTimeout(() => setCopied(null), 1100);
  };

  return (
    <div className="grid gap-7">
      {groups.map((group) => (
        <div key={group.label}>
          <h3 className="eyebrow text-ink-faint">{group.label}</h3>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {group.swatches.map((s) => (
              <button
                key={s.token}
                type="button"
                onClick={() => copy(s.hex)}
                className="group text-left"
              >
                <div
                  className="flex h-20 items-end rounded-lg border border-black/10 p-2.5 transition-transform group-hover:-translate-y-1"
                  style={{ background: s.hex, color: s.on }}
                >
                  <span className="font-mono text-[12px] font-semibold">
                    {copied === s.hex ? "복사됨" : s.hex}
                  </span>
                </div>
                <p className="mt-1.5 font-mono text-[12px] text-ink">
                  {s.token}
                </p>
                {s.note ? (
                  <p className="text-[12px] leading-snug text-ink-mute">
                    {s.note}
                  </p>
                ) : null}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
