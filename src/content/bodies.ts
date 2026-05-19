// 슬러그 → MDX 본문 컴포넌트 매핑.
import type { ComponentType } from "react";

import DesignSystem from "./concepts/design-system.mdx";
import DesignTokens from "./concepts/design-tokens.mdx";
import Color from "./concepts/color.mdx";
import Typography from "./concepts/typography.mdx";
import Spacing from "./concepts/spacing.mdx";
import LayoutGrid from "./concepts/layout-grid.mdx";
import VisualHierarchy from "./concepts/visual-hierarchy.mdx";
import Components from "./concepts/components.mdx";
import PatternsGuidelines from "./concepts/patterns-guidelines.mdx";
import Accessibility from "./concepts/accessibility.mdx";

import Toss from "./analyses/toss.mdx";
import Krds from "./analyses/krds.mdx";
import Gmarket from "./analyses/gmarket.mdx";
import Wanted from "./analyses/wanted.mdx";
import Letters from "./analyses/letters.mdx";

export const conceptBodies: Record<string, ComponentType> = {
  "design-system": DesignSystem,
  "design-tokens": DesignTokens,
  color: Color,
  typography: Typography,
  spacing: Spacing,
  "layout-grid": LayoutGrid,
  "visual-hierarchy": VisualHierarchy,
  components: Components,
  "patterns-guidelines": PatternsGuidelines,
  accessibility: Accessibility,
};

export const analysisBodies: Record<string, ComponentType> = {
  toss: Toss,
  krds: Krds,
  gmarket: Gmarket,
  wanted: Wanted,
  letters: Letters,
};

export function getConceptBody(slug: string): ComponentType | undefined {
  return conceptBodies[slug];
}

export function getAnalysisBody(slug: string): ComponentType | undefined {
  return analysisBodies[slug];
}
