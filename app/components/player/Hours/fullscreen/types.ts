import { ClockConfig } from "../types";

export interface TimeTemplateProps {
  clock: ClockConfig;
  now: Date;
  reduceMotion: boolean;
}

export interface TimeTogetherTemplateProps {
  clocks: ClockConfig[];
  now: Date;
  reduceMotion: boolean;
}

export type TimeRotateTemplateId =
  | "airport-split"
  | "transit-board"
  | "boarding-pass"
  | "stadium-scoreboard"
  | "subway-panel"
  | "neon-marquee"
  | "terminal-readout"
  | "data-wall";

export type TimeTogetherTemplateId =
  | "departure-table"
  | "ribbon-stack"
  | "clock-wall"
  | "glass-panels"
  | "timeline-row"
  | "corporate-lobby"
  | "transit-multiboard";
