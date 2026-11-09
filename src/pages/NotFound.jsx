import { Link } from "react-router-dom";
import "./Pages.css";

export default function NotFound() {
  return (
    <main className="page" id="main">
      <div className="page-hero page-hero--blue">
        <div className="container">
          <p className="page-eyebrow">404</p>
          <h1>We couldn't find that page</h1>
          <p className="page-intro">
            The page you were looking for doesn't exist or has moved.
          </p>
        </div>
      </div>
      <section className="container">
        <Link to="/" className="btn-primary">
          Back to home
        </Link>
      </section>
    </main>
  );
}
