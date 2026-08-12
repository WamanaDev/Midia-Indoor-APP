import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";
import { useTVScale } from "../../../../hook/Scale";
import { formatTemperature } from "../format";
import { TemperatureStyleProps } from "../types";

export function Glass({ value, unit }: TemperatureStyleProps) {
  const scale = useTVScale();
  return (
    <BlurView
      intensity={40}
      tint="light"
      style={[
        styles.container,
        {
          paddingHorizontal: scale(24),
          paddingVertical: scale(14),
          borderRadius: scale(20),
        },
      ]}
    >
      <Text style={{ fontSize: scale(48), fontWeight: "600", color: "#fff" }}>
        {formatTemperature(value, unit)}
      </Text>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,0.2)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
});
