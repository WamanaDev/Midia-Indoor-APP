import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTVScale } from "../../../../../hook/Scale";
import { conditionFromCode, weatherIcon } from "../../../../../utils/weatherCondition";
import { formatTemperature } from "../../format";
import { WeatherTemplateProps } from "../types";

/**
 * `sunrise-gradient` (§5.3) — gradiente lento mudando de tom
 * (`sunrise-shift`, ~10s, contínuo — só roda se `reduceMotion` for falso),
 * cartão translúcido central. `expo-linear-gradient` não anima cores
 * sozinho, então o "shift" é feito cruzando (fade) duas camadas de
 * gradiente com paletas diferentes, uma por cima da outra, em loop.
 */
const PALETTE_A: [string, string, string] = ["#f97316", "#fb923c", "#312e81"];
const PALETTE_B: [string, string, string] = ["#ec4899", "#f59e0b", "#1e1b4b"];

export function SunriseGradient({ location, reading, reduceMotion }: WeatherTemplateProps) {
  const scale = useTVScale();
  const condition = conditionFromCode(reading?.weathercode ?? null);
  const icon = weatherIcon(condition, reading?.isDay ?? true);
  const unit = location.unit || "C";

  const crossfade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (reduceMotion) return;

    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(crossfade, { toValue: 1, duration: 10000, useNativeDriver: true }),
        Animated.timing(crossfade, { toValue: 0, duration: 10000, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [reduceMotion]);

  return (
    <View style={styles.container}>
      <LinearGradient colors={PALETTE_A} style={StyleSheet.absoluteFill} />
      <Animated.View style={[StyleSheet.absoluteFill, { opacity: crossfade }]}>
        <LinearGradient colors={PALETTE_B} style={StyleSheet.absoluteFill} />
      </Animated.View>

      <BlurView
        intensity={35}
        tint="light"
        style={{
          overflow: "hidden",
          borderRadius: scale(32),
          paddingHorizontal: scale(64),
          paddingVertical: scale(48),
          alignItems: "center",
          backgroundColor: "rgba(255,255,255,0.12)",
          borderWidth: 1,
          borderColor: "rgba(255,255,255,0.3)",
        }}
      >
        <MaterialCommunityIcons name={icon as any} size={scale(56)} color="#fff" />
        <Text style={{ fontSize: scale(104), fontWeight: "800", color: "#fff", marginTop: scale(4) }}>
          {formatTemperature(reading?.temperature ?? null, unit)}
        </Text>
        <Text
          style={{
            fontSize: scale(26),
            color: "rgba(255,255,255,0.9)",
            textTransform: "uppercase",
            letterSpacing: scale(2),
            marginTop: scale(8),
            fontWeight: "600",
          }}
        >
          {location.label}
        </Text>
      </BlurView>
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
