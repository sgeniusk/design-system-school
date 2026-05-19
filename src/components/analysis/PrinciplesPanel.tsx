// 디자인 분석의 원칙 + AI 에이전트 사용법 패널.
import type { ReactNode } from "react";

/** **굵게** 마크다운만 <strong>으로 변환. */
function renderBold(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i} className="font-semibold text-ink">
        {part.slice(2, -2)}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

export function PrinciplesPanel({
  principles,
  aiUsage,
}: {
  principles: string[];
  aiUsage: string;
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div>
        <h3 className="eyebrow text-ink-faint">원칙</h3>
        <ul className="mt-3 grid gap-2.5">
          {principles.map((p) => (
            <li
              key={p}
              className="flex gap-2.5 text-[14px] leading-relaxed text-ink-soft"
            >
              <span
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-pill bg-pop"
                aria-hidden
              />
              <span>{renderBold(p)}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-xl border border-line bg-bg-soft/50 p-5">
        <h3 className="eyebrow text-ink-faint">AI 에이전트 사용법</h3>
        <p className="mt-3 text-[13.5px] leading-relaxed text-ink-mute">
          {aiUsage}
        </p>
      </div>
    </div>
  );
}
