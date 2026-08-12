import React from "react";
import { Minimal } from "./styles/Minimal";
import { Badge } from "./styles/Badge";
import { Card } from "./styles/Card";
import { Digital } from "./styles/Digital";
import { Glass } from "./styles/Glass";
import { Pulse } from "./styles/Pulse";
import { Neon } from "./styles/Neon";
import { Corporate } from "./styles/Corporate";
import { Tech } from "./styles/Tech";
import { Dark } from "./styles/Dark";
import { Gauge } from "./styles/Gauge";
import { Wave } from "./styles/Wave";
import { Sphere } from "./styles/Sphere";
import { TemperatureStyleProps } from "./types";

export type TemperatureStyleId =
  | "minimal"
  | "badge"
  | "card"
  | "digital"
  | "glass"
  | "pulse"
  | "neon"
  | "corporate"
  | "tech"
  | "dark"
  | "gauge"
  | "wave"
  | "sphere";

const STYLES: Record<TemperatureStyleId, React.ComponentType<TemperatureStyleProps>> = {
  minimal: Minimal,
  badge: Badge,
  card: Card,
  digital: Digital,
  glass: Glass,
  pulse: Pulse,
  neon: Neon,
  corporate: Corporate,
  tech: Tech,
  dark: Dark,
  gauge: Gauge,
  wave: Wave,
  sphere: Sphere,
};

export function TemperatureFace(
  props: TemperatureStyleProps & { style: string }
) {
  const Component = STYLES[props.style as TemperatureStyleId] || Card;
  return <Component value={props.value} unit={props.unit} reduceMotion={props.reduceMotion} />;
}
