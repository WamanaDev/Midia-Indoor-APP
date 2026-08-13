import { useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE } from "../utils/api";

const CACHE_KEY = "cached_weather_v1";
const REFRESH_MINUTES = 5;

export type WeatherLocation = {
  id: string;
  location?: { lat: number; lon: number };
  unit?: "C" | "F";
};

export type WeatherReading = {
  temperature: number | null;
  weathercode: number | null;
  isDay: boolean;
};

type Cache = Record<string, WeatherReading>;

const EMPTY_READING: WeatherReading = {
  temperature: null,
  weathercode: null,
  isDay: true,
};

async function loadCache(): Promise<Cache> {
  const raw = await AsyncStorage.getItem(CACHE_KEY);
  return raw ? JSON.parse(raw) : {};
}

/**
 * Busca o clima atual de cada localidade via
 * GET /api/player/weather?lat=&lon=&unit=, a cada 5 minutos, com cache em
 * AsyncStorage (mesmo padrão de app/utils/NewsProvider.tsx).
 * Além da temperatura, traz `weathercode` e `isDay` (§6.1 da spec) pro
 * ícone dinâmico de condição do tempo.
 */
export function useWeather(locations: WeatherLocation[]) {
  const [readings, setReadings] = useState<Record<string, WeatherReading>>({});
  const lock = useRef(false);
  const key = JSON.stringify(
    (locations || []).map((l) => ({
      id: l.id,
      lat: l.location?.lat,
      lon: l.location?.lon,
      unit: l.unit || "C",
    }))
  );

  useEffect(() => {
    if (!locations || locations.length === 0) {
      setReadings({});
      return;
    }

    let cancelled = false;

    const fetchAll = async () => {
      if (lock.current) return;
      lock.current = true;

      try {
        const cache = await loadCache();

        const entries = await Promise.all(
          locations.map(async (loc) => {
            if (!loc.location) return [loc.id, EMPTY_READING] as const;
            const unit = loc.unit || "C";

            try {
              const res = await fetch(
                `${API_BASE}/api/player/weather?lat=${loc.location.lat}&lon=${loc.location.lon}&unit=${unit}`
              );
              const data = await res.json();
              const reading: WeatherReading = {
                temperature:
                  typeof data?.temperature === "number" ? data.temperature : null,
                weathercode:
                  typeof data?.weathercode === "number" ? data.weathercode : null,
                isDay: data?.isDay !== false,
              };
              cache[loc.id] = reading;
              return [loc.id, reading] as const;
            } catch (err) {
              console.log("useWeather fetch error:", err);
              return [loc.id, cache[loc.id] ?? EMPTY_READING] as const;
            }
          })
        );

        await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(cache));
        if (!cancelled) setReadings(Object.fromEntries(entries));
      } finally {
        lock.current = false;
      }
    };

    (async () => {
      const cache = await loadCache();
      const cached = Object.fromEntries(
        locations.map((l) => [l.id, cache[l.id] ?? EMPTY_READING])
      );
      if (!cancelled) setReadings(cached);
      await fetchAll();
    })();

    const interval = setInterval(fetchAll, REFRESH_MINUTES * 60 * 1000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [key]);

  return readings;
}
