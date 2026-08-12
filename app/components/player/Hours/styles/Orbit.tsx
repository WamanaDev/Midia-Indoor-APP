import React, { useEffect, useRef } from "react";
import { Animated, Easing, Text, View } from "react-native";
import { useTVScale } from "../../../../hook/Scale";
import { ClockStyleProps } from "../types";

export function Orbit({ value, reduceMotion }: ClockStyleProps) {
  const scale = useTVScale();
  const size = scale(120);
  const angle = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (reduceMotion) return;
    const loop = Animated.loop(
      Animated.timing(angle, {
        toValue: 1,
        duration: 8000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    loop.start();
    return () => loop.stop();
  }, [reduceMotion]);

  const rotate = angle.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
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
      <View
        style={{
          position: "absolute",
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: scale(1),
          borderColor: "rgba(255,255,255,0.25)",
        }}
      />
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: size,
          height: size,
          alignItems: "center",
          transform: [{ rotate }],
        }}
      >
        <View
          style={{
            width: scale(8),
            height: scale(8),
            borderRadius: scale(4),
            backgroundColor: "#22d3ee",
            shadowColor: "#22d3ee",
            shadowOpacity: 1,
            shadowRadius: scale(6),
            shadowOffset: { width: 0, height: 0 },
          }}
        />
      </Animated.View>
      <Text
        style={{
          fontSize: scale(32),
          fontFamily: "monospace",
          fontWeight: "700",
          color: "#fff",
        }}
      >
        {value.text}
      </Text>
    </View>
  );
}
