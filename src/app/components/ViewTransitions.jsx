"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

/**
 * Runs App Router navigations inside document.startViewTransition, resolving
 * once the new route has committed. Resolving early snapshots the old page
 * twice and produces no transition.
 *
 * Progressive enhancement: without the API, under reduced motion, or on a
 * modified click, the normal <Link> behaviour runs untouched.
 */
export default function ViewTransitions() {
  const router = useRouter();
  const pathname = usePathname();
  const resolveRef = useRef(null);

  // The route has rendered; let the transition play.
  useEffect(() => {
    if (resolveRef.current) {
      resolveRef.current();
      resolveRef.current = null;
    }
  }, [pathname]);

  useEffect(() => {
    if (typeof document.startViewTransition !== "function") return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const onClick = (e) => {
      if (reduced.matches) return;
      // Let the browser handle anything that isn't a plain left click.
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      )
        return;

      const anchor = e.target.closest?.("a[href]");
      if (!anchor) return;
      if (anchor.target === "_blank" || anchor.hasAttribute("download")) return;
      if (anchor.hasAttribute("data-no-transition")) return;

      let url;
      try {
        url = new URL(anchor.href, location.href);
      } catch {
        return;
      }
      // Only ordinary page navigations. An allowlist rather than an origin
      // check alone: a blob: URL inherits this page's origin, so it passes
      // `url.origin === location.origin` and would be turned into a router
      // push at a nonsense path. javascript:, data: and mailto: fail the
      // origin check already, but naming the two schemes we handle says what
      // this is for and stops the next odd scheme getting through.
      if (url.protocol !== "http:" && url.protocol !== "https:") return;
      if (url.origin !== location.origin) return;
      if (url.pathname === location.pathname) return;

      e.preventDefault();
      document.startViewTransition(
        () =>
          new Promise((resolve) => {
            resolveRef.current = resolve;
            router.push(url.pathname + url.search + url.hash);
            // Don't strand the transition if the route never commits.
            setTimeout(() => {
              if (resolveRef.current === resolve) {
                resolveRef.current = null;
                resolve();
              }
            }, 800);
          }),
      );
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [router]);

  return null;
}
