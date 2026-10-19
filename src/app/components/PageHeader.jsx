import { Reveal } from "@/app/components/motion";

/**
 * Page masthead. Sets the rail/column grid the rest of the site follows: a
 * narrow left rail for the section label, a wide right column for the words.
 */
export default function PageHeader({ eyebrow, title, lede, titleClassName = "" }) {
  return (
    <header className="border-b border-line">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-x-10 px-6 pb-8 pt-12 md:grid-cols-[9rem_1fr] md:pt-16">
        <Reveal as="p" className="eyebrow mb-3 md:mb-0 md:pt-4">
          {eyebrow}
        </Reveal>

        <div>
          <Reveal
            as="h1"
            delay={0.04}
            className={`max-w-[18ch] text-[clamp(2.25rem,5.5vw,3.75rem)] leading-[1.06] ${titleClassName}`}
          >
            {title}
          </Reveal>

          {lede && (
            <Reveal
              as="p"
              delay={0.08}
              className="mt-4 max-w-[52ch] text-lg text-ink-2"
            >
              {lede}
            </Reveal>
          )}
        </div>
      </div>
    </header>
  );
}
