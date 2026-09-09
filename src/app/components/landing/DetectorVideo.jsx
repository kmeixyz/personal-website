"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The detector demo, held back until it is worth downloading.
 *
 * The file is ~23 MB of 1080p and the card it sits in is about two screens
 * below the fold. `preload="metadata"` does not hold it back on its own,
 * because `autoPlay` overrides the hint: the element is asking to play, so the
 * browser buffers it during the initial page load and a visitor who never
 * scrolls past the hero pays for the whole thing anyway. On a phone connection
 * it is by far the most expensive object on the page.
 *
 * So the <source> is simply not in the markup until the card is near the
 * viewport - nothing is requested before then. Once it goes in, muted autoplay
 * starts it, and leaving the viewport pauses it, so a demo nobody is looking at
 * is not decoding 1080p frames in the background.
 *
 * There is no fallback for a browser without IntersectionObserver, unlike
 * components/motion.jsx, and the difference is what absence costs: there, the
 * whole site stays at opacity 0, so the fallback is load-bearing; here the card
 * keeps its heading, its blurb and its stack and only goes without the video.
 */
export default function DetectorVideo() {
  const ref = useRef(null);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    /* 300px of lead-in, so the first frame has a chance to arrive before the
       card is actually on screen rather than starting black under the reader. */
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setLoad(true);
          else el.pause();
        }
      },
      { rootMargin: "300px 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!load) return;
    /* play() returns a promise, and a rejection here is ordinary rather than
       exceptional - a battery saver, a backgrounded tab, an autoplay policy
       that wants a gesture first. Swallow it: an unhandled rejection in the
       console for a decorative loop is noise that hides real errors. */
    ref.current?.play?.().catch(() => {});
  }, [load]);

  return (
    <div className="overflow-hidden rounded-[14px] border border-[var(--lp-line)] bg-black">
      <video
        ref={ref}
        className="block aspect-video w-full bg-black object-contain"
        autoPlay
        loop
        muted
        playsInline
        preload="none"
        aria-label="Phishing Detector project demo"
      >
        {load && <source src="/videos/phishing-detector.mp4" type="video/mp4" />}
        Your browser does not support embedded video.
      </video>
    </div>
  );
}
