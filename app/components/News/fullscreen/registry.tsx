import React from "react";
import { NewsRotateTemplateId, NewsTemplateProps } from "./types";
import { BroadcastLowerThird } from "./rotate/BroadcastLowerThird";
import { MagazineCover } from "./rotate/MagazineCover";
import { NewsHeroBanner } from "./rotate/NewsHeroBanner";
import { GalleryFrame } from "./rotate/GalleryFrame";
import { PolaroidFrame } from "./rotate/PolaroidFrame";
import { NewsSplitQr } from "./rotate/NewsSplitQr";
import { NewsCaptionCard } from "./rotate/NewsCaptionCard";
import { NewsDossier } from "./rotate/NewsDossier";
import { NewsAnchorDesk } from "./rotate/NewsAnchorDesk";

/**
 * Templates "rodar" de notícia (§5.5) — uma notícia por entrada na rotação,
 * tela inteira. A maioria mostra descrição + QR code real (`item.link`) via
 * `react-native-qrcode-svg`, exceto os marcados "de propósito" sem
 * descrição/QR na tabela do doc.
 */
export const NEWS_ROTATE_TEMPLATES: Partial<
  Record<NewsRotateTemplateId, React.ComponentType<NewsTemplateProps>>
> = {
  "broadcast-lower-third": BroadcastLowerThird,
  "magazine-cover": MagazineCover,
  "news-hero-banner": NewsHeroBanner,
  "gallery-frame": GalleryFrame,
  "polaroid-frame": PolaroidFrame,
  "news-split-qr": NewsSplitQr,
  "news-caption-card": NewsCaptionCard,
  "news-dossier": NewsDossier,
  "news-anchor-desk": NewsAnchorDesk,
};
