import React, { useEffect, useRef } from "react";
import { Animated, Easing, Text, View } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { useTVScale } from "../../../../hook/Scale";
import { formatTemperature } from "../format";
import { TemperatureStyleProps } from "../types";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const MIN_C = -10;
const MAX_C = 45;

function toCelsius(value: number, unit: "C" | "F") {
  return unit === "F" ? ((value - 32) * 5) / 9 : value;
}

export function Gauge({ value, unit, reduceMotion }: TemperatureStyleProps) {
  const scale = useTVScale();
  const size = scale(140);
  const strokeWidth = scale(10);
  const radius = size / 2 - strokeWidth;
  const circumference = 2 * Math.PI * radius;

  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const celsius = value !== null ? toCelsius(value, unit) : MIN_C;
    const ratio = Math.min(1, Math.max(0, (celsius - MIN_C) / (MAX_C - MIN_C)));
    Animated.timing(progress, {
      toValue: ratio,
      duration: reduceMotion ? 0 : 800,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [value, unit, reduceMotion]);

  const strokeDashoffset = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [circumference, 0],
  });

  return (
    <View
      style={{
        width: size,
        height: size,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Svg
        width={size}
        height={size}
        style={{ position: "absolute", transform: [{ rotate: "-90deg" }] }}
      >
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255,255,255,0.2)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#facc15"
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={`${circumference}, ${circumference}`}
          strokeDashoffset={strokeDashoffset}
        />
      </Svg>
      <Text style={{ fontSize: scale(36), fontWeight: "700", color: "#fff" }}>
        {formatTemperature(value, unit)}
      </Text>
    </View>
  );
}
