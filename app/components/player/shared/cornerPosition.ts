export type CornerPosition =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "";

export function getCornerStyle(
  position: CornerPosition | undefined,
  scale: (size: number) => number
) {
  const offset = scale(24);

  const positions: Record<string, object> = {
    "top-left": { top: offset, left: offset },
    "top-right": { top: offset, right: offset },
    "bottom-left": { bottom: offset, left: offset },
    "bottom-right": { bottom: offset, right: offset },
  };

  return {
    position: "absolute" as const,
    zIndex: 1,
    ...(positions[position || "top-left"] || positions["top-left"]),
  };
}
