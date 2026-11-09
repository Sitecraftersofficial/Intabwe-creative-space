import { SERVICES, CONTACT } from "../data/company";
import { Link } from "react-router-dom";
import Reveal from "../components/Reveal/Reveal";
import img1 from "../assets/media/PE_1011208_4bb8009ec7.jpg";
import img2 from "../assets/media/PH_208267_7706f9c2d0.jpg";
import img5 from "../assets/media/PH_209274_28dc7fb7a6.jpg";
import img6 from "../assets/media/PH_210082_3b5094b6b6.jpg";
import img7 from "../assets/media/PH_210111_cca4f68015.jpg";
import img9 from "../assets/media/PH_300363_f50a239561.jpg";
import img10 from "../assets/media/Make_Space_For_What_You_Love_Poster_a94620d3bf.png";
import "./company.css";
import "./services.css";

const IMAGES = [img1, img2, img6, img7, img9, img10, img5, img2];
const COLORS = ["#0058a3", "#0a8a00", "#484848", "#b5490c", "#0058a3", "#0a8a00", "#484848", "#111"];

export default function ServicesPage() {
  return (
    <main id="main" className="co-page svc-page">
      {/* Magazine cover hero */}
      <section className="svc-hero">
        <div className="container svc-hero-inner">
          <Reveal dir="left">
            <div className="svc-hero-copy">
              <p className="page-eyebrow">WHAT WE DO</p>
              <h1>
                OUR CREATIVE
                <br />
                ECOSYSTEM
              </h1>
              <p className="svc-hero-lede">
                Intambwe Creative Space operates across several interconnected
                creative disciplines.
              </p>
              <div className="svc-hero-index">
                {SERVICES.map((s) => (
                  <a key={s.id} href={`#${s.id}`} className="svc-index-link">
                    {s.num}
                    <span>{s.title}</span>
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal dir="right" className="svc-hero-media-reveal">
            <div className="svc-hero-media">
              <img src={img1} alt="INTAMBWE creative work" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Chapters — one per service, alternating, magazine-style */}
      <section className="svc-chapters">
        {SERVICES.map((s, i) => (
          <article
            key={s.id}
            id={s.id}
            className={`svc-chapter ${i % 2 ? "svc-chapter--alt" : ""}`}
            style={{ background: COLORS[i % COLORS.length] }}
          >
            <div className="container svc-chapter-inner">
              <Reveal dir={i % 2 ? "right" : "left"} className="svc-chapter-copy-reveal">
                <span className="svc-chapter-num" aria-hidden="true">
                  {s.num}
                </span>
                <div className="svc-chapter-copy">
                  <h2>{s.title}</h2>
                  <p className="svc-chapter-blurb">{s.blurb}</p>
                  <ul className="svc-chapter-points">
                    {s.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                  <p className="svc-chapter-flow">{s.flow}</p>
                  <Link to="/contact" className="svc-chapter-cta">
                    HAVE AN IDEA? →
                  </Link>
                </div>
              </Reveal>
              <Reveal dir={i % 2 ? "left" : "right"} className="svc-chapter-media-reveal">
                <figure className="svc-chapter-media">
                  <img src={IMAGES[i % IMAGES.length]} alt={s.title} loading="lazy" />
                </figure>
              </Reveal>
            </div>
          </article>
        ))}
      </section>

      <section className="container co-final">
        <Reveal>
          <h2>HAVE AN IDEA?</h2>
          <Link to="/contact" className="btn-primary co-btn">
            LET'S BUILD SOMETHING →
          </Link>
          <p className="co-final-note">
            {CONTACT.contactPerson} · {CONTACT.role} · {CONTACT.phone}
          </p>
        </Reveal>
      </section>
    </main>
  );
}
