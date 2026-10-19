import Link from "next/link";
import NavDock from "@/app/components/NavDock";
import TopbarShell from "@/app/components/TopbarShell";
import { GlassSheen } from "@/app/components/glass";
import { MailIcon, ResumeIcon } from "@/app/components/nav-icons";
import { RESUME } from "@/app/lib/site";

/**
 * The top bar, in three pieces of the same glass the section dock is cut from:
 * the wordmark at the left, the site index floating in the middle, and the way
 * to reach me at the right.
 *
 * Three panes rather than one bar because they are three different things. A
 * single strip across the top would have to justify the space between them,
 * and glass that wide stops reading as an object sitting on the page and
 * starts reading as a header with a tint.
 *
 * Only the index needs to know anything (which page you are on, which glyph
 * the pointer is over), so only that piece is a client component; the wordmark
 * and the circles are markup. TopbarShell is the <header> itself, client-side
 * so the bar can get out of the way on the way down the page - but it only
 * wraps, and everything inside it is still server-rendered.
 */
export default function Nav() {
  return (
    <TopbarShell>
      <div className="topbar-inner">
        {/* The landing page twice - here and in the index - is deliberate:
            the wordmark is where a reader reaches for it, and the glyph is
            where the row of destinations says it is. */}
        <Link
          href="/"
          className="topbar-piece"
          aria-label="Kevin Mei, home"
        >
          <span className="dock-glass">
            <GlassSheen />
            <span className="topbar-name">
              {/* Both are in the markup and the media query picks one: the
                  full name doesn't fit a phone beside four glyphs and a
                  circle, and the initials are the same mark shortened rather
                  than a different one. Neither is read aloud - the link is
                  labelled above, so a screen reader never hears "KM". */}
              <span className="topbar-name__full" aria-hidden="true">
                Kevin Mei
              </span>
              <span className="topbar-name__short" aria-hidden="true">
                KM
              </span>
            </span>
          </span>
        </Link>

        <NavDock />

        <div className="topbar-side">
          {/* Hidden while site.js has no résumé to point at, the same way the
              old bar hid it, rather than shipping a circle that 404s. */}
          {RESUME && (
            <a
              href={RESUME}
              download
              className="topbar-piece"
              aria-label="Download résumé"
            >
              <span className="dock-glass dock-glass--round">
                <GlassSheen />
                <span className="topbar-icon">
                  <ResumeIcon />
                </span>
              </span>
            </a>
          )}

          {/* Not a mailto. Contact is a section of the landing page now - the
              address, the copy button and LinkedIn all live there - and a bar
              that opens a mail client instead is deciding for the reader how
              they get in touch.

              Built out of `.dock-item` rather than `.topbar-icon`, so it
              carries the index's own behaviour: the same capsule lights under
              it, the same glyph brightens, and the name unfolds from the glyph
              at the same 48rem the destinations do. Which is why the markup
              below is a one-item `.dock-row` - there is nothing to slide
              between, but the capsule, the glyph and the name are the index's
              parts and they are used as they are rather than reproduced. */}
          <Link
            href="/#contact"
            className="topbar-piece topbar-piece--pill"
            aria-label="Contact Kevin Mei"
          >
            <span className="dock-glass dock-glass--round topbar-contact">
              <GlassSheen />
              <span className="dock-row">
                <span className="dock-capsule" aria-hidden="true" />
                <span className="dock-item">
                  <MailIcon />
                  {/* Folded to a glyph below 48rem by the same rule that folds
                      the destinations, and in the markup at every width for
                      the same reason: it is half the link's name. */}
                  <span className="dock-item__name">
                    <span>Contact</span>
                  </span>
                </span>
              </span>
            </span>
          </Link>
        </div>
      </div>
    </TopbarShell>
  );
}
