import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { CONTACT } from "../data/company";
import heroVideo from "../assets/media/startpage_hero_into_2_opt_c73d808bca.mp4";
import "./Auth.css";

export default function LoginPage() {
  const { continueAsGuest } = useAuth();
  const navigate = useNavigate();

  function onContinue() {
    continueAsGuest();
    navigate("/account");
  }

  return (
    <main className="auth-page" id="main">
      <div className="auth-hero">
        <video src={heroVideo} autoPlay loop muted playsInline />
        <div className="auth-hero-overlay">
          <p className="auth-hero-brand">INTAMBWE Creative Space</p>
          <h2>From idea to experience.</h2>
          <p className="auth-hero-loc">{CONTACT.contactPerson} · {CONTACT.phone}</p>
        </div>
      </div>

      <div className="auth-panel">
        <div className="auth-panel-inner">
          <h1>Welcome back</h1>
          <p className="auth-sub">
            Demo access is enabled. Continue without entering any details.
          </p>

          <button
            type="button"
            className="btn-primary auth-submit"
            onClick={onContinue}
          >
            Continue to dashboard
          </button>

          <Link to="/signup" className="auth-secondary-btn">
            Create an account
          </Link>

          <p className="auth-fine">
            Demo access does not require authentication.
          </p>
        </div>
      </div>
    </main>
  );
}
