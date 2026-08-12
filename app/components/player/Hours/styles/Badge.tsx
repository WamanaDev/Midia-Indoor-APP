import React from "react";
import { Text, View } from "react-native";
import { useTVScale } from "../../../../hook/Scale";
import { ClockStyleProps } from "../types";

export function Badge({ value }: ClockStyleProps) {
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
        {value.text}
      </Text>
    </View>
  );
}
