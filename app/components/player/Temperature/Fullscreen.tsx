import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTVScale } from "../../../hook/Scale";
import { useWeather } from "../../../hook/useWeather";
import { TemperatureFace } from "./TemperatureFace";
import { WeatherConfig } from "./types";

/**
 * Clima em tela cheia: todas as localidades ao mesmo tempo, lado a lado
 * (`layout: horizontal`) ou empilhadas (`layout: vertical`, padrão). Se
 * `locations` estiver vazio, não renderiza nada.
 */
export function TemperatureFullscreen({
  config,
  reduceMotion,
}: {
  config: WeatherConfig;
  reduceMotion: boolean;
}) {
  const scale = useTVScale();
  const locations = config.locations || [];
  const temperatures = useWeather(locations);

  if (locations.length === 0) return null;

  return (
    <View style={styles.fullscreen}>
      <View
        style={{
          flexDirection: config.layout === "horizontal" ? "row" : "column",
          gap: scale(40),
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {locations.map((loc) => (
          <View key={loc.id} style={{ alignItems: "center", gap: scale(10) }}>
            <Text
              style={{
                fontSize: scale(24),
                color: "#aaa",
                textTransform: "uppercase",
              }}
            >
              {loc.label}
            </Text>
            <TemperatureFace
              style={config.style}
              value={temperatures[loc.id] ?? null}
              unit={loc.unit || "C"}
              reduceMotion={reduceMotion}
            />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fullscreen: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
  },
});
