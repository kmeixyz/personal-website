/**
 * One glyph per section of /experience and /projects, drawn to the same rules
 * as the rest of the site's marks: 24-unit box, no fill, round caps and
 * joins, stroke from `currentColor` so the dock can light them without
 * touching the paths.
 *
 * They are never the only label: the dock spells out whichever section it is
 * on, and every glyph sits beside its name in the markup either way, so a
 * reader who can't place a glyph only has to land on it.
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

/** Briefcase. */
export function WorkIcon() {
  return (
    <Glyph>
      <rect x="2.75" y="7.25" width="18.5" height="13" rx="2.5" />
      <path d="M8.75 7.25V5.5a1.75 1.75 0 0 1 1.75-1.75h3a1.75 1.75 0 0 1 1.75 1.75v1.75" />
      <path d="M2.75 12.5h18.5" />
      <path d="M10.5 12.5h3" />
    </Glyph>
  );
}

/** Mortarboard over its tassel. */
export function EducationIcon() {
  return (
    <Glyph>
      <path d="M12 4.25 22 9l-10 4.75L2 9l10-4.75Z" />
      <path d="M6.5 11.1v4.4c0 1.9 2.46 3.25 5.5 3.25s5.5-1.35 5.5-3.25v-4.4" />
      <path d="M20.5 9.7v4.3" />
    </Glyph>
  );
}

/**
 * Two figures, one behind the other. The section is chairs, scholars and
 * volunteers - things done with other people and for them - so the mark is
 * people rather than a place or a badge. A backpack was an earlier candidate
 * and lost to the mortarboard beside it: both would have said "student".
 *
 * It absorbed the heart-in-hand that used to label a separate Volunteer
 * section. Two figures cover organising and serving both; a heart would have
 * claimed the section was only the second half.
 */
export function CommunityIcon() {
  return (
    <Glyph>
      <circle cx="9.6" cy="9" r="3.1" />
      <path d="M4 19.9a5.6 5.6 0 0 1 11.2 0" />
      <circle cx="17" cy="7.9" r="2.4" />
      <path d="M16.8 13.4a4.7 4.7 0 0 1 4 5.4" />
    </Glyph>
  );
}

/** Award rosette with its two ribbon tails. */
export function CertificationIcon() {
  return (
    <Glyph>
      <circle cx="12" cy="9" r="5.25" />
      <path d="m8.6 13.6-1.6 6.65 5-2.6 5 2.6-1.6-6.65" />
    </Glyph>
  );
}

/* ---------- /projects ----------
   Same box and the same stroke, so the two docks read as one control that
   moved pages rather than two that resemble each other. */

/** Shield with its check - the section is what was defended, not what broke. */
export function SecurityIcon() {
  return (
    <Glyph>
      <path d="M12 3.25 19.25 6v5.4c0 4.3-2.9 7.6-7.25 9.35C7.65 19 4.75 15.7 4.75 11.4V6L12 3.25Z" />
      <path d="m9.2 11.9 2 2 3.6-3.8" />
    </Glyph>
  );
}

/** Gamepad: d-pad left, two buttons right. */
export function GameIcon() {
  return (
    <Glyph>
      <rect x="2.75" y="7.25" width="18.5" height="10.5" rx="4" />
      <path d="M7.6 11v3" />
      <path d="M6.1 12.5h3" />
      <circle cx="15.4" cy="13.4" r="1" />
      <circle cx="17.9" cy="11.2" r="1" />
    </Glyph>
  );
}

/** Four-point sparkle with a smaller one beside it. */
export function AIIcon() {
  return (
    <Glyph>
      <path d="M10.5 5.5c0 3.87 3.13 7 7 7-3.87 0-7 3.13-7 7 0-3.87-3.13-7-7-7 3.87 0 7-3.13 7-7Z" />
      <path d="M18.5 3c0 1.38 1.12 2.5 2.5 2.5-1.38 0-2.5 1.12-2.5 2.5 0-1.38-1.12-2.5-2.5-2.5 1.38 0 2.5-1.12 2.5-2.5Z" />
    </Glyph>
  );
}
