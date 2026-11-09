import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { PRODUCT_CATEGORIES } from "../../data/products";
import heroVideo from "../../assets/media/startpage_hero_into_2_opt_c73d808bca.mp4";
import "./HeroSplit.css";

/**
 * IKEA-style hero: big image/video LEFT (~2/3), solid yellow panel RIGHT (~1/3).
 * Text overlaid bottom-left of the media, Go shopping button under it.
 */
export default function HeroSplit({
  eyebrow,
  title,
  note,
  ctaLabel = "Start a project",
  ctaTo = "/contact",
}) {
  const [playing, setPlaying] = useState(true);
  const videoRef = useRef(null);

  function togglePlay() {
    const v = videoRef.current;
    if (!v) return;
    if (playing) v.pause();
    else v.play();
    setPlaying(!playing);
  }

  return (
    <section className="hero-split" id="main">
      <h1 className="sr-only">INTAMBWE Creative Space</h1>

      <div className="hero-split-media">
        <video
          ref={videoRef}
          className="hero-split-video"
          src={heroVideo}
          autoPlay
          loop
          muted
          playsInline
        />
        <span className="hero-split-scrim" aria-hidden="true" />
        <button
          className="hero-split-play"
          onClick={togglePlay}
          aria-label={playing ? "Pause video" : "Play video"}
        >
          {playing ? "❚❚" : "▶"}
        </button>

        <div className="hero-split-text">
          {eyebrow && <p className="hero-split-eyebrow">{eyebrow}</p>}
          <p className="hero-split-title">{title}</p>
          {note && <p className="hero-split-note">{note}</p>}
          <Link to={ctaTo} className="hero-split-btn">
            {ctaLabel}
            <span className="hero-split-btn-arrow" aria-hidden="true">
              →
            </span>
          </Link>
        </div>
      </div>

      <div className="hero-split-panel">
        <div className="hero-panel-content">
          <p className="hero-panel-eyebrow">Explore by category</p>
          <h2 className="hero-panel-title">Find what fits your space.</h2>
          <nav className="hero-panel-categories" aria-label="Shop by category">
            {PRODUCT_CATEGORIES.filter((category) => category !== "All products").map(
              (category) => (
                <Link
                  key={category}
                  to={`/shop?category=${encodeURIComponent(category)}`}
                  className="hero-panel-category"
                >
                  {category}
                  <span aria-hidden="true">↗</span>
                </Link>
              ),
            )}
          </nav>
          <Link to={ctaTo} className="hero-panel-shop">
            {ctaLabel}
            <span className="hero-panel-arrow" aria-hidden="true">
              <svg width="56" height="56" viewBox="0 0 24 24" fill="none">
                <path
                  d="M3 12h15M13.5 5.5 20 12l-6.5 6.5"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
