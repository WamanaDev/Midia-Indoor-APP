import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import QRCode from "react-native-qrcode-svg";
import { NewsTemplateProps } from "../types";

/**
 * `news-dossier` — estética de pasta/arquivo, descrição como corpo de texto.
 */
export function NewsDossier({ item }: NewsTemplateProps) {
  const image = item.localImage || item.image;

  return (
    <View style={styles.container}>
      <View style={styles.tab}>
        <Text style={styles.tabText}>DOSSIÊ · {item.source.toUpperCase()}</Text>
      </View>

      <View style={styles.folder}>
        <View style={styles.headerRow}>
          <Text style={styles.stamp}>PAUTA</Text>
          <QRCode value={item.link || "https://google.com"} size={scale(48)} backgroundColor="transparent" color="#2b2b2b" />
        </View>

        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>

        <View style={styles.body}>
          {image ? (
            <Image source={{ uri: image }} style={styles.thumb} resizeMode="cover" />
          ) : null}
          <Text style={styles.description} numberOfLines={5}>
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
    backgroundColor: "#3d3226",
    alignItems: "center",
    justifyContent: "center",
    padding: scale(40),
  },
  tab: {
    backgroundColor: "#c9a86a",
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(8),
    borderTopLeftRadius: scale(6),
    borderTopRightRadius: scale(6),
    alignSelf: "flex-start",
    marginLeft: scale(30),
  },
  tabText: {
    color: "#3d3226",
    fontSize: moderateScale(12),
    fontWeight: "800",
    letterSpacing: 1.5,
  },
  folder: {
    backgroundColor: "#f2e9d8",
    padding: scale(32),
    width: "100%",
    maxWidth: scale(760),
    borderRadius: scale(4),
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: verticalScale(16),
  },
  stamp: {
    color: "#8a2e2e",
    fontSize: moderateScale(14),
    fontWeight: "800",
    letterSpacing: 3,
    borderWidth: 2,
    borderColor: "#8a2e2e",
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(3),
    transform: [{ rotate: "-4deg" }],
  },
  title: {
    color: "#241d12",
    fontSize: moderateScale(28),
    fontWeight: "700",
    marginBottom: verticalScale(18),
    fontFamily: "monospace",
  },
  body: {
    flexDirection: "row",
    gap: scale(20),
  },
  thumb: {
    width: scale(140),
    height: scale(140),
    borderRadius: scale(2),
  },
  description: {
    flex: 1,
    color: "#4a4132",
    fontSize: moderateScale(16),
    lineHeight: moderateScale(23),
    fontFamily: "monospace",
  },
});
