"use client";
// 디자인 온톨로지를 SVG 그래프로 렌더하고 호버·터치·필터·키보드를 처리하는 컴포넌트.
// 좁은 화면에서는 라벨·노드 크기를 키우고, 터치 디바이스에서는 두 번 탭 패턴을 쓴다.
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GRAPH_VIEWBOX } from "@/lib/graph";
import type {
  GraphEdge,
  GraphEdgeKind,
  GraphNodeKind,
  GraphVizNode,
} from "@/lib/graph";

type KindStyle = { dot: string; fill: string; soft: string; label: string };

const KIND_STYLE: Record<GraphNodeKind, KindStyle> = {
  concept: {
    dot: "bg-accent",
    fill: "rgb(var(--accent))",
    soft: "rgb(var(--accent-soft))",
    label: "개념",
  },
  pattern: {
    dot: "bg-gold",
    fill: "rgb(var(--gold))",
    soft: "rgb(var(--gold-soft))",
    label: "패턴",
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

const KIND_ORDER: GraphNodeKind[] = ["concept", "pattern", "analysis", "path"];

/**
 * 엣지 stroke 색 — 출발 노드의 종류를 따른다 (concept끼리는 회색).
 * 6종 엣지 종류를 4색으로 묶어 노드 색과 의미를 맞춤.
 */
const EDGE_STROKE: Record<GraphEdgeKind, string> = {
  "concept-concept": "rgb(var(--ink-mute))",
  "pattern-concept": "rgb(var(--gold))",
  "pattern-pattern": "rgb(var(--gold))",
  "analysis-concept": "rgb(var(--pop))",
  "analysis-pattern": "rgb(var(--pop))",
  "path-concept": "rgb(var(--mint))",
  "path-pattern": "rgb(var(--mint))",
};

/** 긴 노드 제목을 그래프 라벨용으로 줄인다 — "토스 — Apps in Toss" → "토스". */
function shortLabel(label: string): string {
  return label.split(" — ")[0].trim();
}

/** 노드 반지름 — degree와 화면 폭에 따라 결정. 좁은 화면은 더 크게. */
function nodeRadius(degree: number, compact: boolean): number {
  const base = compact ? 16 : 13;
  const step = compact ? 1.9 : 1.6;
  return base + Math.min(degree, 8) * step;
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
  // 터치 디바이스 두 번 탭 패턴 — 첫 탭에서 armed, 두 번째 탭에서 이동.
  const [armedId, setArmedId] = useState<string | null>(null);
  // 터치 디바이스(호버 미지원) 감지.
  const [hoverless, setHoverless] = useState(false);
  // 좁은 화면 감지 — 폰트·노드 크기를 키운다.
  const [compact, setCompact] = useState(false);
  const [filter, setFilter] = useState<Record<GraphNodeKind, boolean>>({
    concept: true,
    pattern: true,
    analysis: true,
    path: true,
  });

  useEffect(() => {
    const hoverMq = window.matchMedia("(hover: none)");
    const compactMq = window.matchMedia("(max-width: 640px)");

    const sync = () => {
      setHoverless(hoverMq.matches);
      setCompact(compactMq.matches);
    };
    sync();

    hoverMq.addEventListener("change", sync);
    compactMq.addEventListener("change", sync);
    return () => {
      hoverMq.removeEventListener("change", sync);
      compactMq.removeEventListener("change", sync);
    };
  }, []);

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
      if (!next.concept && !next.pattern && !next.analysis && !next.path) {
        return prev;
      }
      return next;
    });
  };

  const armedNode = armedId ? nodeById.get(armedId) : null;

  const go = (node: GraphVizNode) => {
    if (hoverless && armedId !== node.id) {
      // 터치 디바이스 — 첫 탭은 hover armed만, 두 번째 탭에서 이동.
      setArmedId(node.id);
      setHoveredId(node.id);
      return;
    }
    setArmedId(null);
    router.push(node.href);
  };

  const fontSize = compact ? 17 : 13;
  const labelOffset = compact ? 19 : 15;

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
          {armedNode
            ? `${shortLabel(armedNode.label)} — 다시 탭하면 페이지로 이동합니다.`
            : hoverless
              ? "노드를 탭하면 연결이 드러나고, 한 번 더 탭하면 이동합니다."
              : "노드를 가리키면 연결이 드러납니다. 클릭하면 해당 문서로 이동합니다."}
        </span>
      </div>

      {/* 엣지 색 안내 — 6종 엣지가 4색으로 묶임. */}
      <p className="mb-3 text-[12px] text-ink-faint">
        엣지 색은 출발 노드 종류를 따른다 — 패턴 amber · 분석 coral · 경로 teal · 개념끼리 회색.
      </p>

      <div className="overflow-hidden rounded-2xl border border-line bg-surface/70 shadow-soft">
        <svg
          viewBox={`0 0 ${GRAPH_VIEWBOX.width} ${GRAPH_VIEWBOX.height}`}
          className="block h-auto w-full"
          role="group"
          aria-label="디자인 온톨로지 그래프 — 개념·패턴·분석·학습 경로 노드의 연결"
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
              // 엣지 색은 kind를 따른다 — hover 시 같은 색을 더 진하게 노출.
              const stroke = EDGE_STROKE[e.kind];
              return (
                <line
                  key={e.id}
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  stroke={stroke}
                  strokeWidth={incident ? 2.2 : 1.4}
                  strokeOpacity={dimmed ? 0.08 : incident ? 0.95 : 0.45}
                />
              );
            })}
          </g>

          {/* 노드 */}
          <g>
            {visibleNodes.map((node) => {
              const style = KIND_STYLE[node.kind];
              const r = nodeRadius(node.degree, compact);
              const dimmed =
                activeIds !== null && !activeIds.has(node.id);
              const focused = hoveredId === node.id;
              const armed = armedId === node.id;
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
                      // 키보드는 호버 모델과 무관하게 즉시 이동.
                      router.push(node.href);
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
                    stroke={
                      armed
                        ? "rgb(var(--accent))"
                        : focused
                          ? "rgb(var(--ink))"
                          : style.soft
                    }
                    strokeWidth={armed ? 4 : focused ? 3 : 2}
                  />
                  <text
                    x={node.x}
                    y={node.y + r + labelOffset}
                    textAnchor="middle"
                    className="select-none font-semibold"
                    style={{
                      fontSize: `${fontSize}px`,
                      fill: "rgb(var(--ink))",
                      stroke: "rgb(var(--bg))",
                      strokeWidth: 3,
                      paintOrder: "stroke",
                    }}
                  >
                    {shortLabel(node.label)}
                  </text>
                  {armed ? (
                    <text
                      x={node.x}
                      y={node.y + r + labelOffset + fontSize + 2}
                      textAnchor="middle"
                      className="select-none"
                      style={{
                        fontSize: `${fontSize - 2}px`,
                        fill: "rgb(var(--accent-ink))",
                        stroke: "rgb(var(--bg))",
                        strokeWidth: 3,
                        paintOrder: "stroke",
                      }}
                    >
                      탭하면 이동 →
                    </text>
                  ) : null}
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
