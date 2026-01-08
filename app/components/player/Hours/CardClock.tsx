import { Text, View } from "react-native";
import { useTVScale } from "../../../hook/Scale";

export function CardClock() {
  const scale = useTVScale();
  const time = new Date().toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.80)",
        paddingHorizontal: scale(20),
        paddingVertical: scale(14),
        borderRadius: scale(12),
      }}
    >
      <Text
        style={{
          marginLeft: scale(8),
          color: "#fff",
          fontSize: scale(75),
          fontWeight: "600",
        }}
      >
        {time}
      </Text>
    </View>
  );
}
