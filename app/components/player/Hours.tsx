import { useEffect, useRef, useState } from "react";
import { View, Text, Image, Animated } from "react-native";
import { useTVScale } from "../../hook/Scale";

interface ClockConfig {
  id: string;
  label: string;
  timezone: string;
  format: "12h" | "24h";
}

export function Time({ config, image }: any) {
  const scale = useTVScale();

  const [now, setNow] = useState(new Date());
  const [minuteKey, setMinuteKey] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  // ===============================
  // Timer
  // ===============================
  useEffect(() => {
    const timer = setInterval(() => {
      const current = new Date();
      setNow(current);

      if (current.getSeconds() === 0) {
        setMinuteKey((k) => k + 1);

        // anima troca de minuto
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

  // ===============================
  // Time formatter (timezone safe)
  // ===============================
  const formatTime = (date: Date, clock: ClockConfig) => {
    const locale = clock.format === "12h" ? "en-US" : "pt-BR";

    return new Date(
      date.toLocaleString("en-US", { timeZone: clock.timezone })
    ).toLocaleTimeString(locale, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: clock.format === "12h",
    });
  };

  // ===============================
  // Overlay positioning (INALTERADO)
  // ===============================
  const positions = {
    "top-left": { top: scale(20), left: scale(40) },
    "top-right": { top: scale(20), right: scale(40) },
    "bottom-left": { bottom: scale(20), left: scale(40) },
    "bottom-right": { bottom: scale(20), right: scale(40) },
  };

  const overlayStyle = config.overlay
    ? {
        ...positions[config.position],
        position: "absolute" as const,
        zIndex: 1,
        padding: scale(20),
      }
    : {
        position: "absolute" as const,
        top: "50%",
        left: "50%",
        transform: [{ translateX: -50 }, { translateY: -50 }],
        zIndex: 1,
      };

  // ===============================
  // Render clock styles
  // ===============================
  const renderClock = (clock: ClockConfig) => {
    const time = formatTime(now, clock);

    switch (config.style) {
      case "badge":
        return (
          <Animated.View
            key={minuteKey}
            style={{
              opacity: fadeAnim,
              backgroundColor: "#fff",
              paddingHorizontal: scale(24),
              paddingVertical: scale(12),
              borderRadius: scale(40),
            }}
          >
            <Text
              style={{
                fontSize: scale(48),
                fontWeight: "600",
                color: "#111",
              }}
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
              backgroundColor: "#fff",
              padding: scale(20),
              borderRadius: scale(16),
            }}
          >
            <Text
              style={{
                fontSize: scale(48),
                fontWeight: "700",
                color: "#111",
              }}
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
              backgroundColor: "#000",
              padding: scale(20),
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

      case "minimal":
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

  // ===============================
  // Render
  // ===============================
  if (!config.clocks?.length) return null;

  return (
    <>
      {!config.overlay && (
        <Image
          source={{ uri: image }}
          style={{ width: "100%", height: "100%" }}
          resizeMode="cover"
        />
      )}

      <View style={overlayStyle}>
        <View
          style={{
            flexDirection: config.layout === "horizontal" ? "row" : "column",
            gap: scale(30),
            alignItems: "center",
          }}
        >
          {config.clocks.map((clock: ClockConfig) => (
            <View
              key={clock.id}
              style={{ alignItems: "center", gap: scale(10) }}
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

              {renderClock(clock)}
            </View>
          ))}
        </View>
      </View>
    </>
  );
}
