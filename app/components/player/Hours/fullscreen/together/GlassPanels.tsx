import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { BlurView } from "expo-blur";
import { useTVScale } from "../../../../../hook/Scale";
import { getClockValue } from "../../clockMath";
import { TimeTogetherTemplateProps } from "../types";

/**
 * `glass-panels` (§5.2) — painéis verticais em vidro fosco, separados por
 * linhas finas de luz.
 */
export function GlassPanels({ clocks, now }: TimeTogetherTemplateProps) {
  const scale = useTVScale();

  return (
    <View style={styles.root}>
      <View style={{ flexDirection: "row", height: "60%" }}>
        {clocks.map((clock, i) => {
          const value = getClockValue(now, clock);
          return (
            <React.Fragment key={clock.id}>
              {i > 0 && (
                <View
                  style={{
                    width: scale(1),
                    backgroundColor: "rgba(255,255,255,0.25)",
                  }}
                />
              )}
              <BlurView
                intensity={35}
                tint="dark"
                style={{
                  width: scale(280),
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                <Text
                  style={{
                    fontSize: scale(18),
                    color: "rgba(255,255,255,0.7)",
                    textTransform: "uppercase",
                    letterSpacing: scale(3),
                    marginBottom: scale(14),
                  }}
                >
                  {clock.label}
                </Text>
                <Text
                  style={{
                    fontSize: scale(46),
                    fontWeight: "700",
                    color: "#fff",
                  }}
                >
                  {value.text}
                </Text>
              </BlurView>
            </React.Fragment>
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
