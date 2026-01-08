import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTVScale } from "../../../hook/Scale";

export const CardWithIcon = ({ temperature }) => {
  const scale = useTVScale(); // retorna a função de scale
  const styles = StyleSheet.create({
    card: {
      flexDirection: "row",
      backgroundColor: "#fff",
      padding: scale(12),
      borderRadius: scale(12),
      alignItems: "center",
    },
    temp: {
      marginLeft: scale(8),
      fontSize: scale(75),
      fontWeight: "bold",
      color: "#000",
    },
  });

  return (
    <View style={styles.card}>
      <MaterialCommunityIcons
        name="thermometer"
        size={scale(75)}
        color="#000"
      />
      <Text style={styles.temp}>{temperature}°C</Text>
    </View>
  );
};
