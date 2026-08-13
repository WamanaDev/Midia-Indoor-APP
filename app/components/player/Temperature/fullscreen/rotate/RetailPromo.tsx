import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTVScale } from "../../../../../hook/Scale";
import { conditionFromCode, WeatherCondition, weatherIcon } from "../../../../../utils/weatherCondition";
import { formatTemperature } from "../../format";
import { WeatherTemplateProps } from "../types";

/**
 * `retail-promo` (§5.3) — bloco de cor vibrante com cartão branco
 * arredondado grande. A cor do bloco varia com a condição do tempo, pra dar
 * um pouco de variedade visual entre entradas do revezamento.
 */
const BLOCK_COLOR: Record<WeatherCondition, string> = {
  clear: "#f97316",
  partly: "#fb923c",
  cloudy: "#64748b",
  fog: "#0d9488",
  rain: "#2563eb",
  storm: "#7c3aed",
  snow: "#0ea5e9",
};

export function RetailPromo({ location, reading }: WeatherTemplateProps) {
  const scale = useTVScale();
  const condition = conditionFromCode(reading?.weathercode ?? null);
  const icon = weatherIcon(condition, reading?.isDay ?? true);
  const unit = location.unit || "C";
  const blockColor = BLOCK_COLOR[condition];

  return (
    <View style={[styles.container, { backgroundColor: blockColor }]}>
      <View
        style={{
          position: "absolute",
          top: scale(40),
          left: scale(40),
          backgroundColor: "rgba(0,0,0,0.2)",
          paddingHorizontal: scale(16),
          paddingVertical: scale(8),
          borderRadius: scale(999),
        }}
      >
        <Text style={{ fontSize: scale(18), color: "#fff", fontWeight: "700", letterSpacing: scale(2) }}>
          AGORA
        </Text>
      </View>

      <View
        style={{
          backgroundColor: "#fff",
          borderRadius: scale(36),
          paddingHorizontal: scale(72),
          paddingVertical: scale(56),
          alignItems: "center",
          shadowColor: "#000",
          shadowOpacity: 0.25,
          shadowRadius: scale(24),
          shadowOffset: { width: 0, height: scale(12) },
        }}
      >
        <MaterialCommunityIcons name={icon as any} size={scale(72)} color={blockColor} />
        <Text style={{ fontSize: scale(120), fontWeight: "800", color: "#111827", marginTop: scale(8) }}>
          {formatTemperature(reading?.temperature ?? null, unit)}
        </Text>
        <Text
          style={{
            fontSize: scale(26),
            color: "#374151",
            textTransform: "uppercase",
            letterSpacing: scale(2),
            marginTop: scale(6),
            fontWeight: "600",
          }}
        >
          {location.label}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
