import { NewsItem } from "../../../utils/NewsProvider";

export interface NewsTemplateProps {
  item: NewsItem;
  reduceMotion: boolean;
}

export interface NewsTogetherTemplateProps {
  items: NewsItem[];
  reduceMotion: boolean;
}

export type NewsRotateTemplateId =
  | "broadcast-lower-third"
  | "magazine-cover"
  | "news-hero-banner"
  | "gallery-frame"
  | "polaroid-frame"
  | "news-split-qr"
  | "news-caption-card"
  | "news-dossier"
  | "news-anchor-desk";

export type NewsTogetherTemplateId =
  | "filmstrip-row"
  | "ledger-rows"
  | "carousel-fan"
  | "info-strip-bottom"
  | "newsroom-grid"
  | "archive-cards"
  | "news-wall-qr"
  | "news-digest-list";

export const NEWS_ROTATE_TEMPLATE_IDS: NewsRotateTemplateId[] = [
  "broadcast-lower-third",
  "magazine-cover",
  "news-hero-banner",
  "gallery-frame",
  "polaroid-frame",
  "news-split-qr",
  "news-caption-card",
  "news-dossier",
  "news-anchor-desk",
];

export const NEWS_TOGETHER_TEMPLATE_IDS: NewsTogetherTemplateId[] = [
  "filmstrip-row",
  "ledger-rows",
  "carousel-fan",
  "info-strip-bottom",
  "newsroom-grid",
  "archive-cards",
  "news-wall-qr",
  "news-digest-list",
];
