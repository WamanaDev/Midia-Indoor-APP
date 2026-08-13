import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTVScale } from "../../../../../hook/Scale";
import { conditionFromCode, weatherIcon } from "../../../../../utils/weatherCondition";
import { formatTemperature } from "../../format";
import { WeatherTogetherTemplateProps } from "../types";

/**
 * `grid-mosaic` (§5.4) — grade uniforme, uma célula por localidade, cada
 * célula separada por linhas finas (mosaico tipo videowall).
 */
export function GridMosaic({ locations, readings }: WeatherTogetherTemplateProps) {
  const scale = useTVScale();
  const cols = locations.length <= 2 ? locations.length || 1 : locations.length <= 4 ? 2 : 3;

  return (
    <View style={styles.container}>
      {locations.map((loc, i) => {
        const reading = readings[loc.id];
        const condition = conditionFromCode(reading?.weathercode ?? null);
        const icon = weatherIcon(condition, reading?.isDay ?? true);
        const unit = loc.unit || "C";
        const isLastInRow = (i + 1) % cols === 0;

        return (
          <View
            key={loc.id}
            style={{
              width: `${100 / cols}%`,
              alignItems: "center",
              justifyContent: "center",
              paddingVertical: scale(32),
              borderRightWidth: isLastInRow ? 0 : 1,
              borderBottomWidth: 1,
              borderColor: "rgba(255,255,255,0.12)",
            }}
          >
            <MaterialCommunityIcons name={icon as any} size={scale(48)} color="#e5e7eb" />
            <Text style={{ fontSize: scale(56), fontWeight: "700", color: "#fff", marginTop: scale(8) }}>
              {formatTemperature(reading?.temperature ?? null, unit)}
            </Text>
            <Text
              style={{
                fontSize: scale(18),
                color: "#9ca3af",
                textTransform: "uppercase",
                letterSpacing: scale(1),
                marginTop: scale(6),
              }}
            >
              {loc.label}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#000",
    alignContent: "center",
  },
});
