/**
 * Canonical origin, no trailing slash. Every absolute URL the site emits is
 * built from this: canonicals, Open Graph images, the sitemap, robots.
 *
 * Environment-derived rather than hardcoded, because `kevinmei.dev` has no DNS
 * records today; pinning to it would advertise OG and sitemap URLs that nothing
 * answers. `VERCEL_PROJECT_PRODUCTION_URL` holds the project's stable
 * production hostname and switches to the custom domain on its own once one is
 * attached, so cutover needs no code change.
 *
 * Set NEXT_PUBLIC_SITE_URL to override (e.g. a preview or a non-Vercel host).
 */
const CONFIGURED_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : null);

/**
 * The localhost fallback is a development convenience, and in a production
 * build it is a bug that ships silently: every canonical, every Open Graph
 * image URL, every `<loc>` in the sitemap and the `Sitemap:` line in robots.txt
 * is built from this, so a production build without either variable set
 * publishes a site that tells crawlers its pages live on the machine that
 * built it. Nothing errors, nothing looks wrong in the browser, and the damage
 * is only visible to Google.
 *
 * On Vercel `VERCEL_PROJECT_PRODUCTION_URL` is always present, so this can only
 * happen on another host. It is a warning rather than a thrown error so a local
 * `next build` still works as a check that the app compiles; make it a `throw`
 * if this ever deploys from somewhere the variable isn't guaranteed.
 */
if (process.env.NODE_ENV === "production" && !CONFIGURED_URL) {
  console.warn(
    "\n[site.js] No NEXT_PUBLIC_SITE_URL or VERCEL_PROJECT_PRODUCTION_URL in a\n" +
      "production build. Canonicals, OG image URLs, sitemap.xml and robots.txt\n" +
      "will all be emitted as http://localhost:3000. Set NEXT_PUBLIC_SITE_URL\n" +
      "before building for a real host.\n",
  );
}

export const SITE_URL = CONFIGURED_URL ?? "http://localhost:3000";

export const EMAIL = "kevinmei2028@u.northwestern.edu";
export const GITHUB = "https://github.com/kmeixyz";
export const LINKEDIN = "https://www.linkedin.com/in/kmeixyz/";
// Résumé download. No PDF has been added yet, and every link to it 404s, so
// the UI hides the option while this is null. To turn it back on: drop the file
// into /public and set this to its path, e.g. "/Kevin-Mei-Resume.pdf".
export const RESUME = null;
export const LOCATION = "Chicago, IL";

/**
 * Three destinations, because there are three. Home is the landing page and
 * carries Kevin's introduction alongside selected work and contact details.
 *
 * Contact is not in here. It is a section of the landing page, not a
 * destination, and it has its own pane at the right of the bar.
 */
export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
];
