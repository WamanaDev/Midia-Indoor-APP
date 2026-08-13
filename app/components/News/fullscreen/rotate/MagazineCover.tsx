import React from "react";
import { Image, Platform, StyleSheet, Text, View } from "react-native";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import QRCode from "react-native-qrcode-svg";
import { NewsTemplateProps } from "../types";

const serif = Platform.select({ ios: "Georgia", android: "serif", default: "serif" });

/**
 * `magazine-cover` — tipografia editorial serifada, linhas finas, respiro
 * generoso. Fundo claro de propósito (bom senso editorial, §5.5/convenções).
 */
export function MagazineCover({ item }: NewsTemplateProps) {
  const image = item.localImage || item.image;

  return (
    <View style={styles.container}>
      <Text style={styles.kicker}>{item.source.toUpperCase()}</Text>
      <View style={styles.rule} />

      {image ? (
        <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />
      ) : null}

      <Text style={styles.title} numberOfLines={3}>
        {item.title}
      </Text>
      <Text style={styles.description} numberOfLines={3}>
        {item.description}
      </Text>

      <View style={styles.footer}>
        <View style={styles.rule} />
        <View style={styles.footerRow}>
          <Text style={styles.footerLabel}>Leia a matéria completa</Text>
          <QRCode value={item.link || "https://google.com"} size={scale(56)} backgroundColor="transparent" color="#111" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f5f0",
    paddingHorizontal: scale(56),
    paddingVertical: verticalScale(40),
    justifyContent: "center",
  },
  kicker: {
    color: "#8a1f1f",
    fontSize: moderateScale(15),
    fontWeight: "700",
    letterSpacing: 4,
    marginBottom: verticalScale(10),
  },
  rule: {
    height: 1,
    backgroundColor: "#111",
    opacity: 0.25,
  },
  image: {
    width: "100%",
    height: verticalScale(220),
    marginTop: verticalScale(22),
    marginBottom: verticalScale(22),
  },
  title: {
    fontFamily: serif,
    color: "#111",
    fontSize: moderateScale(42),
    lineHeight: moderateScale(48),
    fontWeight: "700",
    marginBottom: verticalScale(18),
  },
  description: {
    fontFamily: serif,
    color: "#3a3a3a",
    fontSize: moderateScale(19),
    lineHeight: moderateScale(27),
  },
  footer: {
    marginTop: verticalScale(28),
  },
  footerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: verticalScale(16),
  },
  footerLabel: {
    fontFamily: serif,
    color: "#555",
    fontSize: moderateScale(14),
    fontStyle: "italic",
  },
});
