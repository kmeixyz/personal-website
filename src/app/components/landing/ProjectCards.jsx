import { Stagger, StaggerItem } from "@/app/components/motion";
import DetectorVideo from "@/app/components/landing/DetectorVideo";

/**
 * The featured pair, as the reference's two-card row: one saturated card and
 * one on the off-white surface, side by side, each carrying a heading, a line
 * of prose and a view of the thing itself.
 *
 * The mock is the part worth being explicit about. The reference fills that
 * slot with a screenshot of its own product. The scanner uses a small diagram
 * built from its recorded achievements; the detector uses the supplied demo
 * video so visitors can see the real interaction.
 */

/* One plate per featured slug. Keyed by slug rather than positioned by index
   so reordering FEATURED in page.js can't hand the scanner the detector's
   diagram. A slug with no entry here falls back to no plate at all. */
const PLATES = {
  "vulnerability-scanner": ScannerPlate,
  "phishing-detector": DetectorPlate,
};

export default function ProjectCards({ projects }) {
  return (
    <Stagger gap={0.08} duration={720} className="grid gap-6 md:grid-cols-2">
      {projects.map((p, i) => {
        const Plate = PLATES[p.slug];
        // The blue card leads. One per row is the whole point of the
        // reference's pairing: two would fight, none would flatten the row.
        const blue = i === 0;

        return (
          <StaggerItem key={p.slug} className="flex">
            <article
              className={`lp-card w-full ${
                blue ? "lp-card--blue" : ""
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <span className="lp-eyebrow">{p.category}</span>
                {p.status && (
                  <span
                    className={`lp-eyebrow rounded-full px-2.5 py-1 ${
                      blue
                        ? "bg-white/20 text-white"
                        : "bg-[var(--lp-surface-2)] text-[var(--lp-muted)]"
                    }`}
                  >
                    {p.status}
                  </span>
                )}
              </div>

              <div className="mt-5">
                <h3 className="lp-h3">{p.title}</h3>
              </div>

              <p className="lp-body mt-3">{p.blurb}</p>

              {Plate && (
                <div className="mt-6">
                  <Plate blue={blue} />
                </div>
              )}

              {/* mt-auto pins the footer to the bottom edge of whichever card
                  is shorter, so the two stack rows line up across the pair
                  even when the blurbs run to different lengths. */}
              <div className="mt-auto flex flex-wrap items-center gap-x-2 gap-y-2 pt-6">
                {(p.stack ?? []).slice(0, 4).map((s) => (
                  <span
                    key={s}
                    className={`rounded-lg px-2 py-1 text-[0.75rem] font-medium ${
                      blue
                        ? "bg-white/15 text-white/90"
                        : "border border-[var(--lp-line)] bg-white text-[var(--lp-muted)]"
                    }`}
                  >
                    {s}
                  </span>
                ))}
              </div>

            </article>
          </StaggerItem>
        );
      })}
    </Stagger>
  );
}

/* ---------- Project previews ---------- */

/** Severity counts against the practice app, as a small stacked bar. */
function ScannerPlate({ blue }) {
  /* Straight off the project's own numbers: the practice app's 34 counted
     issues, plus the 9 ZAP alerts kept out because they could not be
     re-proven. The bar is those two figures and nothing else - no invented
     severity split. */
  const proven = 34;
  const total = proven + 9;
  const pct = Math.round((proven / total) * 100);

  const verdicts = [
    ["Reflected XSS", "re-proven"],
    ["SQL injection", "re-proven"],
    ["Session fixation", "unproven"],
  ];

  return (
    <div className="lp-plate" aria-hidden="true">
      <div className="flex items-baseline justify-between">
        <span className="text-[0.75rem] font-semibold tracking-[0.08em] uppercase opacity-70">
          Retest verdicts
        </span>
        <span className="lp-nums text-[0.8125rem] font-semibold tabular-nums">
          {proven}/{total}
        </span>
      </div>

      <div
        className={`mt-3 h-2 overflow-hidden rounded-full ${
          blue ? "bg-white/25" : "bg-[var(--lp-surface-2)]"
        }`}
      >
        {/* Width is inline because it is data, not design: it is the ratio
            above, and a Tailwind class would freeze it at a literal. */}
        <div
          className={`h-full rounded-full ${blue ? "bg-white" : "bg-[var(--lp-blue)]"}`}
          style={{ width: `${pct}%` }}
        />
      </div>

      <div className="mt-4 space-y-2">
        {verdicts.map(([name, verdict]) => {
          const unproven = verdict === "unproven";
          // Four combinations of ink, so it is spelled out rather than nested
          // into the class template.
          let dot;
          if (blue) {
            dot = unproven ? "bg-white/50" : "bg-white";
          } else {
            dot = unproven ? "bg-[var(--lp-faint)]" : "bg-[var(--lp-blue)]";
          }

          return (
            <div
              key={name}
              className="flex items-center justify-between text-[0.8125rem]"
            >
              <span className="opacity-85">{name}</span>
              <span
                className={`inline-flex items-center gap-1.5 opacity-70 ${
                  unproven ? "italic" : ""
                }`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
                {verdict}
              </span>
            </div>
          );
        })}
      </div>

      {/* The control-shop result, which is the scanner's other headline
          number (see `achievements` in lib/projects.js). It earns its place
          twice over: it is the claim that makes the 34/43 above mean
          anything - a scanner that finds everything and also cries wolf has
          proved nothing - and it brings this plate to within a few pixels of
          the detector's opposite, which is what closes the dead band the
          shorter card was leaving above its tag row. */}
      <p
        className={`mt-4 border-t pt-3 text-[0.75rem] ${
          blue ? "border-white/20 opacity-70" : "border-[var(--lp-line)] text-[var(--lp-faint)]"
        }`}
      >
        Only one issue, plain HTTP, on a control shop written correctly
      </p>
    </div>
  );
}

/** The working detector demo supplied for the project. Its own component
    because it has to watch the viewport to decide when the file is worth
    fetching, and this one stays server-rendered. */
function DetectorPlate() {
  return <DetectorVideo />;
}
