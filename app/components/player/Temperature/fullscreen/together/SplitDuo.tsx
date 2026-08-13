import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTVScale } from "../../../../../hook/Scale";
import { conditionFromCode, weatherIcon } from "../../../../../utils/weatherCondition";
import { formatTemperature } from "../../format";
import { WeatherTogetherTemplateProps } from "../types";

/**
 * `split-duo` (§5.4) — divisão vertical dramática ao meio, pensada pra duas
 * localidades. Usa só as 2 primeiras se houver mais; com só 1, a segunda
 * metade fica vazia (sem quebrar layout).
 */
const SIDE_COLOR: [string, string] = ["#111827", "#7c2d12"];

export function SplitDuo({ locations, readings }: WeatherTogetherTemplateProps) {
  const scale = useTVScale();
  const pair = locations.slice(0, 2);

  return (
    <View style={styles.container}>
      {[0, 1].map((i) => {
        const loc = pair[i];
        const reading = loc ? readings[loc.id] : undefined;
        const condition = conditionFromCode(reading?.weathercode ?? null);
        const icon = weatherIcon(condition, reading?.isDay ?? true);
        const unit = loc?.unit || "C";

        return (
          <View
            key={i}
            style={{
              flex: 1,
              backgroundColor: SIDE_COLOR[i],
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {loc ? (
              <>
                <MaterialCommunityIcons name={icon as any} size={scale(56)} color="#fff" />
                <Text style={{ fontSize: scale(96), fontWeight: "800", color: "#fff", marginTop: scale(8) }}>
                  {formatTemperature(reading?.temperature ?? null, unit)}
                </Text>
                <Text
                  style={{
                    fontSize: scale(26),
                    color: "rgba(255,255,255,0.85)",
                    textTransform: "uppercase",
                    letterSpacing: scale(2),
                    marginTop: scale(10),
                    fontWeight: "600",
                  }}
                >
                  {loc.label}
                </Text>
              </>
            ) : null}
          </View>
        );
      })}

      <View style={styles.divider} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    flexDirection: "row",
  },
  divider: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: "50%",
    width: 2,
    backgroundColor: "rgba(255,255,255,0.4)",
  },
});
