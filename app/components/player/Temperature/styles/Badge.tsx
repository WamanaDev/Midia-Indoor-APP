import React from "react";
import { Text, View } from "react-native";
import { useTVScale } from "../../../../hook/Scale";
import { formatTemperature } from "../format";
import { TemperatureStyleProps } from "../types";

export function Badge({ value, unit }: TemperatureStyleProps) {
  const scale = useTVScale();
  return (
    <View
      style={{
        backgroundColor: "#fff",
        paddingHorizontal: scale(24),
        paddingVertical: scale(12),
        borderRadius: scale(40),
      }}
    >
      <Text style={{ fontSize: scale(48), fontWeight: "600", color: "#111" }}>
        {formatTemperature(value, unit)}
      </Text>
    </View>
  );
}
