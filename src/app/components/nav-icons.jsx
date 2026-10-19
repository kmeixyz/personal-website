/**
 * The top bar's glyphs: one per destination, plus the two that sit in the
 * circles at the right.
 *
 * Drawn to the section dock's rules rather than the site's other icon set -
 * 24-unit box, no fill, round caps and joins, 1.7 stroke from `currentColor` -
 * because these share a glass pane with nothing else, and the two docks have
 * to read as one control that appears twice on the page. `icons.jsx` is the
 * squared, mitred hand used inline in prose; mixing them inside the glass is
 * what would show.
 *
 * A glyph is never the only label here: the bar spells out whichever
 * destination it is on, and the name is in the markup beside every one of
 * them either way.
 */
function Glyph({ children }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

/** Briefcase - literally the one /experience uses for its Work section, on
    purpose: the destination and the section it opens on are the same idea, so
    it is re-exported rather than redrawn and the two cannot drift apart. */
export { WorkIcon as ExperienceIcon } from "@/app/components/section-icons";

/** Folder with its tab. Nothing on /projects uses a folder, so the two docks
    never show the same glyph twice on that page. */
export function ProjectsIcon() {
  return (
    <Glyph>
      <path d="M3.25 6.9a1.65 1.65 0 0 1 1.65-1.65h3.6l2 2.6h8.6a1.65 1.65 0 0 1 1.65 1.65v7.6a1.65 1.65 0 0 1-1.65 1.65H4.9a1.65 1.65 0 0 1-1.65-1.65Z" />
    </Glyph>
  );
}

/** House. Home is both the landing route and the first destination in the
    navigation, so the glyph mirrors the label directly. */
export function HomeIcon() {
  return (
    <Glyph>
      <path d="m3.75 10.75 8.25-7 8.25 7" />
      <path d="M5.75 9.2v10.55h12.5V9.2" />
      <path d="M9.6 19.75v-6.1h4.8v6.1" />
    </Glyph>
  );
}

/** Envelope, flap folded down. */
export function MailIcon() {
  return (
    <Glyph>
      <rect x="2.75" y="5.25" width="18.5" height="13.5" rx="2.6" />
      <path d="m4.6 8.4 6.28 4.5a1.95 1.95 0 0 0 2.24 0l6.28-4.5" />
    </Glyph>
  );
}

/** Sheet with a turned corner and two lines of type. */
export function ResumeIcon() {
  return (
    <Glyph>
      <path d="M6.4 3.75h6.7l4.5 4.5v12a1.5 1.5 0 0 1-1.5 1.5h-9.7a1.5 1.5 0 0 1-1.5-1.5V5.25a1.5 1.5 0 0 1 1.5-1.5Z" />
      <path d="M13 3.9V8.4h4.5" />
      <path d="M9 13.4h6M9 16.6h4" />
    </Glyph>
  );
}
