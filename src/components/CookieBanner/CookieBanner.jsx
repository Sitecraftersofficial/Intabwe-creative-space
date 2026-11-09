import { useState, useEffect } from "react";
import "./CookieBanner.css";

const KEY = "intambwe_consent";

export default function CookieBanner({ forceOpen, onClose }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(KEY)) setVisible(true);
  }, []);

  useEffect(() => {
    if (forceOpen) setVisible(true);
  }, [forceOpen]);

  function choose(value) {
    localStorage.setItem(KEY, value);
    setVisible(false);
    if (onClose) onClose();
  }

  if (!visible) return null;

  return (
    <div className="cookie-banner" role="dialog" aria-label="Cookie consent">
      <div className="cookie-banner-inner container">
        <div className="cookie-banner-text">
          <h2>Murakaza neza! You are in control of your cookies.</h2>
          <p>
            We use cookies and similar techniques to keep INTAMBWE working —
            remembering your preferences and helping us improve the site. You may accept analytical cookies or keep only the essential
            ones. Read more in our privacy and cookie statement.
          </p>
        </div>
        <div className="cookie-banner-actions">
          <button className="btn-primary" onClick={() => choose("all")}>
            Accept
          </button>
          <button
            className="cookie-btn-secondary"
            onClick={() => choose("essential")}
          >
            Reject
          </button>
          <button
            className="cookie-btn-secondary"
            onClick={() => choose("custom")}
          >
            Cookie settings
          </button>
        </div>
      </div>
    </div>
  );
}
