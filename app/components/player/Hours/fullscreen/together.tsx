import React from "react";
import { TimeTogetherTemplateId, TimeTogetherTemplateProps } from "./types";
import { DepartureTable } from "./together/DepartureTable";
import { RibbonStack } from "./together/RibbonStack";
import { ClockWall } from "./together/ClockWall";
import { GlassPanels } from "./together/GlassPanels";
import { TimelineRow } from "./together/TimelineRow";
import { CorporateLobby } from "./together/CorporateLobby";
import { TransitMultiboard } from "./together/TransitMultiboard";

/**
 * Templates "todos juntos" do relógio (§5.2) — todos os relógios
 * configurados ao mesmo tempo, usados com `layout: "vertical" | "horizontal"`.
 */
export const TIME_TOGETHER_TEMPLATES: Partial<
  Record<TimeTogetherTemplateId, React.ComponentType<TimeTogetherTemplateProps>>
> = {
  "departure-table": DepartureTable,
  "ribbon-stack": RibbonStack,
  "clock-wall": ClockWall,
  "glass-panels": GlassPanels,
  "timeline-row": TimelineRow,
  "corporate-lobby": CorporateLobby,
  "transit-multiboard": TransitMultiboard,
};
