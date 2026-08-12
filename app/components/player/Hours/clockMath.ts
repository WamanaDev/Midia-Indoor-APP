import { ClockConfig, ClockValue } from "./types";

export function getClockValue(now: Date, clock: ClockConfig): ClockValue {
  const tz =
    clock.location?.timezone ?? Intl.DateTimeFormat().resolvedOptions().timeZone;

  const parts = new Intl.DateTimeFormat("pt-BR", {
    timeZone: tz,
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  })
    .formatToParts(now)
    .reduce((acc: Record<string, number>, p) => {
      if (p.type !== "literal") acc[p.type] = Number(p.value);
      return acc;
    }, {});

  const hours = (parts.hour ?? 0) % 24;
  const minutes = parts.minute ?? 0;
  const seconds = parts.second ?? 0;

  const text = now.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: clock.format === "12h",
    timeZone: tz,
  });

  return {
    text,
    hours,
    minutes,
    seconds,
    hourDeg: (hours % 12) * 30 + minutes * 0.5,
    minuteDeg: minutes * 6 + seconds * 0.1,
    secondDeg: seconds * 6,
  };
}
