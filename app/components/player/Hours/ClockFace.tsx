import React from "react";
import { Minimal } from "./styles/Minimal";
import { Badge } from "./styles/Badge";
import { Card } from "./styles/Card";
import { Digital } from "./styles/Digital";
import { Glass } from "./styles/Glass";
import { Flip } from "./styles/Flip";
import { Pulse } from "./styles/Pulse";
import { Analog } from "./styles/Analog";
import { Orbit } from "./styles/Orbit";
import { Flip3D } from "./styles/Flip3D";
import { Sphere } from "./styles/Sphere";
import { getClockValue } from "./clockMath";
import { ClockConfig } from "./types";

interface ClockFaceProps {
  style: string;
  clock: ClockConfig;
  now: Date;
  reduceMotion: boolean;
}

export function ClockFace({ style, clock, now, reduceMotion }: ClockFaceProps) {
  const value = getClockValue(now, clock);

  if (style.startsWith("analog-")) {
    const variant = style.replace("analog-", "") as
      | "minimal"
      | "neon"
      | "corporate"
      | "tech"
      | "dark";
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
    case "orbit":
      return <Orbit value={value} reduceMotion={reduceMotion} />;
    case "flip3d":
      return <Flip3D value={value} reduceMotion={reduceMotion} />;
    case "sphere":
      return <Sphere value={value} reduceMotion={reduceMotion} />;
    case "minimal":
    default:
      return <Minimal value={value} reduceMotion={reduceMotion} />;
  }
}
