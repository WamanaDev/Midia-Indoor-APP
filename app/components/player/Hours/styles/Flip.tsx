import React, { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet } from "react-native";
import { useTVScale } from "../../../../hook/Scale";
import { ClockStyleProps } from "../types";

export function Flip({ value, reduceMotion }: ClockStyleProps) {
  const scale = useTVScale();
  const anim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (reduceMotion) return;
    anim.setValue(0);
    Animated.timing(anim, {
      toValue: 1,
      duration: 600,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [value.text, reduceMotion]);

  const rotateX = anim.interpolate({
    inputRange: [0, 1],
    outputRange: ["90deg", "0deg"],
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          paddingHorizontal: scale(24),
          paddingVertical: scale(14),
          borderRadius: scale(16),
          opacity: anim,
          transform: [{ perspective: scale(400) }, { rotateX }],
        },
      ]}
    >
      <Animated.Text
        style={{
          fontSize: scale(48),
          fontFamily: "monospace",
          fontWeight: "700",
          color: "#fff",
        }}
      >
        {value.text}
      </Animated.Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "#000" },
});
