import React from "react";
import { Text } from "react-native";
import { useTVScale } from "../../../../hook/Scale";
import { formatTemperature } from "../format";
import { TemperatureStyleProps } from "../types";

export function Neon({ value, unit }: TemperatureStyleProps) {
  const scale = useTVScale();
  return (
    <Text
      style={{
        fontSize: scale(52),
        fontWeight: "700",
        color: "#22d3ee",
        textShadowColor: "#22d3ee",
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: scale(16),
      }}
    >
      {formatTemperature(value, unit)}
    </Text>
  );
}
