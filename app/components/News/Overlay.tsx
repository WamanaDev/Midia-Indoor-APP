import React, { useEffect, useRef, useState } from "react";
import { View, Text, Animated, StyleSheet } from "react-native";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";

export type NewsItem = {
  title: string;
  description?: string;
  link?: string;
  image?: string | null;
  localImage?: string | null;
  source: string;
};

interface NewsOverlayProps {
  items: NewsItem[];
  interval?: number; // segundos de exibição
}

export function NewsOverlay({ items, interval = 10 }: NewsOverlayProps) {
  console.log("[NewsOverlay] render, items.length=", items?.length ?? 0);
  const [index, setIndex] = useState(0);
  const translateY = useRef(new Animated.Value(verticalScale(50))).current;
  const opacity = useRef(new Animated.Value(0)).current;

  const SHOW_MS = interval * 1000;
  const ANIM_MS = 500;
  const GAP_MS = 1000;

  useEffect(() => {
    console.log(
      "[NewsOverlay] useEffect items changed, length=",
      items?.length ?? 0
    );
    if (!items.length) return;
    let cancelled = false;

    async function cycle() {
      while (!cancelled) {
        // Slide in + fade in
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

        // Slide out + fade out
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
      console.log("[NewsOverlay] cleanup (unmount or items change)");
    };
  }, [items]);

  if (!items.length) return null;

  const current = items[index % items.length];

  return (
    <View style={styles.container} pointerEvents="none">
      <Animated.View
        style={[
          styles.overlay,
          {
            transform: [{ translateY }],
            opacity,
          },
        ]}
      >
        {/* Badge */}
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>{current.source}</Text>
        </View>

        {/* Título */}
        <Text style={styles.title}>{current.title}</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: verticalScale(30),
    left: scale(40),
    width: "70%",
    zIndex: 100,
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.8)",
    borderRadius: scale(8),
    overflow: "hidden",
  },
  badgeContainer: {
    backgroundColor: "rgba(0,0,0,0.7)",
    paddingHorizontal: scale(8),
    paddingVertical: verticalScale(3),
    alignSelf: "flex-start",
    marginBottom: verticalScale(6),
    width: "100%",
  },
  badgeText: {
    color: "#fff",
    fontSize: moderateScale(12),
    fontWeight: "700",
    textTransform: "uppercase",
  },
  title: {
    color: "#fff",
    fontSize: moderateScale(16),
    paddingHorizontal: scale(8),
    fontWeight: "bold",
  },
});
