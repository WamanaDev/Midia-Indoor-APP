import { useEffect, useState, useRef } from "react";
import { View, Text, Animated, Easing } from "react-native";
import { useTVScale } from "../../../hook/Scale";

interface ClockConfig {
  id: string;
  label: string;
  format: "12h" | "24h";
  timezone?: string; // timezone do config global
}

interface TimeOverlayProps {
  config: {
    position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
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
    clocks: ClockConfig[];
  };
}

export function TimeOverlay({ config }: TimeOverlayProps) {
  const scale = useTVScale();
  const [now, setNow] = useState(new Date());
  const [index, setIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Atualiza horário a cada segundo
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Rotaciona clocks a cada 6s com fade
  useEffect(() => {
    if (!config.clocks?.length) return;

    const rotate = setInterval(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }).start(() => {
        setIndex((i) => (i + 1) % config.clocks.length);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
          easing: Easing.out(Easing.ease),
        }).start();
      });
    }, 6000);

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();

    return () => clearInterval(rotate);
  }, [config.clocks]);

  if (!config.clocks?.length) return null;
  const clock = config.clocks[index];

  // Obtém timezone do config ou fallback para local
  const getTimezone = (clock: ClockConfig) =>
    clock.timezone ?? Intl.DateTimeFormat().resolvedOptions().timeZone;

  // Formata hora para o timezone do clock
  const formatTime = (date: Date, clock: ClockConfig) => {
    const tz = getTimezone(clock);
    return date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: clock.format === "12h",
      timeZone: tz,
    });
  };

  // Para analógico
  const getTimeParts = (date: Date, clock: ClockConfig) => {
    const tz = getTimezone(clock);
    const parts = new Intl.DateTimeFormat("pt-BR", {
      timeZone: tz,
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false,
    })
      .formatToParts(date)
      .reduce((acc: any, p) => {
        if (p.type !== "literal") acc[p.type] = Number(p.value);
        return acc;
      }, {} as Record<string, number>);

    return {
      hours: parts.hour,
      minutes: parts.minute,
      seconds: parts.second,
    };
  };

  const positions = {
    "top-left": { top: scale(20), left: scale(40) },
    "top-right": { top: scale(20), right: scale(40) },
    "bottom-left": { bottom: scale(20), left: scale(40) },
    "bottom-right": { bottom: scale(20), right: scale(40) },
  };

  const overlayStyle: Animated.AnimatedProps<any> = {
    position: "absolute",
    zIndex: 1,
    ...positions[config.position],
    alignItems: "center",
  };

  // ================= ANALÓGICO =================
  const renderAnalog = () => {
    const { hours, minutes, seconds } = getTimeParts(now, clock);
    const hourDeg = (hours % 12) * 30 + minutes * 0.5;
    const minuteDeg = minutes * 6 + seconds * 0.1;

    return (
      <View
        style={{
          width: scale(96),
          height: scale(96),
          borderRadius: scale(48),
          borderWidth: 2,
          borderColor: "#fff",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            position: "absolute",
            width: scale(2),
            height: scale(28),
            backgroundColor: "#fff",
            top: scale(24),
            left: scale(48) - scale(1),
            transform: [{ rotate: `${hourDeg}deg` }],
          }}
        />
        <View
          style={{
            position: "absolute",
            width: scale(1),
            height: scale(40),
            backgroundColor: "#fff",
            top: scale(12),
            left: scale(48) - scale(0.5),
            transform: [{ rotate: `${minuteDeg}deg` }],
          }}
        />
        <View
          style={{
            position: "absolute",
            width: scale(4),
            height: scale(4),
            borderRadius: scale(2),
            backgroundColor: "#fff",
            top: scale(48) - scale(2),
            left: scale(48) - scale(2),
          }}
        />
      </View>
    );
  };

  // ================= DIGITAL =================
  const renderDigital = () => {
    const time = formatTime(now, clock);

    switch (config.style) {
      case "badge":
        return (
          <View
            style={{
              backgroundColor: "#fff",
              paddingHorizontal: scale(24),
              paddingVertical: scale(12),
              borderRadius: scale(40),
            }}
          >
            <Text
              style={{ fontSize: scale(48), fontWeight: "600", color: "#111" }}
            >
              {time}
            </Text>
          </View>
        );

      case "card":
        return (
          <View
            style={{
              backgroundColor: "#fff",
              padding: scale(20),
              borderRadius: scale(16),
            }}
          >
            <Text
              style={{ fontSize: scale(48), fontWeight: "700", color: "#111" }}
            >
              {time} - {clock.label}
            </Text>
          </View>
        );

      case "digital":
        return (
          <View
            style={{
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
          </View>
        );

      case "pulse":
        return (
          <Animated.Text
            style={{
              fontSize: scale(48),
              color: "#fff",
              fontWeight: "700",
              opacity: fadeAnim,
            }}
          >
            {time}
          </Animated.Text>
        );

      default:
        return (
          <Text
            style={{ fontSize: scale(48), color: "#fff", fontWeight: "700" }}
          >
            {time}
          </Text>
        );
    }
  };

  return (
    <Animated.View style={[overlayStyle, { opacity: fadeAnim }]}>
      <Text
        style={{ fontSize: scale(32), color: "#ccc", marginBottom: scale(8) }}
      >
        {clock.label}
      </Text>
      {config.style.startsWith("analog") ? renderAnalog() : renderDigital()}
    </Animated.View>
  );
}
