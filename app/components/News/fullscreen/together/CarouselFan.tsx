import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import { NewsTogetherTemplateProps } from "../types";
import { sourceColor } from "../../styles/types";

const FAN = [
  { rotate: "-9deg", translateX: scale(70), z: 1 },
  { rotate: "0deg", translateX: 0, z: 3 },
  { rotate: "9deg", translateX: -scale(70), z: 2 },
];

/**
 * `carousel-fan` — cartões sobrepostos em leque, o do meio em destaque.
 */
export function CarouselFan({ items }: NewsTogetherTemplateProps) {
  return (
    <View style={styles.container}>
      <View style={styles.stage}>
        {items.map((item, i) => {
          const image = item.localImage || item.image;
          const layout = FAN[i] || FAN[0];
          return (
            <View
              key={item.link + i}
              style={[
                styles.card,
                {
                  transform: [{ translateX: layout.translateX }, { rotate: layout.rotate }],
                  zIndex: layout.z,
                },
              ]}
            >
              {image ? (
                <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />
              ) : (
                <View style={[styles.image, { backgroundColor: "#333" }]} />
              )}
              <View style={styles.cardBody}>
                <View style={[styles.sourceTag, { backgroundColor: sourceColor(item.source) }]}>
                  <Text style={styles.sourceText}>{item.source}</Text>
                </View>
                <Text style={styles.title} numberOfLines={3}>
                  {item.title}
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
    backgroundColor: "#141414",
    alignItems: "center",
    justifyContent: "center",
  },
  stage: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: scale(300),
    backgroundColor: "#fff",
    borderRadius: scale(8),
    overflow: "hidden",
    marginHorizontal: -scale(20),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 18,
    elevation: 12,
  },
  image: {
    width: "100%",
    height: verticalScale(170),
  },
  cardBody: {
    padding: scale(16),
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
    color: "#111",
    fontSize: moderateScale(16),
    fontWeight: "700",
    lineHeight: moderateScale(21),
  },
});
