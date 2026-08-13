import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTVScale } from "../../../../../hook/Scale";
import { getClockValue } from "../../clockMath";
import { TimeTogetherTemplateProps } from "../types";

const AMBER = "#f59e0b";

/**
 * `transit-multiboard` (§5.2) — lista âmbar estilo painel de embarque,
 * empilhada (versão "todos juntos" do `transit-board`).
 */
export function TransitMultiboard({ clocks, now }: TimeTogetherTemplateProps) {
  const scale = useTVScale();

  return (
    <View style={styles.root}>
      <View
        style={{
          borderWidth: scale(2),
          borderColor: AMBER,
          width: "72%",
          maxWidth: scale(1100),
        }}
      >
        {clocks.map((clock, i) => {
          const value = getClockValue(now, clock);
          return (
            <View
              key={clock.id}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingVertical: scale(20),
                paddingHorizontal: scale(32),
                borderTopWidth: i === 0 ? 0 : scale(1),
                borderTopColor: "rgba(245,158,11,0.35)",
              }}
            >
              <Text
                style={{
                  fontSize: scale(26),
                  fontFamily: "monospace",
                  color: AMBER,
                  textTransform: "uppercase",
                  letterSpacing: scale(3),
                }}
              >
                {clock.label}
              </Text>
              <Text
                style={{
                  fontSize: scale(36),
                  fontFamily: "monospace",
                  fontWeight: "700",
                  color: AMBER,
                  letterSpacing: scale(2),
                  textShadowColor: "rgba(245,158,11,0.5)",
                  textShadowRadius: scale(10),
                  textShadowOffset: { width: 0, height: 0 },
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
