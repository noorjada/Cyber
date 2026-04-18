import "../styles/cyber.css";
import { BrowserRouter, Routes, Route } from "react-router";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { TrustBadges } from "./components/TrustBadges";
import { Features } from "./components/Features";
import { DashboardPreview } from "./components/DashboardPreview";
import { Testimonials } from "./components/Testimonials";
import { Pricing } from "./components/Pricing";
import { Footer } from "./components/Footer";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";

function HomePage() {
  return (
    <div
      className="font-inter min-h-screen"
      style={{
        background: "#050a14",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <Navbar />
      <main>
        <Hero />
        <TrustBadges />
        <Features />
        <DashboardPreview />
        <Testimonials />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}
