import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTVScale } from "../../../../../hook/Scale";
import { conditionFromCode, weatherIcon } from "../../../../../utils/weatherCondition";
import { formatTemperature } from "../../format";
import { WeatherTogetherTemplateProps } from "../types";

/**
 * `globe-row` (§5.4) — selos esféricos em gradiente por cidade, alinhados
 * em fileira. A esfera é aproximada com um círculo (`borderRadius: size/2`)
 * preenchido por um `LinearGradient` diagonal — RN não tem esfera 3D sem
 * Three.js, e não vale a pena puxar isso aqui só pra um selo.
 */
const PALETTES: [string, string][] = [
  ["#0ea5e9", "#312e81"],
  ["#f97316", "#7c2d12"],
  ["#10b981", "#064e3b"],
  ["#ec4899", "#831843"],
  ["#a855f7", "#3b0764"],
  ["#eab308", "#713f12"],
];

export function GlobeRow({ locations, readings }: WeatherTogetherTemplateProps) {
  const scale = useTVScale();
  const size = scale(190);

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center", gap: scale(36) }}>
        {locations.map((loc, i) => {
          const reading = readings[loc.id];
          const condition = conditionFromCode(reading?.weathercode ?? null);
          const icon = weatherIcon(condition, reading?.isDay ?? true);
          const unit = loc.unit || "C";
          const colors = PALETTES[i % PALETTES.length];

          return (
            <View key={loc.id} style={{ alignItems: "center" }}>
              <LinearGradient
                colors={colors}
                start={{ x: 0.2, y: 0 }}
                end={{ x: 0.8, y: 1 }}
                style={{
                  width: size,
                  height: size,
                  borderRadius: size / 2,
                  alignItems: "center",
                  justifyContent: "center",
                  shadowColor: colors[0],
                  shadowOpacity: 0.5,
                  shadowRadius: scale(20),
                  shadowOffset: { width: 0, height: scale(6) },
                }}
              >
                <MaterialCommunityIcons name={icon as any} size={scale(36)} color="#fff" />
                <Text style={{ fontSize: scale(40), fontWeight: "700", color: "#fff", marginTop: scale(4) }}>
                  {formatTemperature(reading?.temperature ?? null, unit)}
                </Text>
              </LinearGradient>
              <Text
                style={{
                  fontSize: scale(18),
                  color: "#fff",
                  textTransform: "uppercase",
                  letterSpacing: scale(1.5),
                  marginTop: scale(14),
                  fontWeight: "600",
                }}
              >
                {loc.label}
              </Text>
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
