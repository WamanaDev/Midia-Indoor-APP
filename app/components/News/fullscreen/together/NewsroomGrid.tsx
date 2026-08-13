import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import { NewsTogetherTemplateProps } from "../types";
import { sourceColor } from "../../styles/types";

/**
 * `newsroom-grid` — blocos com friso colorido por notícia, manchete grande.
 */
export function NewsroomGrid({ items }: NewsTogetherTemplateProps) {
  return (
    <View style={styles.container}>
      {items.map((item, i) => (
        <View key={item.link + i} style={styles.block}>
          <View style={[styles.frieze, { backgroundColor: sourceColor(item.source) }]} />
          <View style={styles.blockContent}>
            <Text style={styles.source}>{item.source.toUpperCase()}</Text>
            <Text style={styles.title} numberOfLines={4}>
              {item.title}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#151515",
  },
  block: {
    flex: 1,
    flexDirection: "row",
  },
  frieze: {
    width: scale(8),
  },
  blockContent: {
    flex: 1,
    padding: scale(28),
    justifyContent: "center",
  },
  source: {
    color: "#888",
    fontSize: moderateScale(13),
    fontWeight: "700",
    letterSpacing: 2,
    marginBottom: verticalScale(14),
  },
  title: {
    color: "#fff",
    fontSize: moderateScale(28),
    fontWeight: "800",
    lineHeight: moderateScale(34),
  },
});
