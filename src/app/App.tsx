import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import "../styles/cyber.css";
import { DashboardPreview } from "./components/DashboardPreview";
import { Features } from "./components/Features";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Navbar } from "./components/Navbar";
import { Pricing } from "./components/Pricing";
import { Testimonials } from "./components/Testimonials";
import { TrustBadges } from "./components/TrustBadges";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { Dashboard } from "./pages/Dashboard";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { VerifyAccount } from "./pages/VerifyAccount";

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

// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isVerified, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "#050a14" }}
      >
        <p style={{ color: "rgba(255,255,255,0.7)" }}>Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isVerified) {
    return <Navigate to="/verify-account" replace />;
  }

  return <>{children}</>;
}

function AppContent() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/verify-account" element={<VerifyAccount />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}

