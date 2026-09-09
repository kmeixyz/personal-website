"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy, Mail } from "@/app/components/landing/icons";
import { Reveal } from "@/app/components/motion";

/**
 * Contact closes the landing page with internship availability and direct actions.
 *
 * Click to copy, falling back to a mailto if the clipboard is refused. This
 * used to be one of two implementations; the other, components/ContactCopy.jsx,
 * served the pre-landing routes and has been removed now that nothing renders
 * it.
 */
export default function ContactPanel({ email, linkedin, github }) {
  const [copied, setCopied] = useState(false);
  const resetTimer = useRef(null);

  // Clear any pending reset on unmount, so a click followed by a navigation
  // doesn't leave a timer setting state on a component that has gone.
  useEffect(() => () => clearTimeout(resetTimer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      // Restart the countdown on every click, or an earlier click's timer
      // clears the confirmation while it should still be up.
      clearTimeout(resetTimer.current);
      resetTimer.current = setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    /* `#contact` is a real destination - the top bar's right-hand pane points
       at it - so the anchor sits on the section and carries the same
       scroll-margin every other anchor on the site does, to land clear of the
       fixed bar rather than under it. */
    <section id="contact" className="lp-section lp-section--tight scroll-mt-24">
      <Reveal className="lp-wrap" duration={900} rootMargin="0px 0px -28% 0px">
        <div className="lp-panel">
          <div className="home-contact-heading">
            <h2>Let’s put that curiosity to work</h2>
          </div>
          <div className="home-contact-actions">
            <button
              type="button"
              onClick={copy}
              className="lp-copy"
              aria-label={copied ? "Email copied" : `Copy email: ${email}`}
            >
              {/* aria-live on the text alone, so the label swap is announced
                  without the whole control being re-read. */}
              <span aria-live="polite" className="lp-copy__text">
                {copied ? "Copied to clipboard" : email}
              </span>
              <span className="lp-copy__icon">
                {copied ? (
                  <Check className="text-[var(--lp-blue)]" />
                ) : (
                  <Copy />
                )}
              </span>
            </button>

            <a href={`mailto:${email}`} className="lp-btn lp-btn--primary">
              <Mail />
              Email me
            </a>
          </div>

          <div className="home-contact-socials">
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="home-text-link"
            >
              GitHub
            </a>
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="home-text-link"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
