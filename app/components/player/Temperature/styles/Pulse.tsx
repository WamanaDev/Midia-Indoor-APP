import React, { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";
import { useTVScale } from "../../../../hook/Scale";
import { formatTemperature } from "../format";
import { TemperatureStyleProps } from "../types";

export function Pulse({ value, unit, reduceMotion }: TemperatureStyleProps) {
  const scale = useTVScale();
  const pulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (reduceMotion) return;
    pulse.setValue(0.9);
    Animated.timing(pulse, {
      toValue: 1,
      duration: 800,
      easing: Easing.out(Easing.back(1.5)),
      useNativeDriver: true,
    }).start();
  }, [value, reduceMotion]);

  return (
    <Animated.Text
      style={{
        fontSize: scale(52),
        fontWeight: "700",
        color: "#fff",
        transform: [{ scale: pulse }],
      }}
    >
      {formatTemperature(value, unit)}
    </Animated.Text>
  );
}
