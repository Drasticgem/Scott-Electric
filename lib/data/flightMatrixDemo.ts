import type { VideoDemoClip } from "@/lib/data/videoDemo";

/**
 * The Flight Matrix section's swipeable video demo — a short sequence
 * of full-device-frame clips (bezel baked into the footage, same as
 * every other mockup on the site) showing one interaction each.
 *
 * Videos live in public/videos/, named to match the srcs below.
 */
export const FLIGHT_MATRIX_CLIPS: VideoDemoClip[] = [
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
