import { PROJECTS, CONTACT } from "../data/company";
import { Link } from "react-router-dom";
import { useRef, useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import Reveal from "../components/Reveal/Reveal";
import img1 from "../assets/media/PE_1011208_4bb8009ec7.jpg";
import img2 from "../assets/media/PH_208267_7706f9c2d0.jpg";
import img5 from "../assets/media/PH_209274_28dc7fb7a6.jpg";
import img6 from "../assets/media/PH_210082_3b5094b6b6.jpg";
import img7 from "../assets/media/PH_210111_cca4f68015.jpg";
import img9 from "../assets/media/PH_300363_f50a239561.jpg";
import "./company.css";
import "./projects.css";

const IMAGES = [img1, img2, img9, img6, img7, img5];
const COLORS = ["#111", "#0058a3", "#222222", "#0058a3", "#111111", "#111"];

/* Filmstrip: horizontal gallery the user drags/scrolls through */
function Filmstrip({ active, onPick }) {
  const ref = useRef(null);
  const touchX = useRef(null);

  const go = useCallback(
    (dir) => {
      const el = ref.current;
      if (!el) return;
      const card = el.querySelector(".film-card");
      const amount = card ? card.offsetWidth + 12 : 300;
      el.scrollBy({ left: dir * amount, behavior: "smooth" });
    },
    [],
  );

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
    <div className="film">
      <div className="film-nav container">
        <button onClick={() => go(-1)} aria-label="Previous project">‹</button>
        <button onClick={() => go(1)} aria-label="Next project">›</button>
      </div>
      <div
        className="film-track"
        ref={ref}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {PROJECTS.map((p, i) => (
          <button
            key={p.id}
            className={`film-card ${i === active ? "is-active" : ""}`}
            onClick={() => onPick(i)}
            aria-label={`Show ${p.title}`}
          >
            <img src={IMAGES[i % IMAGES.length]} alt={p.title} loading="lazy" />
            <span className="film-card-name">{p.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  const location = useLocation();
  const [active, setActive] = useState(() => {
    const projectIndex = PROJECTS.findIndex(
      (project) => project.id === location.hash.slice(1),
    );
    return projectIndex >= 0 ? projectIndex : 0;
  });
  const p = PROJECTS[active];
  const color = COLORS[active % COLORS.length];

  useEffect(() => {
    const projectIndex = PROJECTS.findIndex(
      (project) => project.id === location.hash.slice(1),
    );
    if (projectIndex < 0) return;
    setActive(projectIndex);
  }, [location.hash]);

  return (
    <main id="main" className="co-page pj-page">
      {/* Gallery stage: one giant case at a time */}
      <section className="pj-stage" style={{ background: color }}>
        <div className="container pj-stage-inner">
          <Reveal key={`media-${active}`} dir="left" className="pj-stage-media-reveal">
            <figure className="pj-stage-media">
              <img src={IMAGES[active % IMAGES.length]} alt={p.title} />
            </figure>
          </Reveal>
          <Reveal key={`copy-${active}`} dir="right" className="pj-stage-copy-reveal">
            <div className="pj-stage-copy">
              <p className="pj-stage-tags">{p.tags}</p>
              <h1 className="pj-stage-title">{p.title}</h1>
              <p className="pj-stage-blurb">{p.blurb}</p>
              <div className="pj-stage-chips">
                {p.deliverables.map((d) => (
                  <span key={d}>{d}</span>
                ))}
              </div>
              <div className="pj-stage-actions">
                <Link to="/contact" className="btn-primary pj-stage-btn">
                  Start something like this →
                </Link>
                <span className="pj-stage-counter">
                  {String(active + 1).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")}
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Filmstrip selector */}
      <Filmstrip active={active} onPick={setActive} />

      {/* Wide mosaic of all work */}
      <section className="container pj-mosaic-wrap">
        <Reveal>
          <div className="pj-section-head">
            <h2>A MULTIDISCIPLINARY BODY OF WORK</h2>
            <p>
              Our portfolio reflects the different ways Intambwe Creative
              Space can support a client.
            </p>
          </div>
        </Reveal>
        <div className="pj-mosaic">
          {PROJECTS.map((pr, i) => (
            <Reveal
              key={pr.id}
              as="button"
              type="button"
              id={pr.id}
              className={`pj-mosaic-item ${
                i === active ? "is-active" : ""
              } ${
                i === 0
                  ? "pj-mosaic-item--full"
                  : i === 1
                    ? "pj-mosaic-item--large"
                    : i === 2
                      ? "pj-mosaic-item--small"
                      : i === 3
                        ? "pj-mosaic-item--small"
                        : i === 4
                          ? "pj-mosaic-item--mid"
                          : "pj-mosaic-item--small"
              }`}
              delay={i * 70}
              onClick={() => {
                setActive(i);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <img src={IMAGES[i % IMAGES.length]} alt={pr.title} loading="lazy" />
              <span className="pj-mosaic-label">
                <span className="pj-mosaic-tags">{pr.tags}</span>
                <span className="pj-mosaic-title">{pr.title}</span>
                <span className="pj-mosaic-arrow" aria-hidden="true">→</span>
              </span>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container co-final">
        <Reveal>
          <h2>HAVE AN IDEA?</h2>
          <Link to="/contact" className="btn-primary co-btn">
            LET'S BUILD SOMETHING →
          </Link>
          <p className="co-final-note">
            Or call {CONTACT.contactPerson} directly at {CONTACT.phone}.
          </p>
        </Reveal>
      </section>
    </main>
  );
}
