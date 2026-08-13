import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text } from "react-native";
import { useTVScale } from "../../../../../hook/Scale";
import { getClockValue } from "../../clockMath";
import { TimeTemplateProps } from "../types";

/**
 * `transit-board` (§5.1) — matriz tipo LED âmbar sobre preto, com um
 * tremeluz sutil toda vez que a hora exibida muda.
 */
export function TransitBoard({ clock, now, reduceMotion }: TimeTemplateProps) {
  const scale = useTVScale();
  const value = getClockValue(now, clock);
  const flicker = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (reduceMotion) return;
    Animated.sequence([
      Animated.timing(flicker, { toValue: 0.4, duration: 40, useNativeDriver: true }),
      Animated.timing(flicker, { toValue: 1, duration: 60, useNativeDriver: true }),
      Animated.timing(flicker, { toValue: 0.7, duration: 30, useNativeDriver: true }),
      Animated.timing(flicker, { toValue: 1, duration: 90, useNativeDriver: true }),
    ]).start();
  }, [value.text, reduceMotion]);

  return (
    <Animated.View style={[styles.root, { opacity: flicker }]}>
      <Text
        style={{
          fontSize: scale(20),
          color: "#f59e0b",
          letterSpacing: scale(6),
          textTransform: "uppercase",
          marginBottom: scale(20),
          opacity: 0.8,
        }}
      >
        {clock.label}
      </Text>
      <Text
        style={{
          fontSize: scale(140),
          fontFamily: "monospace",
          fontWeight: "700",
          color: "#f59e0b",
          letterSpacing: scale(10),
          textShadowColor: "rgba(245,158,11,0.65)",
          textShadowRadius: scale(18),
          textShadowOffset: { width: 0, height: 0 },
        }}
      >
        {value.text}
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
});
