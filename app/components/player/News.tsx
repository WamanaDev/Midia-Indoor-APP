import React, { useEffect, useRef, useState } from "react";
import { View, Image, Animated, Text } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { useNews } from "../../utils/NewsProvider";

const ROTATION_MS = 8000;
const FADE_MS = 200;

export function News({ overlay = false }: { overlay?: boolean }) {
  const { items } = useNews();

  const [index, setIndex] = useState(0);
  const [front, setFront] = useState<any>(null);
  const [back, setBack] = useState<any>(null);

  const fade = useRef(new Animated.Value(1)).current;
  const timer = useRef<NodeJS.Timeout | null>(null);

  // =========================================================
  // ROTATION (SINGLE SOURCE OF TRUTH)
  // =========================================================
  useEffect(() => {
    if (!items.length) return;

    const current = items[index % items.length];
    const image = current.localImage || current.image;

    setBack({ ...current, _img: image });

    Animated.timing(fade, {
      toValue: 0,
      duration: FADE_MS,
      useNativeDriver: true,
    }).start(() => {
      setFront({ ...current, _img: image });
      setBack(null);

      Animated.timing(fade, {
        toValue: 1,
        duration: FADE_MS,
        useNativeDriver: true,
      }).start();
    });

    timer.current = setTimeout(() => {
      setIndex((i) => (i + 1) % items.length);
    }, ROTATION_MS);

    return () => timer.current && clearTimeout(timer.current);
  }, [index, items]);

  const shown = front;
  if (!shown) return null;

  return (
    <View style={{ flex: 1 }}>
      {/* BACK */}
      {!overlay && back?._img && (
        <Image
          source={{ uri: back._img }}
          style={{ position: "absolute", width: "100%", height: "100%" }}
        />
      )}

      {/* FRONT */}
      {!overlay && shown?._img && (
        <Animated.Image
          source={{ uri: shown._img }}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            opacity: fade,
          }}
        />
      )}

      {/* TEXT */}
      <Animated.View
        style={{
          opacity: fade,
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: 20,
          backgroundColor: overlay ? "#111827" : "rgba(0,0,0,0.6)",
          flexDirection: "row",
        }}
      >
        <View style={{ flex: 1 }}>
          <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 18 }}>
            {shown.vehicle}
          </Text>
          <Text style={{ color: "#fff", fontSize: 16 }} numberOfLines={1}>
            {shown.title}
          </Text>
          <Text style={{ color: "#ccc" }} numberOfLines={3}>
            {shown.description}
          </Text>
        </View>

        <QRCode
          value={shown.link || "https://google.com"}
          size={60}
          backgroundColor="transparent"
          color="#fff"
        />
      </Animated.View>
    </View>
  );
}
