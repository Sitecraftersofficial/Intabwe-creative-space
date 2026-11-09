import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import CookieBanner from "./components/CookieBanner/CookieBanner";
import Home from "./pages/Home";
import ServicesPage from "./pages/ServicesPage";
import ProjectsPage from "./pages/ProjectsPage";
import ShopPage from "./pages/ShopPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import AccountPage from "./pages/AccountPage";
import NotFound from "./pages/NotFound";
import "./pages/Account.css";

function ScrollToHash() {
  const { hash, pathname, key } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0 });
      return undefined;
    }

    const frame = requestAnimationFrame(() => {
      document
        .getElementById(decodeURIComponent(hash.slice(1)))
        ?.scrollIntoView({ block: "start" });
    });
    return () => cancelAnimationFrame(frame);
  }, [hash, pathname, key]);

  return null;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToHash />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <CookieBanner />
      </BrowserRouter>
    </AuthProvider>
  );
}
