/**
 * The site's own glyphs. Squared terminals and mitred joins to match the "K"
 * in icon.svg; Lucide's rounded caps read as a different hand.
 */
function Glyph({ className, children }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="square"
      strokeLinejoin="miter"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export function ArrowUpRight({ className }) {
  return (
    <Glyph className={className}>
      <path d="M7 17 17 7" />
      <path d="M8.5 7H17v8.5" />
    </Glyph>
  );
}
