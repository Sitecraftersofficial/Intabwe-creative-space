import HeroSplit from "../components/HeroSplit/HeroSplit";
import FeatureCard from "../components/FeatureCard/FeatureCard";
import ColorBanner from "../components/ColorBanner/ColorBanner";
import SplitFeature from "../components/SplitFeature/SplitFeature";
import ImageCarousel from "../components/ImageCarousel/ImageCarousel";

const carouselOne = [
  {
    eyebrow: "Brand Strategy & Identity",
    title: "A strong brand should be recognizable before its name is read.",
    image: img2,
    to: "/services#branding",
  },
  {
    eyebrow: "Interior Design",
    title: "Designing spaces with purpose",
    image: img6,
    to: "/services#interior",
  },
  {
    eyebrow: "3D Visualization",
    title: "See it before it is built",
    image: img9,
    to: "/services#3d",
  },
];
import img1 from "../assets/media/PE_1011208_4bb8009ec7.jpg";
import img2 from "../assets/media/PH_208267_7706f9c2d0.jpg";
import img5 from "../assets/media/PH_209274_28dc7fb7a6.jpg";
import img6 from "../assets/media/PH_210082_3b5094b6b6.jpg";
import img7 from "../assets/media/PH_210111_cca4f68015.jpg";
import img9 from "../assets/media/PH_300363_f50a239561.jpg";
import img10 from "../assets/media/Make_Space_For_What_You_Love_Poster_a94620d3bf.png";
import "./home.css";

/* Row 1: half + half */
const row1 = [
  {
    eyebrow: "Branding & Logo Design",
    title: "Building identities people remember",
    image: img1,
    cta: "Our branding services",
    to: "/services#branding",
  },
  {
    eyebrow: "Furniture & Fabrication",
    title: "From digital design to physical reality",
    image: img2,
    cta: "Furniture & fabrication",
    to: "/services#fabrication",
  },
];

/* Full-width video card */
const wide = {
  eyebrow: "3D Visualization",
  title: "See it before it is built",
  image: img10,
  video: true,
  cta: "Understand → Review → Improve → Approve → Build",
  to: "/services#3d",
  size: "full",
};

/* Row 3: tall + two stacked */
const row3a = {
  eyebrow: "Interior Design",
  title: "We create interior environments that combine function, atmosphere, identity and visual impact.",
  image: img6,
  cta: "It communicates the brand.",
  to: "/services#interior",
  size: "tall",
};
const row3b = {
  eyebrow: "Exterior & Environmental Branding",
  title: "Making the first impression count",
  image: img7,
  cta: "From the street to the interior",
  to: "/services#exterior",
};
const row3c = {
  eyebrow: "Business-in-a-Box",
  title: "ONE IDEA. ONE CREATIVE DIRECTION. ONE COMPLETE EXPERIENCE.",
  image: img9,
  cta: "Business-in-a-Box",
  to: "/services#business-in-a-box",
};

/* Green banner with white mini-cards */
const banner1 = {
  color: "#0a8a00",
  title: "OUR CREATIVE ECOSYSTEM",
  description:
    "Intambwe Creative Space operates across several interconnected creative disciplines.",
  items: carouselOne,
};

const carouselImages = [
  { src: img1, alt: "Creative interior and brand design" },
  { src: img2, alt: "Branded space designed by INTAMBWE" },
  { src: img5, alt: "Hospitality interior design" },
  { src: img6, alt: "Commercial interior design" },
  { src: img7, alt: "Creative learning environment" },
  { src: img9, alt: "Restaurant and hospitality design" },
];

/* Blue split feature */
const splitLooks = {
  color: "#0058a3",
  eyebrow: "Interior Design",
  title: "DESIGNING SPACES WITH PURPOSE",
  description:
    "We create interior environments that combine function, atmosphere, identity and visual impact.",
  image: img6,
  links: [
    { label: "Restaurants • Nightclubs • VIP lounges", to: "/projects#kawa-edge" },
    { label: "Offices • Schools • Commercial spaces", to: "/projects#zamara" },
    { label: "Building facades • Shopfronts • Outdoor signage", to: "/services#exterior" },
  ],
  cta: { label: "OUR PROJECT PORTFOLIO", to: "/projects" },
};

export default function Home() {
  return (
    <main id="main">
      {/* Hero: media left + yellow panel right */}
      <HeroSplit
        eyebrow="INTAMBWE Creative Space"
        title="From idea to experience"
        note="We transform ideas into brands, spaces, products and experiences that move businesses forward."
        ctaLabel="Shop products"
        ctaTo="/shop"
      />

      {/* Row 1: two big cards (animated on scroll) */}
      <section
        className="container home-row"
        style={{ marginTop: "var(--vertical-spacing-mobile)" }}
      >
        <div className="home-duo">
          {row1.map((c, i) => (
            <FeatureCard key={c.title} {...c} revealDelay={i * 100} />
          ))}
        </div>
      </section>

      {/* Full-width video card */}
      <section className="container home-row">
        <FeatureCard {...wide} revealDelay={100} />
      </section>

      {/* Row 3: tall + two stacked */}
      <section className="container home-row">
        <div className="home-trio">
          <FeatureCard {...row3a} revealDelay={0} />
          <div className="home-stack">
            <FeatureCard {...row3b} revealDelay={100} />
            <FeatureCard {...row3c} revealDelay={200} />
          </div>
        </div>
      </section>

      {/* Section 1: green banner with big white mini-cards */}
      <ColorBanner {...banner1} />

      {/* Section 2: split feature — image left, links right (distinct look) */}
      <SplitFeature {...splitLooks} />

      {/* Image-only showcase strips moving in opposite directions */}
      <ImageCarousel images={carouselImages} />
    </main>
  );
}
