import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import QRCode from "react-native-qrcode-svg";
import { NewsTemplateProps } from "../types";

/**
 * `gallery-frame` — moldura fina tipo museu, canvas neutro claro.
 */
export function GalleryFrame({ item }: NewsTemplateProps) {
  const image = item.localImage || item.image;

  return (
    <View style={styles.container}>
      <View style={styles.frame}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />
        ) : (
          <View style={[styles.image, { backgroundColor: "#ddd" }]} />
        )}
      </View>

      <View style={styles.plaque}>
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.plaqueFooter}>
          <Text style={styles.source}>{item.source}</Text>
          <QRCode value={item.link || "https://google.com"} size={scale(44)} backgroundColor="transparent" color="#111" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eae7e0",
    alignItems: "center",
    justifyContent: "center",
    padding: scale(56),
  },
  frame: {
    borderWidth: scale(3),
    borderColor: "#8a8378",
    padding: scale(10),
    backgroundColor: "#fff",
  },
  image: {
    width: scale(560),
    height: verticalScale(300),
  },
  plaque: {
    marginTop: verticalScale(26),
    alignItems: "center",
    maxWidth: scale(560),
  },
  title: {
    color: "#1c1c1c",
    fontSize: moderateScale(26),
    fontWeight: "700",
    textAlign: "center",
    marginBottom: verticalScale(8),
  },
  description: {
    color: "#5a5a5a",
    fontSize: moderateScale(15),
    textAlign: "center",
    marginBottom: verticalScale(16),
  },
  plaqueFooter: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(14),
  },
  source: {
    color: "#8a8378",
    fontSize: moderateScale(13),
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1.5,
  },
});
