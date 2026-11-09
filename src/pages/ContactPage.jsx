import { useState } from "react";
import { CONTACT, SERVICES } from "../data/company";
import "./company.css";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    service: SERVICES[0].title,
    message: "",
  });

  function onSubmit(e) {
    e.preventDefault();
    // Local demo submission — wire to a backend later.
    const leads = JSON.parse(localStorage.getItem("intambwe_leads") || "[]");
    leads.push({ ...form, at: Date.now() });
    localStorage.setItem("intambwe_leads", JSON.stringify(leads));
    setSent(true);
  }

  return (
    <main id="main" className="co-page">
      <div className="page-hero page-hero--blue">
        <div className="container">
          <p className="page-eyebrow">Contact</p>
          <h1>Let's build something</h1>
          <p className="page-intro">
            Whether you are starting a new business, refreshing an existing
            brand, designing a new space or preparing to launch something new,
            Intambwe Creative Space can help turn the idea into reality.
          </p>
        </div>
      </div>

      <section className="container co-contact">
        <div className="co-contact-info">
          <h2>{CONTACT.name}</h2>
          <p className="co-contact-tagline">From idea to experience.</p>
          <p className="co-contact-lines">
            {CONTACT.disciplineLine ||
              "Creative Strategy · Branding · Interior & Exterior Design · 3D Visualization · Fabrication · Marketing · Business-in-a-Box"}
          </p>
          <dl className="co-contact-details">
            <div>
              <dt>Contact</dt>
              <dd>
                {CONTACT.contactPerson} — {CONTACT.role}
              </dd>
            </div>
            <div>
              <dt>Phone</dt>
              <dd>
                <a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}>
                  {CONTACT.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt>Location</dt>
              <dd>{CONTACT.country}</dd>
            </div>
          </dl>
        </div>

        <form className="co-contact-form" onSubmit={onSubmit}>
          {sent ? (
            <div className="co-contact-success">
              <h3>Our role is to help that story become visible.</h3>
              <p>
                Intambwe Creative Space can help turn the idea into reality.
              </p>
            </div>
          ) : (
            <>
              <label>
                Your name
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Full name"
                />
              </label>
              <label>
                Email
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.rw"
                />
              </label>
              <label>
                What do you need?
                <select
                  value={form.service}
                  onChange={(e) =>
                    setForm({ ...form, service: e.target.value })
                  }
                >
                  {SERVICES.map((s) => (
                    <option key={s.id}>{s.title}</option>
                  ))}
                </select>
              </label>
              <label>
                Tell us about the idea
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  placeholder="A restaurant concept, a rebrand, a new space…"
                />
              </label>
              <button type="submit" className="btn-primary co-btn">
                Send message →
              </button>
            </>
          )}
        </form>
      </section>
    </main>
  );
}
