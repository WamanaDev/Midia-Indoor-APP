import React, { useEffect, useState } from "react";
import { Animated, Text } from "react-native";
import { useTVScale } from "../../../hook/Scale";
import { useRotatingIndex } from "../shared/useRotatingIndex";
import { getCornerStyle } from "../shared/cornerPosition";
import { ClockFace } from "./ClockFace";
import { TimeConfig } from "./types";

/**
 * Hora em modo overlay: fica num dos 4 cantos. Se houver mais de um relógio,
 * revezam no mesmo canto a cada 6s (useRotatingIndex).
 */
export function TimeOverlay({
  config,
  reduceMotion,
}: {
  config: TimeConfig;
  reduceMotion: boolean;
}) {
  const scale = useTVScale();
  const [now, setNow] = useState(new Date());
  const clocks = config.clocks || [];
  const { index, opacity, translateY } = useRotatingIndex(
    clocks.length,
    6000,
    600,
    scale(6)
  );

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (clocks.length === 0) return null;
  const clock = clocks[index];
  if (!clock) return null;

  return (
    <Animated.View
      style={[
        getCornerStyle(config.position, scale),
        { opacity, transform: [{ translateY }], alignItems: "center" },
      ]}
    >
      <Text
        style={{
          fontSize: scale(20),
          color: "#ccc",
          marginBottom: scale(6),
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
        size="sm"
      />
    </Animated.View>
  );
}
