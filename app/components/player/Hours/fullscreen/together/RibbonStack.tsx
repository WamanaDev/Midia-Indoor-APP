import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTVScale } from "../../../../../hook/Scale";
import { getClockValue } from "../../clockMath";
import { TimeTogetherTemplateProps } from "../types";

const ACCENTS = ["#ef4444", "#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899"];

/**
 * `ribbon-stack` (§5.2) — faixas coloridas empilhadas, uma cor de destaque
 * por relógio.
 */
export function RibbonStack({ clocks, now }: TimeTogetherTemplateProps) {
  const scale = useTVScale();

  return (
    <View style={styles.root}>
      <View style={{ width: "100%" }}>
        {clocks.map((clock, i) => {
          const value = getClockValue(now, clock);
          const accent = ACCENTS[i % ACCENTS.length];
          return (
            <View
              key={clock.id}
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: scale(22),
                paddingHorizontal: scale(56),
                backgroundColor: "#0b0f16",
                borderLeftWidth: scale(10),
                borderLeftColor: accent,
              }}
            >
              <Text
                style={{
                  flex: 1,
                  fontSize: scale(28),
                  fontWeight: "700",
                  color: "#e5e7eb",
                  textTransform: "uppercase",
                  letterSpacing: scale(2),
                }}
              >
                {clock.label}
              </Text>
              <Text
                style={{
                  fontSize: scale(56),
                  fontFamily: "monospace",
                  fontWeight: "700",
                  color: accent,
                }}
              >
                {value.text}
              </Text>
            </View>
          );
        })}
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
