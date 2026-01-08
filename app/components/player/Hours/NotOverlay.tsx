import { useEffect, useState, useRef } from "react";
import { View, Text, Animated } from "react-native";
import { useTVScale } from "../../../hook/Scale";

interface ClockConfig {
  id: string;
  label: string;
  timezone: string;
  format: "12h" | "24h";
}

interface TimeNotOverlayProps {
  config: {
    style:
      | "minimal"
      | "badge"
      | "card"
      | "digital"
      | "glass"
      | "flip"
      | "pulse"
      | "analog-minimal"
      | "analog-neon"
      | "analog-corporate"
      | "analog-tech"
      | "analog-dark";
    layout: "vertical" | "horizontal";
    clocks: ClockConfig[];
  };
}

export function TimeNotOverlay({ config }: TimeNotOverlayProps) {
  const scale = useTVScale();
  const [now, setNow] = useState(new Date());
  const [minuteKey, setMinuteKey] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const timer = setInterval(() => {
      const current = new Date();
      setNow(current);
      if (current.getSeconds() === 0) {
        setMinuteKey((k) => k + 1);
        fadeAnim.setValue(0);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }).start();
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!config.clocks?.length) return null;

  const containerStyle = {
    flexDirection: config.layout === "horizontal" ? "row" : "column",
    gap: scale(30),
    alignItems: "center" as const,
    justifyContent: "center" as const,
  };

  const formatTime = (date: Date, clock: ClockConfig) => {
    return new Date(
      date.toLocaleString("en-US", { timeZone: clock.timezone })
    ).toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: clock.format === "12h",
    });
  };

  const renderClock = (clock: ClockConfig) => {
    const time = formatTime(now, clock);
    switch (config.style) {
      case "badge":
        return (
          <Animated.View
            key={minuteKey}
            style={{
              opacity: fadeAnim,
              paddingHorizontal: scale(24),
              paddingVertical: scale(12),
              backgroundColor: "#fff",
              borderRadius: scale(40),
            }}
          >
            <Text
              style={{ fontSize: scale(48), fontWeight: "600", color: "#111" }}
            >
              {time}
            </Text>
          </Animated.View>
        );

      case "card":
        return (
          <Animated.View
            key={minuteKey}
            style={{
              opacity: fadeAnim,
              padding: scale(20),
              backgroundColor: "#fff",
              borderRadius: scale(16),
            }}
          >
            <Text
              style={{ fontSize: scale(48), fontWeight: "700", color: "#111" }}
            >
              {time}
            </Text>
          </Animated.View>
        );

      case "digital":
        return (
          <Animated.View
            key={minuteKey}
            style={{
              opacity: fadeAnim,
              padding: scale(20),
              backgroundColor: "#000",
              borderRadius: scale(16),
            }}
          >
            <Text
              style={{
                fontSize: scale(52),
                fontFamily: "monospace",
                color: "#22c55e",
                letterSpacing: 4,
              }}
            >
              {time}
            </Text>
          </Animated.View>
        );

      default:
        return (
          <Animated.Text
            key={minuteKey}
            style={{
              opacity: fadeAnim,
              fontSize: scale(52),
              fontWeight: "600",
              color: "#fff",
            }}
          >
            {time}
          </Animated.Text>
        );
    }
  };

  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={containerStyle}>
        {config.clocks.map((clock) => (
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
            {renderClock(clock)}
          </View>
        ))}
      </View>
    </View>
  );
}
