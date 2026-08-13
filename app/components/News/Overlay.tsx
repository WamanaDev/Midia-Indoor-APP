import React, { useEffect, useRef, useState } from "react";
import { View, Animated, StyleSheet } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import { NewsSourceBadge, NEWS_OVERLAY_STYLES } from "./styles/registry";
import { NewsOverlayStyleId } from "./styles/types";
import { NewsItem } from "../../utils/NewsProvider";

interface NewsOverlayProps {
  items: NewsItem[];
  interval?: number; // "segundos" no form; o cálculo real dobra em ms (§3.3)
  style?: NewsOverlayStyleId;
}

export function NewsOverlay({ items, interval = 10, style }: NewsOverlayProps) {
  const [index, setIndex] = useState(0);
  const translateY = useRef(new Animated.Value(verticalScale(50))).current;
  const opacity = useRef(new Animated.Value(0)).current;

  // Comportamento real do dashboard (não o que o label do form sugere,
  // §3.3): SHOW_MS = interval * 2000, GAP_MS = 3000.
  const SHOW_MS = interval * 2000;
  const ANIM_MS = 500;
  const GAP_MS = 3000;

  useEffect(() => {
    if (!items.length) return;
    let cancelled = false;

    async function cycle() {
      while (!cancelled) {
        translateY.setValue(verticalScale(50));
        opacity.setValue(0);
        Animated.parallel([
          Animated.timing(translateY, {
            toValue: 0,
            duration: ANIM_MS,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 1,
            duration: ANIM_MS,
            useNativeDriver: true,
          }),
        ]).start();

        await new Promise((r) => setTimeout(r, SHOW_MS));

        Animated.parallel([
          Animated.timing(translateY, {
            toValue: -verticalScale(50),
            duration: ANIM_MS,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0,
            duration: ANIM_MS,
            useNativeDriver: true,
          }),
        ]).start();

        await new Promise((r) => setTimeout(r, GAP_MS));

        setIndex((i) => (i + 1) % items.length);
      }
    }

    cycle();
    return () => {
      cancelled = true;
    };
  }, [items]);

  if (!items.length) return null;

  const current = items[index % items.length];
  const Component = style ? NEWS_OVERLAY_STYLES[style] : undefined;

  return (
    <View style={styles.container} pointerEvents="none">
      <Animated.View style={{ transform: [{ translateY }], opacity }}>
        {Component ? <Component item={current} /> : <NewsSourceBadge item={current} />}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: verticalScale(30),
    left: scale(40),
    zIndex: 100,
  },
});
