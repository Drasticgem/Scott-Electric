"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { VideoDemoClip } from "@/lib/data/videoDemo";

interface VideoPair {
  light: HTMLVideoElement | null;
  dark: HTMLVideoElement | null;
}

// Recorded frame size — used only to reserve layout space at the right
// aspect ratio before the video loads.
const NATIVE_W = 938;
const NATIVE_H = 1920;

/**
 * Full-phone swipeable video demo — one short auto-playing clip per
 * step, native horizontal scroll-snap for touch swipe, dots + arrow
 * buttons for discoverability on non-touch devices. Shared between the
 * Flight Matrix and Quick Actions sections (see VideoDemoClip for the
 * backdrop-matching requirement that keeps this crop/mask-free).
 *
 * Each step is actually a light/dark PAIR of videos, absolutely
 * stacked and both playing in lockstep — CSS (.theme-video-light/dark
 * in globals.css) hides whichever doesn't match prefers-color-scheme.
 * Swapping a <source> on theme change would restart/flash the clip;
 * keeping both running and just toggling visibility switches instantly
 * with zero desync.
 *
 * Only the active (>=60% visible) slide's pair plays — every other
 * slide's pair stays paused, so at most 2 clips are ever decoding at
 * once regardless of how many steps there are.
 */
export function VideoDemoCarousel({ clips }: { clips: VideoDemoClip[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const videoRefs = useRef<VideoPair[]>(clips.map(() => ({ light: null, dark: null })));
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
        {clips.map((clip, i) => (
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
        {clips.map((clip, i) => (
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
        onClick={() => scrollToIndex(Math.min(clips.length - 1, activeIndex + 1))}
        disabled={activeIndex === clips.length - 1}
        className="absolute right-2 top-1/2 hidden -translate-y-1/2 rounded-full border border-border bg-paper p-2 shadow-md transition-opacity duration-200 hover:bg-surface disabled:opacity-30 lg:flex"
      >
        <ChevronRight className="h-5 w-5 text-ink" strokeWidth={2} aria-hidden="true" />
      </button>
    </div>
  );
}
