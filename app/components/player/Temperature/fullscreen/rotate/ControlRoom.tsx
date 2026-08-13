import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTVScale } from "../../../../../hook/Scale";
import { conditionFromCode, weatherIcon } from "../../../../../utils/weatherCondition";
import { formatTemperature } from "../../format";
import { WeatherTemplateProps } from "../types";

/**
 * `control-room` (§5.3) — HUD escuro com grade fina e cantos técnicos,
 * estilo sala de controle. A grade é uma malha de linhas finas absolutas;
 * os cantos são pares de traços em L nos 4 cantos da tela.
 */
export function ControlRoom({ location, reading }: WeatherTemplateProps) {
  const scale = useTVScale();
  const condition = conditionFromCode(reading?.weathercode ?? null);
  const icon = weatherIcon(condition, reading?.isDay ?? true);
  const unit = location.unit || "C";

  const cols = 8;
  const rows = 5;

  return (
    <View style={styles.container}>
      {/* grade fina */}
      {Array.from({ length: cols - 1 }).map((_, i) => (
        <View
          key={`v${i}`}
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: `${((i + 1) / cols) * 100}%`,
            width: 1,
            backgroundColor: "rgba(34,211,238,0.08)",
          }}
        />
      ))}
      {Array.from({ length: rows - 1 }).map((_, i) => (
        <View
          key={`h${i}`}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: `${((i + 1) / rows) * 100}%`,
            height: 1,
            backgroundColor: "rgba(34,211,238,0.08)",
          }}
        />
      ))}

      {/* cantos técnicos */}
      {(["tl", "tr", "bl", "br"] as const).map((corner) => (
        <Corner key={corner} corner={corner} size={scale(46)} thickness={scale(2)} />
      ))}

      <View style={{ alignItems: "center" }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: scale(6), marginBottom: scale(6) }}>
          <View style={{ width: scale(6), height: scale(6), borderRadius: scale(3), backgroundColor: "#22d3ee" }} />
          <Text style={{ fontSize: scale(16), color: "#67e8f9", fontFamily: "monospace", letterSpacing: scale(3) }}>
            SENSOR ARRAY · STATUS NOMINAL
          </Text>
        </View>

        <MaterialCommunityIcons name={icon as any} size={scale(48)} color="#22d3ee" style={{ marginBottom: scale(4) }} />
        <Text style={{ fontSize: scale(108), fontWeight: "700", color: "#e0f2fe", fontFamily: "monospace" }}>
          {formatTemperature(reading?.temperature ?? null, unit)}
        </Text>
        <Text style={{ fontSize: scale(22), color: "#94a3b8", fontFamily: "monospace", textTransform: "uppercase", letterSpacing: scale(2), marginTop: scale(6) }}>
          {location.label}
        </Text>
      </View>
    </View>
  );
}

function Corner({
  corner,
  size,
  thickness,
}: {
  corner: "tl" | "tr" | "bl" | "br";
  size: number;
  thickness: number;
}) {
  const isTop = corner === "tl" || corner === "tr";
  const isLeft = corner === "tl" || corner === "bl";
  return (
    <View
      style={{
        position: "absolute",
        top: isTop ? 24 : undefined,
        bottom: isTop ? undefined : 24,
        left: isLeft ? 24 : undefined,
        right: isLeft ? undefined : 24,
        width: size,
        height: size,
        borderColor: "#22d3ee",
        borderTopWidth: isTop ? thickness : 0,
        borderBottomWidth: isTop ? 0 : thickness,
        borderLeftWidth: isLeft ? thickness : 0,
        borderRightWidth: isLeft ? 0 : thickness,
        opacity: 0.7,
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#04070a",
    alignItems: "center",
    justifyContent: "center",
  },
});
