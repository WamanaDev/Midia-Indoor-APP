import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTVScale } from "../../../../../hook/Scale";
import { conditionFromCode, weatherIcon } from "../../../../../utils/weatherCondition";
import { formatTemperature } from "../../format";
import { WeatherTemplateProps } from "../types";

/**
 * `billboard-spot` (§5.3) — spot de luz radial cinematográfico atrás do
 * valor gigante centralizado. RN/`expo-linear-gradient` não tem gradiente
 * radial nativo (só linear), então o "spot" é aproximado com círculos
 * concêntricos semitransparentes, ficando mais opaco perto do centro.
 */
export function BillboardSpot({ location, reading, reduceMotion: _reduceMotion }: WeatherTemplateProps) {
  const scale = useTVScale();
  const condition = conditionFromCode(reading?.weathercode ?? null);
  const icon = weatherIcon(condition, reading?.isDay ?? true);
  const unit = location.unit || "C";

  const rings = [920, 720, 540, 380, 240];

  return (
    <View style={styles.container}>
      {rings.map((size, i) => (
        <View
          key={size}
          style={{
            position: "absolute",
            width: scale(size),
            height: scale(size),
            borderRadius: scale(size) / 2,
            backgroundColor: "#fbbf24",
            opacity: 0.025 + i * 0.02,
          }}
        />
      ))}

      <MaterialCommunityIcons
        name={icon as any}
        size={scale(64)}
        color="#fde68a"
        style={{ marginBottom: scale(8) }}
      />
      <Text style={{ fontSize: scale(140), fontWeight: "800", color: "#fff", letterSpacing: -2 }}>
        {formatTemperature(reading?.temperature ?? null, unit)}
      </Text>
      <Text style={{ fontSize: scale(28), color: "#d1d5db", textTransform: "uppercase", letterSpacing: scale(2), marginTop: scale(4) }}>
        {location.label}
      </Text>
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
