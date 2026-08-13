import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import { NewsTogetherTemplateProps } from "../types";
import { sourceColor } from "../../styles/types";

/**
 * `news-digest-list` — lista vertical tipo newsletter, manchete + descrição
 * por item.
 */
export function NewsDigestList({ items }: NewsTogetherTemplateProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>RESUMO DO DIA</Text>

      <View style={styles.list}>
        {items.map((item, i) => {
          const image = item.localImage || item.image;
          return (
            <View key={item.link + i} style={styles.row}>
              {image ? (
                <Image source={{ uri: image }} style={styles.thumb} resizeMode="cover" />
              ) : (
                <View style={[styles.thumb, { backgroundColor: "#222" }]} />
              )}
              <View style={styles.rowContent}>
                <View style={[styles.sourceTag, { backgroundColor: sourceColor(item.source) }]}>
                  <Text style={styles.sourceText}>{item.source}</Text>
                </View>
                <Text style={styles.title} numberOfLines={2}>
                  {item.title}
                </Text>
                <Text style={styles.description} numberOfLines={2}>
                  {item.description}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b0b0b",
    paddingHorizontal: scale(56),
    paddingVertical: verticalScale(36),
  },
  header: {
    color: "#fff",
    fontSize: moderateScale(20),
    fontWeight: "800",
    letterSpacing: 3,
    marginBottom: verticalScale(24),
  },
  list: {
    flex: 1,
    justifyContent: "space-evenly",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(20),
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.1)",
    paddingTop: verticalScale(18),
  },
  thumb: {
    width: scale(120),
    height: scale(90),
    borderRadius: scale(6),
  },
  rowContent: {
    flex: 1,
  },
  sourceTag: {
    alignSelf: "flex-start",
    paddingHorizontal: scale(8),
    paddingVertical: verticalScale(3),
    borderRadius: scale(4),
    marginBottom: verticalScale(6),
  },
  sourceText: {
    color: "#fff",
    fontSize: moderateScale(10),
    fontWeight: "800",
    textTransform: "uppercase",
  },
  title: {
    color: "#fff",
    fontSize: moderateScale(19),
    fontWeight: "700",
    lineHeight: moderateScale(24),
    marginBottom: verticalScale(4),
  },
  description: {
    color: "#999",
    fontSize: moderateScale(13),
    lineHeight: moderateScale(18),
  },
});
