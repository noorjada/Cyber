import { Link } from "react-router";
import { Shield, Twitter, Linkedin, Github, Youtube, ArrowRight, Mail, MapPin, Phone } from "lucide-react";

const footerLinks = {
  Product: ["Threat Detection", "Zero Trust", "SIEM Platform", "Compliance", "API Security", "Endpoint Security"],
  Solutions: ["Enterprise", "SMB", "Government", "Healthcare", "Finance", "SaaS Companies"],
  Resources: ["Documentation", "Blog", "Case Studies", "Webinars", "Security Reports", "Developer API"],
  Company: ["About Us", "Careers", "Press", "Partners", "Contact", "Legal"],
};

const socials = [
  { icon: Twitter, label: "Twitter", color: "#1DA1F2" },
  { icon: Linkedin, label: "LinkedIn", color: "#0A66C2" },
  { icon: Github, label: "GitHub", color: "#fff" },
  { icon: Youtube, label: "YouTube", color: "#FF0000" },
];

export function Footer() {
  return (
    <footer
      style={{
        background: "#030810",
        borderTop: "1px solid rgba(0,180,255,0.1)",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* CTA Banner */}
      <div
        style={{
          background: "linear-gradient(135deg, rgba(0,102,255,0.15) 0%, rgba(168,85,247,0.15) 50%, rgba(0,255,208,0.08) 100%)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2
                style={{
                  fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
                  fontWeight: 800,
                  color: "#fff",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.2,
                  fontFamily: "'Space Grotesk', sans-serif",
                  margin: "0 0 12px",
                }}
              >
                Ready to secure your{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, #00b4ff, #00ffd0)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  infrastructure?
                </span>
              </h2>
              <p style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.7, margin: 0 }}>
                Join over 10,000 companies that trust CyberLab to protect their digital assets.
                Start your free 14-day trial today.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 lg:justify-end">
              <Link
                to="/signup"
                className="flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-white btn-glow-blue"
                style={{ fontWeight: 600, fontSize: "0.95rem", textDecoration: "none" }}
              >
                Start Free Trial
                <ArrowRight size={16} />
              </Link>
              <button
                className="flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-white transition-all duration-300"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  fontWeight: 500,
                  fontSize: "0.95rem",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.1)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)")}
              >
                Schedule a Demo
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-6 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <div className="flex items-center gap-2.5 mb-5 cursor-pointer">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #0066ff, #00b4ff)",
                  boxShadow: "0 0 20px rgba(0, 180, 255, 0.4)",
                }}
              >
                <Shield size={18} className="text-white" fill="currentColor" />
              </div>
              <span
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "1.125rem",
                  fontWeight: 700,
                  color: "#fff",
                  letterSpacing: "-0.01em",
                }}
              >
                Cyber<span style={{ color: "#00b4ff" }}>Lab</span>
              </span>
            </div>

            <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.75, marginBottom: "20px", maxWidth: "280px" }}>
              The AI-powered cybersecurity platform that protects your business from modern threats in real time.
            </p>

            {/* Contact */}
            <div className="flex flex-col gap-2.5 mb-6">
              {[
                { icon: Mail, text: "jadanoorfaris@gmail.com" },
                { icon: Phone, text: "+972543318726" },
                { icon: MapPin, text: "Nablus, Palestine" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2">
                  <Icon size={13} style={{ color: "rgba(255,255,255,0.3)", flexShrink: 0 }} />
                  <span style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.4)" }}>{text}</span>
                </div>
              ))}
            </div>

            {/* Socials */}
            <div className="flex items-center gap-3">
              {socials.map(({ icon: Icon, label, color }) => (
                <button
                  key={label}
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                  title={label}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.1)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
                  }}
                >
                  <Icon size={15} style={{ color: "rgba(255,255,255,0.6)" }} />
                </button>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <div
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  color: "rgba(255,255,255,0.5)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: "16px",
                }}
              >
                {category}
              </div>
              <div className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <a
                    key={link}
                    href="#"
                    className="text-sm transition-all duration-150"
                    style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#00b4ff")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.4)")}
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div
          className="mt-14 p-6 rounded-2xl"
          style={{
            background: "rgba(0,180,255,0.04)",
            border: "1px solid rgba(0,180,255,0.12)",
          }}
        >
          <div className="grid sm:grid-cols-2 gap-6 items-center">
            <div>
              <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "#fff", marginBottom: "4px" }}>
                Security Newsletter
              </div>
              <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.45)", margin: 0 }}>
                Get weekly threat intelligence and security insights delivered to your inbox.
              </p>
            </div>
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="your@company.com"
                className="flex-1 px-4 py-2.5 rounded-xl text-sm outline-none"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#fff",
                  fontFamily: "'Inter', sans-serif",
                }}
                onFocus={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(0,180,255,0.4)")}
                onBlur={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)")}
              />
              <button
                className="px-5 py-2.5 rounded-xl text-white text-sm btn-glow-blue flex-shrink-0"
                style={{ fontWeight: 600 }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-10 pt-8"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.25)", margin: 0 }}>
            © 2026 CyberLab, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Policy", "Security"].map((item) => (
              <a
                key={item}
                href="#"
                style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.3)", textDecoration: "none" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.6)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.3)")}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
