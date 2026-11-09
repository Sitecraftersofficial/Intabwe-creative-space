import { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import "./SlideShow.css";

/**
 * IKEA-style hero slideshow: full-bleed slides (image or video),
 * text + yellow button bottom-left, dots + arrows, autoplay with pause.
 */
export default function SlideShow({
  slides,
  height = "clamp(26rem, 78vh, 44rem)",
}) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const videoRef = useRef(null);
  const touchX = useRef(null);

  const go = useCallback(
    (dir) => setIndex((i) => (i + dir + slides.length) % slides.length),
    [slides.length],
  );

  // autoplay rotation
  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => go(1), 6000);
    return () => clearInterval(t);
  }, [playing, go, index]);

  // keep the active video in sync with play/pause
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (playing) v.play().catch(() => {});
    else v.pause();
  }, [index, playing]);

  function onTouchStart(e) {
    touchX.current = e.touches[0].clientX;
  }
  function onTouchEnd(e) {
    if (touchX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
    touchX.current = null;
  }

  return (
    <section
      className="slideshow"
      style={{ "--ss-height": height }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      aria-roledescription="carousel"
      aria-label="Featured stories"
    >
      {slides.map((s, i) => (
        <div
          key={s.title}
          className={`slide ${i === index ? "is-active" : ""}`}
          aria-hidden={i !== index}
        >
          {s.video ? (
            i === index ? (
              <video
                ref={videoRef}
                className="slide-img"
                src={s.video}
                autoPlay
                loop
                muted
                playsInline
              />
            ) : (
              <video className="slide-img" src={s.video} muted loop playsInline />
            )
          ) : (
            <img
              className="slide-img"
              src={s.image}
              alt={s.title}
              loading={i === 0 ? "eager" : "lazy"}
            />
          )}
          <span className="slide-scrim" aria-hidden="true" />
          <span className="slide-text">
            <span className="slide-eyebrow">{s.eyebrow}</span>
            <span className="slide-title">{s.title}</span>
            {s.button && (
              <Link to={s.button.to} className="slide-btn" tabIndex={i === index ? 0 : -1}>
                {s.button.label}
                <span className="slide-btn-arrow" aria-hidden="true">→</span>
              </Link>
            )}
          </span>
        </div>
      ))}

      <div className="slide-controls container">
        <button className="slide-arrow" onClick={() => go(-1)} aria-label="Previous slide">‹</button>
        <button className="slide-arrow" onClick={() => go(1)} aria-label="Next slide">›</button>
        <div className="slide-dots" role="tablist" aria-label="Slides">
          {slides.map((s, i) => (
            <button
              key={s.title}
              role="tab"
              aria-selected={i === index}
              aria-label={`Go to slide ${i + 1}: ${s.title}`}
              className={`slide-dot ${i === index ? "is-active" : ""}`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
        <button
          className="slide-pause"
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? "Pause slideshow" : "Play slideshow"}
        >
          {playing ? "❚❚" : "▶"}
        </button>
      </div>
    </section>
  );
}
