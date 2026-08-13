import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTVScale } from "../../../../../hook/Scale";
import { conditionFromCode, weatherIcon } from "../../../../../utils/weatherCondition";
import { formatTemperature } from "../../format";
import { WeatherTemplateProps } from "../types";

/**
 * `corporate-brief` (§5.3) — fundo branco, valor grande à esquerda, barras
 * decorativas de gráfico à direita (puramente decorativas, sem dado real
 * por trás — é um enfeite de "boletim corporativo").
 */
const BAR_HEIGHTS = [0.4, 0.65, 0.5, 0.85, 0.6, 0.95, 0.7];

export function CorporateBrief({ location, reading }: WeatherTemplateProps) {
  const scale = useTVScale();
  const condition = conditionFromCode(reading?.weathercode ?? null);
  const icon = weatherIcon(condition, reading?.isDay ?? true);
  const unit = location.unit || "C";

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, justifyContent: "center", paddingLeft: scale(80) }}>
        <Text style={{ fontSize: scale(18), color: "#9ca3af", fontWeight: "700", letterSpacing: scale(3), textTransform: "uppercase" }}>
          Boletim Climático
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center", marginTop: scale(16) }}>
          <MaterialCommunityIcons name={icon as any} size={scale(64)} color="#111827" style={{ marginRight: scale(16) }} />
          <Text style={{ fontSize: scale(128), fontWeight: "800", color: "#111827" }}>
            {formatTemperature(reading?.temperature ?? null, unit)}
          </Text>
        </View>
        <View style={{ width: scale(72), height: scale(6), backgroundColor: "#2563eb", borderRadius: scale(3), marginTop: scale(20) }} />
        <Text style={{ fontSize: scale(30), color: "#374151", fontWeight: "600", marginTop: scale(14) }}>
          {location.label}
        </Text>
      </View>

      <View style={{ flex: 1, flexDirection: "row", alignItems: "flex-end", justifyContent: "center", gap: scale(18), paddingRight: scale(80), height: scale(320) }}>
        {BAR_HEIGHTS.map((h, i) => (
          <View
            key={i}
            style={{
              width: scale(36),
              height: scale(320) * h,
              borderRadius: scale(6),
              backgroundColor: i === BAR_HEIGHTS.length - 2 ? "#2563eb" : "#e5e7eb",
            }}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    flexDirection: "row",
    backgroundColor: "#fff",
  },
});
