import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import { NewsTemplateProps } from "../types";
import { sourceColor } from "../../styles/types";

const { width } = Dimensions.get("window");

/**
 * `broadcast-lower-third` — barra inferior âmbar estilo telejornal.
 * Sem descrição/QR de propósito (§5.5) — pensado pra ser lido rápido.
 * A barra desliza da esquerda (translateX) toda vez que a notícia muda.
 */
export function BroadcastLowerThird({ item, reduceMotion }: NewsTemplateProps) {
  const image = item.localImage || item.image;
  const slide = useRef(new Animated.Value(reduceMotion ? 0 : -width)).current;

  useEffect(() => {
    if (reduceMotion) {
      slide.setValue(0);
      return;
    }
    slide.setValue(-width);
    Animated.timing(slide, {
      toValue: 0,
      duration: 550,
      useNativeDriver: true,
    }).start();
  }, [item.title, item.link, reduceMotion]);

  return (
    <View style={styles.container}>
      {image ? (
        <Image source={{ uri: image }} style={styles.bg} resizeMode="cover" />
      ) : null}
      <View style={styles.dim} />

      <Animated.View style={[styles.bar, { transform: [{ translateX: slide }] }]}>
        <View style={[styles.sourceTag, { backgroundColor: sourceColor(item.source) }]}>
          <Text style={styles.sourceText}>{item.source}</Text>
        </View>
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  bg: { ...StyleSheet.absoluteFillObject },
  dim: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.25)" },
  bar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#d97706",
    paddingVertical: verticalScale(18),
    paddingHorizontal: scale(28),
    flexDirection: "row",
    alignItems: "center",
    gap: scale(16),
    borderTopWidth: scale(3),
    borderTopColor: "#fbbf24",
  },
  sourceTag: {
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(4),
    borderRadius: scale(4),
  },
  sourceText: {
    color: "#fff",
    fontSize: moderateScale(14),
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  title: {
    flex: 1,
    color: "#0f0a02",
    fontSize: moderateScale(26),
    fontWeight: "800",
  },
});
