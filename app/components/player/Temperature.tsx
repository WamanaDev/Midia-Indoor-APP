import { Image, View } from "react-native";
import { DigitalDisplay } from "./Temperature/DigitalDisplay";
import { Minimalista } from "./Temperature/Minimalista";
import { BadgeTag } from "./Temperature/Badge";
import { CardWithIcon } from "./Temperature/CardWithIcon";
import { useTVScale } from "../../hook/Scale";

export function Temperature({ config, image }) {
  const scale = useTVScale();
  // Posições para overlay
  const positions = {
    "top-left": { top: scale(20), left: scale(40) },
    "top-right": { top: scale(20), right: scale(40) },
    "bottom-left": { bottom: scale(20), left: scale(40) },
    "bottom-right": { bottom: scale(20), right: scale(40) },
  };

  // Se overlay, aplica estilo de canto
  const overlayStyle = config.overlay
    ? {
        ...positions[config.position],
        position: "absolute",
        zIndex: 1,
        padding: scale(20),
      }
    : {
        // overlay=false, centraliza no meio da tela
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: [{ translateX: -50 }, { translateY: -50 }],
        zIndex: 1,
      };

  return (
    <>
      {!config.overlay && (
        <Image
          source={{ uri: image }}
          style={{ width: "100%", height: "100%" }}
          resizeMode="cover"
        />
      )}
      <View style={overlayStyle}>
        {config.style === "digital" ? (
          <DigitalDisplay temperature={20} />
        ) : config.style === "minimal" ? (
          <Minimalista temperature={20} />
        ) : config.style === "badge" ? (
          <BadgeTag temperature={20} />
        ) : (
          <CardWithIcon temperature={20} />
        )}
      </View>
    </>
  );
}
