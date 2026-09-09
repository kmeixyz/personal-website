import "./globals.css";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import ViewTransitions from "@/app/components/ViewTransitions";
import HashScroll from "@/app/components/HashScroll";
import { Analytics } from "@vercel/analytics/next";
import { JetBrains_Mono } from "next/font/google";
import { EMAIL, GITHUB, LINKEDIN, LOCATION, SITE_URL } from "@/app/lib/site";

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

/* Identifies the site as a person and links the GitHub/LinkedIn accounts.
   Built from lib/site.js so the URLs can't drift from the footer. */
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Kevin Mei",
  url: SITE_URL,
  email: `mailto:${EMAIL}`,
  jobTitle: "Computer Science student",
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Northwestern University",
    url: "https://www.northwestern.edu",
  },
  address: { "@type": "PostalAddress", addressLocality: LOCATION },
  sameAs: [GITHUB, LINKEDIN],
};

/**
 * JSON.stringify is not an HTML escaper. It leaves `<`, `>` and `&` alone, so
 * a value containing `</script>` closes the tag and everything after it parses
 * as markup. SITE_URL comes from the environment rather than a literal, which
 * is enough of a path in for the escape to be worth doing. U+2028 and U+2029
 * are here because they are valid JSON but illegal raw in a JS string literal.
 *
 * The replacements stay valid JSON, so consumers parse the same object.
 */
const jsonLd = JSON.stringify(personJsonLd)
  .replace(/</g, "\\u003c")
  .replace(/>/g, "\\u003e")
  .replace(/&/g, "\\u0026")
  .replace(/\u2028/g, "\\u2028")
  .replace(/\u2029/g, "\\u2029");

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    // The landing page has no title of its own, so `default` spells out the
    // complete browser title that the template would otherwise produce.
    default: "Kevin Mei | Home",
    template: "Kevin Mei | %s",
  },
  description:
    "Kevin Mei is a Northwestern computer science student building security tools and software for people. Explore engineering experience, projects, and community work.",

  /* Without an `openGraph` block Next.js emits no og:* tags at all, and every
     unfurler - iMessage, Slack, Discord, LinkedIn - falls back to whatever
     <title> and <meta name="description"> happen to say. So the card has to
     name its own copy rather than inherit it.

     The title here is the bare name, not the `Kevin Mei | Home` the browser
     tab carries: a preview card already prints the domain on the line above,
     so the suffix is noise in the one place the name should stand alone. The
     template still applies to the child routes, which keep reading as
     `Kevin Mei | Projects`.

     `images` is deliberately absent. The opengraph-image routes are a file
     convention, and Next.js merges those in itself; naming them here would
     mean two sources for the same URL and one of them going stale. */
  openGraph: {
    type: "website",
    siteName: "Kevin Mei",
    locale: "en_US",
    title: { default: "Kevin Mei", template: "Kevin Mei | %s" },
    description: "Computer Science & Journalism | Northwestern University",
  },

  /* X reads the og:* copy when the twitter:* equivalents are missing, so the
     only thing that has to be said here is `card`: without it the image
     renders as a small square thumbnail beside the text instead of the
     full-width 1200x630 card. */
  twitter: {
    card: "summary_large_image",
  },
};

/**
 * The palette is a single light one - paper, ink, a warm hairline - and there
 * is no dark variant anywhere in globals.css. Saying so is not cosmetic:
 * without a declared scheme, Chrome on Android may apply its automatic dark
 * theme, which rewrites colours the CSS never chose and re-derives text
 * against backgrounds it inverts separately. That is where the carefully
 * measured contrast on this site stops holding. Declaring `light` opts out and
 * also tells the browser to draw form controls, scrollbars and the overscroll
 * area to match the page rather than the OS.
 */
export const viewport = {
  colorScheme: "light",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Scroll-reveal ships opacity:0 from the server. Without JS nothing
            clears it and the site reads as blank, so opt out. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />
      </head>
      <body className={`${jetBrainsMono.variable} bg-paper text-ink antialiased`}>
        <ViewTransitions />
        <HashScroll />
        {/* First in tab order. Off-screen until focused, and when it appears
            it appears under the top bar rather than over it: the bar is
            fixed, and a link landing at top-4 would sit on the wordmark's
            glass. */}
        <a
          href="#main"
          className="sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:left-6 focus-visible:top-[5.5rem] focus-visible:z-[60] focus-visible:bg-ink focus-visible:px-4 focus-visible:py-2 focus-visible:font-mono focus-visible:text-sm focus-visible:text-paper"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        {/* Production only. There it serves from /_vercel/insights/*, which
            `script-src 'self'` already covers. In dev the package pulls a debug
            script from va.vercel-scripts.com that the CSP blocks, flooding the
            console with errors that hide real ones. */}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
