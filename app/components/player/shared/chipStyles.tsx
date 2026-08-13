import React, { useEffect, useRef } from "react";
import { Animated, Easing, Text, View } from "react-native";
import { useTVScale } from "../../../hook/Scale";

/**
 * Catálogo de chip compartilhado entre relógio e clima (§4.1 da spec).
 * Só os 10 estilos que ainda não existiam no app — os outros 7
 * (minimal/badge/card/digital/glass/pulse/sphere) já têm implementação
 * própria (e ligeiramente diferente) em Hours/styles e Temperature/styles.
 * Quem chama decide o ícone (só `icon-tight` usa) e o valor já formatado.
 */
export type NewChipStyleId =
  | "chip-outline"
  | "tag-ticket"
  | "mono-console"
  | "neon-breathe"
  | "brand-strip"
  | "paper-tag"
  | "led-strip"
  | "ribbon-corner"
  | "viewfinder-corners"
  | "icon-tight";

export interface ChipStyleProps {
  value: string;
  icon?: React.ReactNode;
  size?: "sm" | "lg";
}

function ChipOutline({ value, size = "lg" }: ChipStyleProps) {
  const scale = useTVScale();
  const fontSize = scale(size === "sm" ? 22 : 40);
  return (
    <View
      style={{
        borderWidth: scale(2),
        borderColor: "#fff",
        paddingHorizontal: scale(18),
        paddingVertical: scale(8),
        borderRadius: scale(8),
      }}
    >
      <Text style={{ color: "#fff", fontSize, fontWeight: "700" }}>{value}</Text>
    </View>
  );
}

function TagTicket({ value, size = "lg" }: ChipStyleProps) {
  const scale = useTVScale();
  const fontSize = scale(size === "sm" ? 20 : 36);
  const holeSize = scale(size === "sm" ? 10 : 16);
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#e8ddc7",
        paddingVertical: scale(10),
        paddingRight: scale(18),
        paddingLeft: scale(10),
        borderRadius: scale(6),
      }}
    >
      <View
        style={{
          width: holeSize,
          height: holeSize,
          borderRadius: holeSize / 2,
          backgroundColor: "#000",
          opacity: 0.5,
          marginRight: scale(10),
        }}
      />
      <Text
        style={{
          color: "#3f3320",
          fontSize,
          fontWeight: "700",
          fontFamily: "monospace",
          letterSpacing: 1,
        }}
      >
        {value}
      </Text>
    </View>
  );
}

function MonoConsole({ value, size = "lg" }: ChipStyleProps) {
  const scale = useTVScale();
  const fontSize = scale(size === "sm" ? 20 : 38);
  return (
    <View
      style={{
        backgroundColor: "#000",
        paddingHorizontal: scale(18),
        paddingVertical: scale(10),
        borderRadius: scale(4),
        overflow: "hidden",
      }}
    >
      <View
        pointerEvents="none"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: "35%",
          height: scale(1.5),
          backgroundColor: "#f59e0b",
          opacity: 0.15,
        }}
      />
      <View
        pointerEvents="none"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: "68%",
          height: scale(1.5),
          backgroundColor: "#f59e0b",
          opacity: 0.1,
        }}
      />
      <Text
        style={{
          color: "#f59e0b",
          fontSize,
          fontWeight: "700",
          fontFamily: "monospace",
        }}
      >
        {value}
      </Text>
    </View>
  );
}

function NeonBreathe({ value, size = "lg" }: ChipStyleProps) {
  const scale = useTVScale();
  const fontSize = scale(size === "sm" ? 22 : 40);
  const glow = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(glow, {
          toValue: 1,
          duration: 1400,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: false,
        }),
        Animated.timing(glow, {
          toValue: 0,
          duration: 1400,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: false,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [glow]);

  const shadowRadius = glow.interpolate({ inputRange: [0, 1], outputRange: [4, 14] });

  return (
    <Animated.View
      style={{
        borderWidth: scale(2),
        borderColor: "#a855f7",
        borderRadius: scale(10),
        paddingHorizontal: scale(18),
        paddingVertical: scale(8),
        shadowColor: "#a855f7",
        shadowOpacity: 0.9,
        shadowOffset: { width: 0, height: 0 },
        shadowRadius,
      }}
    >
      <Text style={{ color: "#e9d5ff", fontSize, fontWeight: "700" }}>{value}</Text>
    </Animated.View>
  );
}

function BrandStrip({ value, size = "lg" }: ChipStyleProps) {
  const scale = useTVScale();
  const fontSize = scale(size === "sm" ? 22 : 40);
  return (
    <View
      style={{
        backgroundColor: "#059669",
        paddingHorizontal: scale(20),
        paddingVertical: scale(10),
      }}
    >
      <Text style={{ color: "#fff", fontSize, fontWeight: "800" }}>{value}</Text>
    </View>
  );
}

function PaperTag({ value, size = "lg" }: ChipStyleProps) {
  const scale = useTVScale();
  const fontSize = scale(size === "sm" ? 22 : 40);
  const foldSize = scale(size === "sm" ? 12 : 18);
  return (
    <View
      style={{
        backgroundColor: "#faf7f0",
        paddingHorizontal: scale(20),
        paddingVertical: scale(12),
        borderRadius: scale(4),
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: scale(6),
        shadowOffset: { width: 0, height: scale(3) },
      }}
    >
      <View
        pointerEvents="none"
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 0,
          height: 0,
          borderTopWidth: foldSize,
          borderLeftWidth: foldSize,
          borderTopColor: "#d8d0bd",
          borderLeftColor: "transparent",
        }}
      />
      <Text style={{ color: "#2b2620", fontSize, fontWeight: "700" }}>{value}</Text>
    </View>
  );
}

function LedStrip({ value, size = "lg" }: ChipStyleProps) {
  const scale = useTVScale();
  const fontSize = scale(size === "sm" ? 20 : 38);
  return (
    <View
      style={{
        backgroundColor: "#000",
        paddingHorizontal: scale(18),
        paddingVertical: scale(10),
        alignItems: "center",
      }}
    >
      <Text
        style={{
          color: "#f59e0b",
          fontSize,
          fontWeight: "700",
          letterSpacing: scale(3),
        }}
      >
        {value}
      </Text>
      <View
        style={{
          marginTop: scale(4),
          width: "100%",
          borderBottomWidth: scale(2),
          borderStyle: "dashed",
          borderColor: "#f59e0b",
          opacity: 0.6,
        }}
      />
    </View>
  );
}

function RibbonCorner({ value, size = "lg" }: ChipStyleProps) {
  const scale = useTVScale();
  const fontSize = scale(size === "sm" ? 20 : 36);
  return (
    <View style={{ transform: [{ skewX: "-12deg" }], backgroundColor: "#dc2626" }}>
      <View
        style={{
          transform: [{ skewX: "12deg" }],
          paddingHorizontal: scale(20),
          paddingVertical: scale(8),
        }}
      >
        <Text style={{ color: "#fff", fontSize, fontWeight: "800" }}>{value}</Text>
      </View>
    </View>
  );
}

function ViewfinderCorners({ value, size = "lg" }: ChipStyleProps) {
  const scale = useTVScale();
  const fontSize = scale(size === "sm" ? 22 : 40);
  const armLen = scale(14);
  const thickness = scale(2);
  const corner = (pos: { top?: number; bottom?: number; left?: number; right?: number }) => (
    <View
      pointerEvents="none"
      style={{
        position: "absolute",
        width: armLen,
        height: armLen,
        borderColor: "#fff",
        borderTopWidth: pos.top !== undefined ? thickness : 0,
        borderBottomWidth: pos.bottom !== undefined ? thickness : 0,
        borderLeftWidth: pos.left !== undefined ? thickness : 0,
        borderRightWidth: pos.right !== undefined ? thickness : 0,
        ...pos,
      }}
    />
  );

  return (
    <View
      style={{
        paddingHorizontal: scale(24),
        paddingVertical: scale(14),
      }}
    >
      {corner({ top: 0, left: 0 })}
      {corner({ top: 0, right: 0 })}
      {corner({ bottom: 0, left: 0 })}
      {corner({ bottom: 0, right: 0 })}
      <Text style={{ color: "#fff", fontSize, fontWeight: "700" }}>{value}</Text>
    </View>
  );
}

function IconTight({ value, icon, size = "lg" }: ChipStyleProps) {
  const scale = useTVScale();
  const fontSize = scale(size === "sm" ? 18 : 32);
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: scale(8),
        backgroundColor: "rgba(0,0,0,0.55)",
        paddingHorizontal: scale(12),
        paddingVertical: scale(8),
        borderRadius: scale(8),
      }}
    >
      {icon}
      <Text style={{ color: "#fff", fontSize, fontWeight: "700" }}>{value}</Text>
    </View>
  );
}

export const CHIP_STYLES: Record<NewChipStyleId, React.ComponentType<ChipStyleProps>> = {
  "chip-outline": ChipOutline,
  "tag-ticket": TagTicket,
  "mono-console": MonoConsole,
  "neon-breathe": NeonBreathe,
  "brand-strip": BrandStrip,
  "paper-tag": PaperTag,
  "led-strip": LedStrip,
  "ribbon-corner": RibbonCorner,
  "viewfinder-corners": ViewfinderCorners,
  "icon-tight": IconTight,
};

export const NEW_CHIP_STYLE_IDS: NewChipStyleId[] = Object.keys(
  CHIP_STYLES
) as NewChipStyleId[];
