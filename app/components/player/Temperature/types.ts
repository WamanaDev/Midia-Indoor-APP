export interface TemperatureStyleProps {
  value: number | null;
  unit: "C" | "F";
  reduceMotion: boolean;
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
  layout?: "vertical" | "horizontal";
  locations: WeatherLocationConfig[];
}
