import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import QRCode from "react-native-qrcode-svg";
import { NewsTemplateProps } from "../types";

/**
 * `polaroid-frame` — conteúdo emoldurado como polaroid, levemente inclinado,
 * QR colado no canto (como um adesivo sobre a foto).
 */
export function PolaroidFrame({ item }: NewsTemplateProps) {
  const image = item.localImage || item.image;

  return (
    <View style={styles.container}>
      <View style={styles.polaroid}>
        <View style={styles.photoWrap}>
          {image ? (
            <Image source={{ uri: image }} style={styles.photo} resizeMode="cover" />
          ) : (
            <View style={[styles.photo, { backgroundColor: "#ccc" }]} />
          )}
          <View style={styles.qrSticker}>
            <QRCode value={item.link || "https://google.com"} size={scale(46)} backgroundColor="transparent" color="#111" />
          </View>
        </View>
        <View style={styles.caption}>
          <Text style={styles.title} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={styles.description} numberOfLines={2}>
            {item.description}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    alignItems: "center",
    justifyContent: "center",
  },
  polaroid: {
    backgroundColor: "#fdfdfb",
    padding: scale(18),
    paddingBottom: verticalScale(28),
    width: scale(480),
    transform: [{ rotate: "-3deg" }],
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 10,
  },
  photoWrap: {
    position: "relative",
  },
  photo: {
    width: "100%",
    height: verticalScale(300),
  },
  qrSticker: {
    position: "absolute",
    bottom: -scale(14),
    right: -scale(14),
    backgroundColor: "#fff",
    padding: scale(6),
    borderRadius: scale(4),
    transform: [{ rotate: "6deg" }],
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 6,
  },
  caption: {
    marginTop: verticalScale(20),
    paddingHorizontal: scale(6),
  },
  title: {
    color: "#222",
    fontSize: moderateScale(20),
    fontWeight: "700",
    marginBottom: verticalScale(6),
  },
  description: {
    color: "#666",
    fontSize: moderateScale(13),
  },
});
