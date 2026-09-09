"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "./icons";

export default function TechHighlights({ items }) {
  const rail = useRef(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  useEffect(() => {
    const element = rail.current;
    const update = () => setEdges({
      start: element.scrollLeft <= 2,
      end: element.scrollLeft + element.clientWidth >= element.scrollWidth - 2,
    });
    update();
    element.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => { element.removeEventListener("scroll", update); observer.disconnect(); };
  }, []);

  const move = (direction) => {
    const element = rail.current;
    const cards = [...element.children];
    // Use real card positions so touch scrolling and button navigation agree.
    const positions = cards.map((card) => card.offsetLeft - cards[0].offsetLeft);
    const target = direction > 0
      ? positions.find((position) => position > element.scrollLeft + 4)
      : positions.findLast((position) => position < element.scrollLeft - 4);
    element.scrollTo({ left: target ?? (direction > 0 ? element.scrollWidth : 0), behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  };

  return (
    <section className="home-highlights" aria-labelledby="toolkit-title">
      <div className="home-highlights-heading">
        <h3 id="toolkit-title">Inside my toolkit</h3>
        <div className="home-gallery-controls" role="group" aria-label="Browse technical highlights">
          <button type="button" className="home-round-control" aria-label="Previous technical highlight" aria-controls="toolkit-gallery" disabled={edges.start} onClick={() => move(-1)}><ArrowRight className="home-arrow-back" /></button>
          <button type="button" className="home-round-control" aria-label="Next technical highlight" aria-controls="toolkit-gallery" disabled={edges.end} onClick={() => move(1)}><ArrowRight /></button>
        </div>
      </div>
      <div id="toolkit-gallery" ref={rail} className="home-highlight-rail" role="region" aria-roledescription="carousel" aria-label="Technical highlights" tabIndex={0} onKeyDown={(event) => {
        if (event.target !== event.currentTarget) return;
        if (event.key === "ArrowRight" || event.key === "ArrowLeft") { event.preventDefault(); move(event.key === "ArrowRight" ? 1 : -1); }
      }}>
        {items.map((item, index) => (
          <article key={item.slug} data-category={item.category} className={`home-highlight-card ${item.stack.length === 0 ? "home-highlight-card--no-stack" : ""}`} aria-label={`${index + 1} of ${items.length}: ${item.title}`}>
            <p className="home-highlight-category">{item.category}</p>
            <h4>{item.title}</h4>
            <p className="home-highlight-copy">{item.lead && <strong>{item.lead} </strong>}{item.copy}</p>
            {item.stack.length > 0 && <ul className="home-highlight-stack" aria-label="Technologies">{item.stack.map((tool) => <li key={tool}>{tool}</li>)}</ul>}
            <Link href={`/projects#${item.slug}`} className="home-capsule-link">View project<ArrowRight /></Link>
          </article>
        ))}
      </div>
    </section>
  );
}
