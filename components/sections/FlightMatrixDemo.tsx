"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FLIGHT_MATRIX_CLIPS } from "@/lib/data/flightMatrixDemo";

interface VideoPair {
  light: HTMLVideoElement | null;
  dark: HTMLVideoElement | null;
}

// Recorded frame size — used only to reserve layout space at the right
// aspect ratio before the video loads.
const NATIVE_W = 938;
const NATIVE_H = 1920;

/**
 * No crop, no frame overlay, no clip-path. The recordings' own backdrop
 * is now exported as a flat, exact match for the page background —
 * #FFFFFF behind the light clip, #000000 behind the dark clip, the same
 * hex values as --color-paper in both themes (see globals.css) — so the
 * video's rectangular edge is literally indistinguishable from the page
 * around it. Every earlier version of this component existed to paper
 * over a mismatched backdrop (soft gray anti-aliasing, a black margin,
 * Safari clip bugs); with a matching backdrop there's nothing left to
 * paper over.
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
              className="relative w-[280px] max-[480px]:w-[240px] sm:w-[320px] lg:w-[300px]"
              style={{ aspectRatio: `${NATIVE_W} / ${NATIVE_H}` }}
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
                className="theme-video-light h-full w-full"
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
                className="theme-video-dark absolute inset-0 h-full w-full"
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
