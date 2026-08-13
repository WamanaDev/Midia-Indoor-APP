import React, { useEffect, useRef, useState } from "react";
import { Animated, Image, Text, View } from "react-native";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import { LinearGradient } from "expo-linear-gradient";
import QRCode from "react-native-qrcode-svg";
import { NewsOverlayStyleId, NewsOverlayStyleProps, sourceColor } from "./types";

/** Fallback (sem `config.style`): badge fixo por fonte + título, sem descrição (§3.3). */
export function NewsSourceBadge({ item }: NewsOverlayStyleProps) {
  return (
    <View
      style={{
        backgroundColor: "rgba(0,0,0,0.8)",
        borderRadius: scale(8),
        overflow: "hidden",
      }}
    >
      <View
        style={{
          backgroundColor: sourceColor(item.source),
          paddingHorizontal: scale(8),
          paddingVertical: verticalScale(3),
          alignSelf: "flex-start",
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: moderateScale(12),
            fontWeight: "700",
            textTransform: "uppercase",
          }}
        >
          {item.source}
        </Text>
      </View>
      <Text
        style={{
          color: "#fff",
          fontSize: moderateScale(16),
          fontWeight: "bold",
          padding: scale(8),
        }}
        numberOfLines={1}
      >
        {item.title}
      </Text>
    </View>
  );
}

function NewsTickerChip({ item }: NewsOverlayStyleProps) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.8)",
        borderRadius: scale(20),
        paddingHorizontal: scale(14),
        paddingVertical: verticalScale(8),
        gap: scale(8),
      }}
    >
      <View
        style={{
          width: scale(8),
          height: scale(8),
          borderRadius: scale(4),
          backgroundColor: sourceColor(item.source),
        }}
      />
      <Text
        style={{ color: "#fff", fontSize: moderateScale(14), fontWeight: "600" }}
        numberOfLines={1}
      >
        {item.title}
      </Text>
    </View>
  );
}

function NewsMarquee({ item }: NewsOverlayStyleProps) {
  const [contentWidth, setContentWidth] = useState(0);
  const [boxWidth, setBoxWidth] = useState(0);
  const translateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (contentWidth <= boxWidth || boxWidth === 0) return;
    const distance = contentWidth - boxWidth;
    translateX.setValue(0);
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(translateX, {
          toValue: -distance,
          duration: 9000,
          useNativeDriver: true,
        }),
        Animated.timing(translateX, { toValue: 0, duration: 0, useNativeDriver: true }),
        Animated.delay(500),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [contentWidth, boxWidth]);

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.8)",
        borderRadius: scale(20),
        paddingHorizontal: scale(14),
        paddingVertical: verticalScale(8),
        gap: scale(8),
        maxWidth: scale(320),
        overflow: "hidden",
      }}
      onLayout={(e) => setBoxWidth(e.nativeEvent.layout.width)}
    >
      <View
        style={{
          width: scale(8),
          height: scale(8),
          borderRadius: scale(4),
          backgroundColor: sourceColor(item.source),
        }}
      />
      <Animated.Text
        onLayout={(e) => setContentWidth(e.nativeEvent.layout.width)}
        style={{
          color: "#fff",
          fontSize: moderateScale(14),
          fontWeight: "600",
          transform: [{ translateX }],
        }}
        numberOfLines={1}
      >
        {item.title}
      </Animated.Text>
    </View>
  );
}

function NewsMiniCard({ item }: NewsOverlayStyleProps) {
  const image = item.localImage || item.image;
  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: "#fff",
        borderRadius: scale(10),
        overflow: "hidden",
        width: scale(280),
      }}
    >
      {image ? (
        <Image source={{ uri: image }} style={{ width: scale(64), height: scale(64) }} />
      ) : (
        <LinearGradient
          colors={[sourceColor(item.source), "#111"]}
          style={{ width: scale(64), height: scale(64) }}
        />
      )}
      <View style={{ flex: 1, padding: scale(8), justifyContent: "center" }}>
        <Text
          style={{ color: "#111", fontSize: moderateScale(13), fontWeight: "700" }}
          numberOfLines={2}
        >
          {item.title}
        </Text>
      </View>
    </View>
  );
}

function NewsAlertStrip({ item }: NewsOverlayStyleProps) {
  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: "rgba(0,0,0,0.85)",
        borderLeftWidth: scale(6),
        borderLeftColor: "#dc2626",
        maxWidth: scale(320),
      }}
    >
      <View style={{ padding: scale(10) }}>
        <Text
          style={{
            color: "#dc2626",
            fontSize: moderateScale(11),
            fontWeight: "800",
            marginBottom: verticalScale(2),
          }}
        >
          ÚLTIMA HORA
        </Text>
        <Text
          style={{ color: "#fff", fontSize: moderateScale(14), fontWeight: "600" }}
          numberOfLines={2}
        >
          {item.title}
        </Text>
      </View>
    </View>
  );
}

function NewsQrCorner({ item }: NewsOverlayStyleProps) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.85)",
        borderRadius: scale(10),
        padding: scale(10),
        gap: scale(10),
        maxWidth: scale(320),
      }}
    >
      <QRCode value={item.link || "https://google.com"} size={scale(48)} backgroundColor="transparent" color="#fff" />
      <Text
        style={{ flex: 1, color: "#fff", fontSize: moderateScale(14), fontWeight: "600" }}
        numberOfLines={2}
      >
        {item.title}
      </Text>
    </View>
  );
}

export const NEWS_OVERLAY_STYLES: Record<
  NewsOverlayStyleId,
  React.ComponentType<NewsOverlayStyleProps>
> = {
  "news-ticker-chip": NewsTickerChip,
  "news-marquee": NewsMarquee,
  "news-mini-card": NewsMiniCard,
  "news-alert-strip": NewsAlertStrip,
  "news-qr-corner": NewsQrCorner,
};
