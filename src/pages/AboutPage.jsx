import { PROCESS, VALUES, INDUSTRIES, CONTACT } from "../data/company";
import { Link } from "react-router-dom";
import FeatureCard from "../components/FeatureCard/FeatureCard";
import Reveal from "../components/Reveal/Reveal";
import TiltCard from "../components/TiltCard/TiltCard";
import img1 from "../assets/media/PE_1011208_4bb8009ec7.jpg";
import img2 from "../assets/media/PH_208267_7706f9c2d0.jpg";
import img6 from "../assets/media/PH_210082_3b5094b6b6.jpg";
import img7 from "../assets/media/PH_210111_cca4f68015.jpg";
import img9 from "../assets/media/PH_300363_f50a239561.jpg";
import img10 from "../assets/media/Make_Space_For_What_You_Love_Poster_a94620d3bf.png";
import "./company.css";
import "./about.css";

const STORY_CARDS = [
  {
    eyebrow: "WHERE IDEAS BECOME REALITY",
    title: "Every project begins with an idea.",
    image: img1,
  },
  {
    eyebrow: "OUR WORK CAN MOVE THROUGH MULTIPLE STAGES",
    title:
      "IDEA → STRATEGY → CONCEPT → BRAND → SPACE → PRODUCTION → MARKETING → EXPERIENCE",
    image: img2,
  },
  {
    eyebrow: "FROM THE STREET TO THE INTERIOR",
    title:
      "The exterior introduces the identity and the interior continues the story.",
    image: img6,
  },
  {
    eyebrow: "FROM DIGITAL DESIGN TO PHYSICAL REALITY",
    title: "Our strength is the connection between design and production.",
    image: img9,
  },
];

export default function AboutPage() {
  return (
    <main id="main" className="co-page">
      <div className="page-hero page-hero--blue">
        <div className="container">
          <p className="page-eyebrow">Who we are</p>
          <h1>About INTAMBWE Creative Space</h1>
          <p className="page-intro">
            A multidisciplinary creative design and business solutions company
            dedicated to transforming ideas into meaningful brands, functional
            spaces and memorable experiences.
          </p>
        </div>
      </div>

      {/* Manifesto parallax card */}
      <section className="container ab-manifesto">
        <FeatureCard
          eyebrow="INTAMBWE means step"
          title="We don't just design what a business looks like. We help shape how it is experienced."
          image={img10}
          cta="HOW WE WORK"
          to="#how-we-work"
          size="full"
          parallax
        />
      </section>

      {/* Story cards with tilt */}
      <section className="container ab-story">
        <div className="ab-story-grid">
          {STORY_CARDS.map((c, i) => (
            <Reveal key={c.title} delay={i * 80}>
              <TiltCard max={8} className="ab-story-outer">
                <FeatureCard {...c} />
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Vision / mission split */}
      <section className="container co-block co-grid-2">
        <Reveal dir="left">
          <div className="ab-big-block">
            <h2>Our vision</h2>
            <p>
              To become a leading African creative company recognized for
              transforming ambitious ideas into distinctive brands, innovative
              spaces and successful business experiences.
            </p>
          </div>
        </Reveal>
        <Reveal dir="right">
          <div className="ab-big-block">
            <h2>Our mission</h2>
            <p>
              To provide creative, practical and commercially relevant solutions
              that help businesses build strong identities, create better
              environments and communicate with impact.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Values — 3D tilt cards */}
      <section className="container co-block">
        <Reveal>
          <h2>Our values</h2>
        </Reveal>
        <div className="ab-values">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i * 60}>
              <TiltCard max={9} className="ab-value-outer">
                <div className="ab-value-card">
                  <span className="ab-value-num">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3>{v.title}</h3>
                  <p>{v.text}</p>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Process — horizontal progress rail */}
      <section className="co-section-dark" id="how-we-work">
        <div className="container">
          <Reveal>
            <h2>How we work</h2>
          </Reveal>
          <ol className="ab-process">
            {PROCESS.map((step, i) => (
              <Reveal key={step.num} delay={i * 70} as="li">
                <span className="co-process-num">{step.num}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
                <span className="ab-process-rail" aria-hidden="true" />
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Industries — parallax cards */}
      <section className="container co-block">
        <Reveal>
          <h2>DESIGN WITHOUT LIMITS</h2>
          <p>
            Our multidisciplinary approach allows us to work across different
            sectors.
          </p>
        </Reveal>
        <div className="ab-industries">
          {INDUSTRIES.map((i, idx) => (
            <Reveal key={i.title} delay={idx * 60}>
              <FeatureCard
                eyebrow={i.text}
                title={i.title}
                image={[img1, img2, img6, img7, img9, img10, img1][idx % 7]}
                to="/contact"
              />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="home-section--yellow co-promise">
        <div className="container">
          <Reveal>
            <h2>ONE STEP FURTHER</h2>
            <p className="co-promise-lead">
              INTAMBWE means step. Every project should take a business one step
              further — in identity, creativity, professionalism, customer
              experience and growth.
            </p>
            <p className="co-promise-strong">
              WE DON'T JUST CREATE DESIGNS.
              <br />
              WE CREATE THE NEXT STEP FOR YOUR BUSINESS.
            </p>
            <Link to="/contact" className="btn-primary co-btn">
              LET'S BUILD SOMETHING →
            </Link>
            <p className="co-final-note">
              {CONTACT.contactPerson} · {CONTACT.role} · {CONTACT.phone} ·{" "}
              {CONTACT.country}
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
