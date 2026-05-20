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
import Motion from "./concepts/motion.mdx";
import Affordance from "./concepts/affordance.mdx";
import InteractionFeedback from "./concepts/interaction-feedback.mdx";
import States from "./concepts/states.mdx";
import InformationArchitecture from "./concepts/information-architecture.mdx";
import ContentDesign from "./concepts/content-design.mdx";
import Iconography from "./concepts/iconography.mdx";
import Microcopy from "./concepts/microcopy.mdx";
import ResponsiveDesign from "./concepts/responsive-design.mdx";
import Theming from "./concepts/theming.mdx";
import Performance from "./concepts/performance.mdx";

import EmptyState from "./patterns/empty-state.mdx";
import FormValidation from "./patterns/form-validation.mdx";
import ModalDialog from "./patterns/modal-dialog.mdx";
import CardGrid from "./patterns/card-grid.mdx";
import DataTable from "./patterns/data-table.mdx";
import NavigationBar from "./patterns/navigation-bar.mdx";

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
  motion: Motion,
  affordance: Affordance,
  "interaction-feedback": InteractionFeedback,
  states: States,
  "information-architecture": InformationArchitecture,
  "content-design": ContentDesign,
  iconography: Iconography,
  microcopy: Microcopy,
  "responsive-design": ResponsiveDesign,
  theming: Theming,
  performance: Performance,
};

export const patternBodies: Record<string, ComponentType> = {
  "empty-state": EmptyState,
  "form-validation": FormValidation,
  "modal-dialog": ModalDialog,
  "card-grid": CardGrid,
  "data-table": DataTable,
  "navigation-bar": NavigationBar,
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

export function getPatternBody(slug: string): ComponentType | undefined {
  return patternBodies[slug];
}

export function getAnalysisBody(slug: string): ComponentType | undefined {
  return analysisBodies[slug];
}
