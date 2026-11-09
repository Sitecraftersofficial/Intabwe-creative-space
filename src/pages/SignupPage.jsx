import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { CONTACT } from "../data/company";
import heroVideo from "../assets/media/startpage_hero_into_2_opt_c73d808bca.mp4";
import "./Auth.css";

export default function SignupPage() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      await signup(email, password, name);
      navigate("/account");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <main className="auth-page" id="main">
      <div className="auth-hero">
        <video src={heroVideo} autoPlay loop muted playsInline />
        <div className="auth-hero-overlay">
          <p className="auth-hero-brand">INTAMBWE Creative Space</p>
          <h2>Make your idea real.</h2>
          <p className="auth-hero-loc">{CONTACT.contactPerson} · {CONTACT.phone}</p>
        </div>
      </div>

      <div className="auth-panel">
        <div className="auth-panel-inner">
          <h1>Create account</h1>
          <p className="auth-sub">
            One account to start projects and follow your ideas.
          </p>

          <form className="auth-form" onSubmit={onSubmit}>
            <label>
              Full name
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                placeholder="Your name"
              />
            </label>
            <label>
              Email
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                placeholder="you@example.rw"
              />
            </label>
            <label>
              Password
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                placeholder="At least 6 characters"
              />
            </label>
            {error && (
              <p className="auth-error" role="alert">
                {error}
              </p>
            )}
            <button type="submit" className="btn-primary auth-submit">
              Create account
            </button>
          </form>

          <div className="auth-divider"><span>or</span></div>

          <Link to="/login" className="auth-secondary-btn">
            I already have an account
          </Link>

          <p className="auth-fine">
            By creating an account you agree to our terms and privacy policy.
          </p>
        </div>
      </div>
    </main>
  );
}
