"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { GlassSheen } from "@/app/components/glass";
import { useCapsule } from "@/app/lib/use-capsule";

/**
 * The section index as a floating dock: the five section names in a pane of
 * dark glass, with a capsule that slides to whichever name the pointer is over
 * and settles back on the section you are actually in.
 *
 * The scrollspy is the same one the text rail used - a passive scroll listener
 * rather than an IntersectionObserver, because these sections are taller than
 * the viewport and an observer watching a thin activation band reports nothing
 * intersecting, dropping the highlight out.
 *
 * Glyphs, except for the section you are on, which spells itself out beside
 * its own. That is what makes five sections fit a phone without the row
 * scrolling - a scrolling row put half a word against each end of the glass
 * and slid the capsule under sliced labels - and it means the one item a
 * reader has to be able to read is the one that is already named.
 *
 * A touch has no hover and nothing to hold: a tap navigates, exactly the way
 * the site index at the top of the page does, and the capsule moves because
 * the page moved. Hover is therefore mouse-only - a synthesised mouseenter
 * from a tap would pin `hovered` to the item that was tapped, and since
 * `hovered` outranks the scrollspy the capsule would then sit still for the
 * rest of the page.
 */
export default function SectionDock({ sections, className = "" }) {
  const [active, setActive] = useState(sections[0]?.id);
  const [hovered, setHovered] = useState(null);
  const itemRefs = useRef([]);
  const scrollerRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const line = window.innerHeight * 0.25;
      let current = sections[0]?.id;
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= line) current = s.id;
      }
      // On a page short enough that the last section's top never reaches the
      // line, hitting the bottom is the only signal you're in it.
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      if (atBottom) current = sections[sections.length - 1]?.id ?? current;

      setActive(current);
    };

    /* A pointer can leave the dock without ever firing mouseleave - the
       viewport resizes under it, or a phone rotates. `hovered` outranks the
       scrollspy by design, so a stale one freezes the capsule on a section
       the reader left long ago. */
    const onResize = () => {
      setHovered(null);
      onScroll();
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [sections]);

  /* The capsule follows the pointer while there is one, and the page position
     the rest of the time. Falling back to `active` rather than staying put is
     what makes leaving the dock read as a return rather than an abandonment. */
  const shown = hovered ?? active;
  const index = Math.max(
    0,
    sections.findIndex((s) => s.id === shown),
  );

  /* The capsule itself is the shared one: the same placement and the same
     settle animation the site index at the top of the page runs. Nothing here
     holds it - there is no drag on this bar either - so it never has to stand
     down. */
  const { capsuleRef, place, follow, stopFollow } = useCapsule(itemRefs, index);

  const measure = useCallback(() => {
    const el = itemRefs.current[index];
    if (!el) return;
    place(el.offsetLeft, el.offsetWidth);
    follow();

    /* On a phone the row is wider than the glass and scrolls. Keep whichever
       item the capsule is on inside the visible part of it, or the highlight
       sits off-screen and the dock looks inert. A no-op at widths where
       nothing overflows, which is why it isn't behind a media query. */
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const left = el.offsetLeft;
    const right = left + el.offsetWidth;
    if (left < scroller.scrollLeft) scroller.scrollLeft = left - 8;
    else if (right > scroller.scrollLeft + scroller.clientWidth)
      scroller.scrollLeft = right - scroller.clientWidth + 8;
  }, [index, place, follow]);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    /* Mono is a webfont: every label is narrower until it lands, so a capsule
       measured before then is cut short and never corrects itself. */
    document.fonts?.ready.then(measure).catch(() => {});
    return () => {
      window.removeEventListener("resize", measure);
      stopFollow();
    };
  }, [measure, stopFollow]);

  /* Mouse only, for the reason in the header comment: a tap must leave the
     capsule to the scrollspy. */
  const onEnter = (e, id) => {
    if (e.pointerType === "mouse") setHovered(id);
  };
  const onLeave = (e) => {
    if (e.pointerType === "mouse") setHovered(null);
  };

  return (
    <nav aria-label="Sections" className={`dock ${className}`}>
      <div className="dock-stage">
        <div className="dock-glass">
          <GlassSheen />

          <div className="dock-scroll" ref={scrollerRef}>
            <ul className="dock-row" onPointerLeave={onLeave}>
              {/* Behind the labels, and out of the accessibility tree: the
                  highlight is a restatement of aria-current, not information
                  of its own. Hidden until measured, so it can't flash at the
                  wrong width on the first paint.

                  An <li>, not a <span>: the content model of <ul> is list items
                  and nothing else, so a bare <span> here is invalid markup.
                  `aria-hidden` keeps it out of the accessibility tree, so the
                  list still reports only the real sections, and it is
                  absolutely positioned, so being a list item costs it no
                  layout. */}
              <li className="dock-capsule" ref={capsuleRef} aria-hidden="true" />

              {sections.map((s, i) => (
                <li key={s.id}>
                  <a
                    ref={(el) => {
                      itemRefs.current[i] = el;
                    }}
                    href={`#${s.id}`}
                    data-section={s.id}
                    data-current={s.id === shown ? "true" : undefined}
                    aria-current={s.id === active ? "true" : undefined}
                    className="dock-item"
                    onPointerEnter={(e) => onEnter(e, s.id)}
                    onFocus={() => setHovered(s.id)}
                    onBlur={() => setHovered(null)}
                  >
                    {s.icon}
                    {/* Always in the markup, clipped to nothing until this is
                        the section in play: it is the button's accessible
                        name, and a name that only exists sometimes is not
                        one. */}
                    <span className="dock-item__name">
                      <span>{s.label}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
