import React from "react";
import { Text, View } from "react-native";
import { useTVScale } from "../../../../hook/Scale";
import { ThreeBadge } from "../../shared/ThreeBadge";
import { ClockStyleProps } from "../types";

export function Sphere({ value, reduceMotion }: ClockStyleProps) {
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
        geometry="icosahedron"
        color="#3b82f6"
        emissive="#facc15"
        size={size}
        reduceMotion={reduceMotion}
      />
      <Text
        style={{
          position: "absolute",
          fontSize: scale(30),
          fontFamily: "monospace",
          fontWeight: "700",
          color: "#fff",
          textShadowColor: "rgba(0,0,0,0.8)",
          textShadowOffset: { width: 0, height: scale(1) },
          textShadowRadius: scale(6),
        }}
      >
        {value.text}
      </Text>
    </View>
  );
}
