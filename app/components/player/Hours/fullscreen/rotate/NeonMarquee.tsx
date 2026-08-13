import React, { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, Text, View } from "react-native";
import { useTVScale } from "../../../../../hook/Scale";
import { getClockValue } from "../../clockMath";
import { TimeTemplateProps } from "../types";

const NEON = "#f59e0b";

/**
 * `neon-marquee` (§5.1) — moldura neon âmbar ao redor da hora, tremeluzindo
 * continuamente como um letreiro. O loop de tremeluz é pulado quando
 * `reduceMotion` está ativo (fica com o brilho fixo no máximo).
 */
export function NeonMarquee({ clock, now, reduceMotion }: TimeTemplateProps) {
  const scale = useTVScale();
  const value = getClockValue(now, clock);
  const glow = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (reduceMotion) return;

    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(glow, { toValue: 0.55, duration: 90, easing: Easing.linear, useNativeDriver: true }),
        Animated.timing(glow, { toValue: 1, duration: 120, easing: Easing.linear, useNativeDriver: true }),
        Animated.timing(glow, { toValue: 0.85, duration: 1600, easing: Easing.linear, useNativeDriver: true }),
        Animated.timing(glow, { toValue: 1, duration: 150, easing: Easing.linear, useNativeDriver: true }),
        Animated.timing(glow, { toValue: 1, duration: 2000, easing: Easing.linear, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [reduceMotion]);

  return (
    <View style={styles.root}>
      <Animated.View
        style={{
          opacity: glow,
          borderWidth: scale(4),
          borderColor: NEON,
          borderRadius: scale(28),
          paddingHorizontal: scale(64),
          paddingVertical: scale(36),
          shadowColor: NEON,
          shadowOpacity: 0.9,
          shadowRadius: scale(24),
          shadowOffset: { width: 0, height: 0 },
        }}
      >
        <Text
          style={{
            fontSize: scale(120),
            fontWeight: "700",
            color: NEON,
            textAlign: "center",
            textShadowColor: NEON,
            textShadowRadius: scale(16),
            textShadowOffset: { width: 0, height: 0 },
          }}
        >
          {value.text}
        </Text>
        <Text
          style={{
            marginTop: scale(8),
            fontSize: scale(22),
            color: NEON,
            textAlign: "center",
            textTransform: "uppercase",
            letterSpacing: scale(5),
          }}
        >
          {clock.label}
        </Text>
      </Animated.View>
    </View>
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
