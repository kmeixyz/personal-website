"use client";

import {
  Children,
  cloneElement,
  createContext,
  isValidElement,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

/* Scroll-reveal. Short 6px lift and a long ease-out, so the motion reads as
   weight rather than effect. Curve kept in sync with --ease-authored in
   globals.css. IntersectionObserver + CSS transitions, no animation library. */
const DUR = 620; // ms
const EASE = "cubic-bezier(0.2, 0.65, 0.25, 1)";
const Y = 6; // px settle
const GAP = 0.06; // seconds between staggered items

/* Fire once the element reaches ~10% from the bottom of the viewport.
   Above-the-fold elements already intersect on mount, so they reveal at once. */
const ROOT_MARGIN = "0px 0px -10% 0px";

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  );
}

/** Reveal once the element scrolls into view (or immediately if already in it). */
function useInView(rootMargin = ROOT_MARGIN) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (shown) return;
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion() || typeof IntersectionObserver === "undefined") {
      /* Deliberately a setState in the effect body, and it cannot be hoisted
         into the useState initialiser: `prefersReducedMotion` reads
         matchMedia, which does not exist on the server. Seeding state from it
         would have the server render opacity 0 and the client render opacity 1
         on the very first pass, which is a hydration mismatch on the `style`
         attribute of every revealed element on the page. Rendering twice is
         the cost of reading a client-only preference without lying to the
         server about it. */
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShown(true);
      return;
    }

    const obs = new IntersectionObserver(
      (entries, observer) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold: 0 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [shown, rootMargin]);

  return [ref, shown];
}

function revealStyle(shown, delayMs, extra, duration = DUR) {
  return {
    opacity: shown ? 1 : 0,
    transform: shown ? "none" : `translateY(${Y}px)`,
    transition: `opacity ${duration}ms ${EASE} ${delayMs}ms, transform ${duration}ms ${EASE} ${delayMs}ms`,
    willChange: shown ? undefined : "opacity, transform",
    ...extra,
  };
}

/** Fades + lifts its children into view once, on scroll. */
export function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  duration = DUR,
  rootMargin = ROOT_MARGIN,
  className,
  style,
  ...rest
}) {
  const [ref, shown] = useInView(rootMargin);
  return (
    <Tag
      ref={ref}
      data-reveal=""
      className={className}
      style={revealStyle(shown, delay * 1000, style, duration)}
      {...rest}
    >
      {children}
    </Tag>
  );
}

const StaggerCtx = createContext({ shown: false, gap: GAP, duration: DUR, delay: 0 });

/** Container that reveals its <StaggerItem> children in a top-down cascade. */
export function Stagger({
  children,
  className,
  gap = GAP,
  duration = DUR,
  delay = 0,
  rootMargin = ROOT_MARGIN,
  as: Tag = "div",
  ...rest
}) {
  const [ref, shown] = useInView(rootMargin);

  // Tag each child with its position so it can offset its own transition delay.
  let index = 0;
  const items = Children.map(children, (child) =>
    isValidElement(child)
      ? cloneElement(child, { __staggerIndex: index++ })
      : child,
  );

  return (
    <StaggerCtx.Provider value={{ shown, gap, duration, delay }}>
      <Tag ref={ref} className={className} {...rest}>
        {items}
      </Tag>
    </StaggerCtx.Provider>
  );
}

export function StaggerItem({
  children,
  className,
  as: Tag = "div",
  style,
  __staggerIndex = 0,
  ...rest
}) {
  const { shown, gap, duration, delay } = useContext(StaggerCtx);
  const delayMs = shown ? (delay + __staggerIndex * gap) * 1000 : 0;
  return (
    <Tag
      data-reveal=""
      className={className}
      style={revealStyle(shown, delayMs, style, duration)}
      {...rest}
    >
      {children}
    </Tag>
  );
}
