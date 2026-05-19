// 디자인 분석의 스페이싱 막대 + radius 박스 시각화.
import type { RadiusStep, SpacingSpec } from "@/lib/types";

const MAX_BAR = 220;

export function SpacingRadius({
  spacing,
  radii,
  elevationNote,
}: {
  spacing: SpacingSpec;
  radii: RadiusStep[];
  elevationNote?: string;
}) {
  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <div>
        <h3 className="eyebrow text-ink-faint">Spacing · {spacing.base}</h3>
        <div className="mt-4 grid gap-2.5">
          {spacing.scale.map((s) => (
            <div key={s} className="flex items-center gap-3">
              <span className="w-12 shrink-0 font-mono text-[11.5px] text-ink-faint">
                {s}px
              </span>
              <span
                className="h-6 rounded-md bg-pop/80"
                style={{ width: Math.min(s * 3.4, MAX_BAR) }}
              />
            </div>
          ))}
        </div>
        {spacing.note ? (
          <p className="mt-3 text-[12.5px] leading-relaxed text-ink-mute">
            {spacing.note}
          </p>
        ) : null}
      </div>

      <div>
        <h3 className="eyebrow text-ink-faint">Radius &amp; Elevation</h3>
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {radii.map((r) => (
            <div key={r.name} className="text-center">
              <div
                className="mx-auto h-20 w-full border-2 border-pop bg-pop-soft"
                style={{ borderRadius: Math.min(r.px, 40) }}
              />
              <p className="mt-2 font-mono text-[12px] text-ink">{r.name}</p>
              <p className="text-[11.5px] leading-snug text-ink-mute">
                {r.px === 999 ? "999px (pill)" : `${r.px}px`}
                {r.note ? ` · ${r.note}` : ""}
              </p>
            </div>
          ))}
        </div>
        {elevationNote ? (
          <p className="mt-3 text-[12.5px] leading-relaxed text-ink-mute">
            {elevationNote}
          </p>
        ) : null}
      </div>
    </div>
  );
}
