import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTVScale } from "../../../hook/Scale";

export const DigitalDisplay = ({ temperature }) => {
  const scale = useTVScale(); // retorna a função de scale
  const styles = StyleSheet.create({
    container: {
      backgroundColor: "#000",
      padding: scale(20),
      borderRadius: scale(8),
      alignItems: "center",
      justifyContent: "center",
    },
    digital: {
      color: "#00FF00",
      fontSize: scale(75),
      fontFamily: "Courier", // parecendo display digital
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.digital}>{temperature}°C</Text>
    </View>
  );
};
