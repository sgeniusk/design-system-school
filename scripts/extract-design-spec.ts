#!/usr/bin/env node
// URL을 받아 AnalysisDesignSpec 객체 초안을 만드는 추출 도구.
// 새 analysis 노드를 추가할 때 시작점으로 쓴다. 자동 추출은 시간 줄이는 도구일 뿐,
// 실제 분석의 깊이는 사람이 채워야 한다.
//
// 사용법:
//   npx tsx scripts/extract-design-spec.ts <url> [--slug <slug>] [--name <name>] [--out <path>]
//
// 자동 추출:
//   - meta title·description, og:title·og:description
//   - HTML 안의 색 hex(#xxxxxx)·rgb(R,G,B) 빈도 정렬
//   - <link href*="fonts.googleapis.com"> 및 font-family 선언에서 폰트 후보
//
// 사람 검수 필요 — 자세한 경계는 scripts/README.md.

import { writeFile } from "node:fs/promises";

// ──────────────────────────────────────────
// CLI 파싱
// ──────────────────────────────────────────
interface Args {
  url: string;
  slug?: string;
  name?: string;
  outFile?: string;
}

function parseArgs(args: string[]): Args | null {
  const positional: string[] = [];
  const opts: Record<string, string> = {};
  for (let i = 0; i < args.length; i += 1) {
    const a = args[i];
    if (a.startsWith("--")) {
      const key = a.slice(2);
      opts[key] = args[i + 1] ?? "";
      i += 1;
    } else {
      positional.push(a);
    }
  }
  if (!positional[0]) return null;
  return {
    url: positional[0],
    slug: opts.slug || undefined,
    name: opts.name || undefined,
    outFile: opts.out || undefined,
  };
}

// ──────────────────────────────────────────
// 네트워크
// ──────────────────────────────────────────
async function fetchHtml(url: string): Promise<string> {
  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "extract-design-spec/0.1 (+https://design-system-school.vercel.app)",
    },
  });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} ${res.statusText} — ${url}`);
  }
  return res.text();
}

// ──────────────────────────────────────────
// 메타 추출
// ──────────────────────────────────────────
function pickMeta(html: string): { title: string; description: string } {
  const titleM = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  const ogTitleM = html.match(
    /<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)/i,
  );
  const descM = html.match(
    /<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)/i,
  );
  const ogDescM = html.match(
    /<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']+)/i,
  );
  return {
    title: (ogTitleM?.[1] ?? titleM?.[1] ?? "").trim(),
    description: (ogDescM?.[1] ?? descM?.[1] ?? "").trim(),
  };
}

// ──────────────────────────────────────────
// 색 추출
// ──────────────────────────────────────────
function normalizeHex(hex: string): string | null {
  let h = hex.replace("#", "");
  if (h.length === 3) {
    h = h
      .split("")
      .map((c) => c + c)
      .join("");
  }
  if (h.length !== 6 || !/^[0-9a-fA-F]{6}$/.test(h)) return null;
  return "#" + h.toUpperCase();
}

function rgbToHex(r: number, g: number, b: number): string {
  return (
    "#" +
    [r, g, b]
      .map((n) => Math.max(0, Math.min(255, n)).toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase()
  );
}

function extractColors(html: string): { hex: string; count: number }[] {
  const counts = new Map<string, number>();

  // #RGB / #RRGGBB
  const hexRe = /#[0-9a-fA-F]{3,8}\b/g;
  let m: RegExpExecArray | null;
  while ((m = hexRe.exec(html)) !== null) {
    const raw = m[0];
    const len = raw.length - 1;
    if (len !== 3 && len !== 6) continue; // 8자리 RGBA는 보수적으로 스킵
    const hex = normalizeHex(raw);
    if (hex) counts.set(hex, (counts.get(hex) ?? 0) + 1);
  }

  // rgb(r, g, b) 또는 rgb(r g b)
  const rgbRe = /rgb\(\s*(\d{1,3})[\s,]+(\d{1,3})[\s,]+(\d{1,3})\s*\)/gi;
  while ((m = rgbRe.exec(html)) !== null) {
    const r = parseInt(m[1], 10);
    const g = parseInt(m[2], 10);
    const b = parseInt(m[3], 10);
    if (r <= 255 && g <= 255 && b <= 255) {
      const hex = rgbToHex(r, g, b);
      counts.set(hex, (counts.get(hex) ?? 0) + 1);
    }
  }

  return [...counts.entries()]
    .map(([hex, count]) => ({ hex, count }))
    .sort((a, b) => b.count - a.count);
}

// ──────────────────────────────────────────
// 폰트 추출
// ──────────────────────────────────────────
function extractFonts(html: string): string[] {
  const fonts = new Set<string>();

  // Google Fonts link
  const linkRe = /href=["']https?:\/\/fonts\.googleapis\.com\/[^"']+/g;
  let m: RegExpExecArray | null;
  while ((m = linkRe.exec(html)) !== null) {
    const familyM = /family=([^&"']+)/.exec(m[0]);
    if (familyM) {
      familyM[1]
        .split("|")
        .map((f) => f.split(":")[0].replace(/\+/g, " ").trim())
        .filter(Boolean)
        .forEach((f) => fonts.add(f));
    }
  }

  // CSS font-family 선언 1순위
  const fontFamilyRe = /font-family\s*:\s*([^;}"']+)/gi;
  while ((m = fontFamilyRe.exec(html)) !== null) {
    const first = m[1].split(",")[0].trim().replace(/['"]/g, "");
    if (
      first &&
      first.length < 40 &&
      !first.startsWith("-") &&
      !["inherit", "initial", "unset", "var"].includes(first.toLowerCase())
    ) {
      fonts.add(first);
    }
  }

  return [...fonts];
}

// ──────────────────────────────────────────
// 직렬화
// ──────────────────────────────────────────
function tsValue(value: unknown, indent = 0): string {
  const pad = "  ".repeat(indent);
  const padInner = "  ".repeat(indent + 1);
  if (value === null) return "null";
  if (typeof value === "string") return JSON.stringify(value);
  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }
  if (Array.isArray(value)) {
    if (value.length === 0) return "[]";
    const items = value.map((v) => padInner + tsValue(v, indent + 1));
    return `[\n${items.join(",\n")},\n${pad}]`;
  }
  if (typeof value === "object" && value) {
    const entries = Object.entries(value);
    if (entries.length === 0) return "{}";
    const items = entries.map(
      ([k, v]) =>
        padInner +
        (/^[a-zA-Z_$][\w$]*$/.test(k) ? k : JSON.stringify(k)) +
        ": " +
        tsValue(v, indent + 1),
    );
    return `{\n${items.join(",\n")},\n${pad}}`;
  }
  return "undefined";
}

function camelize(s: string): string {
  return s.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());
}

// ──────────────────────────────────────────
// draft 빌드
// ──────────────────────────────────────────
interface DraftInput {
  url: string;
  slug: string;
  name: string;
  description: string;
  colors: { hex: string; count: number }[];
  fonts: string[];
}

function buildDraft(opts: DraftInput): string {
  const { url, slug, name, description, colors, fonts } = opts;
  const topColors = colors.slice(0, 8);

  const draft = {
    slug,
    name,
    summary: description || "TODO: 한 줄 요약을 작성하세요.",
    disclaimer:
      "공개 화면 관찰 기반 학습용 근사치 — 일부 값은 자동 추출되었고, 사람이 검수해야 합니다.",
    principles: [
      "TODO: 디자인 원칙 1 — 이 사이트가 강조하는 가치를 직접 작성",
      "TODO: 디자인 원칙 2",
      "TODO: 디자인 원칙 3",
    ],
    colors: [
      {
        label: "Brand",
        swatches: topColors.slice(0, 3).map((c) => ({
          token: "--brand-?",
          hex: c.hex,
          note: `자동 추출 (HTML 등장 ${c.count}회) — TODO: 검수`,
          on: "#ffffff",
        })),
      },
      {
        label: "Neutral",
        swatches: topColors.slice(3, 8).map((c) => ({
          token: "--ink-?",
          hex: c.hex,
          note: `자동 추출 (HTML 등장 ${c.count}회) — TODO: 검수`,
          on: "#16171D",
        })),
      },
      {
        label: "Semantic",
        swatches: [],
      },
    ],
    font: fonts[0] ?? "TODO: 본문 폰트 (자동 감지 실패)",
    typeScale: [
      { label: "display", size: "TODO", weight: "TODO", sampleSizePx: 40 },
      { label: "heading", size: "TODO", weight: "TODO", sampleSizePx: 24 },
      { label: "body", size: "TODO", weight: "TODO", sampleSizePx: 16 },
    ],
    typographyNote: "TODO: line-height·자간·한글 단락 규칙",
    spacing: {
      base: "TODO: 4px 또는 8px",
      scale: [4, 8, 12, 16, 24, 32, 48, 64],
      note: "TODO: 사용 빈도 높은 단위 확인",
    },
    radii: [
      { name: "sm", px: 6, note: "TODO" },
      { name: "base", px: 12, note: "TODO" },
      { name: "lg", px: 24, note: "TODO" },
    ],
    elevationNote: "TODO: shadow·elevation 규칙",
    components: {
      items: ["TODO: 관찰된 컴포넌트 목록"],
      note: "TODO: 컴포넌트 구성·variants",
    },
    aiUsage:
      "TODO: AI 코딩 에이전트가 이 spec을 어떻게 활용해야 하는지 안내 (1~2 문단)",
  };

  return `import type { AnalysisDesignSpec } from "@/lib/types";

// ${name} (${slug}) — design-spec 초안.
// 추출 소스: ${url}
// 추출 일시: ${new Date().toISOString()}
//
// 자동 추출: meta/og · HTML 색 빈도 · 폰트 link.
// 사람 검수 필요: principles · 색 분류 · typeScale · radii · components · aiUsage.

export const ${camelize(slug)}DesignSpec: AnalysisDesignSpec = ${tsValue(draft)};
`;
}

// ──────────────────────────────────────────
// main
// ──────────────────────────────────────────
async function main() {
  const parsed = parseArgs(process.argv.slice(2));
  if (!parsed) {
    process.stderr.write(
      "사용법: npx tsx scripts/extract-design-spec.ts <url> [--slug <slug>] [--name <name>] [--out <path>]\n",
    );
    process.exit(1);
  }
  const { url, slug, name, outFile } = parsed;

  process.stderr.write(`fetching ${url} …\n`);
  const html = await fetchHtml(url);
  const meta = pickMeta(html);
  const colors = extractColors(html);
  const fonts = extractFonts(html);

  const inferredSlug =
    slug ??
    new URL(url).hostname
      .replace(/^www\./, "")
      .replace(/\.[a-z]+$/, "")
      .replace(/[^a-z0-9]+/gi, "-")
      .toLowerCase();
  const inferredName =
    name ?? (meta.title.split(/[—|·\-]/)[0].trim() || inferredSlug);

  process.stderr.write(
    `  meta · title="${meta.title}" desc="${meta.description.slice(0, 60)}…"\n`,
  );
  process.stderr.write(
    `  colors · 고유 ${colors.length}개, 상위 8개를 Brand/Neutral 후보로 분류\n`,
  );
  process.stderr.write(`  fonts · ${fonts.join(", ") || "감지 실패"}\n\n`);

  const code = buildDraft({
    url,
    slug: inferredSlug,
    name: inferredName,
    description: meta.description,
    colors,
    fonts,
  });

  if (outFile) {
    await writeFile(outFile, code, "utf8");
    process.stderr.write(`✓ wrote ${outFile}\n`);
  } else {
    process.stdout.write(code);
  }
}

main().catch((err: unknown) => {
  process.stderr.write(
    `error · ${err instanceof Error ? err.message : String(err)}\n`,
  );
  process.exit(1);
});
