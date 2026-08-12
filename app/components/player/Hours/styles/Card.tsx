import React from "react";
import { Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTVScale } from "../../../../hook/Scale";
import { ClockStyleProps } from "../types";

export function Card({ value }: ClockStyleProps) {
  const scale = useTVScale();
  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: "#fff",
        padding: scale(16),
        borderRadius: scale(12),
        alignItems: "center",
      }}
    >
      <MaterialCommunityIcons
        name="clock-outline"
        size={scale(40)}
        color="#374151"
      />
      <Text
        style={{
          marginLeft: scale(10),
          fontSize: scale(48),
          fontWeight: "700",
          color: "#111",
        }}
      >
        {value.text}
      </Text>
    </View>
  );
}
