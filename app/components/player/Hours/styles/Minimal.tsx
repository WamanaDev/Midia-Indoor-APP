import React from "react";
import { Text } from "react-native";
import { useTVScale } from "../../../../hook/Scale";
import { ClockStyleProps } from "../types";

export function Minimal({ value }: ClockStyleProps) {
  const scale = useTVScale();
  return (
    <Text style={{ fontSize: scale(52), fontWeight: "600", color: "#fff" }}>
      {value.text}
    </Text>
  );
}
