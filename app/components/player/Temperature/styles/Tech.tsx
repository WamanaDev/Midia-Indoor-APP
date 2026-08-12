import React from "react";
import { Text, View } from "react-native";
import { useTVScale } from "../../../../hook/Scale";
import { formatTemperature } from "../format";
import { TemperatureStyleProps } from "../types";

export function Tech({ value, unit }: TemperatureStyleProps) {
  const scale = useTVScale();
  return (
    <View
      style={{
        backgroundColor: "#0f172a",
        borderWidth: 1,
        borderColor: "#334155",
        paddingHorizontal: scale(24),
        paddingVertical: scale(14),
        borderRadius: scale(12),
      }}
    >
      <Text
        style={{
          fontSize: scale(48),
          fontFamily: "monospace",
          fontWeight: "600",
          color: "#22d3ee",
        }}
      >
        {formatTemperature(value, unit)}
      </Text>
    </View>
  );
}
