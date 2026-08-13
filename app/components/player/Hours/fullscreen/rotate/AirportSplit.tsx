import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTVScale } from "../../../../../hook/Scale";
import { getClockValue } from "../../clockMath";
import { TimeTemplateProps } from "../types";

/**
 * `airport-split` (§5.1) — tela dividida: painel escuro com a hora à
 * esquerda, painel em gradiente azul com o nome do local à direita.
 */
export function AirportSplit({ clock, now }: TimeTemplateProps) {
  const scale = useTVScale();
  const value = getClockValue(now, clock);

  return (
    <View style={styles.root}>
      <View style={[styles.side, styles.left]}>
        <Text
          style={{
            fontSize: scale(120),
            fontFamily: "monospace",
            fontWeight: "700",
            color: "#fff",
            letterSpacing: scale(2),
          }}
        >
          {value.text}
        </Text>
        <Text
          style={{
            marginTop: scale(12),
            fontSize: scale(18),
            color: "#6b7280",
            textTransform: "uppercase",
            letterSpacing: scale(4),
          }}
        >
          Horário local
        </Text>
      </View>

      <LinearGradient
        colors={["#1e3a8a", "#3b82f6"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.side, { paddingHorizontal: scale(24) }]}
      >
        <MaterialCommunityIcons
          name="airplane"
          size={scale(48)}
          color="rgba(255,255,255,0.85)"
        />
        <Text
          style={{
            marginTop: scale(16),
            fontSize: scale(44),
            fontWeight: "700",
            color: "#fff",
            textAlign: "center",
          }}
        >
          {clock.label}
        </Text>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: "row",
    backgroundColor: "#0a0e14",
  },
  side: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  left: {
    backgroundColor: "#0a0e14",
  },
});
