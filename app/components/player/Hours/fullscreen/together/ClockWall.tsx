import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTVScale } from "../../../../../hook/Scale";
import { getClockValue } from "../../clockMath";
import { Analog } from "../../styles/Analog";
import { TimeTogetherTemplateProps } from "../types";

/**
 * `clock-wall` (§5.2) — mural de mostradores analógicos lado a lado, um por
 * relógio configurado. Reusa o componente `Analog` (variante `corporate`,
 * mostrador branco) já usado no catálogo de chips (§4.2).
 */
export function ClockWall({ clocks, now, reduceMotion }: TimeTogetherTemplateProps) {
  const scale = useTVScale();

  return (
    <View style={styles.root}>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: scale(36),
          maxWidth: "90%",
        }}
      >
        {clocks.map((clock) => {
          const value = getClockValue(now, clock);
          return (
            <View key={clock.id} style={{ alignItems: "center" }}>
              <Analog value={value} reduceMotion={reduceMotion} variant="corporate" />
              <Text
                style={{
                  marginTop: scale(14),
                  fontSize: scale(18),
                  color: "#cbd5e1",
                  textTransform: "uppercase",
                  letterSpacing: scale(2),
                }}
              >
                {clock.label}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
});
