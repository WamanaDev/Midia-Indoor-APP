import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import QRCode from "react-native-qrcode-svg";
import { NewsTogetherTemplateProps } from "../types";
import { sourceColor } from "../../styles/types";

/**
 * `news-wall-qr` — grade com manchete + descrição + QR code em cada notícia.
 */
export function NewsWallQr({ items }: NewsTogetherTemplateProps) {
  return (
    <View style={styles.container}>
      {items.map((item, i) => {
        const image = item.localImage || item.image;
        return (
          <View key={item.link + i} style={styles.cell}>
            {image ? (
              <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />
            ) : (
              <View style={[styles.image, { backgroundColor: "#222" }]} />
            )}
            <View style={[styles.sourceTag, { backgroundColor: sourceColor(item.source) }]}>
              <Text style={styles.sourceText}>{item.source}</Text>
            </View>
            <Text style={styles.title} numberOfLines={2}>
              {item.title}
            </Text>
            <Text style={styles.description} numberOfLines={2}>
              {item.description}
            </Text>
            <View style={styles.footer}>
              <QRCode value={item.link || "https://google.com"} size={scale(46)} backgroundColor="transparent" color="#fff" />
              <Text style={styles.footerLabel}>Leia mais</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#000",
    padding: scale(20),
    gap: scale(16),
  },
  cell: {
    flex: 1,
    backgroundColor: "#141414",
    borderRadius: scale(10),
    overflow: "hidden",
    padding: scale(16),
  },
  image: {
    width: "100%",
    height: verticalScale(120),
    borderRadius: scale(6),
    marginBottom: verticalScale(12),
  },
  sourceTag: {
    alignSelf: "flex-start",
    paddingHorizontal: scale(8),
    paddingVertical: verticalScale(3),
    borderRadius: scale(4),
    marginBottom: verticalScale(8),
  },
  sourceText: {
    color: "#fff",
    fontSize: moderateScale(10),
    fontWeight: "800",
    textTransform: "uppercase",
  },
  title: {
    color: "#fff",
    fontSize: moderateScale(16),
    fontWeight: "700",
    lineHeight: moderateScale(21),
    marginBottom: verticalScale(6),
  },
  description: {
    color: "#999",
    fontSize: moderateScale(12),
    lineHeight: moderateScale(17),
    marginBottom: verticalScale(12),
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(10),
    marginTop: "auto",
  },
  footerLabel: {
    color: "#ccc",
    fontSize: moderateScale(12),
    fontWeight: "600",
  },
});
