import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import QRCode from "react-native-qrcode-svg";
import { NewsTemplateProps } from "../types";
import { sourceColor } from "../../styles/types";

/**
 * `news-split-qr` — metade imagem, metade texto, QR grande em destaque.
 */
export function NewsSplitQr({ item }: NewsTemplateProps) {
  const image = item.localImage || item.image;

  return (
    <View style={styles.container}>
      <View style={styles.imageHalf}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />
        ) : (
          <View style={[styles.image, { backgroundColor: "#222" }]} />
        )}
      </View>

      <View style={styles.textHalf}>
        <View style={[styles.badge, { backgroundColor: sourceColor(item.source) }]}>
          <Text style={styles.badgeText}>{item.source}</Text>
        </View>
        <Text style={styles.title} numberOfLines={4}>
          {item.title}
        </Text>
        <Text style={styles.description} numberOfLines={3}>
          {item.description}
        </Text>

        <View style={styles.qrBlock}>
          <QRCode value={item.link || "https://google.com"} size={scale(120)} backgroundColor="transparent" color="#fff" />
          <Text style={styles.qrLabel}>Aponte a câmera{"\n"}pra ler a matéria</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: "row", backgroundColor: "#000" },
  imageHalf: { flex: 1 },
  image: { width: "100%", height: "100%" },
  textHalf: {
    flex: 1,
    padding: scale(44),
    justifyContent: "center",
  },
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(5),
    borderRadius: scale(5),
    marginBottom: verticalScale(16),
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
    fontSize: moderateScale(30),
    fontWeight: "800",
    lineHeight: moderateScale(36),
    marginBottom: verticalScale(14),
  },
  description: {
    color: "#c7c7c7",
    fontSize: moderateScale(16),
    lineHeight: moderateScale(23),
    marginBottom: verticalScale(28),
  },
  qrBlock: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(18),
  },
  qrLabel: {
    color: "#fff",
    fontSize: moderateScale(14),
    fontWeight: "600",
    lineHeight: moderateScale(19),
  },
});
