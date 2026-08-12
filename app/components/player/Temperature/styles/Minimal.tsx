import React from "react";
import { Text } from "react-native";
import { useTVScale } from "../../../../hook/Scale";
import { formatTemperature } from "../format";
import { TemperatureStyleProps } from "../types";

export function Minimal({ value, unit }: TemperatureStyleProps) {
  const scale = useTVScale();
  return (
    <Text style={{ fontSize: scale(52), fontWeight: "700", color: "#fff" }}>
      {formatTemperature(value, unit)}
    </Text>
  );
}
