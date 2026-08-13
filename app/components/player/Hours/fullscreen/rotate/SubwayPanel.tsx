import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTVScale } from "../../../../../hook/Scale";
import { getClockValue } from "../../clockMath";
import { TimeTemplateProps } from "../types";

const PHOSPHOR = "#39ff14";

/**
 * `subway-panel` (§5.1) — verde fosforescente sobre preto, estética retrô
 * de estação de metrô (traços decorativos acima/abaixo do valor).
 */
export function SubwayPanel({ clock, now }: TimeTemplateProps) {
  const scale = useTVScale();
  const value = getClockValue(now, clock);
  const ticks = Array.from({ length: 30 });

  return (
    <View style={styles.root}>
      <View style={{ flexDirection: "row", gap: scale(6), marginBottom: scale(24) }}>
        {ticks.map((_, i) => (
          <View key={i} style={{ width: scale(4), height: scale(4), backgroundColor: PHOSPHOR, opacity: 0.5 }} />
        ))}
      </View>

      <Text
        style={{
          fontSize: scale(24),
          fontFamily: "monospace",
          color: PHOSPHOR,
          letterSpacing: scale(8),
          textTransform: "uppercase",
          marginBottom: scale(16),
          opacity: 0.85,
        }}
      >
        {clock.label}
      </Text>

      <Text
        style={{
          fontSize: scale(140),
          fontFamily: "monospace",
          fontWeight: "700",
          color: PHOSPHOR,
          letterSpacing: scale(6),
          textShadowColor: "rgba(57,255,20,0.55)",
          textShadowRadius: scale(14),
          textShadowOffset: { width: 0, height: 0 },
        }}
      >
        {value.text}
      </Text>

      <View style={{ flexDirection: "row", gap: scale(6), marginTop: scale(24) }}>
        {ticks.map((_, i) => (
          <View key={i} style={{ width: scale(4), height: scale(4), backgroundColor: PHOSPHOR, opacity: 0.5 }} />
        ))}
      </View>
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
