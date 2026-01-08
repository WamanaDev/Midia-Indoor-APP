import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTVScale } from "../../../hook/Scale";

export const BadgeTag = ({ temperature }) => {
  const scale = useTVScale(); // retorna a função de scale

  return (
    <View
      style={[
        styles.badge,
        {
          paddingHorizontal: scale(20),
          paddingVertical: scale(6),
          borderRadius: scale(100),
        },
      ]}
    >
      <Text
        style={[
          styles.text,
          {
            fontSize: scale(75),
          },
        ]}
      >
        {temperature}°C
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    alignSelf: "flex-start",
  },
  text: {
    color: "rgba(0, 0, 0, 0.7)",
    fontWeight: "bold",
  },
});
