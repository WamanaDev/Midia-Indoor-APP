import React from "react";
import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTVScale } from "../../../../hook/Scale";
import { ClockStyleProps } from "../types";

export type AnalogVariant = "minimal" | "neon" | "corporate" | "tech" | "dark";

interface Theme {
  background: string | null;
  gradient?: [string, string];
  border: string;
  hand: string;
  center: string;
  glow?: number;
  ticks?: boolean;
}

const THEME: Record<AnalogVariant, Theme> = {
  minimal: { background: null, border: "rgba(255,255,255,0.9)", hand: "#fff", center: "#fff" },
  neon: { background: "#000", border: "#22d3ee", hand: "#22d3ee", center: "#22d3ee", glow: 8 },
  corporate: { background: "#fff", border: "#d1d5db", hand: "#374151", center: "#374151" },
  tech: {
    background: "#0f172a",
    border: "#334155",
    hand: "#22d3ee",
    center: "#22d3ee",
    glow: 6,
    ticks: true,
  },
  dark: {
    background: null,
    gradient: ["#000000", "#1f2937"],
    border: "rgba(255,255,255,0.4)",
    hand: "#fff",
    center: "#fff",
  },
};

export function Analog({
  value,
  variant,
}: ClockStyleProps & { variant: AnalogVariant }) {
  const scale = useTVScale();
  const size = scale(96);
  const theme = THEME[variant];

  const dialStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
    borderWidth: scale(2),
    borderColor: theme.border,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    backgroundColor: theme.background || "transparent",
  };

  const handShadow = theme.glow
    ? {
        shadowColor: theme.hand,
        shadowOpacity: 0.9,
        shadowRadius: theme.glow,
        shadowOffset: { width: 0, height: 0 },
      }
    : {};

  const hourLen = scale(26);
  const minuteLen = scale(38);

  const children = (
    <>
      {theme.ticks &&
        Array.from({ length: 60 }).map((_, i) => {
          const major = i % 5 === 0;
          return (
            <View
              key={i}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: size,
                height: size,
                alignItems: "center",
                transform: [{ rotate: `${i * 6}deg` }],
              }}
            >
              <View
                style={{
                  width: major ? scale(2) : scale(1),
                  height: major ? scale(8) : scale(4),
                  backgroundColor: theme.hand,
                  opacity: major ? 0.9 : 0.35,
                }}
              />
            </View>
          );
        })}

      {/* ponteiro da hora */}
      <View
        style={[
          {
            position: "absolute",
            width: scale(2),
            height: hourLen,
            borderRadius: scale(1),
            backgroundColor: theme.hand,
            top: size / 2 - hourLen,
            left: size / 2 - scale(1),
            transformOrigin: ["50%", "100%"] as any,
            transform: [{ rotate: `${value.hourDeg}deg` }],
          },
          handShadow,
        ]}
      />
      {/* ponteiro do minuto */}
      <View
        style={[
          {
            position: "absolute",
            width: scale(1.5),
            height: minuteLen,
            borderRadius: scale(1),
            backgroundColor: theme.hand,
            top: size / 2 - minuteLen,
            left: size / 2 - scale(0.75),
            transformOrigin: ["50%", "100%"] as any,
            transform: [{ rotate: `${value.minuteDeg}deg` }],
          },
          handShadow,
        ]}
      />
      {/* centro */}
      <View
        style={{
          position: "absolute",
          width: scale(6),
          height: scale(6),
          borderRadius: scale(3),
          top: size / 2 - scale(3),
          left: size / 2 - scale(3),
          backgroundColor: theme.center,
        }}
      />
    </>
  );

  if (theme.gradient) {
    return (
      <LinearGradient colors={theme.gradient} style={dialStyle}>
        {children}
      </LinearGradient>
    );
  }

  return <View style={dialStyle}>{children}</View>;
}
