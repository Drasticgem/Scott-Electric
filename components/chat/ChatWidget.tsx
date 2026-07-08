"use client";

import { useCallback, useEffect, useState } from "react";
import { ChatLauncher } from "./ChatLauncher";
import { TawkLoader } from "./TawkLoader";
import { DISCVAULT } from "@/lib/constants";

/**
 * Top-level chat widget. Composes:
 *   - <TawkLoader />  — lazy-loads Tawk.to and hides its default launcher
 *   - <ChatLauncher /> — our custom accent launcher + ripple animation
 *
 * The launcher's onClick calls Tawk_API.maximize() to open the real
 * live chat panel. When the user minimizes the panel, TawkLoader
 * dispatches "tawk:minimized" on the window and we flip isOpen back
 * to false so the launcher re-animates in.
 *
 * If Tawk.to isn't configured yet (no env vars), clicking the launcher
 * pops a non-blocking confirm that offers to email support instead —
 * so the widget is never a dead end during setup.
 */
export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  // Sync state when the user closes the Tawk.to panel.
  useEffect(() => {
    const handleClose = () => setIsOpen(false);
    window.addEventListener("tawk:minimized", handleClose);
    return () => window.removeEventListener("tawk:minimized", handleClose);
  }, []);

  const handleOpen = useCallback(() => {
    const tawk = typeof window !== "undefined" ? window.Tawk_API : undefined;

    if (tawk?.maximize) {
      setIsOpen(true);
      // showWidget first — Tawk.to won't maximize a hidden widget.
      tawk.showWidget?.();
      tawk.maximize();
      return;
    }

    // Fallback path: Tawk.to not configured / not yet loaded.
    // Offer support email so the user still has a way to reach us.
    const ok = window.confirm(
      `Live chat isn't available right now. Email us at ${DISCVAULT.supportEmail}?`
    );
    if (ok) {
      window.location.href = DISCVAULT.supportEmailHref;
    }
  }, []);

  return (
    <>
      <TawkLoader />
      <ChatLauncher isOpen={isOpen} onOpen={handleOpen} />
    </>
  );
}
