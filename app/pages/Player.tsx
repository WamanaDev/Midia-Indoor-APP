import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View, Animated } from "react-native";
import Video from "react-native-video";
import * as SecureStore from "expo-secure-store";

import { loginWithJwt } from "../utils/SupaLegend";
import { parseJwt } from "../utils/jwt";
import { downloadAndCache } from "../hook/CacheMedia";
import { useTVScale } from "../hook/Scale";

import CustomLoader from "../components/Loading";
import { Temperature } from "../components/player/Temperature";
import { TimeNotOverlay } from "../components/player/Hours/NotOverlay";
import { TimeOverlay } from "../components/player/Hours/Overlay";
import { NewsNotOverlay } from "../components/News/NotOverlay";
import { NewsOverlay } from "../components/News/Overlay";
import { NewsProvider, useNews } from "../utils/NewsProvider";
const NewsOverlayWrapper = React.memo(() => {
  const { items } = useNews();
  if (!items || items.length === 0) return null;
  return <NewsOverlay items={items} />;
});
export default function Player({
  jwt,
  setJwt,
}: {
  jwt: string;
  setJwt: (jwt: string | null) => void;
}) {
  const styles = stylesPlayer();
  const [loading, setLoading] = useState(true);
  const [playlistItems, setPlaylistItems] = useState<any[]>([]);
  const [cachedPlaylist, setCachedPlaylist] = useState<any[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // ===============================
  // 1️⃣ Load playlist
  // ===============================
  const loadPlaylist = async () => {
    try {
      const storedJwt = await SecureStore.getItemAsync("device_jwt");
      if (!storedJwt) return;

      const supabase = await loginWithJwt();
      const decoded = parseJwt(storedJwt);
      const deviceId = decoded["https://hasura.io/jwt/claims"].deviceId;

      const { data: screen } = await supabase
        .from("screens")
        .select("playlist_id")
        .eq("id", deviceId)
        .single();

      if (!screen) return;
      await fetchPlaylistItems(screen.playlist_id);
    } catch (err) {
      console.log("Erro loadPlaylist:", err);
    }
  };

  const fetchPlaylistItems = async (playlistId: string) => {
    try {
      const supabase = await loginWithJwt();

      const { data } = await supabase
        .from("playlist_items")
        .select(
          "id, playlist_id, media_file_id, order_index, duration_override, type, config, media_files(storage_path)"
        )
        .eq("playlist_id", playlistId)
        .order("order_index", { ascending: true });

      setPlaylistItems(data || []);
      setLoading(false);
    } catch (err) {
      console.log("Erro fetchPlaylistItems:", err);
    }
  };

  useEffect(() => {
    loadPlaylist();
  }, []);

  // ===============================
  // 2️⃣ Realtime updates
  // ===============================
  useEffect(() => {
    const subscribeRealtime = async () => {
      const supabase = await loginWithJwt();

      const channel = supabase
        .channel("player-channel")
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "playlist_items" },
          async () => {
            setLoading(true);
            await loadPlaylist();
          }
        )
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "screens" },
          async () => {
            const storedJwt = await SecureStore.getItemAsync("device_jwt");
            if (!storedJwt) return;

            const decoded = parseJwt(storedJwt);
            const deviceId = decoded["https://hasura.io/jwt/claims"].deviceId;
            const supabaseClient = await loginWithJwt();

            const { data } = await supabaseClient
              .from("screens")
              .select("id")
              .eq("id", deviceId)
              .maybeSingle();

            if (!data) {
              await SecureStore.deleteItemAsync("device_jwt");
              await SecureStore.deleteItemAsync("last_playlist_items");
              await SecureStore.deleteItemAsync("cached_files");
              setJwt(null);
              return;
            }

            setLoading(true);
            await loadPlaylist();
          }
        )
        .subscribe();

      return () => {
        try {
          supabase.removeChannel(channel);
        } catch {}
      };
    };

    subscribeRealtime();
  }, []);

  // ===============================
  // 3️⃣ Cache local
  // ===============================
  useEffect(() => {
    const cache = async () => {
      const result = await Promise.all(
        playlistItems.map(async (item) => {
          let localUri = null;
          if (item.media_files?.storage_path) {
            localUri = await downloadAndCache(item.media_files.storage_path);
          }
          return { ...item, localUri };
        })
      );
      setCachedPlaylist(result);
    };

    if (playlistItems.length > 0) cache();
  }, [playlistItems]);

  // ===============================
  // 4️⃣ ROTATION SYSTEM
  // ===============================
  useEffect(() => {
    if (cachedPlaylist.length === 0) return;

    const rotating = cachedPlaylist.filter((item) => {
      const cfg = item.config || {};
      return !(
        (item.type === "news" && cfg.overlay) ||
        (item.type === "temperature" && cfg.overlay) ||
        (item.type === "hours" && cfg.overlay)
      );
    });

    if (rotating.length === 0) return;

    if (activeIndex >= rotating.length) {
      setActiveIndex(0);
      return;
    }

    const item = rotating[activeIndex];
    if (!item) return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();

    if (item.type === "video") return;

    const durationMs = (item.duration_override ?? 8) * 1000;
    const fadeDuration = 400;

    timeoutRef.current = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: fadeDuration,
        useNativeDriver: true,
      }).start(() => {
        setActiveIndex((prev) =>
          rotating.length <= 1 ? prev : (prev + 1) % rotating.length
        );
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: fadeDuration,
          useNativeDriver: true,
        }).start();
      });
    }, durationMs - fadeDuration);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [activeIndex, cachedPlaylist]);

  if (loading) return <CustomLoader />;

  // ===============================
  // 5️⃣ Filters
  // ===============================
  const rotatingItems = cachedPlaylist.filter((item) => {
    const cfg = item.config || {};
    return !(
      (item.type === "news" && cfg.overlay) ||
      (item.type === "temperature" && cfg.overlay) ||
      (item.type === "hours" && cfg.overlay)
    );
  });
  const currentItem =
    rotatingItems.length > 0 ? rotatingItems[activeIndex] : null;

  const temperatureOverlay = cachedPlaylist.filter(
    (x) => x.type === "temperature" && (x.config || {}).overlay
  );
  const newsOverlayItem = cachedPlaylist.find((x) => x.type === "news");
  const timeOverlay = cachedPlaylist.filter(
    (x) => x.type === "hours" && (x.config || {}).overlay
  );
  const timeNotOverlay = cachedPlaylist.filter(
    (x) => x.type === "hours" && !(x.config || {}).overlay
  );

  const feeds = newsOverlayItem?.config?.news ?? {};

  // ===============================
  // 6️⃣ Player Rendering
  // ===============================
  const RenderPlayer = () => (
    <View style={styles.container}>
      {/* Mídia principal */}
      <Animated.View style={[styles.mediaFill, { opacity: fadeAnim }]}>
        {currentItem?.type === "image" && currentItem?.localUri && (
          <Animated.Image
            source={{ uri: currentItem.localUri }}
            style={styles.mediaFill}
            resizeMode="cover"
          />
        )}

        {currentItem?.type === "video" && currentItem?.localUri && (
          <Video
            source={{ uri: currentItem.localUri }}
            style={styles.mediaFill}
            resizeMode="cover"
            muted
            repeat={rotatingItems.length <= 1}
            onEnd={() => {
              if (rotatingItems.length > 1)
                setActiveIndex((p) => (p + 1) % rotatingItems.length);
            }}
          />
        )}

        {currentItem?.type === "news" && <NewsNotOverlay item={currentItem} />}
        {timeNotOverlay.map((item) => (
          <TimeNotOverlay key={item.id} config={item.config} />
        ))}
      </Animated.View>

      {/* Overlays montados apenas uma vez */}
      <NewsOverlayWrapper />
      {temperatureOverlay.map((item) => (
        <Temperature
          key={item.id}
          image={item.media_files?.storage_path}
          config={item.config || {}}
        />
      ))}
      {timeOverlay.map((item) => (
        <TimeOverlay key={item.id} config={item.config} />
      ))}
    </View>
  );

  return (
    <NewsProvider
      feeds={feeds}
      overlay={newsOverlayItem?.config?.overlay ?? false}
    >
      <RenderPlayer />
    </NewsProvider>
  );
}

// ===============================
// Styles
// ===============================
const stylesPlayer = function () {
  const scale = useTVScale();
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#000",
    },
    mediaFill: {
      flex: 1,
      width: "100%",
      height: "100%",
    },
  });
};
