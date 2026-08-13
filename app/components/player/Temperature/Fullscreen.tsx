import React from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { useTVScale } from "../../../hook/Scale";
import { useWeather } from "../../../hook/useWeather";
import { conditionFromCode } from "../../../utils/weatherCondition";
import { useRotatingIndex } from "../shared/useRotatingIndex";
import { RotateDots } from "../shared/RotateDots";
import { TemperatureFace } from "./TemperatureFace";
import { WEATHER_ROTATE_TEMPLATES } from "./fullscreen/registry";
import { WEATHER_TOGETHER_TEMPLATES } from "./fullscreen/together";
import { WeatherRotateTemplateId, WeatherTogetherTemplateId } from "./fullscreen/types";
import { WeatherConfig } from "./types";

/**
 * Clima em tela cheia. Três modos:
 * - `layout: "rotate"` — uma localidade por vez, revezando a cada 6s
 *   (pontinhos indicando posição, §3.4).
 * - `vertical`/`horizontal` (padrão) — todas as localidades ao mesmo tempo.
 * Em qualquer um dos dois, se `fullscreenStyle` estiver preenchido, usa o
 * template dedicado (§5.3/§5.4). Se `locations` estiver vazio, não renderiza
 * nada (fiel ao spec).
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
  const readings = useWeather(locations);
  const isRotate = config.layout === "rotate";

  const { index, opacity, translateY } = useRotatingIndex(
    isRotate ? locations.length : 0,
    6000,
    500,
    scale(10)
  );

  if (locations.length === 0) return null;

  if (isRotate) {
    const loc = locations[index];
    if (!loc) return null;
    const reading = readings[loc.id];

    const Template = config.fullscreenStyle
      ? WEATHER_ROTATE_TEMPLATES[config.fullscreenStyle as WeatherRotateTemplateId]
      : undefined;

    return (
      <View style={styles.fullscreen}>
        {Template ? (
          <Template location={loc} reading={reading} reduceMotion={reduceMotion} />
        ) : (
          <Animated.View
            style={{
              opacity,
              transform: [{ translateY }],
              alignItems: "center",
              gap: scale(10),
            }}
          >
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
              value={reading?.temperature ?? null}
              unit={loc.unit || "C"}
              reduceMotion={reduceMotion}
              condition={conditionFromCode(reading?.weathercode ?? null)}
              isDay={reading?.isDay ?? true}
            />
          </Animated.View>
        )}

        <View style={styles.dots}>
          <RotateDots count={locations.length} index={index} />
        </View>
      </View>
    );
  }

  const TogetherTemplate = config.fullscreenStyle
    ? WEATHER_TOGETHER_TEMPLATES[config.fullscreenStyle as WeatherTogetherTemplateId]
    : undefined;

  if (TogetherTemplate) {
    return (
      <View style={styles.fullscreen}>
        <TogetherTemplate locations={locations} readings={readings} reduceMotion={reduceMotion} />
      </View>
    );
  }

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
              value={readings[loc.id]?.temperature ?? null}
              unit={loc.unit || "C"}
              reduceMotion={reduceMotion}
              condition={conditionFromCode(readings[loc.id]?.weathercode ?? null)}
              isDay={readings[loc.id]?.isDay ?? true}
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
  dots: {
    position: "absolute",
    bottom: 24,
    alignSelf: "center",
  },
});
