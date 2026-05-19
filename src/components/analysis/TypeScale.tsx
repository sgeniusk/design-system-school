// 디자인 분석의 타이포그래피 — 폰트명 + 타입 스케일 라이브 샘플.
import type { TypeStep } from "@/lib/types";

export function TypeScale({
  font,
  scale,
  note,
}: {
  font: string;
  scale: TypeStep[];
  note?: string;
}) {
  return (
    <div>
      <div className="inline-flex rounded-pill border border-line bg-bg-soft px-3.5 py-1.5 font-mono text-[12px] text-ink-mute">
        Font · {font}
      </div>
      <div className="mt-5 grid gap-4">
        {scale.map((t) => (
          <div
            key={t.label}
            className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-line pb-3"
          >
            <span className="w-40 shrink-0 font-mono text-[11.5px] text-ink-faint">
              {t.label} · {t.size} · {t.weight}
            </span>
            <span
              className="text-ink"
              style={{
                fontSize: t.sampleSizePx,
                fontWeight: parseInt(t.weight, 10),
                lineHeight: 1.2,
              }}
            >
              {t.note ?? "디자인은 결정이다"}
            </span>
          </div>
        ))}
      </div>
      {note ? (
        <p className="mt-4 text-[12.5px] text-ink-mute">{note}</p>
      ) : null}
    </div>
  );
}
