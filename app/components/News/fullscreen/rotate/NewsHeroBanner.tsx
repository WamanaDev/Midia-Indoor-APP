import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import { LinearGradient } from "expo-linear-gradient";
import QRCode from "react-native-qrcode-svg";
import { NewsTemplateProps } from "../types";
import { sourceColor } from "../../styles/types";

/**
 * `news-hero-banner` — imagem de fundo em tela cheia, gradiente escuro,
 * manchete embaixo.
 */
export function NewsHeroBanner({ item }: NewsTemplateProps) {
  const image = item.localImage || item.image;

  return (
    <View style={styles.container}>
      {image ? (
        <Image source={{ uri: image }} style={styles.bg} resizeMode="cover" />
      ) : (
        <View style={[styles.bg, { backgroundColor: "#111" }]} />
      )}

      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.55)", "rgba(0,0,0,0.92)"]}
        style={styles.gradient}
      />

      <View style={styles.content}>
        <View style={styles.row}>
          <View style={[styles.badge, { backgroundColor: sourceColor(item.source) }]}>
            <Text style={styles.badgeText}>{item.source}</Text>
          </View>
          <QRCode value={item.link || "https://google.com"} size={scale(52)} backgroundColor="transparent" color="#fff" />
        </View>
        <Text style={styles.title} numberOfLines={3}>
          {item.title}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  bg: { ...StyleSheet.absoluteFillObject },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "62%",
  },
  content: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    padding: scale(44),
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: verticalScale(14),
  },
  badge: {
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(5),
    borderRadius: scale(5),
    alignSelf: "flex-start",
  },
  badgeText: {
    color: "#fff",
    fontSize: moderateScale(13),
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  title: {
    color: "#fff",
    fontSize: moderateScale(38),
    fontWeight: "800",
    lineHeight: moderateScale(44),
    marginBottom: verticalScale(12),
  },
  description: {
    color: "#e5e5e5",
    fontSize: moderateScale(18),
    lineHeight: moderateScale(25),
  },
});
