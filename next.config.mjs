/**
 * Security headers.
 *
 * The site is fully static and prerendered: no API routes, middleware, server
 * actions, forms, cookies, auth or user input. The protections that mean
 * anything here are therefore transport- and browser-level.
 *
 * The CSP can be tight because every asset is first-party. The one concession
 * is `'unsafe-inline'` for script-src and style-src, which Next's hydration
 * payload and Tailwind's injected styles both need on static pages. Neither
 * escape hatch is available here: a nonce needs middleware, which turns every
 * route dynamic, and hashes would have to be per-page because each page's RSC
 * payload script differs, which a single static header set can't express.
 *
 * So the compensating controls carry the weight instead. `object-src 'none'`
 * stops a plugin being the injection vehicle, `base-uri 'none'` stops an
 * injected <base> repointing every relative script URL, and `form-action
 * 'none'` stops an injected form exfiltrating anything. Together those close
 * the routes an attacker would actually take if they ever got markup in.
 *
 * The remaining fetch directives are set to the narrowest value the site
 * genuinely uses: no data:/blob: images, no data: fonts, first-party media
 * only, and no workers.
 */
const isProd = process.env.NODE_ENV === "production";

/**
 * `upgrade-insecure-requests` and HSTS are production-only because both break a
 * plain-HTTP dev server.
 *
 * `upgrade-insecure-requests` rewrites every subresource to https://, so on
 * http://localhost the CSS, JS and fonts are requested over a port that isn't
 * speaking TLS and the page renders as unstyled HTML. Chrome exempts localhost;
 * Safari does not.
 *
 * HSTS is stickier: once Safari records it, it forces https on *every*
 * localhost dev server on the machine for the max-age.
 */
const csp = [
  "default-src 'self'",
  // 'unsafe-eval' is development only: Turbopack's HMR evaluates modules with
  // eval, and without it Fast Refresh degrades and the console fills with
  // violations that hide real errors. Production never needs it.
  isProd
    ? "script-src 'self' 'unsafe-inline'"
    : "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  "style-src 'self' 'unsafe-inline'",
  // Every image and font is a first-party file. data: and blob: are kept in
  // development only, where Next's error overlay draws with inline assets.
  isProd ? "img-src 'self'" : "img-src 'self' data: blob:",
  isProd ? "font-src 'self'" : "font-src 'self' data:",
  "connect-src 'self'",
  // The site has no <form> anywhere, so nothing legitimate ever submits one.
  "form-action 'none'",
  "media-src 'self'",
  "worker-src 'none'",
  // Production forbids framing outright. Development allows same-origin, so
  // local layout harnesses can iframe pages; the clickjacking threat is a
  // *cross-origin* frame, which 'self' still blocks.
  isProd ? "frame-ancestors 'none'" : "frame-ancestors 'self'",
  isProd ? "frame-src 'none'" : "frame-src 'self'",
  "object-src 'none'",
  "base-uri 'none'",
  "manifest-src 'self'",
  ...(isProd ? ["upgrade-insecure-requests"] : []),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  // Two years, subdomains included, preload-eligible. Production only.
  ...(isProd
    ? [
        {
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubDomains; preload",
        },
      ]
    : []),
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Redundant with frame-ancestors, kept for older browsers.
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Nothing here needs hardware or sensor access.
  {
    key: "Permissions-Policy",
    value: [
      "accelerometer=()",
      "autoplay=(self)",
      "camera=()",
      "display-capture=()",
      "encrypted-media=()",
      "fullscreen=(self)",
      "geolocation=()",
      "gyroscope=()",
      "magnetometer=()",
      "microphone=()",
      "midi=()",
      "payment=()",
      "usb=()",
      "xr-spatial-tracking=()",
      "interest-cohort=()",
    ].join(", "),
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
  { key: "X-DNS-Prefetch-Control", value: "off" },
  { key: "X-Permitted-Cross-Domain-Policies", value: "none" },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Hide the dev-only Next.js indicator (the floating "N" button, bottom-left).
  devIndicators: false,

  // The opengraph-image routes read their two typefaces straight off disk out
  // of src/, which the tracer has no reason to follow - nothing imports the
  // files, a string is joined onto a path at runtime. Every card is
  // prerendered at build time so this changes nothing today; it is here so
  // that a card which ever does render on demand finds its fonts.
  outputFileTracingIncludes: {
    "/**/opengraph-image": ["./src/app/lib/fonts/**"],
  },

  // Don't advertise the framework and its version to scanners.
  poweredByHeader: false,

  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },

  // /about was folded into the landing page. Permanent rather than temporary
  // because the move is: the route is gone, not resting. The redirect is here
  // and not a stub page so the old URL stops being a second address for the
  // same content - one canonical, and anything already linking to /about
  // still lands on it.
  async redirects() {
    return [{ source: "/about", destination: "/", permanent: true }];
  },

  // NOTE: `experimental.viewTransition` is deliberately NOT set. In Next 15.3 it
  // relies on React's unstable_ViewTransition, which React 19.1 didn't export;
  // enabling it swapped in a larger React build (+11kB shared JS) and never
  // called startViewTransition once. Transitions are driven by
  // components/ViewTransitions.jsx instead.
};

export default nextConfig;
