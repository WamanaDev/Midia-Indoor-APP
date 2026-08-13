import React from "react";
import { TimeRotateTemplateId, TimeTemplateProps } from "./types";
import { AirportSplit } from "./rotate/AirportSplit";
import { TransitBoard } from "./rotate/TransitBoard";
import { BoardingPass } from "./rotate/BoardingPass";
import { StadiumScoreboard } from "./rotate/StadiumScoreboard";
import { SubwayPanel } from "./rotate/SubwayPanel";
import { NeonMarquee } from "./rotate/NeonMarquee";
import { TerminalReadout } from "./rotate/TerminalReadout";
import { DataWall } from "./rotate/DataWall";

/**
 * Templates "rodar" do relógio (§5.1) — uma entrada por vez, tela inteira,
 * usados com `layout: "rotate"`. Cada componente recebe o `clock` atual da
 * rotação (label + config) e calcula a hora com `getClockValue` (ver
 * `../clockMath`), igual o `ClockFace` já faz.
 */
export const TIME_ROTATE_TEMPLATES: Partial<
  Record<TimeRotateTemplateId, React.ComponentType<TimeTemplateProps>>
> = {
  "airport-split": AirportSplit,
  "transit-board": TransitBoard,
  "boarding-pass": BoardingPass,
  "stadium-scoreboard": StadiumScoreboard,
  "subway-panel": SubwayPanel,
  "neon-marquee": NeonMarquee,
  "terminal-readout": TerminalReadout,
  "data-wall": DataWall,
};
