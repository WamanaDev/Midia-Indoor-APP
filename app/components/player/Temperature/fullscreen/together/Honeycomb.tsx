import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Svg, { Polygon } from "react-native-svg";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTVScale } from "../../../../../hook/Scale";
import { conditionFromCode, weatherIcon } from "../../../../../utils/weatherCondition";
import { formatTemperature } from "../../format";
import { WeatherTogetherTemplateProps } from "../types";

/**
 * `honeycomb` (§5.4) — painéis hexagonais, visual moderno e técnico.
 * `react-native-svg` já é dependência do projeto (usado em `styles/Gauge.tsx`
 * e transitivamente por `react-native-qrcode-svg`), então os hexágonos são
 * desenhados de verdade com um `Polygon` em vez de aproximados com `View`s
 * rotacionadas. As células ficam em fileira com desalinhamento vertical
 * alternado, imitando o encaixe de uma colmeia.
 */
const HEX_POINTS = "25,0 75,0 100,50 75,100 25,100 0,50";

export function Honeycomb({ locations, readings }: WeatherTogetherTemplateProps) {
  const scale = useTVScale();
  const size = scale(230);

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
        {locations.map((loc, i) => {
          const reading = readings[loc.id];
          const condition = conditionFromCode(reading?.weathercode ?? null);
          const icon = weatherIcon(condition, reading?.isDay ?? true);
          const unit = loc.unit || "C";
          const offsetY = i % 2 === 0 ? 0 : size * 0.28;

          return (
            <View
              key={loc.id}
              style={{
                width: size,
                height: size,
                marginHorizontal: -size * 0.12,
                transform: [{ translateY: offsetY }],
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Svg width={size} height={size} viewBox="0 0 100 100" style={StyleSheet.absoluteFill}>
                <Polygon points={HEX_POINTS} fill="#0f172a" stroke="#22d3ee" strokeWidth={1.5} />
              </Svg>

              <MaterialCommunityIcons name={icon as any} size={scale(34)} color="#22d3ee" />
              <Text style={{ fontSize: scale(38), fontWeight: "700", color: "#fff", marginTop: scale(4) }}>
                {formatTemperature(reading?.temperature ?? null, unit)}
              </Text>
              <Text
                style={{
                  fontSize: scale(14),
                  color: "#94a3b8",
                  textTransform: "uppercase",
                  letterSpacing: scale(1),
                  marginTop: scale(4),
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
