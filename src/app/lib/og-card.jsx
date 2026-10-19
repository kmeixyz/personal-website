import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { SITE_URL } from "@/app/lib/site";

/**
 * Card geometry, and the only place it is decided. Every route also exports
 * `size` and `contentType` as literals of its own because Next.js reads those
 * statically out of the route file and will not follow an import, so those four
 * pairs have to stay in step with the values here.
 */
const SIZE = { width: 1200, height: 630 };

/**
 * ImageResponse ships no fonts of its own beyond a default sans, so anything
 * the card should be set in has to arrive as bytes. These are the site's two
 * faces, vendored into the repo rather than fetched from Google at build time:
 * a build that reaches the network is a build that can fail for reasons that
 * have nothing to do with the code.
 *
 * Inter stands in for SF Pro. The site asks for "SF Pro Display"/"SF Pro Text"
 * in CSS, which costs nothing because Apple devices already have them and
 * everyone else falls through to the next name in the stack - but baking a
 * face into a PNG means embedding the file, and Apple's licence does not cover
 * redistributing SF that way. Inter is the closest metric relative that can
 * actually ship: same neo-grotesque skeleton, same tall x-height, drawn for
 * screen UI. At card sizes the two are hard to tell apart.
 *
 * JetBrains Mono is the real thing - the same face `next/font` loads for the
 * rails and section labels in the site chrome.
 *
 * Read off disk rather than through the `fetch(new URL(..., import.meta.url))`
 * form the Next.js docs show. That form is written for the edge runtime: the
 * bundler rewrites it to a root-relative `/_next/static/media/...` path, which
 * has an origin to resolve against there and none here, so on this runtime it
 * fails the build with `ERR_INVALID_URL`. Every card is prerendered, so the
 * reads happen at build time with the project root as the working directory.
 */
const FONT_DIR = path.join(process.cwd(), "src/app/lib/fonts");

const fontFiles = [
  { name: "Inter", weight: 400, file: "Inter-Regular.woff" },
  { name: "Inter", weight: 500, file: "Inter-Medium.woff" },
  { name: "JetBrains Mono", weight: 400, file: "JetBrainsMono-Regular.woff" },
];

/**
 * Read once per process, not once per card. Four routes render during a build
 * and they all want the same three files; without this the bytes are re-read
 * and re-parsed for each one. The promise is created eagerly and awaited later
 * so the reads overlap with everything else the build is doing.
 */
const fonts = Promise.all(
  fontFiles.map(async ({ name, weight, file }) => ({
    name,
    weight,
    style: "normal",
    data: await readFile(path.join(FONT_DIR, file)),
  })),
);

/** Trim to a word boundary. Stopping mid-word looks broken, not full. */
function clamp(text = "", max = 116) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}

/**
 * The one social card, rendered for every route that has one, so the site-wide
 * card and the per-page ones can't drift apart. Each route's `opengraph-image`
 * is then only its own copy plus the three exports Next.js insists on seeing
 * in the route file itself.
 *
 * The palette and type are the landing page's, not the warm paper-and-serif of
 * the older pages: cool paper, the slate-to-steel gradient the hero headings
 * use (--home-title-start/--home-title-end in apple-home.css) and the one
 * saturated blue (--lp-blue). A card is the first thing anyone sees of the
 * site, so it has to be recognisably the same site when they arrive.
 *
 * Mono carries the machine-readable things - the section label, the hostname -
 * and the UI face carries the names and the prose, which is the same division
 * the rails and headings on the site keep to.
 *
 * @param eyebrow     small label, top-left
 * @param eyebrowFace "mono" for a label, "sans" when the eyebrow is a name
 * @param title       the large line; `\n` breaks it, as in the hero
 * @param subtitle    optional supporting line, clamped
 * @param footer      bottom-right label, always mono (defaults to the hostname)
 */
export async function ogImage({
  eyebrow,
  eyebrowFace = "mono",
  title,
  subtitle,
  footer = SITE_URL.replace(/^https?:\/\//, ""),
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          // The wash is the same one the gradient cards on the landing page
          // carry, angled off the top-left so it sits behind the eyebrow and
          // fades out before the subtitle has to stay readable on top of it.
          backgroundImage:
            "linear-gradient(140deg, #eef3fe 0%, #faf9f7 46%, #faf9f7 100%)",
          backgroundColor: "#faf9f7",
          padding: "80px",
          fontFamily: "Inter",
        }}
      >
        <div
          style={{
            display: "flex",
            // A name is set in the site's UI face; a category label is set in
            // the mono the rails and section labels use. The tracking is what
            // makes both read as a label rather than a stray line of copy.
            fontFamily: eyebrowFace === "sans" ? "Inter" : "JetBrains Mono",
            fontWeight: 500,
            fontSize: 24,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#61656f",
          }}
        >
          {eyebrow}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              whiteSpace: "pre-wrap",
              fontWeight: 500,
              fontSize: 92,
              lineHeight: 1.08,
              letterSpacing: -3,
              // background-clip: text against a transparent fill, so the
              // heading picks up the same left-to-right slate gradient the
              // hero h1 does rather than a flat approximation of it.
              backgroundImage:
                "linear-gradient(100deg, #06263b 0%, #4e718c 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            {title}
          </div>
          {subtitle && (
            <div
              style={{
                display: "flex",
                marginTop: 28,
                fontSize: 30,
                lineHeight: 1.4,
                color: "#61656f",
              }}
            >
              {clamp(subtitle)}
            </div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div
            style={{
              display: "flex",
              width: 160,
              height: 6,
              borderRadius: 3,
              background: "#2f6bf0",
            }}
          />
          {footer && (
            <div
              style={{
                display: "flex",
                fontFamily: "JetBrains Mono",
                fontSize: 24,
                color: "#61656f",
              }}
            >
              {footer}
            </div>
          )}
        </div>
      </div>
    ),
    { ...SIZE, fonts: await fonts },
  );
}
