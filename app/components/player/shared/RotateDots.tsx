import React from "react";
import { View } from "react-native";
import { useTVScale } from "../../../hook/Scale";

/**
 * Pontinhos indicando quantas entradas existem e qual está na tela, usados
 * no revezamento em tela cheia (`layout: "rotate"`, §3.4). Só aparecem se
 * houver mais de uma entrada.
 */
export function RotateDots({ count, index }: { count: number; index: number }) {
  const scale = useTVScale();
  if (count <= 1) return null;

  return (
    <View style={{ flexDirection: "row", gap: scale(8) }}>
      {Array.from({ length: count }).map((_, i) => {
        const active = i === index;
        const size = scale(active ? 10 : 8);
        return (
          <View
            key={i}
            style={{
              width: size,
              height: size,
              borderRadius: size / 2,
              backgroundColor: active ? "#fff" : "rgba(255,255,255,0.4)",
            }}
          />
        );
      })}
    </View>
  );
}
