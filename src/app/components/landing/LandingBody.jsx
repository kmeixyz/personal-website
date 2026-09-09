"use client";

import { useEffect } from "react";

/**
 * Marks <body> for the length of the landing route.
 *
 * The landing page is white to its edges and the rest of the site is on warm
 * paper (#faf9f7). That difference shows in two places CSS on the page itself
 * cannot reach: the overscroll rubber-band at the top and bottom of the
 * viewport, and the strip below the content on a short viewport, both of which
 * are painted from <body>.
 *
 * `body:has(.lp)` in landing.css does the work in every browser shipping
 * `:has()`. This adds the same thing as a class so the paint survives on
 * anything that doesn't, and - more usefully - so it is removed on unmount
 * rather than waiting for the next paint after a client-side navigation to
 * /projects, where the two grounds would otherwise cross-fade the wrong way
 * through the view transition.
 */
export default function LandingBody() {
  useEffect(() => {
    document.body.classList.add("lp-ground");
    return () => document.body.classList.remove("lp-ground");
  }, []);

  return null;
}
