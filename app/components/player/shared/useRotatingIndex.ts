import { useEffect, useRef, useState } from "react";
import { Animated, Easing } from "react-native";

/**
 * Revezamento de múltiplas entradas no mesmo lugar da tela (clima/hora, modo overlay).
 * A cada `intervalMs`, troca pro próximo índice e anima entrada: opacity 0→1 +
 * translateY(offset→0), ease-out, `animMs` (spec: revezamento a cada 6000ms, fade de 600ms).
 */
export function useRotatingIndex(
  length: number,
  intervalMs = 6000,
  animMs = 600,
  translateOffset = 6
) {
  const [index, setIndex] = useState(0);
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(translateOffset)).current;

  useEffect(() => {
    if (length <= 0) return;

    const playEnter = () => {
      opacity.setValue(0);
      translateY.setValue(translateOffset);
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: animMs,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: animMs,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start();
    };

    setIndex(0);
    playEnter();

    if (length <= 1) return;

    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % length);
      playEnter();
    }, intervalMs);

    return () => clearInterval(timer);
  }, [length, intervalMs, animMs, translateOffset]);

  return { index, opacity, translateY };
}
