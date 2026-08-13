import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTVScale } from "../../../../../hook/Scale";
import { conditionFromCode, weatherIcon } from "../../../../../utils/weatherCondition";
import { formatTemperature } from "../../format";
import { WeatherTogetherTemplateProps } from "../types";

/**
 * `badge-cloud` (§5.4) — selos soltos, leve desalinhamento vertical
 * alternado (cada selo par sobe um pouco, ímpar desce), como se estivessem
 * flutuando soltos em vez de alinhados numa grade rígida.
 */
export function BadgeCloud({ locations, readings }: WeatherTogetherTemplateProps) {
  const scale = useTVScale();

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center", gap: scale(24) }}>
        {locations.map((loc, i) => {
          const reading = readings[loc.id];
          const condition = conditionFromCode(reading?.weathercode ?? null);
          const icon = weatherIcon(condition, reading?.isDay ?? true);
          const unit = loc.unit || "C";
          const offset = i % 2 === 0 ? -scale(18) : scale(18);

          return (
            <View
              key={loc.id}
              style={{
                transform: [{ translateY: offset }],
                backgroundColor: "rgba(255,255,255,0.08)",
                borderWidth: 1,
                borderColor: "rgba(255,255,255,0.2)",
                borderRadius: scale(999),
                paddingHorizontal: scale(30),
                paddingVertical: scale(20),
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <MaterialCommunityIcons name={icon as any} size={scale(32)} color="#fff" style={{ marginRight: scale(12) }} />
              <View>
                <Text style={{ fontSize: scale(34), fontWeight: "700", color: "#fff" }}>
                  {formatTemperature(reading?.temperature ?? null, unit)}
                </Text>
                <Text
                  style={{
                    fontSize: scale(14),
                    color: "#9ca3af",
                    textTransform: "uppercase",
                    letterSpacing: scale(1),
                  }}
                >
                  {loc.label}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
});
