"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The <header> element itself, as a client component, so the three glass
 * pieces can get out of the way while you read and come back the moment you
 * want them.
 *
 * Only the shell is client-side. Its children are still rendered on the
 * server and passed straight through, so the wordmark and the circles stay
 * the plain markup Nav.jsx intends them to be.
 *
 * Two separate reasons to be on screen, because they have different
 * lifetimes, and one boolean could not tell them apart:
 *
 *   `keep` - the sticky one. Set by scrolling up, by being within a hair of
 *   the top of the page, by a touch at the top edge, and by focus arriving.
 *   These are all deliberate, so the bar stays until you scroll down again.
 *
 *   `reach` - the transient one. True only while a pointer is actually in the
 *   top strip. Move away and it goes, taking the bar with it unless `keep`
 *   is holding it up.
 *
 * The bar is on screen if either is true. Which means hovering the top edge
 * borrows it, and scrolling up earns it.
 *
 * On the scroll rule: any downward movement hides, any upward shows, with no
 * threshold beyond a pixel of jitter filtering. Reversing direction is the
 * whole gesture, and asking for 40px of it first is what makes these bars
 * feel like they are arguing with you.
 */
const TOP_ZONE = 80; // px from the top of the viewport that counts as "reaching for it"
const AT_TOP = 8; // px of scroll within which the bar is always shown
const JITTER = 1; // sub-pixel scroll noise, momentum rubber-banding

export default function TopbarShell({ children, className = "" }) {
  const [keep, setKeep] = useState(true);
  const [reach, setReach] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      const dy = y - lastY.current;
      if (Math.abs(dy) < JITTER) return;
      lastY.current = y;
      setKeep(y <= AT_TOP || dy < 0);
    };

    /* Pointer, not mouse: a pen at the top edge means the same thing. Touches
       are handled on press instead - a finger dragged across the top of a
       phone is usually a scroll, not a request for the bar. */
    const onPointerMove = (e) => {
      if (e.pointerType === "touch") return;
      setReach(e.clientY <= TOP_ZONE);
    };

    /* A pointer that leaves the window stops being in the strip, and no
       pointermove will ever say so. Without this the bar hangs around after
       the cursor has gone to another window. */
    const onPointerLeave = () => setReach(false);

    /* A touch has no hover to lose, so it earns the sticky kind. */
    const onPointerDown = (e) => {
      if (e.clientY <= TOP_ZONE) setKeep(true);
    };

    const onFocusIn = (e) => {
      if (e.target?.closest?.(".topbar")) setKeep(true);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    document.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("focusin", onFocusIn);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("focusin", onFocusIn);
    };
  }, []);

  const hidden = !(keep || reach);

  return (
    <header
      className={`topbar ${hidden ? "topbar--away" : ""} ${className}`}
      data-away={hidden ? "true" : undefined}
    >
      {children}
    </header>
  );
}
