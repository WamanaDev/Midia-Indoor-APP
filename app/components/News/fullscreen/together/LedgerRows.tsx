import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import { NewsTogetherTemplateProps } from "../types";

/**
 * `ledger-rows` — linhas separadas por regra fina, sem caixas, estilo
 * jornal impresso. Só manchete (§5.6).
 */
export function LedgerRows({ items }: NewsTogetherTemplateProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.masthead}>ÚLTIMAS NOTÍCIAS</Text>
      <View style={styles.headRule} />

      {items.map((item, i) => (
        <View key={item.link + i} style={styles.row}>
          <Text style={styles.index}>{String(i + 1).padStart(2, "0")}</Text>
          <View style={styles.rowContent}>
            <Text style={styles.source}>{item.source.toUpperCase()}</Text>
            <Text style={styles.title} numberOfLines={2}>
              {item.title}
            </Text>
          </View>
          {i < items.length - 1 ? <View style={styles.rule} /> : null}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdfdfb",
    paddingHorizontal: scale(60),
    paddingVertical: verticalScale(40),
    justifyContent: "center",
  },
  masthead: {
    color: "#111",
    fontSize: moderateScale(16),
    fontWeight: "800",
    letterSpacing: 4,
    marginBottom: verticalScale(10),
  },
  headRule: {
    height: 2,
    backgroundColor: "#111",
    marginBottom: verticalScale(20),
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: verticalScale(20),
    position: "relative",
  },
  index: {
    color: "#bbb",
    fontSize: moderateScale(28),
    fontWeight: "800",
    width: scale(60),
  },
  rowContent: {
    flex: 1,
  },
  source: {
    color: "#8a1f1f",
    fontSize: moderateScale(12),
    fontWeight: "700",
    letterSpacing: 1.5,
    marginBottom: verticalScale(4),
  },
  title: {
    color: "#111",
    fontSize: moderateScale(26),
    fontWeight: "700",
    lineHeight: moderateScale(32),
  },
  rule: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 1,
    backgroundColor: "#ccc",
  },
});
