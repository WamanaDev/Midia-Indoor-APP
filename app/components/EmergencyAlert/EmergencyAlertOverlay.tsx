import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTVScale } from "../../hook/Scale";
import { EmergencyAlert } from "../../hook/useEmergencyAlert";

/**
 * Cobre a tela inteira por cima de qualquer conteúdo (slide, overlays de
 * clima/hora/notícia) enquanto houver um alerta ativo. Não precisa ser
 * bonito — precisa ser impossível de não ver.
 */
export function EmergencyAlertOverlay({ alert }: { alert: EmergencyAlert }) {
  const scale = useTVScale();

  return (
    <View style={styles.overlay}>
      <Ionicons name="warning" size={scale(96)} color="#fff" />
      <Text style={[styles.message, { fontSize: scale(48) }]}>
        {alert.message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 9999,
    elevation: 9999,
    backgroundColor: "#b91c1c",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 60,
    gap: 32,
  },
  message: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});
