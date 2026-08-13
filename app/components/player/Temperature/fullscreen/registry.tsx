import React from "react";
import { WeatherRotateTemplateId, WeatherTemplateProps } from "./types";
import { BillboardSpot } from "./rotate/BillboardSpot";
import { ControlRoom } from "./rotate/ControlRoom";
import { RetailPromo } from "./rotate/RetailPromo";
import { WeatherStationHero } from "./rotate/WeatherStationHero";
import { CorporateBrief } from "./rotate/CorporateBrief";
import { SunriseGradient } from "./rotate/SunriseGradient";
import { HorizonLine } from "./rotate/HorizonLine";

/**
 * Templates "rodar" do clima (§5.3) — uma localidade por vez, tela inteira,
 * usados com `layout: "rotate"`. `reading.temperature/weathercode/isDay` vêm
 * de `useWeather`; use `conditionFromCode` (`utils/weatherCondition.ts`) pro
 * ícone dinâmico (§6.1).
 */
export const WEATHER_ROTATE_TEMPLATES: Partial<
  Record<WeatherRotateTemplateId, React.ComponentType<WeatherTemplateProps>>
> = {
  "billboard-spot": BillboardSpot,
  "control-room": ControlRoom,
  "retail-promo": RetailPromo,
  "weather-station-hero": WeatherStationHero,
  "corporate-brief": CorporateBrief,
  "sunrise-gradient": SunriseGradient,
  "horizon-line": HorizonLine,
};
