import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "CyberLab detected and blocked a zero-day exploit targeting our infrastructure within milliseconds. The AI-powered detection is genuinely remarkable.",
    name: "Sarah Chen",
    role: "CISO",
    company: "Nexus Financial",
    avatar: "SC",
    color: "#00b4ff",
    stars: 5,
  },
  {
    quote:
      "We achieved SOC 2 Type II compliance in record time. The automated audit reports saved us weeks of work and the dashboard gives us complete visibility.",
    name: "Marcus Rodriguez",
    role: "Head of Security",
    company: "Orbit Technologies",
    avatar: "MR",
    color: "#a855f7",
    stars: 5,
  },
  {
    quote:
      "The zero-trust implementation was seamless. Our security posture improved dramatically overnight. I can't imagine running our ops without CyberLab.",
    name: "Aisha Nakamura",
    role: "VP Engineering",
    company: "DataStream Corp",
    avatar: "AN",
    color: "#00ffd0",
    stars: 5,
  },
  {
    quote:
      "Best investment we made this year. The threat intelligence feeds are unmatched, and the 0.08s response time has literally prevented a ransomware attack.",
    name: "James O'Brien",
    role: "CTO",
    company: "CloudVault Inc",
    avatar: "JO",
    color: "#ff9d00",
    stars: 5,
  },
];

const statHighlights = [
  { value: "200B+", label: "Threats blocked annually", color: "#00b4ff" },
  { value: "99.97%", label: "Detection accuracy", color: "#a855f7" },
  { value: "10,000+", label: "Companies protected", color: "#00ffd0" },
  { value: "< 0.1s", label: "Average response time", color: "#ff9d00" },
];

export function Testimonials() {
  return (
    <section
      style={{
        background: "linear-gradient(180deg, #050a14 0%, #060d1e 100%)",
        padding: "100px 0",
        fontFamily: "'Inter', sans-serif",
        overflow: "hidden",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs mb-5 border"
            style={{
              background: "rgba(0, 255, 208, 0.06)",
              borderColor: "rgba(0, 255, 208, 0.2)",
              color: "#00ffd0",
              fontWeight: 500,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            Testimonials
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
            Trusted by security teams{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #00ffd0, #00b4ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              worldwide
            </span>
          </h2>

          <p
            style={{
              fontSize: "1rem",
              color: "rgba(255,255,255,0.5)",
              maxWidth: "440px",
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            Don't take our word for it. Here's what security professionals say about CyberLab.
          </p>
        </div>

        {/* Stats Row */}
        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-14 p-6 rounded-2xl"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          {statHighlights.map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                style={{
                  fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                  fontWeight: 800,
                  color: stat.color,
                  fontFamily: "'Space Grotesk', sans-serif",
                  letterSpacing: "-0.03em",
                  lineHeight: 1,
                  textShadow: `0 0 30px ${stat.color}50`,
                }}
              >
                {stat.value}
              </div>
              <div style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.4)", marginTop: "6px" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonial Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="flex flex-col p-6 rounded-2xl transition-all duration-300 cursor-default"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = `${t.color}06`;
                (e.currentTarget as HTMLElement).style.borderColor = `${t.color}25`;
                (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 50px rgba(0,0,0,0.3)`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              {/* Stars */}
              <div className="flex items-center gap-0.5 mb-4">
                {Array.from({ length: t.stars }).map((_, si) => (
                  <Star key={si} size={13} style={{ color: "#fbbf24" }} fill="#fbbf24" />
                ))}
              </div>

              {/* Quote icon */}
              <Quote
                size={24}
                style={{ color: t.color, opacity: 0.4, marginBottom: "12px" }}
                fill="currentColor"
              />

              {/* Quote Text */}
              <p
                style={{
                  fontSize: "0.82rem",
                  color: "rgba(255,255,255,0.65)",
                  lineHeight: 1.7,
                  flex: 1,
                  margin: 0,
                }}
              >
                {t.quote}
              </p>

              {/* Divider */}
              <div className="h-px my-5" style={{ background: "rgba(255,255,255,0.07)" }} />

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${t.color}40, ${t.color}20)`,
                    border: `1px solid ${t.color}40`,
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    color: t.color,
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}
                >
                  {t.avatar}
                </div>
                <div>
                  <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#fff", lineHeight: 1.2 }}>
                    {t.name}
                  </div>
                  <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.4)", marginTop: "2px" }}>
                    {t.role} · {t.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
