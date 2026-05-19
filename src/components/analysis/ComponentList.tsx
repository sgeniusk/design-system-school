// 디자인 분석의 컴포넌트 명세 — 이름 칩 그리드 + 설명.
import type { ComponentSpec } from "@/lib/types";

export function ComponentList({ components }: { components: ComponentSpec }) {
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {components.items.map((item) => (
          <span
            key={item}
            className="rounded-pill border border-line bg-surface px-3 py-1.5 text-[13px] font-medium text-ink"
          >
            {item}
          </span>
        ))}
      </div>
      <p className="mt-4 max-w-2xl text-[13.5px] leading-relaxed text-ink-mute">
        {components.note}
      </p>
    </div>
  );
}
