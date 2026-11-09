import { Link } from "react-router-dom";
import { CONTACT, DISCIPLINES } from "../../data/company";
import "./Footer.css";

const NAV_A = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Projects", to: "/projects" },
  { label: "Who we are", to: "/about" },
  { label: "Let's build something", to: "/contact" },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-main">
          <div className="footer-about">
            <p className="footer-eyebrow">INTAMBWE CREATIVE SPACE</p>
            <h2>FROM IDEA TO EXPERIENCE.</h2>
            <p className="footer-disciplines">{DISCIPLINES.join(" | ")}</p>
          </div>

          <div className="footer-contact">
            <h3>{CONTACT.contactPerson}</h3>
            <p>{CONTACT.role}</p>
            <a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}>
              {CONTACT.phone}
            </a>
            <p>{CONTACT.country}</p>
          </div>

          <nav className="footer-nav" aria-label="Footer navigation">
            {NAV_A.map((item) => (
              <Link key={item.to} to={item.to}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">
            © {new Date().getFullYear()} INTAMBWE Creative Space
          </p>
          <p className="footer-credit">
            Made in Rwanda by{" "}
            <a
              href="https://www.sitecraftersltd.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Sitecrafters Team
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
