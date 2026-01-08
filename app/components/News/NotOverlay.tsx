import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import QRCode from "react-native-qrcode-svg";

type NewsItem = {
  vehicle?: string;
  title: string;
  description: string;
  link?: string;
  localImage?: string | null;
};

export function NewsNotOverlay({ item }: { item: NewsItem | null }) {
  if (!item) return null;

  return (
    <View style={styles.container}>
      {/* Imagem de fundo */}
      {item.localImage && (
        <Image
          source={{ uri: item.localImage }}
          style={styles.image}
          resizeMode="cover"
        />
      )}

      {/* Texto e QRCode */}
      <View style={styles.overlay}>
        <View style={{ flex: 1 }}>
          <Text style={styles.vehicle}>{item.vehicle}</Text>
          <Text style={styles.title} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.description} numberOfLines={3}>
            {item.description}
          </Text>
        </View>

        <QRCode
          value={item.link || "https://google.com"}
          size={60}
          backgroundColor="transparent"
          color="#fff"
        />
      </View>
    </View>
  );
}

// =========================================================
// Styles
// =========================================================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    width: "100%",
    height: "100%",
    backgroundColor: "#000",
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: "rgba(0,0,0,0.6)",
    flexDirection: "row",
  },
  vehicle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  title: {
    color: "#fff",
    fontSize: 16,
  },
  description: {
    color: "#ccc",
  },
});
