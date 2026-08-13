export interface ClockConfig {
  id: string;
  label: string;
  format: "12h" | "24h";
  location?: {
    name: string;
    country: string;
    lat: number;
    lon: number;
    timezone?: string;
  };
}

export interface TimeConfig {
  overlay: boolean;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "";
  style: string;
  layout?: "vertical" | "horizontal" | "rotate";
  fullscreenStyle?: string;
  clocks: ClockConfig[];
}

export interface ClockValue {
  text: string;
  hours: number;
  minutes: number;
  seconds: number;
  hourDeg: number;
  minuteDeg: number;
  secondDeg: number;
}

export interface ClockStyleProps {
  value: ClockValue;
  reduceMotion: boolean;
}
