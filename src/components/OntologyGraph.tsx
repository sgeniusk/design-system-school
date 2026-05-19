"use client";
// 디자인 온톨로지를 SVG 그래프로 렌더하고 호버 강조·클릭 이동·타입 필터를 처리하는 컴포넌트.
import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GRAPH_VIEWBOX } from "@/lib/graph";
import type { GraphEdge, GraphNodeKind, GraphVizNode } from "@/lib/graph";

type KindStyle = { dot: string; fill: string; soft: string; label: string };

const KIND_STYLE: Record<GraphNodeKind, KindStyle> = {
  concept: {
    dot: "bg-accent",
    fill: "rgb(var(--accent))",
    soft: "rgb(var(--accent-soft))",
    label: "개념",
  },
  analysis: {
    dot: "bg-pop",
    fill: "rgb(var(--pop))",
    soft: "rgb(var(--pop-soft))",
    label: "분석",
  },
  path: {
    dot: "bg-mint",
    fill: "rgb(var(--mint))",
    soft: "rgb(var(--mint-soft))",
    label: "경로",
  },
};

const KIND_ORDER: GraphNodeKind[] = ["concept", "analysis", "path"];

/** 긴 노드 제목을 그래프 라벨용으로 줄인다 — "토스 — Apps in Toss" → "토스". */
function shortLabel(label: string): string {
  return label.split(" — ")[0].trim();
}

function nodeRadius(degree: number): number {
  return 13 + Math.min(degree, 8) * 1.6;
}

export function OntologyGraph({
  nodes,
  edges,
}: {
  nodes: GraphVizNode[];
  edges: GraphEdge[];
}) {
  const router = useRouter();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [filter, setFilter] = useState<Record<GraphNodeKind, boolean>>({
    concept: true,
    analysis: true,
    path: true,
  });

  const nodeById = useMemo(
    () => new Map(nodes.map((n) => [n.id, n])),
    [nodes],
  );

  // 호버 시 이웃 판정용 인접 맵.
  const adjacency = useMemo(() => {
    const map = new Map<string, Set<string>>();
    for (const n of nodes) map.set(n.id, new Set());
    for (const e of edges) {
      map.get(e.source)?.add(e.target);
      map.get(e.target)?.add(e.source);
    }
    return map;
  }, [nodes, edges]);

  const visibleNodes = useMemo(
    () => nodes.filter((n) => filter[n.kind]),
    [nodes, filter],
  );

  // 양 끝 노드가 모두 보일 때만 엣지를 그린다.
  const visibleEdges = useMemo(() => {
    const visibleIds = new Set(visibleNodes.map((n) => n.id));
    return edges.filter(
      (e) => visibleIds.has(e.source) && visibleIds.has(e.target),
    );
  }, [edges, visibleNodes]);

  // 호버 노드 + 그 이웃 — 강조 대상.
  const activeIds = useMemo(() => {
    if (!hoveredId) return null;
    const set = new Set<string>([hoveredId]);
    for (const id of adjacency.get(hoveredId) ?? []) set.add(id);
    return set;
  }, [hoveredId, adjacency]);

  const toggleFilter = (kind: GraphNodeKind) => {
    setFilter((prev) => {
      const next = { ...prev, [kind]: !prev[kind] };
      // 최소 한 종류는 항상 켜둔다.
      if (!next.concept && !next.analysis && !next.path) return prev;
      return next;
    });
  };

  const go = (node: GraphVizNode) => router.push(node.href);

  return (
    <figure className="m-0">
      {/* 타입 필터 + 범례 */}
      <div className="mb-5 flex flex-wrap items-center gap-2.5">
        {KIND_ORDER.map((kind) => {
          const on = filter[kind];
          const style = KIND_STYLE[kind];
          return (
            <button
              key={kind}
              type="button"
              aria-pressed={on}
              onClick={() => toggleFilter(kind)}
              className={`flex items-center gap-1.5 rounded-pill border px-3.5 py-1.5 text-[13px] font-semibold transition-colors ${
                on
                  ? "border-line-strong bg-surface text-ink"
                  : "border-line bg-bg-soft text-ink-faint"
              }`}
            >
              <span
                className={`h-2 w-2 rounded-pill ${style.dot}`}
                style={{ opacity: on ? 1 : 0.4 }}
                aria-hidden
              />
              {style.label}
            </button>
          );
        })}
        <span className="ml-1 text-[12.5px] text-ink-faint">
          노드를 가리키면 연결이 드러납니다. 클릭하면 해당 문서로 이동합니다.
        </span>
      </div>

      <div className="overflow-hidden rounded-2xl border border-line bg-surface/70 shadow-soft">
        <svg
          viewBox={`0 0 ${GRAPH_VIEWBOX.width} ${GRAPH_VIEWBOX.height}`}
          className="block h-auto w-full"
          role="group"
          aria-label="디자인 온톨로지 그래프 — 개념·분석·학습 경로 노드의 연결"
        >
          {/* 엣지 */}
          <g>
            {visibleEdges.map((e) => {
              const a = nodeById.get(e.source);
              const b = nodeById.get(e.target);
              if (!a || !b) return null;
              const incident =
                hoveredId === e.source || hoveredId === e.target;
              const dimmed = hoveredId !== null && !incident;
              return (
                <line
                  key={e.id}
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  stroke={
                    incident
                      ? "rgb(var(--ink-mute))"
                      : "rgb(var(--border-strong))"
                  }
                  strokeWidth={incident ? 2 : 1.4}
                  strokeOpacity={dimmed ? 0.1 : incident ? 0.9 : 0.55}
                />
              );
            })}
          </g>

          {/* 노드 */}
          <g>
            {visibleNodes.map((node) => {
              const style = KIND_STYLE[node.kind];
              const r = nodeRadius(node.degree);
              const dimmed =
                activeIds !== null && !activeIds.has(node.id);
              const focused = hoveredId === node.id;
              return (
                <g
                  key={node.id}
                  role="link"
                  tabIndex={0}
                  aria-label={`${node.label} — ${style.label} 노드, ${node.degree}개 연결`}
                  className="cursor-pointer outline-none"
                  style={{
                    opacity: dimmed ? 0.22 : 1,
                    transition: "opacity 0.18s ease",
                  }}
                  onClick={() => go(node)}
                  onKeyDown={(ev) => {
                    if (ev.key === "Enter" || ev.key === " ") {
                      ev.preventDefault();
                      go(node);
                    }
                  }}
                  onMouseEnter={() => setHoveredId(node.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onFocus={() => setHoveredId(node.id)}
                  onBlur={() => setHoveredId(null)}
                >
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={r}
                    fill={style.fill}
                    stroke={focused ? "rgb(var(--ink))" : style.soft}
                    strokeWidth={focused ? 3 : 2}
                  />
                  <text
                    x={node.x}
                    y={node.y + r + 15}
                    textAnchor="middle"
                    className="select-none font-semibold"
                    style={{
                      fontSize: "13px",
                      fill: "rgb(var(--ink))",
                      stroke: "rgb(var(--bg))",
                      strokeWidth: 3,
                      paintOrder: "stroke",
                    }}
                  >
                    {shortLabel(node.label)}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>
      </div>

      {/* 스크린리더·키보드용 텍스트 대체 — 전체 노드 목록 */}
      <ul className="sr-only">
        {nodes.map((node) => {
          const neighbours = [...(adjacency.get(node.id) ?? [])]
            .map((id) => nodeById.get(id)?.label)
            .filter(Boolean);
          return (
            <li key={node.id}>
              <Link href={node.href}>
                {node.label} ({KIND_STYLE[node.kind].label})
              </Link>
              {neighbours.length > 0
                ? ` — 연결: ${neighbours.join(", ")}`
                : ""}
            </li>
          );
        })}
      </ul>
    </figure>
  );
}
