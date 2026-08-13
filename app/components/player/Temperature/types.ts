import { WeatherCondition } from "../../../utils/weatherCondition";

export interface TemperatureStyleProps {
  value: number | null;
  unit: "C" | "F";
  reduceMotion: boolean;
  condition?: WeatherCondition;
  isDay?: boolean;
  size?: "sm" | "lg";
}

export interface WeatherLocationConfig {
  id: string;
  label: string;
  location?: { name: string; country: string; lat: number; lon: number };
  unit?: "C" | "F";
}

export interface WeatherConfig {
  overlay: boolean;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "";
  style: string;
  layout?: "vertical" | "horizontal" | "rotate";
  fullscreenStyle?: string;
  locations: WeatherLocationConfig[];
}
