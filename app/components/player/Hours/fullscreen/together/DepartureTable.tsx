import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTVScale } from "../../../../../hook/Scale";
import { getClockValue } from "../../clockMath";
import { TimeTogetherTemplateProps } from "../types";

/**
 * `departure-table` (§5.2) — lista estilo painel de partidas de aeroporto:
 * local à esquerda, hora à direita, monoespaçado.
 */
export function DepartureTable({ clocks, now }: TimeTogetherTemplateProps) {
  const scale = useTVScale();

  return (
    <View style={styles.root}>
      <View style={{ width: "70%", maxWidth: scale(1100) }}>
        <View
          style={{
            flexDirection: "row",
            borderBottomWidth: scale(2),
            borderBottomColor: "#334155",
            paddingBottom: scale(12),
            marginBottom: scale(8),
          }}
        >
          <Text
            style={{
              flex: 1,
              fontSize: scale(16),
              color: "#64748b",
              textTransform: "uppercase",
              letterSpacing: scale(3),
            }}
          >
            Local
          </Text>
          <Text
            style={{
              fontSize: scale(16),
              color: "#64748b",
              textTransform: "uppercase",
              letterSpacing: scale(3),
            }}
          >
            Hora
          </Text>
        </View>

        {clocks.map((clock) => {
          const value = getClockValue(now, clock);
          return (
            <View
              key={clock.id}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingVertical: scale(18),
                borderBottomWidth: scale(1),
                borderBottomColor: "rgba(148,163,184,0.15)",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
                <MaterialCommunityIcons name="airplane" size={scale(20)} color="#94a3b8" />
                <Text
                  style={{
                    marginLeft: scale(12),
                    fontSize: scale(28),
                    color: "#e5e7eb",
                    fontWeight: "600",
                  }}
                >
                  {clock.label}
                </Text>
              </View>
              <Text
                style={{
                  fontSize: scale(32),
                  fontFamily: "monospace",
                  fontWeight: "700",
                  color: "#fff",
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
    backgroundColor: "#0a0e14",
    alignItems: "center",
    justifyContent: "center",
  },
});
