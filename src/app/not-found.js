import Link from "next/link";
import { NAV_LINKS, EMAIL } from "@/app/lib/site";

export const metadata = {
  title: "Not found",
  description: "That page doesn't exist.",
};

export default function NotFound() {
  return (
    <section className="mx-auto grid max-w-6xl grid-cols-1 gap-x-10 px-6 py-16 md:grid-cols-[9rem_1fr] md:py-24">
      <p className="rail mb-4 md:mb-0 md:pt-4">404</p>

      <div>
        <h1 className="max-w-[16ch] text-[clamp(2rem,4.5vw,3rem)] leading-[1.08]">
          Page not found
        </h1>

        <p className="mt-4 max-w-[52ch] text-[1.05rem] leading-relaxed text-ink-2">
          The link may be out of date, or the address may have a typo in it.
          Everything that does exist is one of these:
        </p>

        <nav className="mt-8 border-t border-line">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="group grid grid-cols-1 items-baseline gap-x-10 border-b border-line py-4 md:grid-cols-[9rem_1fr]"
            >
              <span className="rail mb-0.5 block md:mb-0">{l.href}</span>
              <span className="flex items-baseline gap-2">
                <span className="font-serif text-[1.15rem] font-medium text-ink">
                  {l.label}
                </span>
                <span
                  aria-hidden="true"
                  className="text-faint transition-colors duration-200 ease-[var(--ease-authored)] group-hover:text-accent"
                >
                  →
                </span>
              </span>
            </Link>
          ))}
        </nav>

        <p className="meta mt-8">
          Think something should be here?{" "}
          {/* `.tap` for the same reason the hero's link run carries it: the
              label alone is a 15px-tall target, which a thumb misses. The
              class pads to 44px and hands the space back with a matching
              negative margin, so the sentence doesn't move. */}
          <a
            href={`mailto:${EMAIL}`}
            className="tap text-ink underline decoration-line-2 underline-offset-4 transition-colors hover:decoration-accent"
          >
            Tell me
          </a>
          .
        </p>
      </div>
    </section>
  );
}
