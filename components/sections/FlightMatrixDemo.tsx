"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FLIGHT_MATRIX_CLIPS } from "@/lib/data/flightMatrixDemo";

interface VideoPair {
  light: HTMLVideoElement | null;
  dark: HTMLVideoElement | null;
}

/**
 * The source recordings have no alpha channel (confirmed by inspecting
 * the raw decoded pixels) and their outer edge is a soft anti-aliased
 * gradient, not a crisp line — there's no pixel position where a CSS
 * crop lands cleanly against the page's white background. An earlier
 * version cropped to the silhouette with CSS border-radius, which got
 * the shape close but always left a faint gray sliver of that gradient
 * showing against white.
 *
 * Instead, /public/images/flight-matrix-frame.webp is a real bezel
 * image with genuine alpha — transparent outside the phone, opaque
 * bezel ring, and a transparent hole where the screen goes — built by
 * masking a captured frame with a precisely fit rounded-rect (ellipse
 * corners, not circular: measuring all four corners showed the
 * horizontal radius, ~181px native, is consistently larger than the
 * vertical, ~160px). It's laid over the video so only the screen
 * content shows through; the frame's own crisp, anti-aliased alpha
 * defines the visible corner, not a runtime CSS approximation of the
 * footage's fuzzy edge. Same frame image works for both light and
 * dark clips — it's the same physical device in both recordings.
 *
 * NATIVE_W/H is the recorded frame size; CROP_* is the outer bounding
 * box the frame image was built from, used to position the video
 * beneath it at matching scale (percentages, not px, so it holds at
 * any of the carousel's responsive display widths).
 */
const NATIVE_W = 938;
const NATIVE_H = 1920;
const CROP_L = 20;
const CROP_T = 19;
const CROP_R = 917;
const CROP_B = 1899;
const CROP_W = CROP_R - CROP_L;
const CROP_H = CROP_B - CROP_T;

const cropWrapperStyle = {
  aspectRatio: `${CROP_W} / ${CROP_H}`,
};

const cropVideoStyle = {
  width: `${(NATIVE_W / CROP_W) * 100}%`,
  height: `${(NATIVE_H / CROP_H) * 100}%`,
  left: `${-(CROP_L / CROP_W) * 100}%`,
  top: `${-(CROP_T / CROP_H) * 100}%`,
};

/**
 * Full-phone swipeable video demo — one short auto-playing clip per
 * step (bezel baked into the footage, matching every other mockup on
 * the site), native horizontal scroll-snap for touch swipe, dots +
 * arrow buttons for discoverability on non-touch devices.
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
