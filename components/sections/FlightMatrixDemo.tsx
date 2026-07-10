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
 * the raw decoded pixels — plain opaque HEVC, black baked into the
 * backdrop) and can't get one after the fact, so instead of true
 * transparency this crops the black margin away with CSS: the wrapper
 * clips to the phone's actual content box, and the video inside is
 * scaled/offset so that box fills the wrapper exactly. All values are
 * percentages (not px) so the crop holds at any of the carousel's
 * responsive display widths.
 *
 * NATIVE_W/H is the recorded frame size. CROP_* is the bounding box of
 * the actual phone content within that frame, inset a further 6px past
 * the measured edge as a safety margin. CORNER_R is the bezel's fitted
 * corner radius (~177.5px) plus a 14px safety pad — oversized on
 * purpose so it crops slightly into the bezel rather than risk any
 * black sliver showing; verified corner-by-corner against a bright
 * magenta test background with zero leakage before shipping.
 */
const NATIVE_W = 938;
const NATIVE_H = 1920;
const CROP_L = 20;
const CROP_T = 25;
const CROP_R = 917;
const CROP_B = 1893;
const CROP_W = CROP_R - CROP_L;
const CROP_H = CROP_B - CROP_T;
const CORNER_R = 191.5;

const cropWrapperStyle = {
  aspectRatio: `${CROP_W} / ${CROP_H}`,
  borderRadius: `${(CORNER_R / CROP_W) * 100}% / ${(CORNER_R / CROP_H) * 100}%`,
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
              className="relative w-[280px] overflow-hidden drop-shadow-[0_30px_60px_rgba(0,0,0,0.18)] max-[480px]:w-[240px] sm:w-[320px] lg:w-[300px]"
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
              {/* Real device-frame photo laid over the CSS-cropped video —
                  its own alpha edge visually cleans up the video crop's
                  soft anti-aliased boundary and adds the real side
                  buttons; the video's own crop above (CROP_L/T/R/B and
                  CORNER_R) still does the actual clipping, unchanged. */}
              {/* eslint-disable-next-line @next/next/no-img-element -- decorative overlay, not content; no meaningful alt */}
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
