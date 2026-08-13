import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTVScale } from "../../../../../hook/Scale";
import { conditionFromCode, weatherIcon } from "../../../../../utils/weatherCondition";
import { formatTemperature } from "../../format";
import { WeatherTogetherTemplateProps } from "../types";

/**
 * `weather-strip-multi` (§5.4) — ícones e temperaturas numa faixa sob um
 * gradiente de céu. O céu segue o dia/noite da primeira localidade (não dá
 * pra ter um céu por localidade num fundo único).
 */
export function WeatherStripMulti({ locations, readings }: WeatherTogetherTemplateProps) {
  const scale = useTVScale();
  const isDay = readings[locations[0]?.id]?.isDay ?? true;
  const sky: [string, string] = isDay ? ["#38bdf8", "#0284c7"] : ["#1e293b", "#020617"];

  return (
    <LinearGradient colors={sky} style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          backgroundColor: "rgba(0,0,0,0.25)",
          paddingVertical: scale(36),
          paddingHorizontal: scale(24),
        }}
      >
        {locations.map((loc, i) => {
          const reading = readings[loc.id];
          const condition = conditionFromCode(reading?.weathercode ?? null);
          const icon = weatherIcon(condition, reading?.isDay ?? isDay);
          const unit = loc.unit || "C";

          return (
            <View
              key={loc.id}
              style={{
                alignItems: "center",
                paddingHorizontal: scale(28),
                borderLeftWidth: i === 0 ? 0 : 1,
                borderColor: "rgba(255,255,255,0.25)",
              }}
            >
              <Text
                style={{
                  fontSize: scale(16),
                  color: "rgba(255,255,255,0.85)",
                  textTransform: "uppercase",
                  letterSpacing: scale(1),
                  marginBottom: scale(8),
                }}
              >
                {loc.label}
              </Text>
              <MaterialCommunityIcons name={icon as any} size={scale(40)} color="#fff" />
              <Text style={{ fontSize: scale(46), fontWeight: "700", color: "#fff", marginTop: scale(6) }}>
                {formatTemperature(reading?.temperature ?? null, unit)}
              </Text>
            </View>
          );
        })}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
  },
});
