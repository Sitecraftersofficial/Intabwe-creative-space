import { useRef, useState, useEffect, useCallback } from "react";
import "./Carousel.css";

/** Horizontal scroll-snap card row with arrow controls (IKEA-style carousel). */
export default function Carousel({ title, description, items, dark = false }) {
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
    const card = el.querySelector(".carousel-card");
    const amount = card ? card.offsetWidth + 16 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  }

  return (
    <section
      className={`carousel-section ${dark ? "carousel-section--dark" : ""}`}
    >
      <div className="container">
        <div className="carousel-head">
          <div>
            <h2 className="carousel-title">{title}</h2>
            {description && <p className="carousel-desc">{description}</p>}
          </div>
          <div className="carousel-controls">
            <button
              onClick={() => scrollBy(-1)}
              disabled={!canPrev}
              aria-label="Previous slide"
            >
              ‹
            </button>
            <button
              onClick={() => scrollBy(1)}
              disabled={!canNext}
              aria-label="Next slide"
            >
              ›
            </button>
          </div>
        </div>
      </div>
      <div className="carousel-track-wrap">
        <div className="container">
          <a href="#" className="carousel-skip">
            Skip carousel
          </a>
        </div>
        <div className="carousel-track container" ref={trackRef}>
          {items.map((item) => (
            <a key={item.title} href="#" className="carousel-card">
              <div className="carousel-card-media">
                <img src={item.image} alt={item.title} loading="lazy" />
              </div>
              <div className="carousel-card-text">
                <p className="carousel-card-eyebrow">
                  {item.eyebrow || item.name}
                </p>
                <h3 className="carousel-card-title">{item.title}</h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
