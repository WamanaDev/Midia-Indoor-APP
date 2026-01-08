import { Text, View } from "react-native";
import { useTVScale } from "../../../hook/Scale";

export function BadgeClock() {
  const scale = useTVScale();
  const time = new Date().toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <View
      style={{
        backgroundColor: "white",
        paddingHorizontal: scale(20),
        paddingVertical: scale(10),
        borderRadius: scale(999),
      }}
    >
      <Text
        style={{
          color: "#1f2937",
          fontSize: scale(20),
          fontWeight: "500",
        }}
      >
        {time}
      </Text>
    </View>
  );
}
