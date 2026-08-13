import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTVScale } from "../../../../../hook/Scale";
import { conditionFromCode, weatherIcon } from "../../../../../utils/weatherCondition";
import { formatTemperature } from "../../format";
import { WeatherTogetherTemplateProps } from "../types";

/**
 * `dashboard-tiles` (§5.4) — cartões elevados brancos, estilo painel
 * corporativo, um por localidade, em linha com wrap.
 */
export function DashboardTiles({ locations, readings }: WeatherTogetherTemplateProps) {
  const scale = useTVScale();

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center", gap: scale(28) }}>
        {locations.map((loc) => {
          const reading = readings[loc.id];
          const condition = conditionFromCode(reading?.weathercode ?? null);
          const icon = weatherIcon(condition, reading?.isDay ?? true);
          const unit = loc.unit || "C";

          return (
            <View
              key={loc.id}
              style={{
                backgroundColor: "#fff",
                borderRadius: scale(24),
                paddingHorizontal: scale(36),
                paddingVertical: scale(32),
                alignItems: "center",
                minWidth: scale(260),
                shadowColor: "#000",
                shadowOpacity: 0.15,
                shadowRadius: scale(16),
                shadowOffset: { width: 0, height: scale(8) },
              }}
            >
              <Text
                style={{
                  fontSize: scale(16),
                  color: "#6b7280",
                  textTransform: "uppercase",
                  letterSpacing: scale(1.5),
                  fontWeight: "700",
                }}
              >
                {loc.label}
              </Text>
              <View style={{ flexDirection: "row", alignItems: "center", marginTop: scale(14) }}>
                <MaterialCommunityIcons name={icon as any} size={scale(40)} color="#2563eb" style={{ marginRight: scale(10) }} />
                <Text style={{ fontSize: scale(52), fontWeight: "800", color: "#111827" }}>
                  {formatTemperature(reading?.temperature ?? null, unit)}
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
    backgroundColor: "#f3f4f6",
    alignItems: "center",
    justifyContent: "center",
  },
});
