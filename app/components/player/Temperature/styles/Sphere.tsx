import React from "react";
import { Text, View } from "react-native";
import { useTVScale } from "../../../../hook/Scale";
import { ThreeBadge } from "../../shared/ThreeBadge";
import { formatTemperature } from "../format";
import { TemperatureStyleProps } from "../types";

export function Sphere({ value, unit, reduceMotion }: TemperatureStyleProps) {
  const scale = useTVScale();
  const size = scale(120);

  return (
    <View
      style={{
        width: size,
        height: size,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ThreeBadge
        geometry="torus"
        color="#0ea5e9"
        size={size}
        reduceMotion={reduceMotion}
      />
      <Text
        style={{
          position: "absolute",
          fontSize: scale(36),
          fontWeight: "700",
          color: "#fff",
          textShadowColor: "rgba(0,0,0,0.8)",
          textShadowOffset: { width: 0, height: scale(1) },
          textShadowRadius: scale(6),
        }}
      >
        {formatTemperature(value, unit)}
      </Text>
    </View>
  );
}
