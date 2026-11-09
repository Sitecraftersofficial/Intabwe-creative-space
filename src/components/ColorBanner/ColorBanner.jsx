import { useRef, useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import Reveal from "../Reveal/Reveal";
import "./ColorBanner.css";

/**
 * IKEA-style full-width solid-color banner: big heading + description on the
 * left, and a row of overlapping white mini-cards (the "carousel") that
 * scrolls horizontally on the right/bottom.
 */
export default function ColorBanner({
  color,
  title,
  description,
  items,
  light = true,
}) {
  const trackRef = useRef(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 0);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    update();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  function scrollBy(dir) {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector(".banner-card");
    const amount = card ? card.offsetWidth + 16 : el.clientWidth * 0.6;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  }

  return (
    <section
      className="banner"
      style={{ background: color }}
      data-light={light ? "true" : undefined}
    >
      <div className="container banner-head">
        <div className="banner-copy">
          <h2 className="banner-title">{title}</h2>
          {description && <p className="banner-desc">{description}</p>}
        </div>
        <div className="banner-controls">
          <button
            onClick={() => scrollBy(-1)}
            disabled={!canPrev}
            aria-label="Previous"
          >
            ‹
          </button>
          <button
            onClick={() => scrollBy(1)}
            disabled={!canNext}
            aria-label="Next"
          >
            ›
          </button>
        </div>
      </div>

      <div className="banner-track-wrap">
        <div className="banner-track container" ref={trackRef}>
          {items.map((item, index) => (
            <Reveal
              key={item.title}
              as={Link}
              to={item.to || "/services"}
              className="banner-card"
              delay={index * 100}
            >
              <img src={item.image} alt={item.title} loading="lazy" />
              <span className="banner-card-text">
                <span className="banner-card-eyebrow">{item.eyebrow}</span>
                <span className="banner-card-title">{item.title}</span>
                <span className="banner-card-cta" aria-hidden="true">
                  Explore service <span>→</span>
                </span>
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
