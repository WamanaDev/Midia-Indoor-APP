import React, { useEffect, useRef } from "react";
import { Animated, Easing, Text, View } from "react-native";
import { useTVScale } from "../../../../hook/Scale";
import { formatTemperature } from "../format";
import { TemperatureStyleProps } from "../types";

export function Wave({ value, unit, reduceMotion }: TemperatureStyleProps) {
  const scale = useTVScale();
  const t = useRef(new Animated.Value(0)).current;
  const size = scale(120);

  useEffect(() => {
    if (reduceMotion) return;

    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(t, {
          toValue: 1,
          duration: 1800,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(t, {
          toValue: 0,
          duration: 1800,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [reduceMotion]);

  const blobScale = t.interpolate({ inputRange: [0, 1], outputRange: [1, 1.25] });
  const blobOpacity = t.interpolate({
    inputRange: [0, 1],
    outputRange: [0.35, 0.15],
  });

  return (
    <View
      style={{
        width: size * 1.4,
        height: size * 1.4,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Animated.View
        style={{
          position: "absolute",
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: "#38bdf8",
          opacity: blobOpacity,
          transform: [{ scale: blobScale }],
        }}
      />
      <View
        style={{
          backgroundColor: "rgba(0,0,0,0.3)",
          paddingHorizontal: scale(16),
          paddingVertical: scale(10),
          borderRadius: scale(16),
        }}
      >
        <Text style={{ fontSize: scale(40), fontWeight: "700", color: "#fff" }}>
          {formatTemperature(value, unit)}
        </Text>
      </View>
    </View>
  );
}
