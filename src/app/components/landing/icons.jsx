/**
 * Glyphs for the landing page only.
 *
 * The site's own set (components/icons.jsx) is drawn with squared terminals
 * and mitred joins to match the "K" in icon.svg. That hand is deliberately
 * wrong here: the reference's icons are round-capped, round-joined and set on
 * a 1.6 stroke, which is what lets a 14px arrow sit inside a line of SF Pro
 * without reading as a different weight to the text around it. Mixing the two
 * sets on one page would show, so the landing page carries its own.
 *
 * Every glyph inherits `currentColor` and sizes from the CSS that places it
 * (`.lp-btn svg`, `.lp-link svg`, `.lp-row-arrow svg`), so none of them take a
 * size prop.
 */
function Glyph({ className, children, strokeWidth = 1.6 }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export function ArrowRight({ className }) {
  return (
    <Glyph className={className}>
      <path d="M4 12h15" />
      <path d="m13 6 6 6-6 6" />
    </Glyph>
  );
}

export function Check({ className }) {
  return (
    <Glyph className={className} strokeWidth={1.9}>
      <path d="m4.5 12.5 5 5L19.5 7" />
    </Glyph>
  );
}

/** Two offset sheets, round-cornered to match the rest of this set. */
export function Copy({ className }) {
  return (
    <Glyph className={className}>
      <rect x="9" y="9" width="11" height="11" rx="2.5" />
      <path d="M15 5.5A1.5 1.5 0 0 0 13.5 4H5.5A1.5 1.5 0 0 0 4 5.5v8A1.5 1.5 0 0 0 5.5 15" />
    </Glyph>
  );
}

export function Mail({ className }) {
  return (
    <Glyph className={className}>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m3.5 7.5 7.4 5.2a2 2 0 0 0 2.2 0l7.4-5.2" />
    </Glyph>
  );
}
