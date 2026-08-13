import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTVScale } from "../../../../../hook/Scale";
import { conditionFromCode, weatherIcon } from "../../../../../utils/weatherCondition";
import { formatTemperature } from "../../format";
import { WeatherTemplateProps } from "../types";

/**
 * `weather-station-hero` (§5.3) — gradiente de céu (dia/noite), ícone de
 * condição grande no topo, valor e local embaixo.
 */
export function WeatherStationHero({ location, reading }: WeatherTemplateProps) {
  const scale = useTVScale();
  const isDay = reading?.isDay ?? true;
  const condition = conditionFromCode(reading?.weathercode ?? null);
  const icon = weatherIcon(condition, isDay);
  const unit = location.unit || "C";

  const sky: [string, string] = isDay ? ["#38bdf8", "#0ea5e9"] : ["#0f172a", "#1e293b"];

  return (
    <LinearGradient colors={sky} style={styles.container}>
      <MaterialCommunityIcons
        name={icon as any}
        size={scale(180)}
        color={isDay ? "#fff7ed" : "#e0e7ff"}
        style={{ marginBottom: scale(8) }}
      />
      <Text style={{ fontSize: scale(120), fontWeight: "800", color: "#fff" }}>
        {formatTemperature(reading?.temperature ?? null, unit)}
      </Text>
      <Text
        style={{
          fontSize: scale(28),
          color: "rgba(255,255,255,0.9)",
          textTransform: "uppercase",
          letterSpacing: scale(2),
          marginTop: scale(6),
          fontWeight: "600",
        }}
      >
        {location.label}
      </Text>

      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: scale(64),
          backgroundColor: isDay ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.3)",
        }}
      />
    </LinearGradient>
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
