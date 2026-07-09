/**
 * The Flight Matrix section's swipeable video demo — a short sequence
 * of full-device-frame clips (bezel baked into the footage, same as
 * every other mockup on the site) showing one interaction each.
 *
 * Each step has a light AND dark recording of the identical clip —
 * both play simultaneously (see FlightMatrixDemo), with CSS hiding
 * whichever doesn't match the system's color scheme, so switching
 * themes mid-clip is instant with no restart/flash.
 *
 * Videos live in public/videos/, named to match the srcs below.
 */
export interface FlightMatrixClip {
  /** Light-mode recording, relative to /public. */
  srcLight: string;
  /** Dark-mode recording of the identical clip, relative to /public. */
  srcDark: string;
  posterLight?: string;
  posterDark?: string;
  /** Short caption shown under the phone for this step. */
  caption: string;
}

export const FLIGHT_MATRIX_CLIPS: FlightMatrixClip[] = [
  {
    srcLight: "/videos/flight-matrix-1-light.mp4",
    srcDark: "/videos/flight-matrix-1-dark.mp4",
    caption: "Drop a bag into the matrix",
  },
  {
    srcLight: "/videos/flight-matrix-2-light.mp4",
    srcDark: "/videos/flight-matrix-2-dark.mp4",
    caption: "Filter by category and bag",
  },
  {
    srcLight: "/videos/flight-matrix-3-light.mp4",
    srcDark: "/videos/flight-matrix-3-dark.mp4",
    caption: "Resolve gap overlaps with a gesture",
  },
  {
    srcLight: "/videos/flight-matrix-4-light.mp4",
    srcDark: "/videos/flight-matrix-4-dark.mp4",
    caption: "Create and save your bag",
  },
];
