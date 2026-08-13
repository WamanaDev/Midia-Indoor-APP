import { useEffect, useRef, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { loginWithJwt } from "../utils/SupaLegend";
import { parseJwt } from "../utils/jwt";

export type EmergencyAlert = {
  id: string;
  batch_id: string;
  screen_id: string;
  message: string;
  created_at: string;
  expires_at: string;
  dismissed_at: string | null;
};

const isActive = (alert: EmergencyAlert) =>
  !alert.dismissed_at && new Date(alert.expires_at).getTime() > Date.now();

/**
 * Escuta a tabela `emergency_alerts` (Supabase Realtime) pra essa tela e
 * devolve o alerta ativo mais recente, ou null. Cobre os dois caminhos de
 * expiração: timer local baseado em `expires_at` (não depende da rede pra
 * saber que expirou) e evento UPDATE com `dismissed_at` preenchido
 * (encerrado manualmente pelo dashboard).
 */
export function useEmergencyAlert(): EmergencyAlert | null {
  const [alerts, setAlerts] = useState<Record<string, EmergencyAlert>>({});
  const timersRef = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  useEffect(() => {
    let cancelled = false;
    let supabaseClient: Awaited<ReturnType<typeof loginWithJwt>> = null;
    let channel: ReturnType<NonNullable<typeof supabaseClient>["channel"]> | null = null;

    const scheduleExpiry = (alert: EmergencyAlert) => {
      if (timersRef.current[alert.id]) clearTimeout(timersRef.current[alert.id]);
      const delay = new Date(alert.expires_at).getTime() - Date.now();
      timersRef.current[alert.id] = setTimeout(() => {
        setAlerts((prev) => {
          const next = { ...prev };
          delete next[alert.id];
          return next;
        });
      }, Math.max(delay, 0));
    };

    const clearExpiry = (id: string) => {
      if (timersRef.current[id]) {
        clearTimeout(timersRef.current[id]);
        delete timersRef.current[id];
      }
    };

    const run = async () => {
      const storedJwt = await SecureStore.getItemAsync("device_jwt");
      if (!storedJwt) return;

      const decoded = parseJwt(storedJwt);
      const screenId = decoded?.["https://hasura.io/jwt/claims"]?.deviceId;
      if (!screenId) return;

      const supabase = await loginWithJwt();
      if (!supabase) return;
      supabaseClient = supabase;

      const { data } = await supabase
        .from("emergency_alerts")
        .select("*")
        .eq("screen_id", screenId)
        .is("dismissed_at", null)
        .gt("expires_at", new Date().toISOString())
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (cancelled) return;

      if (data) {
        setAlerts({ [data.id]: data });
        scheduleExpiry(data);
      }

      channel = supabase
        .channel("emergency-alerts")
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "emergency_alerts",
            filter: `screen_id=eq.${screenId}`,
          },
          (payload: any) => {
            const alert = payload.new as EmergencyAlert;
            setAlerts((prev) => ({ ...prev, [alert.id]: alert }));
            scheduleExpiry(alert);
          }
        )
        .on(
          "postgres_changes",
          {
            event: "UPDATE",
            schema: "public",
            table: "emergency_alerts",
            filter: `screen_id=eq.${screenId}`,
          },
          (payload: any) => {
            const alert = payload.new as EmergencyAlert;
            if (alert.dismissed_at) {
              clearExpiry(alert.id);
              setAlerts((prev) => {
                const next = { ...prev };
                delete next[alert.id];
                return next;
              });
            }
          }
        )
        .subscribe();
    };

    run();

    return () => {
      cancelled = true;
      Object.keys(timersRef.current).forEach(clearExpiry);
      if (channel && supabaseClient) {
        try {
          supabaseClient.removeChannel(channel);
        } catch {}
      }
    };
  }, []);

  const active = Object.values(alerts)
    .filter(isActive)
    .sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )[0];

  return active ?? null;
}
