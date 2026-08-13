import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTVScale } from "../../../hook/Scale";
import { CHIP_STYLES, NEW_CHIP_STYLE_IDS, NewChipStyleId } from "../shared/chipStyles";
import { weatherIcon } from "../../../utils/weatherCondition";
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
import { Sphere } from "./styles/Sphere";
import { formatTemperature } from "./format";
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
  sphere: Sphere,
};

export function TemperatureFace(props: TemperatureStyleProps & { style: string }) {
  if (NEW_CHIP_STYLE_IDS.includes(props.style as NewChipStyleId)) {
    return <ChipTemperature {...props} />;
  }

  const Component = STYLES[props.style as TemperatureStyleId] || Card;
  return <Component {...props} />;
}

function ChipTemperature(props: TemperatureStyleProps & { style: string }) {
  const scale = useTVScale();
  const Component = CHIP_STYLES[props.style as NewChipStyleId];
  const icon =
    props.style === "icon-tight" ? (
      <MaterialCommunityIcons
        name={weatherIcon(props.condition ?? "clear", props.isDay ?? true) as any}
        size={scale(20)}
        color="#fff"
      />
    ) : undefined;
  return (
    <Component
      value={formatTemperature(props.value, props.unit)}
      icon={icon}
      size={props.size ?? "lg"}
    />
  );
}
