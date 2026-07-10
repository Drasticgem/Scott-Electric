/**
 * Shared shape for a full-phone swipeable video demo clip (see
 * VideoDemoCarousel) — used by both the Flight Matrix and Quick
 * Actions sections.
 *
 * Each step has a light AND dark recording of the identical clip —
 * both play simultaneously, with CSS hiding whichever doesn't match
 * the system's color scheme, so switching themes mid-clip is instant
 * with no restart/flash. The recordings' own backdrop must be a flat
 * color exactly matching the page background in each theme (#FFFFFF
 * light, #000000 dark — same hex as --color-paper in globals.css), so
 * the video's rectangular edge is indistinguishable from the page
 * around it — no crop, mask, or frame overlay needed.
 */
export interface VideoDemoClip {
  /** Light-mode recording, relative to /public. */
  srcLight: string;
  /** Dark-mode recording of the identical clip, relative to /public. */
  srcDark: string;
  posterLight?: string;
  posterDark?: string;
  /** Short caption shown under the phone for this step. */
  caption: string;
}
