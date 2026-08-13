import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTVScale } from "../../../hook/Scale";
import { CHIP_STYLES, NEW_CHIP_STYLE_IDS, NewChipStyleId } from "../shared/chipStyles";
import { Minimal } from "./styles/Minimal";
import { Badge } from "./styles/Badge";
import { Card } from "./styles/Card";
import { Digital } from "./styles/Digital";
import { Glass } from "./styles/Glass";
import { Flip } from "./styles/Flip";
import { Pulse } from "./styles/Pulse";
import { Analog } from "./styles/Analog";
import { Flip3D } from "./styles/Flip3D";
import { Sphere } from "./styles/Sphere";
import { getClockValue } from "./clockMath";
import { ClockConfig } from "./types";

interface ClockFaceProps {
  style: string;
  clock: ClockConfig;
  now: Date;
  reduceMotion: boolean;
  size?: "sm" | "lg";
}

export function ClockFace({ style, clock, now, reduceMotion, size = "lg" }: ClockFaceProps) {
  const scale = useTVScale();
  const value = getClockValue(now, clock);

  if (NEW_CHIP_STYLE_IDS.includes(style as NewChipStyleId)) {
    const Component = CHIP_STYLES[style as NewChipStyleId];
    const isDay = value.hours >= 6 && value.hours < 18;
    const icon =
      style === "icon-tight" ? (
        <MaterialCommunityIcons
          name={isDay ? "weather-sunny" : "weather-night"}
          size={scale(20)}
          color="#fff"
        />
      ) : undefined;
    return <Component value={value.text} icon={icon} size={size} />;
  }

  if (style === "analog-minimal" || style === "analog-neon" || style === "analog-corporate") {
    const variant = style.replace("analog-", "") as "minimal" | "neon" | "corporate";
    return <Analog value={value} reduceMotion={reduceMotion} variant={variant} />;
  }

  switch (style) {
    case "badge":
      return <Badge value={value} reduceMotion={reduceMotion} />;
    case "card":
      return <Card value={value} reduceMotion={reduceMotion} />;
    case "digital":
      return <Digital value={value} reduceMotion={reduceMotion} />;
    case "glass":
      return <Glass value={value} reduceMotion={reduceMotion} />;
    case "flip":
      return <Flip value={value} reduceMotion={reduceMotion} />;
    case "pulse":
      return <Pulse value={value} reduceMotion={reduceMotion} />;
    case "flip3d":
      return <Flip3D value={value} reduceMotion={reduceMotion} />;
    case "sphere":
      return <Sphere value={value} reduceMotion={reduceMotion} />;
    case "minimal":
    default:
      return <Minimal value={value} reduceMotion={reduceMotion} />;
  }
}
