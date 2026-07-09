"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FLIGHT_MATRIX_CLIPS } from "@/lib/data/flightMatrixDemo";

/**
 * Full-phone swipeable video demo — one short auto-playing clip per
 * step (bezel baked into the footage, matching every other mockup on
 * the site), native horizontal scroll-snap for touch swipe, dots +
 * arrow buttons for discoverability on non-touch devices.
 *
 * Only the active (>=60% visible) slide's video plays — the rest stay
 * paused so four autoplaying 60fps clips don't fight for bandwidth/
 * battery at once. Restarts from frame 0 each time a slide becomes
 * active so re-swiping back to a step always replays it clean.
 */
export function FlightMatrixDemo() {
  const trackRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const index = slideRefs.current.findIndex((el) => el === entry.target);
          if (index === -1) continue;
          const video = videoRefs.current[index];

          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            setActiveIndex(index);
            if (video) {
              video.currentTime = 0;
              void video.play().catch(() => {});
            }
          } else {
            video?.pause();
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
            key={clip.src}
            ref={(el) => {
              slideRefs.current[i] = el;
            }}
            className="flex w-full shrink-0 snap-center flex-col items-center justify-center px-6"
          >
            <video
              ref={(el) => {
                videoRefs.current[i] = el;
              }}
              src={clip.src}
              poster={clip.poster}
              width={2818}
              height={5760}
              muted
              loop
              playsInline
              preload="metadata"
              className="h-auto w-[280px] drop-shadow-[0_30px_60px_rgba(0,0,0,0.18)] max-[480px]:w-[240px] sm:w-[320px] lg:w-[400px]"
            />
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
            key={clip.src}
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
