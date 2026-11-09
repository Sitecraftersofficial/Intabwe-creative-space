import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./FeatureCard.css";

/**
 * IKEA-style feature card: BIG image (or solid color) with text overlaid
 * bottom-left in white. Sizes: "half" (default), "tall", "wide", "full".
 * Can also render as a solid color block (banner) with light text.
 *
 * Motion: cards fade + rise when scrolled into view (staggered via --reveal-delay),
 * and the image has a gentle parallax zoom tied to scroll position.
 */
export default function FeatureCard({
  eyebrow,
  title,
  image,
  color,
  video,
  cta,
  to,
  size = "half",
  playLabel,
  parallax = false,
  reveal = true,
  revealDelay = 0,
}) {
  const cls = ["feature", `feature--${size}`];
  if (color) cls.push("feature--color");
  if (video) cls.push("feature--video");
  if (parallax) cls.push("feature--parallax");
  // Reveal hides cards (opacity: 0) until the observer fires — only use it
  // for hero cards. Grid cards (reveal=false) stay visible from the start.
  if (reveal) cls.push("feature--reveal");
  const ref = useRef(null);

  // Scroll-in reveal: add .is-visible once the card enters the viewport
  useEffect(() => {
    if (!reveal) return;
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.style.transitionDelay = `${revealDelay}ms`;
            el.classList.add("is-visible");
          } else {
            el.classList.remove("is-visible");
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -5% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [revealDelay]);

  // Gentle parallax: image scales as the card passes through the viewport
  useEffect(() => {
    if (!parallax) return;
    const el = ref.current;
    if (!el) return;
    const img = el.querySelector(".feature-img");
    if (!img) return;
    let raf = 0;
    function onScroll() {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const progress = Math.min(
          1,
          Math.max(0, 1 - r.top / window.innerHeight),
        );
        img.style.transform = `scale(${1 + progress * 0.08})`;
      });
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, [parallax]);

  // Grid cards render visible immediately (no scroll-reveal) so a long
  // grid never looks empty. The reveal animation is for hero-adjacent cards.
  useEffect(() => {
    if (reveal) return;
    const el = ref.current;
    if (el) el.style.opacity = "1";
  }, [reveal]);

  const content = (
    <>
      {image && (
        <img className="feature-img" src={image} alt={title} loading="lazy" />
      )}
      {!image && (
        <span
          className="feature-color"
          style={{ background: color }}
          aria-hidden="true"
        />
      )}
      <span className="feature-scrim" aria-hidden="true" />
      <span className="feature-text">
        {eyebrow && <span className="feature-eyebrow">{eyebrow}</span>}
        <span className="feature-title">{title}</span>
        {cta && (
          <span className="feature-cta">
            {cta}
            <span className="feature-cta-arrow">→</span>
          </span>
        )}
      </span>
      {video && (
        <span className="feature-play">
          <span className="feature-play-icon">▶</span>
          {playLabel || "Play video"}
        </span>
      )}
    </>
  );

  return to ? (
    <Link to={to} className={cls.join(" ")} ref={ref}>
      {content}
    </Link>
  ) : (
    <article className={cls.join(" ")} ref={ref}>
      {content}
    </article>
  );
}
