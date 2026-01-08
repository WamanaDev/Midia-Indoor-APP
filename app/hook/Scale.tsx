import { useMemo } from "react";
import { Dimensions, PixelRatio } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export const useTVScale = () => {
  return useMemo(() => {
    // Calcula o fator de escala baseado na proporção da tela
    // Usa a média geométrica para manter proporção uniforme
    const scale =
      Math.sqrt(SCREEN_WIDTH * SCREEN_HEIGHT) / Math.sqrt(1920 * 1080);

    return (size) => {
      // Ajusta para PixelRatio, garantindo nitidez
      return Math.round(PixelRatio.roundToNearestPixel(size * scale));
    };
  }, []);
};
