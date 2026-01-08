import { Text, View } from "react-native";
import { useTVScale } from "../../../hook/Scale";

export function DigitalClock() {
  const scale = useTVScale();
  const time = new Date().toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <View
      style={{
        backgroundColor: "black",
        paddingHorizontal: scale(24),
        paddingVertical: scale(16),
        borderRadius: scale(8),
      }}
    >
      <Text
        style={{
          color: "#22c55e",
          fontFamily: "monospace",
          fontSize: scale(32),
          letterSpacing: scale(2),
        }}
      >
        {time}
      </Text>
    </View>
  );
}
