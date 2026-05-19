// 온톨로지를 그래프 뷰 전용 노드·엣지로 변환하고 결정론적 force 레이아웃 좌표를 계산한다.
// node:fs 등 서버 전용 API를 쓰지 않으므로 서버·클라이언트 양쪽에서 import 안전.
import { analyses, concepts, patterns } from "@/content/ontology";
import { paths } from "@/content/paths";

export type GraphNodeKind = "concept" | "analysis" | "pattern" | "path";

/** 그래프 뷰 노드 — 레이아웃 좌표(x,y)까지 포함한 시각화 전용 타입. */
export interface GraphVizNode {
  /** 타입 prefix로 슬러그 충돌 방지 — 예: "concept:color". */
  id: string;
  kind: GraphNodeKind;
  slug: string;
  label: string;
  sublabel?: string;
  /** 노드 클릭 시 이동할 렌즈 경로. */
  href: string;
  /** 연결된 엣지 수 — 노드 반지름 산정. */
  degree: number;
  x: number;
  y: number;
}

export type GraphEdgeKind =
  | "concept-concept"
  | "analysis-concept"
  | "pattern-concept"
  | "pattern-pattern"
  | "path-concept";

/** 무방향 엣지 — source/target은 GraphVizNode.id. */
export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  kind: GraphEdgeKind;
}

export interface GraphData {
  nodes: GraphVizNode[];
  edges: GraphEdge[];
}

// 시드 고정 PRNG (mulberry32) — SSR·CSR 좌표 일치를 위해 Math.random() 금지.
function mulberry32(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// 좌표계 / force 레이아웃 상수.
const VIEW_W = 1000;
const VIEW_H = 680;
const CENTER = { x: VIEW_W / 2, y: VIEW_H / 2 };
const ITERATIONS = 320;
const K_REPULSION = 9000;
const K_SPRING = 0.04;
const REST_LENGTH = 150;
const K_GRAVITY = 0.015;
const DAMPING = 0.85;
const MAX_STEP = 30;
const PADDING = 70;

interface Vec {
  x: number;
  y: number;
}

/** 온톨로지에서 노드 배열을 만든다. concept → pattern → analysis → path 순서 고정. */
function buildNodes(): GraphVizNode[] {
  const nodes: GraphVizNode[] = [];
  for (const c of concepts) {
    nodes.push({
      id: `concept:${c.slug}`,
      kind: "concept",
      slug: c.slug,
      label: c.title,
      sublabel: c.titleEn,
      href: `/wiki/${c.slug}`,
      degree: 0,
      x: 0,
      y: 0,
    });
  }
  for (const p of patterns) {
    nodes.push({
      id: `pattern:${p.slug}`,
      kind: "pattern",
      slug: p.slug,
      label: p.title,
      sublabel: p.titleEn,
      href: `/wiki/${p.slug}`,
      degree: 0,
      x: 0,
      y: 0,
    });
  }
  for (const a of analyses) {
    nodes.push({
      id: `analysis:${a.slug}`,
      kind: "analysis",
      slug: a.slug,
      label: a.title,
      sublabel: a.org,
      href: `/collection/${a.slug}`,
      degree: 0,
      x: 0,
      y: 0,
    });
  }
  for (const p of paths) {
    nodes.push({
      id: `path:${p.slug}`,
      kind: "path",
      slug: p.slug,
      label: p.title,
      sublabel: p.tagline,
      href: `/learn/${p.slug}`,
      degree: 0,
      x: 0,
      y: 0,
    });
  }
  return nodes;
}

/** 관계를 무방향 엣지로 변환 — 양방향 중복·자기 참조·미존재 슬러그를 제거. */
function buildEdges(nodes: GraphVizNode[]): GraphEdge[] {
  const ids = new Set(nodes.map((n) => n.id));
  const seen = new Set<string>();
  const edges: GraphEdge[] = [];

  const add = (aId: string, bId: string, kind: GraphEdgeKind) => {
    if (aId === bId || !ids.has(aId) || !ids.has(bId)) return;
    const key = [aId, bId].sort().join("|");
    if (seen.has(key)) return;
    seen.add(key);
    edges.push({ id: key, source: aId, target: bId, kind });
  };

  for (const c of concepts) {
    for (const r of c.relatedConcepts) {
      add(`concept:${c.slug}`, `concept:${r}`, "concept-concept");
    }
  }
  for (const p of patterns) {
    for (const c of p.relatedConcepts) {
      add(`pattern:${p.slug}`, `concept:${c}`, "pattern-concept");
    }
    for (const rp of p.relatedPatterns) {
      add(`pattern:${p.slug}`, `pattern:${rp}`, "pattern-pattern");
    }
  }
  for (const a of analyses) {
    for (const d of a.demonstrates) {
      add(`analysis:${a.slug}`, `concept:${d}`, "analysis-concept");
    }
  }
  for (const p of paths) {
    for (const s of p.conceptSlugs) {
      add(`path:${p.slug}`, `concept:${s}`, "path-concept");
    }
  }
  return edges;
}

/** 결정론적 force 시뮬레이션으로 노드 좌표를 정한다. */
function layout(nodes: GraphVizNode[], edges: GraphEdge[]): void {
  const rand = mulberry32(0x5d51);
  const n = nodes.length;
  const idx = new Map(nodes.map((node, i) => [node.id, i]));

  // 초기 배치 — 중심 기준 원형 분포 + 시드 지터.
  const pos: Vec[] = nodes.map((_, i) => {
    const angle = (i / n) * Math.PI * 2;
    return {
      x: CENTER.x + Math.cos(angle) * 240 + (rand() - 0.5) * 80,
      y: CENTER.y + Math.sin(angle) * 240 + (rand() - 0.5) * 80,
    };
  });
  const vel: Vec[] = nodes.map(() => ({ x: 0, y: 0 }));

  const springs = edges.map((e) => ({
    s: idx.get(e.source) as number,
    t: idx.get(e.target) as number,
  }));

  for (let iter = 0; iter < ITERATIONS; iter += 1) {
    const force: Vec[] = nodes.map(() => ({ x: 0, y: 0 }));

    // 반발력 — 모든 노드 쌍 (N=16, 무시 가능한 비용).
    for (let i = 0; i < n; i += 1) {
      for (let j = i + 1; j < n; j += 1) {
        let dx = pos[j].x - pos[i].x;
        let dy = pos[j].y - pos[i].y;
        let dist = Math.hypot(dx, dy);
        if (dist < 0.01) dist = 0.01;
        const f = K_REPULSION / (dist * dist);
        dx /= dist;
        dy /= dist;
        force[i].x -= dx * f;
        force[i].y -= dy * f;
        force[j].x += dx * f;
        force[j].y += dy * f;
      }
    }

    // 스프링 — 엣지로 연결된 노드를 rest length로 당김.
    for (const { s, t } of springs) {
      let dx = pos[t].x - pos[s].x;
      let dy = pos[t].y - pos[s].y;
      let dist = Math.hypot(dx, dy);
      if (dist < 0.01) dist = 0.01;
      const f = K_SPRING * (dist - REST_LENGTH);
      dx /= dist;
      dy /= dist;
      force[s].x += dx * f;
      force[s].y += dy * f;
      force[t].x -= dx * f;
      force[t].y -= dy * f;
    }

    // 중심 중력.
    for (let i = 0; i < n; i += 1) {
      force[i].x += (CENTER.x - pos[i].x) * K_GRAVITY;
      force[i].y += (CENTER.y - pos[i].y) * K_GRAVITY;
    }

    // 적분 — 감쇠 + 스텝 클램프.
    for (let i = 0; i < n; i += 1) {
      vel[i].x = (vel[i].x + force[i].x) * DAMPING;
      vel[i].y = (vel[i].y + force[i].y) * DAMPING;
      const mag = Math.hypot(vel[i].x, vel[i].y);
      if (mag > MAX_STEP) {
        vel[i].x = (vel[i].x / mag) * MAX_STEP;
        vel[i].y = (vel[i].y / mag) * MAX_STEP;
      }
      pos[i].x += vel[i].x;
      pos[i].y += vel[i].y;
    }
  }

  // 바운딩박스를 viewBox 안으로 fit.
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (const p of pos) {
    if (p.x < minX) minX = p.x;
    if (p.y < minY) minY = p.y;
    if (p.x > maxX) maxX = p.x;
    if (p.y > maxY) maxY = p.y;
  }
  const spanX = maxX - minX || 1;
  const spanY = maxY - minY || 1;
  const scale = Math.min(
    (VIEW_W - PADDING * 2) / spanX,
    (VIEW_H - PADDING * 2) / spanY,
  );
  const offX = (VIEW_W - spanX * scale) / 2;
  const offY = (VIEW_H - spanY * scale) / 2;

  const round2 = (v: number) => Math.round(v * 100) / 100;
  nodes.forEach((node, i) => {
    node.x = round2((pos[i].x - minX) * scale + offX);
    node.y = round2((pos[i].y - minY) * scale + offY);
  });
}

function buildGraph(): GraphData {
  const nodes = buildNodes();
  const edges = buildEdges(nodes);

  // degree 채우기.
  const degree = new Map<string, number>();
  for (const e of edges) {
    degree.set(e.source, (degree.get(e.source) ?? 0) + 1);
    degree.set(e.target, (degree.get(e.target) ?? 0) + 1);
  }
  for (const node of nodes) {
    node.degree = degree.get(node.id) ?? 0;
  }

  layout(nodes, edges);
  return { nodes, edges };
}

/** 모듈 로드 시 1회 계산 — 서버·클라이언트가 동일한 결정론적 결과를 공유. */
export const graphData: GraphData = buildGraph();

/** 그래프 뷰 좌표계 — 컴포넌트의 SVG viewBox와 공유. */
export const GRAPH_VIEWBOX = { width: VIEW_W, height: VIEW_H };

/** 그래프 통계 — 엣지는 무방향 중복 제거 후의 고유 연결 수. */
export function getGraphStats() {
  const { nodes, edges } = graphData;
  return {
    nodes: nodes.length,
    concepts: nodes.filter((n) => n.kind === "concept").length,
    patterns: nodes.filter((n) => n.kind === "pattern").length,
    analyses: nodes.filter((n) => n.kind === "analysis").length,
    paths: nodes.filter((n) => n.kind === "path").length,
    edges: edges.length,
  };
}
