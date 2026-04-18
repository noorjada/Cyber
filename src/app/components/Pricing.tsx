import { Link } from "react-router";
import { Check, Zap, Shield, Building2, ArrowRight, Star } from "lucide-react";
import { useState } from "react";

const plans = [
  {
    name: "Starter",
    icon: Zap,
    monthlyPrice: 49,
    yearlyPrice: 39,
    description: "Perfect for small teams getting started with security.",
    color: "#00b4ff",
    bg: "rgba(0, 180, 255, 0.05)",
    border: "rgba(0, 180, 255, 0.15)",
    glow: "rgba(0, 180, 255, 0.08)",
    features: [
      "Up to 50 endpoints",
      "Basic threat detection",
      "Email alerts",
      "7-day log retention",
      "Community support",
      "Standard encryption",
      "Monthly reports",
    ],
    cta: "Start Free Trial",
    highlighted: false,
  },
  {
    name: "Professional",
    icon: Shield,
    monthlyPrice: 149,
    yearlyPrice: 119,
    description: "Advanced protection for growing businesses.",
    color: "#a855f7",
    bg: "rgba(168, 85, 247, 0.08)",
    border: "rgba(168, 85, 247, 0.3)",
    glow: "rgba(168, 85, 247, 0.15)",
    features: [
      "Up to 500 endpoints",
      "AI threat detection",
      "Real-time alerts",
      "90-day log retention",
      "Priority 24/7 support",
      "AES-256 encryption",
      "Custom dashboards",
      "Compliance reports",
      "Dark web monitoring",
    ],
    cta: "Get Started",
    highlighted: true,
    badge: "Most Popular",
  },
  {
    name: "Enterprise",
    icon: Building2,
    monthlyPrice: null,
    yearlyPrice: null,
    description: "Unlimited protection for large organizations.",
    color: "#00ffd0",
    bg: "rgba(0, 255, 208, 0.04)",
    border: "rgba(0, 255, 208, 0.15)",
    glow: "rgba(0, 255, 208, 0.08)",
    features: [
      "Unlimited endpoints",
      "AI + ML threat intelligence",
      "Dedicated security team",
      "Unlimited log retention",
      "24/7 dedicated support",
      "Custom encryption",
      "White-label dashboards",
      "Full compliance suite",
      "Dark web monitoring",
      "Custom SLA",
      "Zero-trust architecture",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

const faqs = [
  { q: "Is there a free trial?", a: "Yes, all plans include a 14-day free trial. No credit card required." },
  { q: "Can I change my plan later?", a: "Absolutely. Upgrade or downgrade at any time. Changes take effect immediately." },
  { q: "How does endpoint counting work?", a: "An endpoint is any device, server, or cloud instance you connect to CyberLab." },
  { q: "What certifications do you hold?", a: "ISO 27001, SOC 2 Type II, FedRAMP Authorized, PCI DSS Level 1, and GDPR compliant." },
];

export function Pricing() {
  const [yearly, setYearly] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section
      style={{
        background: "linear-gradient(180deg, #050a14 0%, #060d1e 50%, #050a14 100%)",
        padding: "100px 0 120px",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs mb-5 border"
            style={{
              background: "rgba(168, 85, 247, 0.08)",
              borderColor: "rgba(168, 85, 247, 0.25)",
              color: "#a855f7",
              fontWeight: 500,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            Pricing
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
            Simple, transparent pricing
          </h2>
          <p
            style={{
              fontSize: "1rem",
              color: "rgba(255,255,255,0.5)",
              maxWidth: "440px",
              margin: "0 auto 32px",
              lineHeight: 1.7,
            }}
          >
            No hidden fees. No surprises. Start free, scale as you grow.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4">
            <span style={{ fontSize: "0.85rem", color: yearly ? "rgba(255,255,255,0.4)" : "#fff", fontWeight: 500 }}>
              Monthly
            </span>
            <button
              onClick={() => setYearly(!yearly)}
              className="relative w-12 h-6 rounded-full transition-colors duration-300"
              style={{
                background: yearly ? "linear-gradient(135deg, #7c3aed, #a855f7)" : "rgba(255,255,255,0.12)",
              }}
            >
              <div
                className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all duration-300"
                style={{ left: yearly ? "calc(100% - 22px)" : "2px" }}
              />
            </button>
            <span style={{ fontSize: "0.85rem", color: yearly ? "#fff" : "rgba(255,255,255,0.4)", fontWeight: 500 }}>
              Annual
            </span>
            {yearly && (
              <div
                className="px-2.5 py-0.5 rounded-full text-xs"
                style={{ background: "rgba(0,255,208,0.12)", color: "#00ffd0", fontWeight: 600, border: "1px solid rgba(0,255,208,0.2)" }}
              >
                Save 20%
              </div>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-6 mb-20">
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <div
                key={plan.name}
                className="relative flex flex-col rounded-2xl transition-all duration-300"
                style={{
                  background: plan.highlighted ? `linear-gradient(180deg, ${plan.bg} 0%, rgba(168,85,247,0.04) 100%)` : plan.bg,
                  border: `1px solid ${plan.border}`,
                  boxShadow: plan.highlighted
                    ? `0 30px 80px rgba(168,85,247,0.15), 0 0 40px ${plan.glow}`
                    : "none",
                  transform: plan.highlighted ? "translateY(-8px)" : "none",
                  padding: "32px",
                }}
                onMouseEnter={(e) => {
                  if (!plan.highlighted) {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 60px rgba(0,0,0,0.3), 0 0 30px ${plan.glow}`;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!plan.highlighted) {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  }
                }}
              >
                {/* Popular Badge */}
                {plan.badge && (
                  <div
                    className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs"
                    style={{
                      background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                      color: "#fff",
                      fontWeight: 700,
                      boxShadow: "0 4px 20px rgba(168,85,247,0.5)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <Star size={10} fill="currentColor" />
                    {plan.badge}
                  </div>
                )}

                {/* Plan Header */}
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: plan.color + "20", border: `1px solid ${plan.color}30` }}
                  >
                    <Icon size={20} style={{ color: plan.color }} />
                  </div>
                  <div>
                    <div style={{ fontSize: "1rem", fontWeight: 700, color: "#fff", fontFamily: "'Space Grotesk', sans-serif" }}>
                      {plan.name}
                    </div>
                  </div>
                </div>

                <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.6, marginBottom: "28px" }}>
                  {plan.description}
                </p>

                {/* Price */}
                <div className="mb-7">
                  {plan.monthlyPrice ? (
                    <div className="flex items-end gap-2">
                      <span
                        style={{
                          fontSize: "3rem",
                          fontWeight: 800,
                          color: "#fff",
                          lineHeight: 1,
                          fontFamily: "'Space Grotesk', sans-serif",
                          letterSpacing: "-0.04em",
                        }}
                      >
                        ${yearly ? plan.yearlyPrice : plan.monthlyPrice}
                      </span>
                      <span style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.4)", marginBottom: "8px" }}>
                        /month
                      </span>
                    </div>
                  ) : (
                    <div
                      style={{
                        fontSize: "2.2rem",
                        fontWeight: 800,
                        color: "#fff",
                        lineHeight: 1,
                        fontFamily: "'Space Grotesk', sans-serif",
                        letterSpacing: "-0.03em",
                      }}
                    >
                      Custom
                    </div>
                  )}
                  {yearly && plan.monthlyPrice && (
                    <div style={{ fontSize: "0.72rem", color: plan.color, marginTop: "6px", fontWeight: 500 }}>
                      Billed ${(plan.yearlyPrice! * 12).toLocaleString()}/year
                    </div>
                  )}
                </div>

                {/* CTA Button */}
                <Link
                  to="/signup"
                  className="w-full py-3 rounded-xl mb-7 text-sm transition-all duration-300 flex items-center justify-center gap-2"
                  style={
                    plan.highlighted
                      ? {
                          background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                          color: "#fff",
                          fontWeight: 600,
                          boxShadow: "0 0 20px rgba(168,85,247,0.4)",
                          border: "none",
                          textDecoration: "none",
                        }
                      : {
                          background: plan.color + "12",
                          color: plan.color,
                          fontWeight: 600,
                          border: `1px solid ${plan.color}30`,
                          textDecoration: "none",
                        }
                  }
                  onMouseEnter={(e) => {
                    if (!plan.highlighted) {
                      (e.currentTarget as HTMLElement).style.background = plan.color + "22";
                    } else {
                      (e.currentTarget as HTMLElement).style.boxShadow = "0 0 30px rgba(168,85,247,0.6)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!plan.highlighted) {
                      (e.currentTarget as HTMLElement).style.background = plan.color + "12";
                    } else {
                      (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px rgba(168,85,247,0.4)";
                    }
                  }}
                >
                  {plan.cta}
                  <ArrowRight size={15} />
                </Link>

                {/* Divider */}
                <div className="h-px mb-7" style={{ background: `rgba(255,255,255,0.07)` }} />

                {/* Features */}
                <div className="flex flex-col gap-3">
                  {plan.features.map((feat) => (
                    <div key={feat} className="flex items-start gap-3">
                      <div
                        className="w-4.5 h-4.5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ background: plan.color + "18", border: `1px solid ${plan.color}30` }}
                      >
                        <Check size={10} style={{ color: plan.color }} strokeWidth={2.5} />
                      </div>
                      <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.5 }}>
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* FAQ Section */}
        <div className="max-w-2xl mx-auto">
          <h3
            style={{
              fontSize: "1.4rem",
              fontWeight: 700,
              color: "#fff",
              textAlign: "center",
              marginBottom: "32px",
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            Frequently Asked Questions
          </h3>
          <div className="flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-xl overflow-hidden cursor-pointer"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <div className="flex items-center justify-between px-6 py-4">
                  <span style={{ fontSize: "0.88rem", fontWeight: 600, color: "#fff" }}>{faq.q}</span>
                  <div
                    className="w-5 h-5 flex items-center justify-center rounded-full flex-shrink-0"
                    style={{
                      background: "rgba(0,180,255,0.12)",
                      transform: openFaq === i ? "rotate(45deg)" : "rotate(0)",
                      transition: "transform 0.2s",
                    }}
                  >
                    <span style={{ color: "#00b4ff", fontSize: "1rem", lineHeight: 1, marginTop: "-1px" }}>+</span>
                  </div>
                </div>
                {openFaq === i && (
                  <div
                    className="px-6 pb-5"
                    style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}
                  >
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
