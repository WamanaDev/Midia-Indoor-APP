import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTVScale } from "../../../../../hook/Scale";
import { getClockValue } from "../../clockMath";
import { TimeTemplateProps } from "../types";

const COLS = 5;
const ROWS = 3;
const CENTER = Math.floor((ROWS * COLS) / 2);

/**
 * `data-wall` (§5.1) — grade tipo videowall (5x3), célula central em
 * destaque com a hora; as demais células ficam apagadas, só decorativas,
 * pra reforçar a leitura de "parede de telas".
 */
export function DataWall({ clock, now }: TimeTemplateProps) {
  const scale = useTVScale();
  const value = getClockValue(now, clock);
  const cells = Array.from({ length: ROWS * COLS });

  return (
    <View style={styles.root}>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          width: scale(COLS * 180),
          height: scale(ROWS * 180),
        }}
      >
        {cells.map((_, i) => {
          const isCenter = i === CENTER;
          return (
            <View
              key={i}
              style={{
                width: scale(180),
                height: scale(180),
                padding: scale(3),
              }}
            >
              <View
                style={{
                  flex: 1,
                  backgroundColor: isCenter ? "#111827" : "#0a0e14",
                  borderWidth: scale(1),
                  borderColor: isCenter ? "#3b82f6" : "rgba(148,163,184,0.15)",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {isCenter ? (
                  <>
                    <Text
                      style={{
                        fontSize: scale(46),
                        fontFamily: "monospace",
                        fontWeight: "700",
                        color: "#fff",
                      }}
                    >
                      {value.text}
                    </Text>
                    <Text
                      style={{
                        marginTop: scale(6),
                        fontSize: scale(13),
                        color: "#60a5fa",
                        textTransform: "uppercase",
                        letterSpacing: scale(2),
                      }}
                    >
                      {clock.label}
                    </Text>
                  </>
                ) : (
                  <MaterialCommunityIcons
                    name="dots-grid"
                    size={scale(18)}
                    color="rgba(148,163,184,0.25)"
                  />
                )}
              </View>
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
