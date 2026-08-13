import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTVScale } from "../../../../../hook/Scale";
import { getClockValue } from "../../clockMath";
import { TimeTogetherTemplateProps } from "../types";

/**
 * `corporate-lobby` (§5.2) — horas lado a lado, fundo claro, cada uma com
 * sublinhado azul formal.
 */
export function CorporateLobby({ clocks, now }: TimeTogetherTemplateProps) {
  const scale = useTVScale();

  return (
    <View style={styles.root}>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: scale(64),
        }}
      >
        {clocks.map((clock) => {
          const value = getClockValue(now, clock);
          return (
            <View key={clock.id} style={{ alignItems: "center" }}>
              <Text
                style={{
                  fontSize: scale(18),
                  color: "#64748b",
                  textTransform: "uppercase",
                  letterSpacing: scale(3),
                  marginBottom: scale(10),
                }}
              >
                {clock.label}
              </Text>
              <Text
                style={{
                  fontSize: scale(56),
                  fontWeight: "700",
                  color: "#0f172a",
                }}
              >
                {value.text}
              </Text>
              <View
                style={{
                  marginTop: scale(12),
                  width: "70%",
                  height: scale(4),
                  backgroundColor: "#2563eb",
                  borderRadius: scale(2),
                }}
              />
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
    backgroundColor: "#f8fafc",
    alignItems: "center",
    justifyContent: "center",
  },
});
