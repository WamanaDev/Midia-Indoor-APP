import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import { NewsTogetherTemplateProps } from "../types";
import { sourceColor } from "../../styles/types";

/**
 * `info-strip-bottom` — faixa inferior dividida em segmentos, uma por
 * notícia. Só manchete (§5.6). O topo mostra a imagem da primeira notícia
 * como pano de fundo, pra tela não ficar vazia.
 */
export function InfoStripBottom({ items }: NewsTogetherTemplateProps) {
  const heroImage = items[0]?.localImage || items[0]?.image;

  return (
    <View style={styles.container}>
      {heroImage ? (
        <Image source={{ uri: heroImage }} style={styles.bg} resizeMode="cover" />
      ) : (
        <View style={[styles.bg, { backgroundColor: "#1a1a1a" }]} />
      )}
      <View style={styles.dim} />

      <View style={styles.strip}>
        {items.map((item, i) => (
          <View
            key={item.link + i}
            style={[styles.segment, i < items.length - 1 && styles.segmentBorder]}
          >
            <View style={[styles.dot, { backgroundColor: sourceColor(item.source) }]} />
            <Text style={styles.title} numberOfLines={2}>
              {item.title}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  bg: { ...StyleSheet.absoluteFillObject },
  dim: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.4)" },
  strip: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "row",
    backgroundColor: "rgba(8,8,8,0.92)",
  },
  segment: {
    flex: 1,
    paddingHorizontal: scale(22),
    paddingVertical: verticalScale(22),
  },
  segmentBorder: {
    borderRightWidth: 1,
    borderRightColor: "rgba(255,255,255,0.15)",
  },
  dot: {
    width: scale(9),
    height: scale(9),
    borderRadius: scale(5),
    marginBottom: verticalScale(8),
  },
  title: {
    color: "#fff",
    fontSize: moderateScale(17),
    fontWeight: "700",
    lineHeight: moderateScale(22),
  },
});
