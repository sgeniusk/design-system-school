// AnalysisDesignSpec를 DESIGN.md 마크다운 문자열로 직렬화하는 순수 함수.
// design-md의 정본은 design-spec이며, 이 함수가 그 마크다운 표현을 생성한다.
import type { AnalysisDesignSpec, ColorGroup } from "@/lib/types";

function colorBlock(group: ColorGroup): string {
  const lines = group.swatches.map((s) => {
    const suffix = s.note ? ` — ${s.note}` : "";
    return `- \`${s.token}\`: ${s.hex}${suffix}`;
  });
  return `### ${group.label}\n${lines.join("\n")}`;
}

/** AnalysisDesignSpec → DESIGN.md 마크다운. 결정론적 순수 함수. */
export function specToMarkdown(spec: AnalysisDesignSpec): string {
  const principles = spec.principles.map((p) => `- ${p}`).join("\n");

  const colors = spec.colors.map(colorBlock).join("\n\n");

  const typeLines = spec.typeScale.map((t) => {
    const suffix = t.note ? ` — ${t.note}` : "";
    return `- \`${t.label}\`: ${t.size} / ${t.weight}${suffix}`;
  });
  if (spec.typographyNote) typeLines.push(`- ${spec.typographyNote}`);

  const spacingLines = [
    `- ${spec.spacing.base} 기반: ${spec.spacing.scale.join(" · ")}`,
  ];
  if (spec.spacing.note) spacingLines.push(`- ${spec.spacing.note}`);

  const radiusLines = spec.radii.map((r) => {
    const suffix = r.note ? ` — ${r.note}` : "";
    return `- \`${r.name}\`: ${r.px}px${suffix}`;
  });
  if (spec.elevationNote) radiusLines.push(`- ${spec.elevationNote}`);

  const components = `${spec.components.items.join(" · ")}\n\n- ${spec.components.note}`;

  return `# ${spec.name} — DESIGN.md

> ${spec.summary}
> ⚠️ ${spec.disclaimer}

## Identity & Principles

${principles}

## Color

${colors}

## Typography

- Font: ${spec.font}
${typeLines.join("\n")}

## Spacing

${spacingLines.join("\n")}

## Radius & Elevation

${radiusLines.join("\n")}

## Components

${components}

## Usage for AI agents

${spec.aiUsage}
`;
}
