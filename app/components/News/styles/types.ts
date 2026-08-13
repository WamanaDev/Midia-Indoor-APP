import { NewsItem } from "../../../utils/NewsProvider";

export interface NewsOverlayStyleProps {
  item: NewsItem;
}

export type NewsOverlayStyleId =
  | "news-ticker-chip"
  | "news-marquee"
  | "news-mini-card"
  | "news-alert-strip"
  | "news-qr-corner";

/** Cor fixa por fonte, usada no fallback (sem `style`) e no chip/ticker. */
export function sourceColor(source: string): string {
  if (source === "G1") return "#dc2626";
  if (source === "Metrópole") return "#000";
  return "#000";
}
