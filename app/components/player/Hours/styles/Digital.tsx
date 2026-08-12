import React from "react";
import { Text, View } from "react-native";
import { useTVScale } from "../../../../hook/Scale";
import { ClockStyleProps } from "../types";

export function Digital({ value }: ClockStyleProps) {
  const scale = useTVScale();
  return (
    <View
      style={{
        backgroundColor: "#000",
        padding: scale(20),
        borderRadius: scale(16),
      }}
    >
      <Text
        style={{
          fontSize: scale(52),
          fontFamily: "monospace",
          color: "#4ade80",
          letterSpacing: scale(4),
        }}
      >
        {value.text}
      </Text>
    </View>
  );
}
