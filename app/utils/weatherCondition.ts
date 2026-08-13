export type WeatherCondition =
  | "clear"
  | "partly"
  | "cloudy"
  | "fog"
  | "rain"
  | "storm"
  | "snow";

/**
 * Mapeia o WMO weathercode (Open-Meteo) pra uma condição simplificada.
 * Espelha `lib/weather-condition.ts` do dashboard (conditionFromCode).
 */
export function conditionFromCode(weathercode: number | null): WeatherCondition {
  if (weathercode === null || weathercode === undefined) return "clear";
  if (weathercode === 0) return "clear";
  if (weathercode === 1 || weathercode === 2) return "partly";
  if (weathercode === 3) return "cloudy";
  if (weathercode === 45 || weathercode === 48) return "fog";
  if (
    [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(weathercode)
  )
    return "rain";
  if ([71, 73, 75, 77, 85, 86].includes(weathercode)) return "snow";
  if ([95, 96, 99].includes(weathercode)) return "storm";
  return "cloudy";
}

/**
 * Nome de ícone (MaterialCommunityIcons) pra condição + dia/noite.
 * Espelha `weatherIcon` do dashboard (lá usa lucide-react; aqui o equivalente
 * do conjunto "weather-*" do MaterialCommunityIcons, já usado no app).
 */
export function weatherIcon(condition: WeatherCondition, isDay: boolean): string {
  switch (condition) {
    case "clear":
      return isDay ? "weather-sunny" : "weather-night";
    case "partly":
      return isDay ? "weather-partly-cloudy" : "weather-night-partly-cloudy";
    case "cloudy":
      return "weather-cloudy";
    case "fog":
      return "weather-fog";
    case "rain":
      return "weather-pouring";
    case "storm":
      return "weather-lightning";
    case "snow":
      return "weather-snowy";
    default:
      return "thermometer";
  }
}
