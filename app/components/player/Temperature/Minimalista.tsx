import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTVScale } from "../../../hook/Scale";

export const Minimalista = ({ temperature }) => {
  const scale = useTVScale(); // retorna a função de scale

  return (
    <View
      style={[
        styles.container,
        {
          padding: scale(15),
          borderRadius: scale(8),
        },
      ]}
    >
      <Text
        style={[
          styles.temp,
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
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  temp: {
    color: "#fff",
    fontWeight: "bold",
  },
});
