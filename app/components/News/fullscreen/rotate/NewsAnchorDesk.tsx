import React, { useEffect, useRef, useState } from "react";
import { Animated, Image, StyleSheet, Text, View } from "react-native";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import { NewsTemplateProps } from "../types";
import { sourceColor } from "../../styles/types";

/**
 * `news-anchor-desk` — barra inferior com a descrição correndo em marquee
 * embaixo da manchete. Sem QR de propósito (§5.5). Mesma técnica de scroll
 * contínuo de `NewsMarquee` (styles/registry.tsx): mede largura via
 * `onLayout` e roda `Animated.loop`.
 */
export function NewsAnchorDesk({ item, reduceMotion }: NewsTemplateProps) {
  const image = item.localImage || item.image;
  const [contentWidth, setContentWidth] = useState(0);
  const [boxWidth, setBoxWidth] = useState(0);
  const translateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (reduceMotion || contentWidth <= boxWidth || boxWidth === 0) return;
    const distance = contentWidth - boxWidth;
    translateX.setValue(0);
    const loop = Animated.loop(
      Animated.sequence([
        Animated.delay(600),
        Animated.timing(translateX, {
          toValue: -distance,
          duration: Math.max(4000, distance * 12),
          useNativeDriver: true,
        }),
        Animated.delay(600),
        Animated.timing(translateX, { toValue: 0, duration: 0, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [contentWidth, boxWidth, reduceMotion]);

  return (
    <View style={styles.container}>
      {image ? (
        <Image source={{ uri: image }} style={styles.bg} resizeMode="cover" />
      ) : (
        <View style={[styles.bg, { backgroundColor: "#111" }]} />
      )}
      <View style={styles.dim} />

      <View style={styles.desk}>
        <View style={styles.headline}>
          <View style={[styles.sourceTag, { backgroundColor: sourceColor(item.source) }]}>
            <Text style={styles.sourceText}>{item.source}</Text>
          </View>
          <Text style={styles.title} numberOfLines={1}>
            {item.title}
          </Text>
        </View>

        <View style={styles.marqueeBox} onLayout={(e) => setBoxWidth(e.nativeEvent.layout.width)}>
          <Animated.Text
            onLayout={(e) => setContentWidth(e.nativeEvent.layout.width)}
            style={[styles.description, { transform: [{ translateX }] }]}
            numberOfLines={1}
          >
            {item.description}
          </Animated.Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  bg: { ...StyleSheet.absoluteFillObject },
  dim: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.2)" },
  desk: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(10,10,10,0.92)",
    borderTopWidth: scale(2),
    borderTopColor: "#2563eb",
  },
  headline: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(14),
    paddingHorizontal: scale(28),
    paddingTop: verticalScale(16),
  },
  sourceTag: {
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(4),
    borderRadius: scale(4),
  },
  sourceText: {
    color: "#fff",
    fontSize: moderateScale(12),
    fontWeight: "800",
    textTransform: "uppercase",
  },
  title: {
    flex: 1,
    color: "#fff",
    fontSize: moderateScale(26),
    fontWeight: "800",
  },
  marqueeBox: {
    overflow: "hidden",
    paddingHorizontal: scale(28),
    paddingVertical: verticalScale(14),
  },
  description: {
    color: "#9ec1ff",
    fontSize: moderateScale(16),
    fontWeight: "500",
  },
});
