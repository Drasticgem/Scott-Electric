"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Apply a stagger to direct children (matches legacy .reveal-stagger). */
  stagger?: boolean;
  className?: string;
  /** Render as a different element (default: div). */
  as?: "div" | "section" | "ul";
};

/**
 * Scroll-triggered fade-up. Mirrors the legacy .reveal / .reveal-stagger
 * behavior in animations.css:
 *   - plain reveal: opacity 0→1, translateY 28px → 0, 0.65s ease-out
 *   - stagger reveal: opacity 0→1, translateY 20px → 0, 0.5s ease-out,
 *     children delayed 0 / 0.08 / 0.16 / 0.24s
 * Respects prefers-reduced-motion — content renders immediately
 * without animating.
 */
export function Reveal({
  children,
  stagger = false,
  className,
  as = "div",
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const MotionTag = motion[as];

  // Match the legacy cubic-bezier(0.25, 0.46, 0.45, 0.94) ease-out.
  const ease: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

  if (reduceMotion) {
    return <MotionTag className={className}>{children}</MotionTag>;
  }

  if (stagger) {
    const container: Variants = {
      hidden: {},
      visible: {
        transition: {
          staggerChildren: 0.08,
          delayChildren: 0,
        },
      },
    };
    const child: Variants = {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease },
      },
    };

    return (
      <MotionTag
        className={className}
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.08, margin: "0px 0px -40px 0px" }}
      >
        {/* Wrap each direct child so the stagger variants cascade. */}
        {Array.isArray(children)
          ? children.map((c, i) => (
              <motion.div key={i} variants={child}>
                {c}
              </motion.div>
            ))
          : (
              <motion.div variants={child}>{children}</motion.div>
            )}
      </MotionTag>
    );
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08, margin: "0px 0px -40px 0px" }}
      transition={{ duration: 0.65, ease }}
    >
      {children}
    </MotionTag>
  );
}
