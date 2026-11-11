import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { CONTACT, DISCIPLINES } from "../../data/company";
import logo from "../../assets/logos/intambwelogo.jpeg";
import "./Header.css";

const NAV_ITEMS = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Projects", to: "/projects" },
  { label: "About", to: "/about" },
];

export default function Header() {
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <a href="#main" className="skip-link">
        Skip to main content
      </a>
      <div className="header-inner container">
        <Link to="/" className="header-logo" aria-label="INTAMBWE home">
          <img src={logo} alt="" width="44" height="44" />
          <span className="header-wordmark">
            <span className="header-wordmark-main">INTAMBWE</span>
            <span className="header-wordmark-sub">Creative Space</span>
          </span>
        </Link>

        <nav className="header-nav" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => (
            <Link key={item.to} to={item.to} className="header-nav-link">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <a
            href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
            className="header-store-btn"
            title={CONTACT.phone}
          >
            {CONTACT.phone}
          </a>
          <Link to="/contact" className="header-btn header-btn--primary">
            Let's build something
          </Link>
          <Link
            to={user ? "/account" : "/login"}
            className="header-btn header-btn--ghost"
          >
            {user ? user.name || "Account" : "Sign in"}
          </Link>
          <button
            className="header-burger"
            type="button"
            aria-label={menuOpen ? "Close main menu" : "Open main menu"}
            aria-expanded={menuOpen}
            aria-controls="header-mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          id="header-mobile-menu"
          className="header-mobile-menu"
          aria-label="Mobile navigation"
        >
          {NAV_ITEMS.map((item) => (
            <Link key={item.to} to={item.to} onClick={() => setMenuOpen(false)}>
              {item.label}
            </Link>
          ))}
          <Link to="/contact" onClick={() => setMenuOpen(false)}>
            Let's build something
          </Link>
          <Link
            to={user ? "/account" : "/login"}
            onClick={() => setMenuOpen(false)}
          >
            {user ? user.name || "Account" : "Sign in"}
          </Link>
          <a
            className="header-mobile-phone"
            href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
          >
            {CONTACT.phone}
          </a>
          <span className="header-mobile-showroom">
            {CONTACT.name} · {DISCIPLINES.slice(0, 3).join(" · ")}
          </span>
        </nav>
      )}
    </header>
  );
}
