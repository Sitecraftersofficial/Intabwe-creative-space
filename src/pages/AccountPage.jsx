import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { CONTACT } from "../data/company";
import "./Auth.css";

const DASHBOARD_SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "orders", label: "My orders" },
  { id: "account", label: "Account details" },
];

export default function AccountPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [section, setSection] = useState("overview");

  function signOut() {
    logout();
    navigate("/");
  }

  return (
    <main className="account-dashboard container" id="main">
      <header className="account-dashboard-head">
        <div>
          <p className="account-dashboard-eyebrow">My account</p>
          <h1>Welcome, {user?.name || "Guest"}</h1>
          <p className="account-dashboard-subtitle">
            Manage your orders and account details.
          </p>
        </div>
        <button
          type="button"
          className="account-signout"
          onClick={signOut}
        >
          Sign out
        </button>
      </header>

      <div className="account-dashboard-layout">
        <nav className="account-sidebar" aria-label="Account menu">
          <div className="account-profile">
            <span className="account-avatar" aria-hidden="true">
              {(user?.name || "G").charAt(0).toUpperCase()}
            </span>
            <span>
              <strong>{user?.name || "Guest"}</strong>
              <small>{user?.isGuest ? "Demo account" : user?.email}</small>
            </span>
          </div>
          <div className="account-menu">
            {DASHBOARD_SECTIONS.map((item) => (
              <button
                type="button"
                key={item.id}
                className={section === item.id ? "is-active" : ""}
                aria-current={section === item.id ? "page" : undefined}
                onClick={() => setSection(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
          <Link to="/shop" className="account-shop-link">
            Continue shopping <span aria-hidden="true">→</span>
          </Link>
        </nav>

        <section className="account-dashboard-content" aria-live="polite">
          {section === "overview" && (
            <>
              <div className="account-section-heading">
                <div>
                  <p className="account-dashboard-eyebrow">Your account</p>
                  <h2>Overview</h2>
                </div>
                <span className="account-demo-badge">Demo dashboard</span>
              </div>

              <div className="account-summary-grid">
                <article className="account-summary-card">
                  <span className="account-summary-icon" aria-hidden="true">
                    ↗
                  </span>
                  <p>Orders</p>
                  <strong>0</strong>
                  <button type="button" onClick={() => setSection("orders")}>
                    View order history
                  </button>
                </article>
                <article className="account-summary-card">
                  <span className="account-summary-icon" aria-hidden="true">
                    ♡
                  </span>
                  <p>Saved items</p>
                  <strong>0</strong>
                  <Link to="/shop">Explore products</Link>
                </article>
                <article className="account-summary-card">
                  <span className="account-summary-icon" aria-hidden="true">
                    ◉
                  </span>
                  <p>Account</p>
                  <strong>{user?.isGuest ? "Guest" : "Active"}</strong>
                  <button type="button" onClick={() => setSection("account")}>
                    Account details
                  </button>
                </article>
              </div>

              <section className="account-panel">
                <div className="account-panel-heading">
                  <div>
                    <h2>Recent orders</h2>
                    <p>Your purchases will appear here.</p>
                  </div>
                  <button
                    type="button"
                    className="account-text-link"
                    onClick={() => setSection("orders")}
                  >
                    View all
                  </button>
                </div>
                <div className="account-empty-orders">
                  <span aria-hidden="true">▤</span>
                  <h3>No orders yet</h3>
                  <p>
                    When you place an order, you’ll be able to track its status
                    and find its details here.
                  </p>
                  <Link to="/shop" className="account-primary-link">
                    Browse the shop
                  </Link>
                </div>
              </section>
            </>
          )}

          {section === "orders" && (
            <section className="account-panel account-orders-panel">
              <div className="account-section-heading">
                <div>
                  <p className="account-dashboard-eyebrow">Purchases</p>
                  <h2>My orders</h2>
                </div>
              </div>
              <div className="account-empty-orders">
                <span aria-hidden="true">▤</span>
                <h3>No orders yet</h3>
                <p>
                  Your order history and delivery updates will appear here once
                  you have placed an order.
                </p>
                <Link to="/shop" className="account-primary-link">
                  Browse the shop
                </Link>
              </div>
            </section>
          )}

          {section === "account" && (
            <section className="account-panel">
              <div className="account-section-heading">
                <div>
                  <p className="account-dashboard-eyebrow">Personal information</p>
                  <h2>Account details</h2>
                </div>
              </div>
              <dl className="account-details">
                <div>
                  <dt>Name</dt>
                  <dd>{user?.name || "Guest"}</dd>
                </div>
                <div>
                  <dt>Email</dt>
                  <dd>{user?.email || "Not provided in demo access"}</dd>
                </div>
                <div>
                  <dt>Account type</dt>
                  <dd>{user?.isGuest ? "Demo account" : "Customer account"}</dd>
                </div>
                <div>
                  <dt>Need help?</dt>
                  <dd>
                    <Link to="/contact">{CONTACT.phone} · Contact our team</Link>
                  </dd>
                </div>
              </dl>
            </section>
          )}
        </section>
      </div>
    </main>
  );
}
