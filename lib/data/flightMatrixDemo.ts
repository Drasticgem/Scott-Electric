/**
 * The Flight Matrix section's swipeable video demo — a short sequence
 * of full-device-frame clips (bezel baked into the footage, same as
 * every other mockup on the site) showing one interaction each.
 * Videos live in public/videos/, named to match `src` below.
 */
export interface FlightMatrixClip {
  /** Video src, relative to /public. */
  src: string;
  /** Poster frame shown before the clip loads/plays. */
  poster?: string;
  /** Short caption shown under the phone for this step. */
  caption: string;
}

export const FLIGHT_MATRIX_CLIPS: FlightMatrixClip[] = [
  {
    src: "/videos/flight-matrix-1.mp4",
    caption: "Drop a bag into the matrix",
  },
  {
    src: "/videos/flight-matrix-2.mp4",
    caption: "Filter by category and bag",
  },
  {
    src: "/videos/flight-matrix-3.mp4",
    caption: "Resolve gap overlaps with a gesture",
  },
  {
    src: "/videos/flight-matrix-4.mp4",
    caption: "Create and save your bag",
  },
];
