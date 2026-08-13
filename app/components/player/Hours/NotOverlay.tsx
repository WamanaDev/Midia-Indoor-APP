import React, { useEffect, useState } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { useTVScale } from "../../../hook/Scale";
import { useRotatingIndex } from "../shared/useRotatingIndex";
import { RotateDots } from "../shared/RotateDots";
import { ClockFace } from "./ClockFace";
import { TIME_ROTATE_TEMPLATES } from "./fullscreen/registry";
import { TIME_TOGETHER_TEMPLATES } from "./fullscreen/together";
import { TimeRotateTemplateId, TimeTogetherTemplateId } from "./fullscreen/types";
import { TimeConfig } from "./types";

/**
 * Hora em tela cheia. Três modos:
 * - `layout: "rotate"` — um relógio por vez, revezando a cada 6s
 *   (pontinhos indicando posição, §3.4).
 * - `vertical`/`horizontal` (padrão) — todos os relógios ao mesmo tempo.
 * Em qualquer um dos dois, se `fullscreenStyle` estiver preenchido, usa o
 * template dedicado (§5.1/§5.2) em vez do chip repetido/empilhado.
 */
export function TimeNotOverlay({
  config,
  reduceMotion,
}: {
  config: TimeConfig;
  reduceMotion: boolean;
}) {
  const scale = useTVScale();
  const [now, setNow] = useState(new Date());
  const clocks = config.clocks || [];
  const isRotate = config.layout === "rotate";

  const { index, opacity, translateY } = useRotatingIndex(
    isRotate ? clocks.length : 0,
    6000,
    500,
    scale(10)
  );

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (clocks.length === 0) return null;

  if (isRotate) {
    const clock = clocks[index];
    if (!clock) return null;

    const Template = config.fullscreenStyle
      ? TIME_ROTATE_TEMPLATES[config.fullscreenStyle as TimeRotateTemplateId]
      : undefined;

    return (
      <View style={styles.fullscreen}>
        {Template ? (
          <Template clock={clock} now={now} reduceMotion={reduceMotion} />
        ) : (
          <Animated.View
            style={{
              opacity,
              transform: [{ translateY }],
              alignItems: "center",
              gap: scale(10),
            }}
          >
            <Text
              style={{
                fontSize: scale(24),
                color: "#aaa",
                textTransform: "uppercase",
              }}
            >
              {clock.label}
            </Text>
            <ClockFace
              style={config.style}
              clock={clock}
              now={now}
              reduceMotion={reduceMotion}
              size="lg"
            />
          </Animated.View>
        )}

        <View style={styles.dots}>
          <RotateDots count={clocks.length} index={index} />
        </View>
      </View>
    );
  }

  const TogetherTemplate = config.fullscreenStyle
    ? TIME_TOGETHER_TEMPLATES[config.fullscreenStyle as TimeTogetherTemplateId]
    : undefined;

  if (TogetherTemplate) {
    return (
      <View style={styles.fullscreen}>
        <TogetherTemplate clocks={clocks} now={now} reduceMotion={reduceMotion} />
      </View>
    );
  }

  return (
    <View style={styles.fullscreen}>
      <View
        style={{
          flexDirection: config.layout === "horizontal" ? "row" : "column",
          gap: scale(40),
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {clocks.map((clock) => (
          <View key={clock.id} style={{ alignItems: "center", gap: scale(10) }}>
            <Text
              style={{
                fontSize: scale(24),
                color: "#aaa",
                textTransform: "uppercase",
              }}
            >
              {clock.label}
            </Text>
            <ClockFace
              style={config.style}
              clock={clock}
              now={now}
              reduceMotion={reduceMotion}
              size="lg"
            />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fullscreen: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
  },
  dots: {
    position: "absolute",
    bottom: 24,
    alignSelf: "center",
  },
});
