// 온톨로지 상호 링크 — 노드 간 관계를 그룹별로 보여준다.
import Link from "next/link";

type Accent = "accent" | "pop" | "mint";

const dot: Record<Accent, string> = {
  accent: "bg-accent",
  pop: "bg-pop",
  mint: "bg-mint",
};

export interface NodeLinkItem {
  href: string;
  title: string;
  sub?: string;
}

export interface NodeLinkGroup {
  label: string;
  accent: Accent;
  items: NodeLinkItem[];
  emptyText?: string;
}

export function NodeLinks({ groups }: { groups: NodeLinkGroup[] }) {
  return (
    <div className="grid gap-7">
      {groups.map((group) => (
        <div key={group.label}>
          <div className="flex items-center gap-2">
            <span
              aria-hidden
              className={`h-2 w-2 rounded-pill ${dot[group.accent]}`}
            />
            <h3 className="eyebrow text-ink-faint">{group.label}</h3>
          </div>
          {group.items.length === 0 ? (
            <p className="mt-3 text-[13px] text-ink-faint">
              {group.emptyText ?? "연결된 노드가 없습니다."}
            </p>
          ) : (
            <ul className="mt-3 grid gap-1.5">
              {group.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group flex items-baseline gap-2 rounded-md px-2.5 py-2 -mx-2.5 transition-colors hover:bg-bg-soft"
                  >
                    <span className="text-[14px] font-medium text-ink group-hover:text-accent-ink">
                      {item.title}
                    </span>
                    {item.sub ? (
                      <span className="truncate text-[12px] text-ink-faint">
                        {item.sub}
                      </span>
                    ) : null}
                    <span className="ml-auto font-mono text-[12px] text-ink-faint transition-transform group-hover:translate-x-0.5">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
