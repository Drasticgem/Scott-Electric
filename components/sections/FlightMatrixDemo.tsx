"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FLIGHT_MATRIX_CLIPS } from "@/lib/data/flightMatrixDemo";

interface VideoPair {
  light: HTMLVideoElement | null;
  dark: HTMLVideoElement | null;
}

/**
 * The source recordings have no alpha channel and their own baked-in
 * bezel has a soft anti-aliased outer edge — no CSS crop of the raw
 * footage ever lands cleanly against the page's white background (an
 * earlier version tried; always left a faint gray sliver).
 *
 * /public/images/flight-matrix-frame.webp sidesteps that: it's a real
 * device-frame photo with genuine alpha (transparent outside the
 * phone, opaque bezel + buttons, transparent hole where the screen
 * goes), laid over the video. The video itself is cropped down to
 * JUST its screen content (SCREEN_* — no bezel, no background) and
 * scaled to exactly fill the frame image's hole, so there's no
 * dependency on the video's own bezel lining up with the frame's ring
 * — the video never shows any bezel of its own for the frame to hide.
 * Same frame image works for both light and dark clips since it's a
 * generic device photo, not tied to either recording.
 *
 * NATIVE_W/H is the recorded frame size. SCREEN_* is the video's own
 * screen-content bounding box (measured from decoded frame pixels).
 * CANVAS_* and HOLE_* describe the frame image's own geometry
 * (measured the same way, via its alpha channel); HOLE_RADIUS is the
 * hole's own (roughly circular) corner radius.
 *
 * The video is scaled up ~3x to fill the hole, which means as a plain
 * rectangle it also covers the wrapper's four actual corners — outside
 * the phone's rounded silhouette, where the frame image is correctly
 * transparent, that let the video's own black recording background
 * show through as hard black squares. So the two videos live inside
 * their own screenClipStyle wrapper, sized and positioned to exactly
 * match the hole's rounded-rect bounds (not the full canvas), with
 * overflow hidden — that's what actually keeps the video's edges
 * inside the hole; the frame image on top is polish, not the clip.
 * Percentages throughout (not px) so it holds at any of the carousel's
 * responsive display widths.
 */
const NATIVE_W = 938;
const NATIVE_H = 1920;
const SCREEN_L = 50;
const SCREEN_T = 49;
const SCREEN_R = 888;
const SCREEN_B = 1871;
const SCREEN_W = SCREEN_R - SCREEN_L;
const SCREEN_H = SCREEN_B - SCREEN_T;

const CANVAS_W = 2886;
const CANVAS_H = 5965;
const HOLE_L = 111;
const HOLE_T = 92;
const HOLE_R = 2773;
const HOLE_B = 5876;
const HOLE_W = HOLE_R - HOLE_L;
const HOLE_H = HOLE_B - HOLE_T;
const HOLE_RADIUS = 107;
// Outer bezel's own corner radius, measured the same way — the
// wrapper is also clipped to this (belt-and-suspenders on top of the
// hole clip below), so the composite's silhouette is a clean CSS
// rounded-rect rather than depending solely on the frame image's own
// alpha edge.
const OUTER_RADIUS_H = 485;
const OUTER_RADIUS_V = 481;

const cropWrapperStyle = {
  aspectRatio: `${CANVAS_W} / ${CANVAS_H}`,
  borderRadius: `${(OUTER_RADIUS_H / CANVAS_W) * 100}% / ${(OUTER_RADIUS_V / CANVAS_H) * 100}%`,
};

const screenClipStyle = {
  left: `${(HOLE_L / CANVAS_W) * 100}%`,
  top: `${(HOLE_T / CANVAS_H) * 100}%`,
  width: `${(HOLE_W / CANVAS_W) * 100}%`,
  height: `${(HOLE_H / CANVAS_H) * 100}%`,
  borderRadius: `${(HOLE_RADIUS / HOLE_W) * 100}% / ${(HOLE_RADIUS / HOLE_H) * 100}%`,
};

const cropVideoStyle = {
  width: `${(NATIVE_W / SCREEN_W) * 100}%`,
  height: `${(NATIVE_H / SCREEN_H) * 100}%`,
  left: `${-(SCREEN_L / SCREEN_W) * 100}%`,
  top: `${-(SCREEN_T / SCREEN_H) * 100}%`,
};

/**
 * Full-phone swipeable video demo — one short auto-playing clip per
 * step (screen content only; the device frame is a separate overlay
 * image, see above), native horizontal scroll-snap for touch swipe,
 * dots + arrow buttons for discoverability on non-touch devices.
 *
 * Each step is actually a light/dark PAIR of videos, absolutely
 * stacked and both playing in lockstep — CSS (.theme-video-light/dark
 * in globals.css) hides whichever doesn't match prefers-color-scheme.
 * Swapping a <source> on theme change would restart/flash the clip;
 * keeping both running and just toggling visibility switches instantly
 * with zero desync.
 *
 * Only the active (>=60% visible) slide's pair plays — every other
 * slide's pair stays paused, so at most 2 of the 8 clips are ever
 * decoding at once.
 */
export function FlightMatrixDemo() {
  const trackRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const videoRefs = useRef<VideoPair[]>(
    FLIGHT_MATRIX_CLIPS.map(() => ({ light: null, dark: null })),
  );
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const index = slideRefs.current.findIndex((el) => el === entry.target);
          if (index === -1) continue;
          const pair = videoRefs.current[index];

          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            setActiveIndex(index);
            for (const video of [pair.light, pair.dark]) {
              if (!video) continue;
              video.currentTime = 0;
              void video.play().catch(() => {});
            }
          } else {
            pair.light?.pause();
            pair.dark?.pause();
          }
        }
      },
      { root: track, threshold: [0, 0.6, 1] },
    );

    for (const el of slideRefs.current) {
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  const scrollToIndex = (index: number) => {
    slideRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  };

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto scroll-smooth"
      >
        {FLIGHT_MATRIX_CLIPS.map((clip, i) => (
          <div
            key={clip.caption}
            ref={(el) => {
              slideRefs.current[i] = el;
            }}
            className="flex w-full shrink-0 snap-center flex-col items-center justify-center px-6"
          >
            <div
              className="relative w-[280px] overflow-hidden drop-shadow-[0_30px_60px_rgba(0,0,0,0.18)] max-[480px]:w-[240px] sm:w-[320px] lg:w-[400px]"
              style={cropWrapperStyle}
            >
              <div className="absolute overflow-hidden" style={screenClipStyle}>
                <video
                  ref={(el) => {
                    videoRefs.current[i].light = el;
                  }}
                  src={clip.srcLight}
                  poster={clip.posterLight}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="theme-video-light absolute max-w-none"
                  style={cropVideoStyle}
                />
                <video
                  ref={(el) => {
                    videoRefs.current[i].dark = el;
                  }}
                  src={clip.srcDark}
                  poster={clip.posterDark}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="theme-video-dark absolute max-w-none"
                  style={cropVideoStyle}
                />
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element -- decorative bezel overlay, not content; no meaningful alt */}
              <img
                src="/images/flight-matrix-frame.webp"
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 h-full w-full"
              />
            </div>
            <p className="mt-6 max-w-[280px] text-center text-[14px] font-medium text-muted">
              {clip.caption}
            </p>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="mt-6 flex items-center justify-center gap-2">
        {FLIGHT_MATRIX_CLIPS.map((clip, i) => (
          <button
            key={clip.caption}
            type="button"
            aria-label={`Go to step ${i + 1}: ${clip.caption}`}
            onClick={() => scrollToIndex(i)}
            className={[
              "h-2 rounded-full transition-[width,background-color] duration-200",
              i === activeIndex ? "w-6 bg-accent" : "w-2 bg-border",
            ].join(" ")}
          />
        ))}
      </div>

      {/* Prev/next — desktop only; touch users swipe directly. */}
      <button
        type="button"
        aria-label="Previous step"
        onClick={() => scrollToIndex(Math.max(0, activeIndex - 1))}
        disabled={activeIndex === 0}
        className="absolute left-2 top-1/2 hidden -translate-y-1/2 rounded-full border border-border bg-paper p-2 shadow-md transition-opacity duration-200 hover:bg-surface disabled:opacity-30 lg:flex"
      >
        <ChevronLeft className="h-5 w-5 text-ink" strokeWidth={2} aria-hidden="true" />
      </button>
      <button
        type="button"
        aria-label="Next step"
        onClick={() =>
          scrollToIndex(Math.min(FLIGHT_MATRIX_CLIPS.length - 1, activeIndex + 1))
        }
        disabled={activeIndex === FLIGHT_MATRIX_CLIPS.length - 1}
        className="absolute right-2 top-1/2 hidden -translate-y-1/2 rounded-full border border-border bg-paper p-2 shadow-md transition-opacity duration-200 hover:bg-surface disabled:opacity-30 lg:flex"
      >
        <ChevronRight className="h-5 w-5 text-ink" strokeWidth={2} aria-hidden="true" />
      </button>
    </div>
  );
}
