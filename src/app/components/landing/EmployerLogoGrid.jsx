"use client";

import { useState } from "react";
import Image from "next/image";
import { Stagger, StaggerItem } from "@/app/components/motion";

function EmployerCard({ employer, category }) {
  const [failed, setFailed] = useState(false);
  const [flipped, setFlipped] = useState(false);

  return (
    <button
      type="button"
      className={`home-employer-card${flipped ? " is-flipped" : ""}`}
      aria-label={`${flipped ? "Hide" : "Show"} details for ${employer.name}`}
      aria-pressed={flipped}
      onClick={() => setFlipped((current) => !current)}
    >
      <span className="home-employer-card-inner">
        <span className="home-employer-face home-employer-front">
          <span className="home-employer-category">{category}</span>
          <span className="home-employer-mark" aria-hidden="true">
            {!failed && (
              <Image
                src={employer.logo}
                alt=""
                fill
                sizes="150px"
                onError={() => setFailed(true)}
              />
            )}
            {failed && <span>{employer.mark}</span>}
          </span>
          <strong className="home-employer-name home-employer-name--mobile">{employer.name}</strong>
          <strong className="home-employer-name home-employer-name--desktop" aria-hidden="true">
            {(employer.desktopLines ?? [employer.name]).map((line) => <span key={line}>{line}</span>)}
          </strong>
          <span className="home-employer-hint">View details</span>
        </span>
        <span className="home-employer-face home-employer-back">
          <span className="home-employer-category">{category}</span>
          <strong>{employer.role}</strong>
          <span className="home-employer-summary">{employer.summary}</span>
          <span className="home-employer-date">{employer.date}</span>
          <span className="home-employer-hint">View logo</span>
        </span>
      </span>
    </button>
  );
}

/* No aria-label on the Stagger below: it renders a plain <div>, and a label on
   a generic element with no role is ignored by screen readers anyway. The
   <section> wrapping this already names the group, through
   aria-labelledby="experience-title". */
export default function EmployerLogoGrid({ groups }) {
  return (
    <Stagger className="home-employer-grid" delay={0.18} gap={0.07} duration={720}>
      {groups.flatMap((group) => group.employers.map((employer) => (
        <StaggerItem key={`${group.label}-${employer.name}`} className="home-employer-grid-item">
          <EmployerCard employer={employer} category={group.label} />
        </StaggerItem>
      )))}
    </Stagger>
  );
}
