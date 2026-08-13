import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTVScale } from "../../../../../hook/Scale";
import { conditionFromCode, weatherIcon } from "../../../../../utils/weatherCondition";
import { formatTemperature } from "../../format";
import { WeatherTemplateProps } from "../types";

/**
 * `horizon-line` (§5.3) — divisão em duas cores por uma linha de horizonte
 * (céu em cima, chão embaixo), ícone/valor cruzando a linha.
 */
export function HorizonLine({ location, reading }: WeatherTemplateProps) {
  const scale = useTVScale();
  const isDay = reading?.isDay ?? true;
  const condition = conditionFromCode(reading?.weathercode ?? null);
  const icon = weatherIcon(condition, isDay);
  const unit = location.unit || "C";

  const skyColor = isDay ? "#0ea5e9" : "#0f172a";
  const groundColor = isDay ? "#111827" : "#000000";

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, backgroundColor: skyColor }} />
      <View style={{ flex: 1, backgroundColor: groundColor }} />

      <View style={{ position: "absolute", alignItems: "center", justifyContent: "center" }}>
        <View
          style={{
            width: scale(2),
            height: "60%",
            position: "absolute",
            backgroundColor: "rgba(255,255,255,0.15)",
          }}
        />

        <View
          style={{
            backgroundColor: "#fff",
            borderRadius: scale(999),
            paddingHorizontal: scale(56),
            paddingVertical: scale(36),
            flexDirection: "row",
            alignItems: "center",
            shadowColor: "#000",
            shadowOpacity: 0.3,
            shadowRadius: scale(20),
            shadowOffset: { width: 0, height: scale(6) },
          }}
        >
          <MaterialCommunityIcons name={icon as any} size={scale(56)} color="#111827" style={{ marginRight: scale(16) }} />
          <Text style={{ fontSize: scale(88), fontWeight: "800", color: "#111827" }}>
            {formatTemperature(reading?.temperature ?? null, unit)}
          </Text>
        </View>

        <Text
          style={{
            fontSize: scale(28),
            color: "#fff",
            textTransform: "uppercase",
            letterSpacing: scale(2),
            marginTop: scale(24),
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
