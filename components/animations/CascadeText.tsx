"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { CSSProperties } from "react";

interface CascadeTextProps {
  /** Text to animate. Use "\n" for a forced line break between words. */
  text: string;
  className?: string;
  style?: CSSProperties;
  /** Render as a different element (default: span). */
  as?: "h1" | "h2" | "h3" | "p" | "span";
  /** Extra delay (seconds) before the cascade starts. */
  delay?: number;
}

/**
 * Word-by-word scroll-triggered cascade, for titles that want more than
 * Reveal's single fade-up. Same easing/viewport trigger as Reveal, just
 * staggered per word (0.08s apart) instead of animating as one block.
 * Self-contained — don't also wrap it in <Reveal>, it handles its own
 * whileInView reveal.
 *
 * Screen readers get the whole string via aria-label on the container;
 * the individual word spans are aria-hidden so nothing gets read twice.
 */
export function CascadeText({
  text,
  className,
  style,
  as: Tag = "span",
  delay = 0,
}: CascadeTextProps) {
  const reduceMotion = useReducedMotion();
  const MotionTag = motion[Tag];
  const lines = text.split("\n");

  if (reduceMotion) {
    return (
      <MotionTag className={className} style={style}>
        {lines.map((line, li) => (
          <span key={li}>
            {li > 0 && <br />}
            {line}
          </span>
        ))}
      </MotionTag>
    );
  }

  const ease: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

  const container: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.08, delayChildren: delay },
    },
  };
  const word: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
  };

  return (
    <MotionTag
      className={className}
      style={style}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.08, margin: "0px 0px -40px 0px" }}
      aria-label={text.replace(/\n/g, " ")}
    >
      {lines.map((line, li) => (
        <span key={li} aria-hidden="true">
          {li > 0 && <br />}
          {line.split(" ").map((w, wi, arr) => (
            <motion.span key={wi} variants={word} className="inline-block">
              {w}
              {wi < arr.length - 1 ? " " : ""}
            </motion.span>
          ))}
        </span>
      ))}
    </MotionTag>
  );
}
