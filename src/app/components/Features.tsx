import {
  Brain,
  ShieldOff,
  Activity,
  Database,
  FileText,
  Zap,
  Eye,
  Network,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Threat Intelligence",
    description:
      "Leverage machine learning models trained on 200B+ data points to predict and prevent attacks before they happen.",
    color: "#00b4ff",
    bg: "rgba(0, 180, 255, 0.07)",
    border: "rgba(0, 180, 255, 0.18)",
    glow: "rgba(0, 180, 255, 0.15)",
    tag: "AI-Powered",
  },
  {
    icon: ShieldOff,
    title: "Zero Trust Architecture",
    description:
      "Never trust, always verify. Enforce strict identity verification for every user, device, and application.",
    color: "#a855f7",
    bg: "rgba(168, 85, 247, 0.07)",
    border: "rgba(168, 85, 247, 0.18)",
    glow: "rgba(168, 85, 247, 0.15)",
    tag: "Enterprise",
  },
  {
    icon: Activity,
    title: "Real-Time Monitoring",
    description:
      "24/7 security operations with sub-100ms detection times. Get instant alerts on suspicious activity.",
    color: "#00ffd0",
    bg: "rgba(0, 255, 208, 0.06)",
    border: "rgba(0, 255, 208, 0.16)",
    glow: "rgba(0, 255, 208, 0.12)",
    tag: "Live",
  },
  {
    icon: Database,
    title: "End-to-End Encryption",
    description:
      "Military-grade AES-256 encryption at rest and in transit. Your data stays yours — always encrypted, always safe.",
    color: "#ff9d00",
    bg: "rgba(255, 157, 0, 0.07)",
    border: "rgba(255, 157, 0, 0.18)",
    glow: "rgba(255, 157, 0, 0.12)",
    tag: "AES-256",
  },
  {
    icon: FileText,
    title: "Compliance Automation",
    description:
      "Automate compliance for ISO 27001, SOC 2, GDPR, HIPAA and more. Generate audit reports in seconds.",
    color: "#00b4ff",
    bg: "rgba(0, 180, 255, 0.06)",
    border: "rgba(0, 180, 255, 0.15)",
    glow: "rgba(0, 180, 255, 0.12)",
    tag: "Automated",
  },
  {
    icon: Zap,
    title: "Instant Incident Response",
    description:
      "Automated playbooks execute in milliseconds. Contain threats before damage spreads across your infrastructure.",
    color: "#a855f7",
    bg: "rgba(168, 85, 247, 0.06)",
    border: "rgba(168, 85, 247, 0.16)",
    glow: "rgba(168, 85, 247, 0.12)",
    tag: "< 0.1s",
  },
  {
    icon: Eye,
    title: "Dark Web Monitoring",
    description:
      "Continuously scan the dark web for leaked credentials, stolen data, and mentions of your organization.",
    color: "#00ffd0",
    bg: "rgba(0, 255, 208, 0.05)",
    border: "rgba(0, 255, 208, 0.14)",
    glow: "rgba(0, 255, 208, 0.1)",
    tag: "Proactive",
  },
  {
    icon: Network,
    title: "Network Segmentation",
    description:
      "Micro-segment your network to limit blast radius. Isolate critical assets with AI-driven access policies.",
    color: "#ff9d00",
    bg: "rgba(255, 157, 0, 0.06)",
    border: "rgba(255, 157, 0, 0.16)",
    glow: "rgba(255, 157, 0, 0.1)",
    tag: "Network",
  },
];

export function Features() {
  return (
    <section
      style={{
        background: "linear-gradient(180deg, #050a14 0%, #060d1e 100%)",
        padding: "100px 0 120px",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs mb-5 border"
            style={{
              background: "rgba(0, 180, 255, 0.08)",
              borderColor: "rgba(0, 180, 255, 0.2)",
              color: "#00b4ff",
              fontWeight: 500,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            Platform Features
          </div>

          <h2
            style={{
              fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
              fontWeight: 800,
              color: "#fff",
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
              fontFamily: "'Space Grotesk', sans-serif",
              margin: "0 0 16px",
            }}
          >
            Everything you need to{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #00b4ff, #a855f7)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              stay secure
            </span>
          </h2>

          <p
            style={{
              fontSize: "1rem",
              color: "rgba(255,255,255,0.5)",
              maxWidth: "520px",
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            A complete security platform that adapts to your needs — from threat detection to
            compliance automation, all in one unified dashboard.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group relative p-6 rounded-2xl transition-all duration-400 cursor-default overflow-hidden"
                style={{
                  background: feature.bg,
                  border: `1px solid ${feature.border}`,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-6px)";
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 60px rgba(0,0,0,0.3), 0 0 30px ${feature.glow}`;
                  (e.currentTarget as HTMLElement).style.borderColor = feature.color + "44";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  (e.currentTarget as HTMLElement).style.borderColor = feature.border;
                }}
              >
                {/* Glow effect on hover - top corner */}
                <div
                  className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-0 transition-opacity duration-400 pointer-events-none"
                  style={{ background: `radial-gradient(circle, ${feature.glow}, transparent 70%)` }}
                />

                {/* Tag */}
                <div
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs mb-4"
                  style={{
                    background: feature.color + "18",
                    color: feature.color,
                    fontWeight: 600,
                    letterSpacing: "0.04em",
                  }}
                >
                  {feature.tag}
                </div>

                {/* Icon */}
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{
                    background: feature.color + "20",
                    boxShadow: `0 0 20px ${feature.color}25`,
                  }}
                >
                  <Icon size={20} style={{ color: feature.color }} />
                </div>

                {/* Content */}
                <h3
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: 700,
                    color: "#fff",
                    marginBottom: "8px",
                    lineHeight: 1.3,
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}
                >
                  {feature.title}
                </h3>
                <p
                  style={{
                    fontSize: "0.78rem",
                    color: "rgba(255,255,255,0.5)",
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  {feature.description}
                </p>

                {/* Learn more link */}
                <div
                  className="flex items-center gap-1 mt-4 transition-all duration-200 opacity-0 group-hover:opacity-100"
                  style={{ color: feature.color, fontSize: "0.75rem", fontWeight: 600 }}
                >
                  Learn more <ArrowRight size={12} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
