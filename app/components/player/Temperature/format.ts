export function formatTemperature(value: number | null, unit: "C" | "F") {
  if (value === null || value === undefined) return "--°" + unit;
  return `${Math.round(value)}°${unit}`;
}
