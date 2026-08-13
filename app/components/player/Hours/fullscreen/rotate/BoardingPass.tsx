import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTVScale } from "../../../../../hook/Scale";
import { getClockValue } from "../../clockMath";
import { TimeTemplateProps } from "../types";

/**
 * `boarding-pass` (§5.1) — cartão bege estilo cartão de embarque, com
 * divisória tracejada: "Hora" de um lado, "Local" do outro.
 */
export function BoardingPass({ clock, now }: TimeTemplateProps) {
  const scale = useTVScale();
  const value = getClockValue(now, clock);
  const dashes = Array.from({ length: 24 });

  return (
    <View style={styles.root}>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#f2e8d5",
          borderRadius: scale(20),
          overflow: "hidden",
        }}
      >
        <View style={{ paddingVertical: scale(48), paddingHorizontal: scale(56), alignItems: "flex-start" }}>
          <Text
            style={{
              fontSize: scale(14),
              color: "#8a7757",
              letterSpacing: scale(3),
              textTransform: "uppercase",
              marginBottom: scale(10),
            }}
          >
            Hora
          </Text>
          <Text
            style={{
              fontSize: scale(88),
              fontFamily: "monospace",
              fontWeight: "700",
              color: "#292524",
            }}
          >
            {value.text}
          </Text>
        </View>

        <View style={{ width: scale(2), justifyContent: "space-between", paddingVertical: scale(20) }}>
          {dashes.map((_, i) => (
            <View
              key={i}
              style={{
                width: scale(2),
                height: scale(8),
                backgroundColor: "#b8a87e",
              }}
            />
          ))}
        </View>

        <View style={{ paddingVertical: scale(48), paddingHorizontal: scale(56), alignItems: "flex-start", justifyContent: "center" }}>
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: scale(10) }}>
            <MaterialCommunityIcons name="map-marker" size={scale(16)} color="#8a7757" />
            <Text
              style={{
                fontSize: scale(14),
                color: "#8a7757",
                letterSpacing: scale(3),
                textTransform: "uppercase",
                marginLeft: scale(6),
              }}
            >
              Local
            </Text>
          </View>
          <Text
            style={{
              fontSize: scale(40),
              fontWeight: "700",
              color: "#292524",
            }}
          >
            {clock.label}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#e7dcc3",
    alignItems: "center",
    justifyContent: "center",
  },
});
