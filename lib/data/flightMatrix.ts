/**
 * Fixed placeholder positions for the FlightMatrix chart mockup.
 * Loosely evokes a real speed (y) vs. turn/fade (x) disc scatter plot —
 * swapped for a real device-mockup export later.
 */
export interface FlightDot {
  /** Horizontal position, 0 (overstable) to 100 (understable). */
  x: number;
  /** Vertical position, 0 (putter/slow) to 100 (distance driver/fast). */
  y: number;
  color: string;
}

export const FLIGHT_DOTS: FlightDot[] = [
  { x: 22, y: 92, color: "#e0507a" },
  { x: 48, y: 92, color: "#4a7de0" },
  { x: 50, y: 78, color: "#3a4fbf" },
  { x: 28, y: 68, color: "#e0954a" },
  { x: 38, y: 68, color: "#7ac47a" },
  { x: 58, y: 68, color: "#c0392b" },
  { x: 25, y: 52, color: "#6fbf6f" },
  { x: 55, y: 50, color: "#e0954a" },
  { x: 34, y: 34, color: "#e0954a" },
  { x: 47, y: 32, color: "#7a8fc4" },
  { x: 60, y: 30, color: "#e0954a" },
  { x: 20, y: 20, color: "#e8c93a" },
  { x: 52, y: 14, color: "#4a7de0" },
  { x: 24, y: 6, color: "#4a7de0" },
  { x: 38, y: 4, color: "#e0507a" },
  { x: 44, y: 2, color: "#3a4fbf" },
];

export const FLIGHT_FILTERS = ["Distance", "Fairway", "Mid", "Putter"] as const;
