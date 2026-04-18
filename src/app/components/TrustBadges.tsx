import { ShieldCheck, Award, FileCheck, Lock, Globe, CheckCircle } from "lucide-react";

const companies = [
  "Goldman Sachs", "Microsoft", "Palantir", "Cloudflare", "Stripe", "SpaceX", "Databricks", "Snowflake"
];

const certifications = [
  {
    icon: ShieldCheck,
    title: "ISO 27001",
    subtitle: "Certified",
    color: "#00b4ff",
    bg: "rgba(0, 180, 255, 0.08)",
    border: "rgba(0, 180, 255, 0.2)",
  },
  {
    icon: Award,
    title: "SOC 2 Type II",
    subtitle: "Compliant",
    color: "#a855f7",
    bg: "rgba(168, 85, 247, 0.08)",
    border: "rgba(168, 85, 247, 0.2)",
  },
  {
    icon: FileCheck,
    title: "GDPR",
    subtitle: "Ready",
    color: "#00ffd0",
    bg: "rgba(0, 255, 208, 0.06)",
    border: "rgba(0, 255, 208, 0.18)",
  },
  {
    icon: Lock,
    title: "NIST CSF",
    subtitle: "Framework",
    color: "#ff9d00",
    bg: "rgba(255, 157, 0, 0.08)",
    border: "rgba(255, 157, 0, 0.2)",
  },
  {
    icon: Globe,
    title: "FedRAMP",
    subtitle: "Authorized",
    color: "#00b4ff",
    bg: "rgba(0, 180, 255, 0.06)",
    border: "rgba(0, 180, 255, 0.18)",
  },
  {
    icon: CheckCircle,
    title: "PCI DSS",
    subtitle: "Level 1",
    color: "#a855f7",
    bg: "rgba(168, 85, 247, 0.06)",
    border: "rgba(168, 85, 247, 0.18)",
  },
];

export function TrustBadges() {
  return (
    <section
      style={{
        background: "#050a14",
        fontFamily: "'Inter', sans-serif",
        paddingBottom: "80px",
      }}
    >
      {/* Trusted by label */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center gap-5 mb-8">
          <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.07)" }} />
          <span style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.35)", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase" }}>
            Trusted by world-class organizations
          </span>
          <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.07)" }} />
        </div>

        {/* Company names marquee */}
        <div className="overflow-hidden mb-14">
          <div className="flex gap-10 items-center" style={{ animation: "marquee 20s linear infinite", whiteSpace: "nowrap" }}>
            {[...companies, ...companies].map((company, i) => (
              <span
                key={i}
                style={{
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.18)",
                  letterSpacing: "-0.01em",
                  fontFamily: "'Space Grotesk', sans-serif",
                  flexShrink: 0,
                }}
              >
                {company}
              </span>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="text-center mb-10">
          <span style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.35)", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase" }}>
            Security Certifications & Compliance
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {certifications.map((cert) => {
            const Icon = cert.icon;
            return (
              <div
                key={cert.title}
                className="flex flex-col items-center gap-2.5 p-4 rounded-2xl text-center transition-all duration-300 cursor-default"
                style={{
                  background: cert.bg,
                  border: `1px solid ${cert.border}`,
                  backdropFilter: "blur(10px)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 10px 40px ${cert.bg}, 0 0 20px ${cert.border}`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: `${cert.color}20` }}
                >
                  <Icon size={20} style={{ color: cert.color }} />
                </div>
                <div>
                  <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "#fff", lineHeight: 1.2 }}>
                    {cert.title}
                  </div>
                  <div style={{ fontSize: "0.68rem", color: cert.color, fontWeight: 500, marginTop: "2px" }}>
                    {cert.subtitle}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
