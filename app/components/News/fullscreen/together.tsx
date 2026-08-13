import React from "react";
import { NewsTogetherTemplateId, NewsTogetherTemplateProps } from "./types";
import { FilmstripRow } from "./together/FilmstripRow";
import { LedgerRows } from "./together/LedgerRows";
import { CarouselFan } from "./together/CarouselFan";
import { InfoStripBottom } from "./together/InfoStripBottom";
import { NewsroomGrid } from "./together/NewsroomGrid";
import { ArchiveCards } from "./together/ArchiveCards";
import { NewsWallQr } from "./together/NewsWallQr";
import { NewsDigestList } from "./together/NewsDigestList";

/**
 * Templates "todos juntos" de notícia (§5.6) — 3 notícias aleatórias ao
 * mesmo tempo (a escolha das 3 é feita por quem chama, não pelo template).
 */
export const NEWS_TOGETHER_TEMPLATES: Partial<
  Record<NewsTogetherTemplateId, React.ComponentType<NewsTogetherTemplateProps>>
> = {
  "filmstrip-row": FilmstripRow,
  "ledger-rows": LedgerRows,
  "carousel-fan": CarouselFan,
  "info-strip-bottom": InfoStripBottom,
  "newsroom-grid": NewsroomGrid,
  "archive-cards": ArchiveCards,
  "news-wall-qr": NewsWallQr,
  "news-digest-list": NewsDigestList,
};
