"use client";

import { useEffect } from "react";

/**
 * Lands a page opened with a fragment on that fragment.
 *
 * The browser scrolls to the target during the initial load, but the App
 * Router sets scroll position again as it hydrates and the fragment loses, so
 * a shared link like /projects#paralytica opens at the top of the page.
 * Same-document hash navigation is unaffected, so this only runs on mount.
 *
 * Three attempts — now, next frame, and a 150ms backstop — because the router's
 * scroll can arrive after any of the first two. Each one bails if the page is
 * no longer at the top, so a reader who has started scrolling is never yanked.
 * `scrollIntoView` honours the target's scroll-margin-top, which is what keeps
 * the section clear of the sticky bar.
 */
export default function HashScroll() {
  useEffect(() => {
    const raw = window.location.hash.slice(1);
    // decodeURIComponent throws URIError on a malformed escape such as "#%".
    // Uncaught here it would propagate out of the effect and unmount the whole
    // tree, so a mangled link would render a blank page. Fall back to the raw
    // fragment: getElementById takes any string and simply finds nothing.
    let id;
    try {
      id = decodeURIComponent(raw);
    } catch {
      id = raw;
    }
    if (!id || window.scrollY > 0) return;

    const land = () => {
      if (window.scrollY > 0) return;
      document
        .getElementById(id)
        ?.scrollIntoView({ block: "start", behavior: "instant" });
    };

    land();
    const frame = requestAnimationFrame(land);
    const timer = setTimeout(land, 150);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
    };
  }, []);

  return null;
}
