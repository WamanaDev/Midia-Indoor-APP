import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
import Pdf from "react-native-pdf";

interface DocumentSlideProps {
  uri: string;
  durationOverride?: number | null;
  onFinished: () => void;
}

/**
 * Pagina o PDF dentro do próprio item a cada `durationOverride` segundos
 * (fallback 8s), sem fade entre páginas. Ao passar da última página, chama
 * `onFinished` pra Player.tsx avançar pro próximo item da playlist — mesmo
 * padrão do `onEnd` do vídeo.
 */
export function DocumentSlide({
  uri,
  durationOverride,
  onFinished,
}: DocumentSlideProps) {
  const [page, setPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const secondsPerPage = durationOverride ?? 8;

  useEffect(() => {
    setPage(1);
    setNumberOfPages(0);
  }, [uri]);

  useEffect(() => {
    if (!numberOfPages) return;

    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      if (page >= numberOfPages) {
        onFinished();
      } else {
        setPage((p) => p + 1);
      }
    }, secondsPerPage * 1000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [page, numberOfPages, secondsPerPage]);

  return (
    <View style={styles.container} pointerEvents="none">
      <Pdf
        source={{ uri }}
        page={page}
        fitPolicy={2}
        enablePaging
        horizontal={false}
        spacing={0}
        onLoadComplete={(pages) => setNumberOfPages(pages)}
        onError={(err) => console.log("DocumentSlide PDF error:", err)}
        style={styles.pdf}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
  },
  pdf: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
  },
});
