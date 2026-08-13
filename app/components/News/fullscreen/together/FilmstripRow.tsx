import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import { NewsTogetherTemplateProps } from "../types";
import { sourceColor } from "../../styles/types";

/**
 * `filmstrip-row` — notícias lado a lado, divisória pontilhada,
 * manchete + descrição.
 */
export function FilmstripRow({ items }: NewsTogetherTemplateProps) {
  return (
    <View style={styles.container}>
      {items.map((item, i) => {
        const image = item.localImage || item.image;
        return (
          <React.Fragment key={item.link + i}>
            <View style={styles.frame}>
              {image ? (
                <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />
              ) : (
                <View style={[styles.image, { backgroundColor: "#222" }]} />
              )}
              <View style={[styles.sourceTag, { backgroundColor: sourceColor(item.source) }]}>
                <Text style={styles.sourceText}>{item.source}</Text>
              </View>
              <Text style={styles.title} numberOfLines={3}>
                {item.title}
              </Text>
              <Text style={styles.description} numberOfLines={3}>
                {item.description}
              </Text>
            </View>
            {i < items.length - 1 ? <View style={styles.divider} /> : null}
          </React.Fragment>
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
    padding: scale(24),
  },
  frame: {
    flex: 1,
    paddingHorizontal: scale(18),
  },
  image: {
    width: "100%",
    height: verticalScale(180),
    borderRadius: scale(4),
    marginBottom: verticalScale(14),
  },
  sourceTag: {
    alignSelf: "flex-start",
    paddingHorizontal: scale(9),
    paddingVertical: verticalScale(3),
    borderRadius: scale(4),
    marginBottom: verticalScale(8),
  },
  sourceText: {
    color: "#fff",
    fontSize: moderateScale(11),
    fontWeight: "800",
    textTransform: "uppercase",
  },
  title: {
    color: "#fff",
    fontSize: moderateScale(20),
    fontWeight: "700",
    lineHeight: moderateScale(25),
    marginBottom: verticalScale(8),
  },
  description: {
    color: "#aaa",
    fontSize: moderateScale(13),
    lineHeight: moderateScale(18),
  },
  divider: {
    width: 0,
    borderLeftWidth: 2,
    borderStyle: "dashed",
    borderLeftColor: "#3a3a3a",
    marginHorizontal: scale(4),
  },
});
