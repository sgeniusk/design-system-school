// 디자인 분석 스펙 모음 — slug로 조회. bodies.ts와 동일한 매핑 패턴.
import type { AnalysisDesignSpec } from "@/lib/types";
import { tossSpec } from "./toss";
import { krdsSpec } from "./krds";
import { gmarketSpec } from "./gmarket";
import { wantedSpec } from "./wanted";

export const designSpecs: Record<string, AnalysisDesignSpec> = {
  toss: tossSpec,
  krds: krdsSpec,
  gmarket: gmarketSpec,
  wanted: wantedSpec,
};
