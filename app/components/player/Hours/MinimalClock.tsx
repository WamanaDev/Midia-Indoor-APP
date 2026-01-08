import { Text } from "react-native";
import { useTVScale } from "../../../hook/Scale";

export function MinimalClock() {
  const scale = useTVScale();
  const time = new Date().toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Text
      style={{
        color: "white",
        fontSize: scale(40),
        fontWeight: "600",
      }}
    >
      {time}
    </Text>
  );
}
