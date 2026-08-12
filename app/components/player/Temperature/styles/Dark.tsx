import React from "react";
import { Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTVScale } from "../../../../hook/Scale";
import { formatTemperature } from "../format";
import { TemperatureStyleProps } from "../types";

export function Dark({ value, unit }: TemperatureStyleProps) {
  const scale = useTVScale();
  return (
    <LinearGradient
      colors={["#000000", "#374151"]}
      style={{
        paddingHorizontal: scale(24),
        paddingVertical: scale(14),
        borderRadius: scale(16),
      }}
    >
      <Text style={{ fontSize: scale(48), fontWeight: "600", color: "#fff" }}>
        {formatTemperature(value, unit)}
      </Text>
    </LinearGradient>
  );
}
