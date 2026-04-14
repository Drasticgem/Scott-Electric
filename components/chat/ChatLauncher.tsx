"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MessageSquare } from "lucide-react";
import { useState } from "react";

/**
 * Gold floating action button, fixed bottom-right, that opens the
 * live chat panel. Three framer-motion layers deliver the "smooth
 * fluid open animation":
 *
 *   1. Pulse ring — infinitely looping scale+fade ring behind the
 *      button, drawing attention (skipped under reduced motion).
 *   2. Icon hover — gentle scale + rotate spring on hover.
 *   3. Open ripple — on click, a gold radial ripple scales outward
 *      and fades, masking the mount gap before the Tawk.to panel
 *      fully appears. This is the flourish that makes the open feel
 *      intentional rather than "a third-party widget appeared."
 *
 * The launcher self-hides (fade + scale down) while chat is open and
 * re-animates back in on close.
 */

export function ChatLauncher({
  isOpen,
  onOpen,
}: {
  isOpen: boolean;
  onOpen: () => void;
}) {
  const reduceMotion = useReducedMotion();
  const [ripples, setRipples] = useState<number[]>([]);

  const handleClick = () => {
    if (!reduceMotion) {
      const id = Date.now();
      setRipples((prev) => [...prev, id]);
      // Clean up the ripple node once its animation finishes
      window.setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r !== id));
      }, 700);
    }
    onOpen();
  };

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-[60] max-[480px]:bottom-4 max-[480px]:right-4"
      initial={false}
      animate={{
        opacity: isOpen ? 0 : 1,
        scale: isOpen ? 0.6 : 1,
        pointerEvents: isOpen ? "none" : "auto",
      }}
      transition={{
        type: "spring",
        damping: 22,
        stiffness: 260,
      }}
      style={{
        // Respect iOS home-indicator safe area
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      <div className="relative">
        {/* ── Pulse ring (looping, behind button) ── */}
        {!reduceMotion && (
          <motion.span
            aria-hidden="true"
            className="absolute inset-0 rounded-full bg-gold"
            initial={{ scale: 1, opacity: 0.55 }}
            animate={{ scale: 1.6, opacity: 0 }}
            transition={{
              duration: 2,
              ease: "easeOut",
              repeat: Infinity,
              repeatDelay: 0.2,
            }}
          />
        )}

        {/* ── Open-click ripple(s) ── */}
        <AnimatePresence>
          {ripples.map((id) => (
            <motion.span
              key={id}
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(212,168,58,0.9) 0%, rgba(212,168,58,0) 70%)",
              }}
              initial={{ scale: 1, opacity: 1 }}
              animate={{ scale: 14, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
            />
          ))}
        </AnimatePresence>

        {/* ── The button itself ── */}
        <motion.button
          type="button"
          onClick={handleClick}
          aria-label="Open chat"
          className="relative flex h-[60px] w-[60px] items-center justify-center rounded-full bg-gold text-navy shadow-[0_12px_40px_rgba(212,168,58,0.35),0_4px_12px_rgba(15,32,64,0.4)] outline-none transition-shadow duration-300 hover:shadow-[0_16px_48px_rgba(212,168,58,0.5),0_6px_16px_rgba(15,32,64,0.5)] focus-visible:ring-4 focus-visible:ring-gold-light/60 max-[480px]:h-[56px] max-[480px]:w-[56px]"
          whileHover={reduceMotion ? undefined : { scale: 1.06 }}
          whileTap={reduceMotion ? undefined : { scale: 0.94 }}
          transition={{ type: "spring", damping: 18, stiffness: 320 }}
        >
          <motion.span
            className="flex items-center justify-center"
            whileHover={reduceMotion ? undefined : { rotate: 10 }}
            transition={{ type: "spring", damping: 14, stiffness: 260 }}
          >
            <MessageSquare
              className="h-[26px] w-[26px]"
              strokeWidth={2.25}
              aria-hidden="true"
            />
          </motion.span>
        </motion.button>
      </div>
    </motion.div>
  );
}
