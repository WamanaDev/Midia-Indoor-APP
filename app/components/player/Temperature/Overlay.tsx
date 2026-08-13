import React from "react";
import { Animated, Text } from "react-native";
import { useTVScale } from "../../../hook/Scale";
import { useWeather } from "../../../hook/useWeather";
import { useRotatingIndex } from "../shared/useRotatingIndex";
import { getCornerStyle } from "../shared/cornerPosition";
import { conditionFromCode } from "../../../utils/weatherCondition";
import { TemperatureFace } from "./TemperatureFace";
import { WeatherConfig } from "./types";

/**
 * Clima em modo overlay: fica num dos 4 cantos. Se houver mais de uma
 * localidade, revezam no mesmo canto a cada 6s (useRotatingIndex).
 * Se `locations` estiver vazio, não renderiza nada (fiel ao spec).
 */
export function TemperatureOverlay({
  config,
  reduceMotion,
}: {
  config: WeatherConfig;
  reduceMotion: boolean;
}) {
  const scale = useTVScale();
  const locations = config.locations || [];
  const readings = useWeather(locations);
  const { index, opacity, translateY } = useRotatingIndex(
    locations.length,
    6000,
    600,
    scale(6)
  );

  if (locations.length === 0) return null;
  const loc = locations[index];
  if (!loc) return null;
  const reading = readings[loc.id];

  return (
    <Animated.View
      style={[
        getCornerStyle(config.position, scale),
        { opacity, transform: [{ translateY }], alignItems: "center" },
      ]}
    >
      <Text
        style={{
          fontSize: scale(20),
          color: "#ccc",
          marginBottom: scale(6),
          textTransform: "uppercase",
        }}
      >
        {loc.label}
      </Text>
      <TemperatureFace
        style={config.style}
        value={reading?.temperature ?? null}
        unit={loc.unit || "C"}
        reduceMotion={reduceMotion}
        condition={conditionFromCode(reading?.weathercode ?? null)}
        isDay={reading?.isDay ?? true}
        size="sm"
      />
    </Animated.View>
  );
}
