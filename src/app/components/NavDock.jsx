"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GlassSheen } from "@/app/components/glass";
import {
  HomeIcon,
  ExperienceIcon,
  ProjectsIcon,
} from "@/app/components/nav-icons";
import { NAV_LINKS } from "@/app/lib/site";
import { useCapsule } from "@/app/lib/use-capsule";

/**
 * The site index as a floating dock, in the same glass the section dock at the
 * bottom of /experience is cut from: a glyph per destination, and a capsule
 * that slides to whichever one the pointer is over and settles back on the
 * page you are actually on.
 *
 * It shares that dock's stylesheet outright - `.dock-glass`, `.dock-row`,
 * `.dock-capsule`, `.dock-item` - because two bars that merely resemble each
 * other drift apart the first time either is touched. What it does not share
 * is the behaviour: there is no scrollspy (the router already knows where you
 * are), no drag (a tap navigates, so there is nothing to hold), and three items
 * fit a phone without the row scrolling. What is left is the capsule, and that
 * is shared outright as well - `useCapsule` places it and rides its settle for
 * both bars.
 *
 * Named from 48rem up: there is room for all three, and a row of destinations
 * a reader can read without hovering is worth the width. Below that the names
 * fold and the row is three glyphs, because the top of a phone is already
 * carrying the wordmark and the contact pane. The names stay in the markup
 * either way - they are the links' accessible names, and the fold is a
 * collapsed grid track rather than `display: none` for exactly that reason.
 *
 * Which means the expansion is a breakpoint, not a hover: on the wide bar
 * everything is open already and the pointer only slides the capsule. The
 * shared `follow` loop still earns its place - the labels are webfont mono and
 * measure narrow until the font lands, and the capsule has to end up around
 * the width they settle at rather than the one they booted with.
 */
const ICONS = {
  "/": HomeIcon,
  "/experience": ExperienceIcon,
  "/projects": ProjectsIcon,
};

export default function NavDock() {
  const pathname = usePathname();
  const [hovered, setHovered] = useState(null);
  const itemRefs = useRef([]);

  /* Home matches exactly; everything else owns its subtree, so
     /projects/paralytica still lights Projects. */
  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  /* The capsule follows the pointer while there is one, and the route the rest
     of the time. Falling back rather than staying put is what makes leaving
     the bar read as a return rather than an abandonment. */
  const activeHref = NAV_LINKS.find((l) => isActive(l.href))?.href ?? null;
  const shown = hovered ?? activeHref;
  // -1 on a page outside the nav - /404 - where nothing should be lit.
  const index = NAV_LINKS.findIndex((l) => l.href === shown);

  /* Placement and the settle animation are the section dock's, shared outright
     for the same reason the stylesheet is: two capsules that merely behave
     alike drift apart. Nothing here holds the capsule - there is no drag on
     this bar - so it never has to stand down. */
  const { capsuleRef, place, follow, stopFollow } = useCapsule(itemRefs, index);

  const measure = useCallback(() => {
    const cap = capsuleRef.current;
    if (!cap) return;
    const el = itemRefs.current[index];
    if (!el) {
      cap.style.opacity = "0";
      return;
    }
    place(el.offsetLeft, el.offsetWidth);
    follow();
  }, [capsuleRef, index, place, follow]);

  useEffect(() => {
    /* Two things, both of them about a viewport that moved under the reader.
       A pointer can leave the bar without ever firing mouseleave - the window
       resizes, or a phone rotates - and a stale `hovered` outranks the route,
       freezing the capsule on a page nobody is on.

       And the capsule has to be measured again, not just left alone: crossing
       48rem opens or folds every name at once, so each item's box changes
       without the route or the hover changing with it. Without this the
       capsule keeps the width and offset the open row had and lands two
       glyphs down from the page you are on. `measure` rides the fold through
       `follow`, so it settles on the width the items end at rather than the
       one they were passing through when the breakpoint flipped. */
    const onResize = () => {
      setHovered(null);
      measure();
    };
    measure();
    window.addEventListener("resize", onResize);
    /* Mono is a webfont: every label is narrower until it lands, so a capsule
       measured before then is cut short and never corrects itself. */
    document.fonts?.ready.then(measure).catch(() => {});
    return () => {
      window.removeEventListener("resize", onResize);
      stopFollow();
    };
  }, [measure, stopFollow]);

  return (
    <nav aria-label="Primary" className="topbar-piece">
      <div className="dock-glass">
        <GlassSheen />
        <ul className="dock-row" onMouseLeave={() => setHovered(null)}>
          {/* Behind the links, and out of the accessibility tree: the
              highlight is a restatement of aria-current, not information of
              its own. Hidden until measured, so it can't flash at the wrong
              width on the first paint.

              An <li>, not a <span>, because <ul> may only contain list items;
              see the same note in SectionDock. */}
          <li className="dock-capsule" ref={capsuleRef} aria-hidden="true" />

          {NAV_LINKS.map((l, i) => {
            const Icon = ICONS[l.href];
            return (
              <li key={l.href}>
                <Link
                  ref={(el) => {
                    itemRefs.current[i] = el;
                  }}
                  href={l.href}
                  data-current={l.href === shown ? "true" : undefined}
                  aria-current={isActive(l.href) ? "page" : undefined}
                  className="dock-item"
                  onMouseEnter={() => setHovered(l.href)}
                  onFocus={() => setHovered(l.href)}
                  onBlur={() => setHovered(null)}
                >
                  {Icon ? <Icon /> : null}
                  {/* Always in the markup, clipped to nothing until this is
                      the page in play: it is the link's accessible name, and
                      a name that only exists sometimes is not one. */}
                  <span className="dock-item__name">
                    <span>{l.label}</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
