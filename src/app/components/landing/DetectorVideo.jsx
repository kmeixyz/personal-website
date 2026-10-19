"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * The detector demo, held back until it is worth downloading, and played only
 * while someone is looking at it.
 *
 * The file is ~23 MB of 1080p and the card it sits in is about two screens
 * below the fold. `preload="metadata"` does not hold it back on its own if the
 * element also asks to autoplay: the browser buffers it during the initial
 * page load and a visitor who never scrolls past the hero pays for the whole
 * thing anyway. On a phone connection it is by far the most expensive object
 * on the page.
 *
 * So the <source> is simply not in the markup until the card is near the
 * viewport - nothing is requested before then. Playback is driven by hand
 * rather than by `autoPlay`, so it starts when half the video is actually on
 * screen, not 300px early while it is still out of sight.
 *
 * Leaving the viewport pauses it, and coming back resumes it - unless the
 * reader paused it themselves, or it has finished. It plays once rather than
 * looping, so it can end on a replay control instead of running forever.
 *
 * The control in the bottom-left corner is the way out of every state the
 * page can't decide for the reader: pause while it plays, play when it is
 * paused (by them, by scrolling away, or by a browser that refused muted
 * autoplay - a battery saver, a data saver), replay once it ends. Under
 * reduced motion it never starts by itself; the control is how it starts.
 * Without IntersectionObserver it never loads by itself either, and the same
 * control fetches it on demand.
 */
export default function DetectorVideo() {
  const ref = useRef(null);
  const [load, setLoad] = useState(false);
  const [state, setState] = useState("paused"); // "playing" | "paused" | "ended"
  const inView = useRef(false);
  const userPaused = useRef(false);

  /* play() returns a promise, and a rejection here is ordinary rather than
     exceptional - a battery saver, a backgrounded tab, an autoplay policy that
     wants a gesture first. Swallow it: the control is left showing play,
     which is the right state, and an unhandled rejection in the console for a
     demo is noise that hides real errors. */
  const play = useCallback(() => ref.current?.play?.().catch(() => {}), []);

  const autoplay = useCallback(() => {
    const el = ref.current;
    if (!el || !inView.current || userPaused.current || el.ended) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    play();
  }, [play]);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    /* 300px of lead-in, so the first frame has a chance to arrive before the
       card is actually on screen rather than starting black under the reader. */
    const near = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setLoad(true);
          near.disconnect();
        }
      },
      { rootMargin: "300px 0px" },
    );

    /* Half on screen counts as watching. Less than that and it pauses, so a
       demo nobody is looking at is not decoding 1080p frames in the
       background. */
    const seen = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          inView.current = e.isIntersecting;
          if (e.isIntersecting) autoplay();
          else el.pause();
        }
      },
      { threshold: 0.5 },
    );

    near.observe(el);
    seen.observe(el);
    return () => {
      near.disconnect();
      seen.disconnect();
    };
  }, [autoplay]);

  // The <source> has just gone in; start it if it is already in view.
  useEffect(() => {
    if (load) autoplay();
  }, [load, autoplay]);

  const toggle = () => {
    const el = ref.current;
    if (!el) return;
    if (state === "playing") {
      userPaused.current = true;
      el.pause();
      return;
    }
    userPaused.current = false;
    if (state === "ended") el.currentTime = 0;
    if (!load) setLoad(true);
    play();
  };

  const label = { playing: "Pause video", paused: "Play video", ended: "Replay video" }[state];

  return (
    <div className="relative overflow-hidden rounded-[14px] border border-[var(--lp-line)] bg-black">
      <video
        ref={ref}
        className="block aspect-video w-full bg-black object-contain"
        muted
        playsInline
        preload="none"
        aria-label="Phishing Detector project demo"
        onPlay={() => setState("playing")}
        onPause={(e) => setState(e.currentTarget.ended ? "ended" : "paused")}
        onEnded={() => setState("ended")}
      >
        {load && <source src="/videos/phishing-detector.mp4" type="video/mp4" />}
        Your browser does not support embedded video.
      </video>

      <button
        type="button"
        onClick={toggle}
        aria-label={label}
        title={label}
        className="absolute bottom-3 left-3 grid size-10 place-items-center rounded-full bg-[rgb(232_232_237/0.86)] text-[#55555a] shadow-[0_4px_14px_rgb(0_0_0/0.18)] backdrop-blur-md transition-colors hover:bg-[rgb(244_244_247/0.94)] hover:text-[#1d1d1f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:bottom-4 md:left-4 md:size-12"
      >
        <ControlIcon state={state} />
      </button>
    </div>
  );
}

/** The glyph for what pressing the control will do next. */
function ControlIcon({ state }) {
  const common = { viewBox: "0 0 24 24", "aria-hidden": true, className: "size-[45%]" };
  if (state === "playing") {
    return (
      <svg {...common} fill="currentColor">
        <rect x="5.5" y="4" width="4.5" height="16" rx="1.4" />
        <rect x="14" y="4" width="4.5" height="16" rx="1.4" />
      </svg>
    );
  }
  if (state === "ended") {
    return (
      <svg {...common} fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 12a7 7 0 1 1-2.05-4.95" />
        <path d="M17.5 3.5v4h-4" />
      </svg>
    );
  }
  return (
    <svg {...common} fill="currentColor">
      <path d="M7 4.6v14.8c0 .9 1 1.5 1.8 1l11.6-7.4c.7-.45.7-1.55 0-2L8.8 3.6C8 3.1 7 3.7 7 4.6Z" />
    </svg>
  );
}
