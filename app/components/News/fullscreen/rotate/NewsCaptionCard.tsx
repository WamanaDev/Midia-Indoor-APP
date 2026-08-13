import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import QRCode from "react-native-qrcode-svg";
import { NewsTemplateProps } from "../types";

/**
 * `news-caption-card` — manchete como citação centralizada.
 */
export function NewsCaptionCard({ item }: NewsTemplateProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.quoteMark}>“</Text>
      <Text style={styles.title} numberOfLines={4}>
        {item.title}
      </Text>
      <View style={styles.rule} />
      <Text style={styles.description} numberOfLines={2}>
        {item.description}
      </Text>

      <View style={styles.footer}>
        <Text style={styles.source}>{item.source.toUpperCase()}</Text>
        <QRCode value={item.link || "https://google.com"} size={scale(52)} backgroundColor="transparent" color="#fff" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0d0d0d",
    alignItems: "center",
    justifyContent: "center",
    padding: scale(70),
  },
  quoteMark: {
    color: "#444",
    fontSize: moderateScale(90),
    lineHeight: moderateScale(90),
    fontWeight: "800",
    marginBottom: verticalScale(-10),
  },
  title: {
    color: "#fff",
    fontSize: moderateScale(36),
    lineHeight: moderateScale(44),
    fontWeight: "700",
    textAlign: "center",
    marginBottom: verticalScale(24),
  },
  rule: {
    width: scale(60),
    height: scale(3),
    backgroundColor: "#666",
    marginBottom: verticalScale(24),
  },
  description: {
    color: "#aaa",
    fontSize: moderateScale(17),
    lineHeight: moderateScale(24),
    textAlign: "center",
    marginBottom: verticalScale(30),
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(16),
  },
  source: {
    color: "#888",
    fontSize: moderateScale(13),
    fontWeight: "700",
    letterSpacing: 2,
  },
});
