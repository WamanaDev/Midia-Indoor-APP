import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTVScale } from "../../../../../hook/Scale";
import { getClockValue } from "../../clockMath";
import { TimeTogetherTemplateProps } from "../types";

/**
 * `timeline-row` (§5.2) — relógios conectados ao longo de uma linha
 * horizontal, com marcadores (bolinhas). Todos os itens têm a mesma altura
 * fixa, ancorados na base (label+hora em cima, marcador embaixo), pra que a
 * linha — posicionada de forma absoluta a uma distância conhecida da base —
 * sempre passe exatamente pelo centro de cada marcador.
 */
export function TimelineRow({ clocks, now }: TimeTogetherTemplateProps) {
  const scale = useTVScale();
  const dotSize = scale(18);
  const itemHeight = scale(160);

  return (
    <View style={styles.root}>
      <View style={{ width: "85%" }}>
        <View
          style={{
            flexDirection: "row",
            height: itemHeight,
          }}
        >
          {clocks.map((clock) => {
            const value = getClockValue(now, clock);
            return (
              <View
                key={clock.id}
                style={{
                  flex: 1,
                  height: itemHeight,
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <Text style={{ fontSize: scale(38), fontWeight: "700", color: "#fff" }}>
                  {value.text}
                </Text>
                <Text
                  style={{
                    fontSize: scale(15),
                    color: "#94a3b8",
                    textTransform: "uppercase",
                    letterSpacing: scale(2),
                    marginBottom: scale(14),
                  }}
                >
                  {clock.label}
                </Text>
                <View
                  style={{
                    width: dotSize,
                    height: dotSize,
                    borderRadius: dotSize / 2,
                    backgroundColor: "#3b82f6",
                    borderWidth: scale(3),
                    borderColor: "#fff",
                  }}
                />
              </View>
            );
          })}
        </View>

        <View
          style={{
            position: "absolute",
            left: "8%",
            right: "8%",
            bottom: dotSize / 2 - scale(1),
            height: scale(2),
            backgroundColor: "#334155",
          }}
        />
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
