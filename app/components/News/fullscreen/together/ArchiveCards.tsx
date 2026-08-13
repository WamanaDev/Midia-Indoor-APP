import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import { NewsTogetherTemplateProps } from "../types";

const OFFSETS = [
  { rotate: "-2deg", translateY: 0 },
  { rotate: "1.5deg", translateY: verticalScale(10) },
  { rotate: "-1deg", translateY: verticalScale(4) },
];

/**
 * `archive-cards` — fichas empilhadas com leve desalinhamento, estilo
 * catálogo/arquivo morto.
 */
export function ArchiveCards({ items }: NewsTogetherTemplateProps) {
  return (
    <View style={styles.container}>
      {items.map((item, i) => {
        const image = item.localImage || item.image;
        const offset = OFFSETS[i] || OFFSETS[0];
        return (
          <View
            key={item.link + i}
            style={[
              styles.card,
              { transform: [{ rotate: offset.rotate }, { translateY: offset.translateY }] },
            ]}
          >
            <Text style={styles.tab}>Nº {String(i + 1).padStart(3, "0")}</Text>
            {image ? (
              <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />
            ) : (
              <View style={[styles.image, { backgroundColor: "#ddd" }]} />
            )}
            <Text style={styles.source}>{item.source.toUpperCase()}</Text>
            <Text style={styles.title} numberOfLines={3}>
              {item.title}
            </Text>
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
    backgroundColor: "#2c2a26",
    alignItems: "center",
    justifyContent: "center",
    gap: scale(30),
    paddingHorizontal: scale(40),
  },
  card: {
    width: scale(270),
    backgroundColor: "#f5f0e6",
    padding: scale(14),
    paddingBottom: verticalScale(20),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 8,
  },
  tab: {
    color: "#a08a5c",
    fontSize: moderateScale(11),
    fontWeight: "800",
    letterSpacing: 1.5,
    marginBottom: verticalScale(8),
  },
  image: {
    width: "100%",
    height: verticalScale(140),
    marginBottom: verticalScale(12),
  },
  source: {
    color: "#8a1f1f",
    fontSize: moderateScale(11),
    fontWeight: "700",
    letterSpacing: 1,
    marginBottom: verticalScale(6),
  },
  title: {
    color: "#241f16",
    fontSize: moderateScale(16),
    fontWeight: "700",
    lineHeight: moderateScale(21),
  },
});
