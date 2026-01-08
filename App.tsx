import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { loginWithJwt, supabase } from "./app/utils/SupaLegend";
import * as SecureStore from "expo-secure-store";
import Vinculation from "./app/pages/Vinculation";
import { parseJwt } from "./app/utils/jwt";
import Player from "./app/pages/Player";

// Função para validar o JWT armazenado
const validateJwt = async (): Promise<boolean> => {
  try {
    const storedJwt = await SecureStore.getItemAsync("device_jwt");
    if (!storedJwt) return false;

    const decoded = parseJwt(storedJwt);
    const claims = decoded["https://hasura.io/jwt/claims"];
    if (!claims) return false;

    const deviceId = claims["deviceId"];
    if (!deviceId) return false;

    const { data: screensData, error: screensErr } = await supabase
      .from("screens")
      .select("playlist_id")
      .eq("id", deviceId)
      .single();

    if (screensErr || !screensData) {
      await SecureStore.deleteItemAsync("device_jwt");
      return false;
    }

    return true; // JWT válido e device encontrado
  } catch (err) {
    console.error("Erro ao validar JWT:", err);
    await SecureStore.deleteItemAsync("device_jwt");
    return false;
  }
};

export default function DeviceLinkScreen() {
  const [jwt, setJwt] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const storedJwt = await SecureStore.getItemAsync("device_jwt");

      if (!storedJwt) {
        setJwt(null);
        setLoading(false);
        return;
      }

      const valid = await validateJwt();
      if (valid) setJwt(storedJwt);
      else setJwt(null);

      setLoading(false);
    };

    init();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Carregando recursos.</Text>
      </View>
    );
  }

  // Renderiza tela de vinculação ou Player dependendo do JWT
  if (!jwt) {
    return <Vinculation setJwt={setJwt} />;
  } else {
    return <Player jwt={jwt} setJwt={setJwt} />;
  }
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#3b82f6", // azul semelhante ao Tailwind "text-blue-500"
  },
});
