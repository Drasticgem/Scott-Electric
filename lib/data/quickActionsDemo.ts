import type { VideoDemoClip } from "@/lib/data/videoDemo";

/**
 * The Quick Actions section's swipeable video demo — same treatment as
 * Flight Matrix (see flightMatrixDemo.ts), one step per quick action.
 *
 * Videos live in public/videos/, named to match the srcs below.
 */
export const QUICK_ACTIONS_CLIPS: VideoDemoClip[] = [
  {
    srcLight: "/videos/quick-actions-1-light.mp4",
    srcDark: "/videos/quick-actions-1-dark.mp4",
    caption: "Scan a disc with your camera",
  },
  {
    srcLight: "/videos/quick-actions-2-light.mp4",
    srcDark: "/videos/quick-actions-2-dark.mp4",
    caption: "Search the full disc database",
  },
  {
    srcLight: "/videos/quick-actions-3-light.mp4",
    srcDark: "/videos/quick-actions-3-dark.mp4",
    caption: "Measure a throw with GPS",
  },
  {
    srcLight: "/videos/quick-actions-4-light.mp4",
    srcDark: "/videos/quick-actions-4-dark.mp4",
    caption: "Add discs manually or import a CSV",
  },
];
