import React from "react";
import { Text, View } from "react-native";
import { useTVScale } from "../../../../hook/Scale";
import { formatTemperature } from "../format";
import { TemperatureStyleProps } from "../types";

export function Corporate({ value, unit }: TemperatureStyleProps) {
  const scale = useTVScale();
  return (
    <View
      style={{
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#e5e7eb",
        paddingHorizontal: scale(24),
        paddingVertical: scale(14),
        borderRadius: scale(16),
      }}
    >
      <Text style={{ fontSize: scale(48), fontWeight: "600", color: "#374151" }}>
        {formatTemperature(value, unit)}
      </Text>
    </View>
  );
}
