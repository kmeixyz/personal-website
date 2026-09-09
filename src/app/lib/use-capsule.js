"use client";

import { useCallback, useRef } from "react";

/** A dock with no drag never takes hold of its own capsule. */
const NEVER_HELD = () => false;

/**
 * The sliding highlight both docks are built around: the site index at the top
 * of the page, and the section index at the bottom of /experience and
 * /projects. What moves the capsule differs - a route, a scroll position, a
 * finger - but how it is moved does not, and two copies of this drifted the
 * first time either was touched.
 *
 * `itemRefs` is the dock's array of item elements and `index` the one the
 * capsule belongs around. `isHeld` reports when something else is placing it -
 * a drag in flight - so the settle animation stands down rather than fighting
 * the gesture; it has to be stable, because `follow` and everything the dock
 * memoises on `follow` hangs off it.
 *
 * Placement is written straight to the DOM rather than through state. React
 * never renders this element's style, so there is nothing to fight over, and a
 * drag can move it per frame without re-rendering the dock around it.
 */
export function useCapsule(itemRefs, index, isHeld = NEVER_HELD) {
  const capsuleRef = useRef(null);
  /* The settle loop's own frame slot. A dock that drives its own loop - a drag
     in flight - keeps a separate one: this is cancelled whenever `index`
     changes, and a shared slot meant that cancellation killed the drag too. */
  const frame = useRef(0);
  const timer = useRef(0);

  const place = useCallback((x, w) => {
    const el = capsuleRef.current;
    if (!el) return;
    el.style.transform = `translateX(${x}px)`;
    el.style.width = `${w}px`;
    el.style.opacity = "1";
  }, []);

  const stopFollow = useCallback(() => {
    cancelAnimationFrame(frame.current);
    clearTimeout(timer.current);
    frame.current = 0;
  }, []);

  /* The item being moved to is growing to fit its name while the capsule is
     travelling to it, so its width at the moment of the move is not the width
     it will settle at. Rather than predict it, the capsule copies the item's
     box every frame for as long as that takes: the easing is the item's own,
     and the two land together by construction. Its own transition is off while
     this runs, or it would lag a value that is already animating.

     The timeout is a backstop for a tab that is throttled or hidden, where
     rAF never fires and the capsule would otherwise keep a pre-transition
     size until something else moved it. */
  const follow = useCallback(() => {
    const cap = capsuleRef.current;
    if (!cap || !itemRefs.current[index]) return;
    stopFollow();
    cap.style.transition = "none";
    const start = performance.now();
    const tick = (now) => {
      const item = itemRefs.current[index];
      if (!item || isHeld()) {
        frame.current = 0;
        return;
      }
      place(item.offsetLeft, item.offsetWidth);
      if (now - start < 420) {
        frame.current = requestAnimationFrame(tick);
      } else {
        frame.current = 0;
        cap.style.transition = "";
      }
    };
    frame.current = requestAnimationFrame(tick);
    timer.current = setTimeout(() => {
      cancelAnimationFrame(frame.current);
      frame.current = 0;
      const item = itemRefs.current[index];
      if (item && !isHeld()) place(item.offsetLeft, item.offsetWidth);
      cap.style.transition = "";
    }, 460);
  }, [index, isHeld, itemRefs, place, stopFollow]);

  return { capsuleRef, place, follow, stopFollow };
}
