import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Shield, Menu, X, ChevronDown, User, LogOut } from "lucide-react";

const navLinks = [
  {
    label: "Products",
    dropdown: ["Threat Detection", "Zero Trust", "Compliance", "SIEM Platform"],
  },
  {
    label: "Solutions",
    dropdown: ["Enterprise", "SMB", "Government", "Healthcare"],
  },
  { label: "Pricing" },
  { label: "Resources", dropdown: ["Blog", "Documentation", "Case Studies", "Webinars"] },
  { label: "Company" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/";
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled
          ? "rgba(5, 10, 20, 0.95)"
          : "rgba(5, 10, 20, 0.4)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: scrolled
          ? "1px solid rgba(0, 180, 255, 0.15)"
          : "1px solid transparent",
        boxShadow: scrolled ? "0 4px 30px rgba(0, 0, 0, 0.5)" : "none",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2.5 cursor-pointer group">
            <div
              className="relative flex items-center justify-center w-9 h-9 rounded-lg"
              style={{
                background: "linear-gradient(135deg, #0066ff, #00b4ff)",
                boxShadow: "0 0 20px rgba(0, 180, 255, 0.5)",
              }}
            >
              <Shield size={18} className="text-white" fill="currentColor" />
              <div
                className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "rgba(0, 180, 255, 0.3)", filter: "blur(8px)" }}
              />
            </div>
            <span
              className="text-white"
              style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.125rem", fontWeight: 700, letterSpacing: "-0.01em" }}
            >
              Cyber<span style={{ color: "#00b4ff" }}>Lab</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.dropdown && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm transition-all duration-200"
                  style={{
                    color: "rgba(255,255,255,0.75)",
                    fontWeight: 500,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "#fff";
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.75)";
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                  }}
                >
                  {link.label}
                  {link.dropdown && (
                    <ChevronDown
                      size={14}
                      style={{
                        transform: activeDropdown === link.label ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.2s",
                        opacity: 0.6,
                      }}
                    />
                  )}
                </button>

                {/* Dropdown */}
                {link.dropdown && activeDropdown === link.label && (
                  <div
                    className="absolute top-full left-0 mt-2 py-2 rounded-xl min-w-[180px]"
                    style={{
                      background: "rgba(8, 15, 30, 0.95)",
                      backdropFilter: "blur(20px)",
                      border: "1px solid rgba(0, 180, 255, 0.15)",
                      boxShadow: "0 20px 50px rgba(0,0,0,0.5), 0 0 30px rgba(0, 180, 255, 0.05)",
                    }}
                  >
                    {link.dropdown.map((item) => (
                      <button
                        key={item}
                        className="w-full text-left px-4 py-2 text-sm transition-all duration-150"
                        style={{ color: "rgba(255,255,255,0.65)", fontWeight: 400 }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.color = "#00b4ff";
                          (e.currentTarget as HTMLElement).style.background = "rgba(0, 180, 255, 0.08)";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.65)";
                          (e.currentTarget as HTMLElement).style.background = "transparent";
                        }}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA Buttons / User Profile */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <>
                {/* User Profile */}
                <div
                  className="flex items-center gap-2 px-4 py-2 rounded-lg"
                  style={{ background: "rgba(0, 180, 255, 0.1)", border: "1px solid rgba(0, 180, 255, 0.2)" }}
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, #0066ff, #00b4ff)" }}
                  >
                    <User size={16} className="text-white" />
                  </div>
                  <span style={{ color: "#fff", fontSize: "0.875rem", fontWeight: 500 }}>
                    {user.username}
                  </span>
                </div>
                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-lg transition-all duration-200"
                  style={{ color: "rgba(255,255,255,0.6)" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#ef4444")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.6)")}
                >
                  <LogOut size={18} />
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm rounded-lg transition-all duration-200"
                  style={{ color: "rgba(255,255,255,0.75)", fontWeight: 500, textDecoration: "none" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#fff")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.75)")}
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="px-5 py-2.5 rounded-lg text-sm text-white btn-glow-blue"
                  style={{ fontWeight: 600, letterSpacing: "0.01em", textDecoration: "none" }}
                >
                  Get Started Free
                </Link>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden p-2 rounded-lg"
            style={{ color: "rgba(255,255,255,0.8)" }}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div
            className="lg:hidden py-4 border-t"
            style={{ borderColor: "rgba(255,255,255,0.08)" }}
          >
            {navLinks.map((link) => (
              <button
                key={link.label}
                className="w-full text-left px-4 py-3 text-sm"
                style={{ color: "rgba(255,255,255,0.75)", fontWeight: 500 }}
              >
                {link.label}
              </button>
            ))}
            <div className="flex flex-col gap-3 mt-4 px-4">
              {user ? (
                <>
                  {/* Mobile User Profile */}
                  <div
                    className="flex items-center gap-2 px-4 py-3 rounded-lg"
                    style={{ background: "rgba(0, 180, 255, 0.1)", border: "1px solid rgba(0, 180, 255, 0.2)" }}
                  >
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ background: "linear-gradient(135deg, #0066ff, #00b4ff)" }}
                    >
                      <User size={16} className="text-white" />
                    </div>
                    <span style={{ color: "#fff", fontSize: "0.875rem", fontWeight: 500 }}>
                      {user.username}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full py-2.5 rounded-lg text-sm text-center"
                    style={{ fontWeight: 500, color: "#ef4444", textDecoration: "none", border: "1px solid rgba(239, 68, 68, 0.3)" }}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/signup"
                    className="w-full py-2.5 rounded-lg text-sm text-white btn-glow-blue text-center"
                    style={{ fontWeight: 600, textDecoration: "none" }}
                  >
                    Get Started Free
                  </Link>
                  <Link
                    to="/login"
                    className="w-full py-2.5 rounded-lg text-sm text-center"
                    style={{ fontWeight: 500, color: "rgba(255,255,255,0.75)", textDecoration: "none", border: "1px solid rgba(0, 180, 255, 0.3)" }}
                  >
                    Sign In
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
