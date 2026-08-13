import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTVScale } from "../../../../../hook/Scale";
import { getClockValue } from "../../clockMath";
import { TimeTemplateProps } from "../types";

/**
 * `stadium-scoreboard` (§5.1) — dígitos enormes e blocados, frisos âmbar
 * acima e abaixo, como um placar de estádio.
 */
export function StadiumScoreboard({ clock, now }: TimeTemplateProps) {
  const scale = useTVScale();
  const value = getClockValue(now, clock);

  return (
    <View style={styles.root}>
      <View style={{ height: scale(10), width: "70%", backgroundColor: "#f59e0b", marginBottom: scale(28) }} />

      <Text
        style={{
          fontSize: scale(170),
          fontWeight: "900",
          color: "#fff",
          letterSpacing: scale(4),
        }}
      >
        {value.text}
      </Text>

      <Text
        style={{
          marginTop: scale(20),
          fontSize: scale(28),
          fontWeight: "700",
          color: "#f59e0b",
          textTransform: "uppercase",
          letterSpacing: scale(6),
        }}
      >
        {clock.label}
      </Text>

      <View style={{ height: scale(10), width: "70%", backgroundColor: "#f59e0b", marginTop: scale(28) }} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
});
