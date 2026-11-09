import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./SplitFeature.css";

/**
 * Split feature section: big image on one side, heading + text + link list
 * on the other, on a brand-blue background. Visually distinct from the
 * color banner rows — it's a 50/50 editorial block.
 */
export default function SplitFeature({
  color = "#0058a3",
  eyebrow,
  title,
  description,
  links = [],
  image,
  flip = false,
  cta,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add("is-visible");
            io.disconnect();
          }
        });
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      className={`split-feature ${flip ? "split-feature--flip" : ""}`}
      style={{ background: color }}
      ref={ref}
    >
      <div className="container split-feature-inner">
        <div className="split-feature-media">
          <img src={image} alt={title} loading="lazy" />
        </div>
        <div className="split-feature-copy">
          {eyebrow && <p className="split-feature-eyebrow">{eyebrow}</p>}
          <h2 className="split-feature-title">{title}</h2>
          {description && <p className="split-feature-desc">{description}</p>}
          {links.length > 0 && (
            <ul className="split-feature-links">
              {links.map((l) => (
                <li key={l.label}>
                  <Link to={l.to || "/projects"} className="split-feature-link">
                    {l.label}
                    <span
                      className="split-feature-link-arrow"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
          {cta && (
            <Link to={cta.to} className="split-feature-cta">
              {cta.label}
              <span className="split-feature-cta-arrow" aria-hidden="true">
                →
              </span>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
