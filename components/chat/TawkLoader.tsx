"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";

/**
 * Lazy-loads the Tawk.to live chat embed and immediately hides its
 * default launcher so our custom branded launcher is the only visible
 * entry point. Dispatches "tawk:minimized" on the window when the
 * user closes the chat panel so ChatWidget can restore the launcher.
 *
 * Reads the Tawk.to property + widget IDs from:
 *   - process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID
 *   - process.env.NEXT_PUBLIC_TAWK_WIDGET_ID
 *
 * If the IDs are missing (e.g., local dev before the user signs up),
 * renders nothing and logs a single warning. ChatLauncher will still
 * appear and gracefully fall back to a "please call us" toast on click.
 */

// Minimal typing for the globals Tawk.to injects. We don't own the
// upstream API shape so we stay conservative here.
type TawkAPI = {
  hideWidget?: () => void;
  showWidget?: () => void;
  maximize?: () => void;
  minimize?: () => void;
  onLoad?: () => void;
  onChatMinimized?: () => void;
  onChatHidden?: () => void;
  onChatEnded?: () => void;
};

declare global {
  interface Window {
    Tawk_API?: TawkAPI;
    Tawk_LoadStart?: Date;
  }
}

const PROPERTY_ID = process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID;
const WIDGET_ID = process.env.NEXT_PUBLIC_TAWK_WIDGET_ID;

let warned = false;

export function TawkLoader() {
  const wiredRef = useRef(false);

  // Prime the Tawk_API namespace + wire close callbacks once on mount.
  // We do this in an effect rather than in the script's onLoad so we
  // can install handlers before the embed script runs (Tawk.to reads
  // Tawk_API.onChatMinimized etc. off the pre-existing object).
  useEffect(() => {
    if (wiredRef.current) return;
    wiredRef.current = true;

    if (!PROPERTY_ID || !WIDGET_ID) {
      if (!warned) {
        warned = true;
        // eslint-disable-next-line no-console
        console.warn(
          "[ChatWidget] NEXT_PUBLIC_TAWK_PROPERTY_ID / NEXT_PUBLIC_TAWK_WIDGET_ID not set — live chat disabled. Launcher will fall back to a call prompt."
        );
      }
      return;
    }

    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();

    const dispatchMinimized = () => {
      window.dispatchEvent(new CustomEvent("tawk:minimized"));
      // Keep Tawk.to's own launcher hidden — our custom one takes over.
      window.Tawk_API?.hideWidget?.();
    };

    window.Tawk_API.onLoad = () => {
      window.Tawk_API?.hideWidget?.();
    };
    window.Tawk_API.onChatMinimized = dispatchMinimized;
    window.Tawk_API.onChatHidden = dispatchMinimized;
    window.Tawk_API.onChatEnded = dispatchMinimized;
  }, []);

  if (!PROPERTY_ID || !WIDGET_ID) return null;

  return (
    <Script
      id="tawk-embed"
      strategy="lazyOnload"
      src={`https://embed.tawk.to/${PROPERTY_ID}/${WIDGET_ID}`}
      // Tawk.to's snippet also sets these attributes on the script tag.
      crossOrigin="anonymous"
      charSet="UTF-8"
    />
  );
}
