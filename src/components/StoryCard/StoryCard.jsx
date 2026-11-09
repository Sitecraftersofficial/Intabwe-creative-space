import { Link } from "react-router-dom";
import "./StoryCard.css";

/**
 * IKEA-style story card: image on top, eyebrow + title + arrow CTA below.
 * Uniform size — the whole grid is equal columns/rows (like ikea.com).
 */
export function Tile({ eyebrow, title, image, video, cta, to = "#" }) {
  return (
    <Link to={to} className="tile">
      <span className="tile-media">
        <img
          className="tile-img"
          src={image}
          alt={`${eyebrow} — ${title}`}
          loading="lazy"
        />
        {video && (
          <span className="tile-play">
            <span className="tile-play-icon">▶</span>
            Play video
          </span>
        )}
      </span>
      <span className="tile-text">
        <span className="tile-eyebrow">{eyebrow}</span>
        <span className="tile-title">{title}</span>
        {cta && (
          <span className="tile-cta">
            {cta}
            <span className="tile-cta-arrow">→</span>
          </span>
        )}
      </span>
    </Link>
  );
}

export function TileGrid({ items }) {
  return (
    <div className="tile-grid">
      {items.map((item) => (
        <Tile key={item.title} {...item} />
      ))}
    </div>
  );
}
