import React, { useEffect, useRef, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import * as SecureStore from "expo-secure-store";
import { supabase } from "../utils/SupaLegend";
import Logo from "../assets/logoFlyer/1x/logo3.png";
import { scale, verticalScale } from "react-native-size-matters";

const CODE_TTL_SECONDS = 10 * 60; // código de vinculação válido por 10 minutos
const CONFIGURING_TIMEOUT_MS = 90 * 1000; // tempo máximo aguardando confirmação do dashboard

export default function Vinculation({ setJwt }) {
  const [code, setCode] = useState("");
  const [deviceStatus, setDeviceStatus] = useState<
    "idle" | "configuring" | "linked"
  >("idle");
  const [secondsLeft, setSecondsLeft] = useState(CODE_TTL_SECONDS);

  const broadcastChannelRef = useRef(null);
  const dbChannelRef = useRef(null);
  const codeRef = useRef("");
  const statusRef = useRef<"idle" | "configuring" | "linked">("idle");

  useEffect(() => {
    codeRef.current = code;
  }, [code]);
  useEffect(() => {
    statusRef.current = deviceStatus;
  }, [deviceStatus]);

  function generateCode(length = 6) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let out = "";
    for (let i = 0; i < length; i++) {
      out += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return out;
  }

  function cleanupChannels() {
    if (broadcastChannelRef.current)
      supabase.removeChannel(broadcastChannelRef.current);
    if (dbChannelRef.current) supabase.removeChannel(dbChannelRef.current);
  }

  async function insertCode(codeDevice) {
    await supabase.from("new_device").insert({ device_code: codeDevice });
  }

  async function deleteCode(codeDevice) {
    if (!codeDevice) return;
    await supabase.from("new_device").delete().eq("device_code", codeDevice);
  }

  function regenerateCode() {
    setDeviceStatus("idle");
    setCode(generateCode());
  }

  function createBroadcastChannel(codeDevice) {
    const channel = supabase.channel(`device-link-${codeDevice}`, {
      config: { broadcast: { ack: true } },
    });
    channel
      .on("broadcast", { event: "token" }, async (payload) => {
        const jwt = payload.payload.jwt;
        await SecureStore.setItemAsync("device_jwt", jwt);
        await deleteCode(codeDevice);
        setJwt(jwt);
        setDeviceStatus("linked");
      })
      .on("broadcast", { event: "device_status" }, (payload) => {
        const { status } = payload.payload;
        if (status === "configuring") setDeviceStatus("configuring");
      })
      .subscribe();
    broadcastChannelRef.current = channel;
  }

  function subscribeToDelete(codeDevice) {
    const channel = supabase
      .channel(`device-db-${codeDevice}`)
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "new_device",
          filter: `device_code=eq.${codeDevice}`,
        },
        () => {
          if (statusRef.current !== "idle") return;
          regenerateCode();
        }
      )
      .subscribe();
    dbChannelRef.current = channel;
  }

  // Gera o código inicial
  useEffect(() => setCode(generateCode()), []);

  // Publica o código atual e reseta o contador sempre que ele muda
  useEffect(() => {
    if (!code) return;
    cleanupChannels();
    insertCode(code);
    createBroadcastChannel(code);
    subscribeToDelete(code);
    setSecondsLeft(CODE_TTL_SECONDS);
  }, [code]);

  // Contagem regressiva, só corre enquanto aguarda vinculação
  useEffect(() => {
    if (deviceStatus !== "idle") return;
    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [code, deviceStatus]);

  // Ao expirar, apaga o código do banco e gera um novo
  useEffect(() => {
    if (deviceStatus !== "idle" || secondsLeft !== 0) return;
    deleteCode(codeRef.current);
    regenerateCode();
  }, [secondsLeft, deviceStatus]);

  // Se o dashboard travar em "configurando" sem confirmar, desiste e gera um novo código
  useEffect(() => {
    if (deviceStatus !== "configuring") return;
    const timeout = setTimeout(() => {
      deleteCode(codeRef.current);
      regenerateCode();
    }, CONFIGURING_TIMEOUT_MS);
    return () => clearTimeout(timeout);
  }, [deviceStatus]);

  useEffect(
    () => () => {
      cleanupChannels();
      deleteCode(codeRef.current);
    },
    []
  );

  return (
    <View style={styles.container}>
      {deviceStatus === "idle" && (
        <>
          <Image source={Logo} style={styles.logo} />
          <Text style={styles.title}>Vincular dispositivo</Text>
          <Text style={styles.subtitle}>
            Digite o código no seu dashboard para vincular o dispositivo
          </Text>

          <View style={styles.codeContainer}>
            <Text style={styles.code}>{code}</Text>
          </View>
          <Text style={styles.timerText}>
            Expira em {String(Math.floor(secondsLeft / 60)).padStart(2, "0")}:
            {String(secondsLeft % 60).padStart(2, "0")}
          </Text>
        </>
      )}

      {deviceStatus === "configuring" && (
        <Text style={styles.statusText}>🔧 Dispositivo em configuração…</Text>
      )}

      {deviceStatus === "linked" && (
        <Text style={styles.statusText}>✅ Dispositivo vinculado!</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111111",
    justifyContent: "center",
    alignItems: "center",
    padding: scale(16),
  },
  logo: {
    width: scale(80),
    height: verticalScale(50),
    resizeMode: "stretch",
    marginBottom: verticalScale(15),
  },
  title: {
    fontSize: scale(20),
    color: "#ffffff",
    fontWeight: "bold",
    marginBottom: verticalScale(4),
    textAlign: "center",
  },
  subtitle: {
    fontSize: scale(15),
    color: "#ffffff",
    textAlign: "center",
    marginBottom: verticalScale(15),
    maxWidth: "80%",
  },
  codeContainer: {
    paddingVertical: verticalScale(5),
    paddingHorizontal: scale(15),
    borderWidth: 2,
    borderColor: "#4B5563", // cinza parecido com Tailwind border-gray-600
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  code: {
    fontSize: scale(40),
    letterSpacing: 3,
    color: "#ffffff",
    fontWeight: "bold",
    textAlign: "center",
  },
  timerText: {
    fontSize: scale(13),
    color: "#9CA3AF", // cinza claro
    marginTop: verticalScale(10),
    textAlign: "center",
  },
  statusText: {
    fontSize: scale(25),
    color: "#ffffff",
    fontWeight: "bold",
    textAlign: "center",
  },
});
