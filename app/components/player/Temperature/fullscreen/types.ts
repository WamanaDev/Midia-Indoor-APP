import { WeatherLocationConfig } from "../types";
import { WeatherReading } from "../../../../hook/useWeather";

export interface WeatherTemplateProps {
  location: WeatherLocationConfig;
  reading: WeatherReading | undefined;
  reduceMotion: boolean;
}

export interface WeatherTogetherTemplateProps {
  locations: WeatherLocationConfig[];
  readings: Record<string, WeatherReading>;
  reduceMotion: boolean;
}

export type WeatherRotateTemplateId =
  | "billboard-spot"
  | "control-room"
  | "retail-promo"
  | "weather-station-hero"
  | "corporate-brief"
  | "sunrise-gradient"
  | "horizon-line";

export type WeatherTogetherTemplateId =
  | "grid-mosaic"
  | "dashboard-tiles"
  | "honeycomb"
  | "weather-strip-multi"
  | "split-duo"
  | "badge-cloud"
  | "globe-row";
