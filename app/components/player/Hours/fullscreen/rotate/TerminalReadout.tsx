import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { useTVScale } from "../../../../../hook/Scale";
import { getClockValue } from "../../clockMath";
import { TimeTemplateProps } from "../types";

const TERM_GREEN = "#4ade80";

/**
 * `terminal-readout` (§5.1) — verde sobre preto, cursor piscando e
 * scanlines finas. O piscar do cursor é pulado (fica sólido) quando
 * `reduceMotion` está ativo.
 */
export function TerminalReadout({ clock, now, reduceMotion }: TimeTemplateProps) {
  const scale = useTVScale();
  const value = getClockValue(now, clock);
  const cursor = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (reduceMotion) return;

    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(cursor, { toValue: 0, duration: 500, useNativeDriver: true }),
        Animated.timing(cursor, { toValue: 1, duration: 500, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [reduceMotion]);

  const scanlines = Array.from({ length: 40 });

  return (
    <View style={styles.root}>
      <View pointerEvents="none" style={StyleSheet.absoluteFillObject}>
        {scanlines.map((_, i) => (
          <View
            key={i}
            style={{
              position: "absolute",
              top: i * scale(28),
              left: 0,
              right: 0,
              height: scale(1),
              backgroundColor: TERM_GREEN,
              opacity: 0.05,
            }}
          />
        ))}
      </View>

      <Text
        style={{
          fontSize: scale(20),
          fontFamily: "monospace",
          color: TERM_GREEN,
          opacity: 0.75,
          marginBottom: scale(14),
        }}
      >
        {`> ${clock.label.toLowerCase()}`}
      </Text>

      <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
        <Text
          style={{
            fontSize: scale(130),
            fontFamily: "monospace",
            fontWeight: "700",
            color: TERM_GREEN,
            letterSpacing: scale(4),
          }}
        >
          {value.text}
        </Text>
        <Animated.View
          style={{
            width: scale(18),
            height: scale(96),
            backgroundColor: TERM_GREEN,
            marginLeft: scale(10),
            marginBottom: scale(18),
            opacity: cursor,
          }}
        />
      </View>
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
