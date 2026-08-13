import React from "react";
import { WeatherTogetherTemplateId, WeatherTogetherTemplateProps } from "./types";
import { GridMosaic } from "./together/GridMosaic";
import { DashboardTiles } from "./together/DashboardTiles";
import { Honeycomb } from "./together/Honeycomb";
import { WeatherStripMulti } from "./together/WeatherStripMulti";
import { SplitDuo } from "./together/SplitDuo";
import { BadgeCloud } from "./together/BadgeCloud";
import { GlobeRow } from "./together/GlobeRow";

/**
 * Templates "todos juntos" do clima (§5.4) — todas as localidades ao mesmo
 * tempo, usados com `layout: "vertical" | "horizontal"`.
 */
export const WEATHER_TOGETHER_TEMPLATES: Partial<
  Record<WeatherTogetherTemplateId, React.ComponentType<WeatherTogetherTemplateProps>>
> = {
  "grid-mosaic": GridMosaic,
  "dashboard-tiles": DashboardTiles,
  honeycomb: Honeycomb,
  "weather-strip-multi": WeatherStripMulti,
  "split-duo": SplitDuo,
  "badge-cloud": BadgeCloud,
  "globe-row": GlobeRow,
};
