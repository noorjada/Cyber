import { useState, useEffect } from "react";
import { Link } from "react-router";
import { ArrowRight, Play, Shield, Activity, Lock, Zap, AlertTriangle, CheckCircle2, Globe, XCircle, Activity as ActivityIcon } from "lucide-react";

const heroImage = "https://images.unsplash.com/photo-1770159116807-9b2a7bb82294?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnNlY3VyaXR5JTIwZGlnaXRhbCUyMHByb3RlY3Rpb24lMjBuZXR3b3JrJTIwZGFya3xlbnwxfHx8fDE3NzY0MTkzMDB8MA&ixlib=rb-4.1.0&q=80&w=1080";

const stats = [
  { value: "10K+", label: "Companies Protected" },
  { value: "99.97%", label: "Threat Detection Rate" },
  { value: "< 0.1s", label: "Response Time" },
  { value: "200B+", label: "Threats Blocked" },
];

// Alert types for dynamic generation
const ALERT_TYPES = [
  { type: "blocked", icon: Shield, labels: ["SQL Injection blocked", "XSS Attack blocked", "CSRF Attempt blocked", "Malware blocked"] },
  { type: "warning", icon: AlertTriangle, labels: ["Suspicious IP flagged", "Port scan detected", "Brute force attempt", "Anomalous traffic"] },
  { type: "success", icon: CheckCircle2, labels: ["Firewall rules updated", "Threat neutralized", "Patch deployed", "Backup completed"] },
];

const random = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

export function Hero() {
  // ============================================
  // DYNAMIC STATE
  // ============================================

  // Security Score
  const [securityScore, setSecurityScore] = useState(98.2);
  const [securityChange] = useState(2.4);

  // Threats Blocked counter
  const [threatsBlocked, setThreatsBlocked] = useState(1284);

  // Response time
  const [responseTime, setResponseTime] = useState(0.08);

  // Live Alerts - dynamic
  const [liveAlerts, setLiveAlerts] = useState([
    { id: 1, type: "blocked", message: "SQL Injection blocked", time: new Date(), timeString: "2s ago", icon: Shield },
    { id: 2, type: "warning", message: "Suspicious IP flagged", time: new Date(Date.now() - 6000), timeString: "8s ago", icon: AlertTriangle },
    { id: 3, type: "success", message: "Firewall rules updated", time: new Date(Date.now() - 13000), timeString: "15s ago", icon: CheckCircle2 },
  ]);

  // Threat Chart data - dynamic bars
  const [chartData, setChartData] = useState([30, 45, 28, 72, 55, 38, 90, 65, 42, 88, 55, 70, 48, 35, 62, 80, 45, 58, 75, 42, 68, 55, 38, 50]);

  // ============================================
  // DYNAMIC EFFECTS
  // ============================================

  // 1. Update alert timestamps every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveAlerts(prev => prev.map(alert => {
        const diff = Math.floor((Date.now() - alert.time.getTime()) / 1000);
        let timeString = alert.timeString;
        if (diff < 60) timeString = `${diff}s ago`;
        else if (diff < 3600) timeString = `${Math.floor(diff / 60)}m ago`;
        else timeString = `${Math.floor(diff / 3600)}h ago`;
        return { ...alert, timeString };
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // 2. Generate new alerts every 4-7 seconds
  useEffect(() => {
    const generateAlert = () => {
      const alertType = ALERT_TYPES[random(0, ALERT_TYPES.length - 1)];
      const label = alertType.labels[random(0, alertType.labels.length - 1)];
      const newAlert = {
        id: Date.now(),
        type: alertType.type,
        message: label,
        time: new Date(),
        timeString: "Just now",
        icon: alertType.icon,
      };

      setLiveAlerts(prev => {
        const updated = [newAlert, ...prev.slice(0, 2)]; // Keep max 3 alerts
        return updated;
      });

      // Update security score based on alert type
      if (alertType.type === "blocked") {
        setSecurityScore(prev => Math.min(99.9, prev + 0.1));
        setThreatsBlocked(prev => prev + random(1, 8));
      } else if (alertType.type === "warning") {
        setSecurityScore(prev => Math.max(85, prev - random(0.5, 1.5)));
      }
    };

    const timeout = setTimeout(generateAlert, random(4000, 7000));
    return () => clearTimeout(timeout);
  }, [liveAlerts]);

  // 3. Update Response Time - fluctuate slightly
  useEffect(() => {
    const interval = setInterval(() => {
      const baseTime = 0.08;
      const fluctuation = (Math.random() - 0.5) * 0.04;
      const newTime = Math.max(0.05, Math.min(0.12, baseTime + fluctuation));
      setResponseTime(newTime);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // 4. Animate chart bars - subtle wave effect
  useEffect(() => {
    const interval = setInterval(() => {
      setChartData(prev => prev.map((height, i) => {
        // Create a wave effect by slightly adjusting heights
        const wave = Math.sin(Date.now() / 1000 + i * 0.5) * 5;
        const newHeight = Math.max(20, Math.min(95, height + wave));
        return Math.floor(newHeight);
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Color mapping for alerts
  const alertColors: Record<string, { bg: string; border: string; color: string }> = {
    blocked: { bg: "rgba(239,68,68,0.12)", border: "rgba(239,68,68,0.2)", color: "#f87171" },
    warning: { bg: "rgba(251,191,36,0.12)", border: "rgba(251,191,36,0.2)", color: "#fbbf24" },
    success: { bg: "rgba(0,255,208,0.08)", border: "rgba(0,255,208,0.15)", color: "#00ffd0" },
  };
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #060c1a 0%, #050a14 60%, #030810 100%)",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Background Elements */}
      {/* Animated grid */}
      <div className="absolute inset-0 cyber-grid opacity-40" />

      {/* Glow orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full animate-glow-pulse pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(0, 180, 255, 0.18) 0%, transparent 70%)" }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full animate-glow-pulse pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, transparent 70%)",
          animationDelay: "1.5s",
        }}
      />
      <div
        className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(0, 255, 208, 0.08) 0%, transparent 70%)",
        }}
      />

      {/* Scan line effect */}
      <div
        className="absolute left-0 right-0 h-px pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(0,180,255,0.4), transparent)",
          animation: "scan 8s linear infinite",
          top: 0,
          position: "absolute",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-28 pb-20 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="flex flex-col gap-6">
            {/* Badge */}
            <div className="flex items-center gap-2">
              <div
                className="flex items-center gap-2 px-4 py-1.5 rounded-full text-xs border"
                style={{
                  background: "rgba(0, 180, 255, 0.08)",
                  borderColor: "rgba(0, 180, 255, 0.25)",
                  color: "#00b4ff",
                  fontWeight: 500,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{
                    background: "#00b4ff",
                    boxShadow: "0 0 8px #00b4ff",
                    animation: "ping-slow 2s ease-in-out infinite",
                    display: "inline-block",
                  }}
                />
                AI-Powered Security Platform v4.0
              </div>
            </div>

            {/* Headline */}
            <div>
              <h1
                style={{
                  fontSize: "clamp(2.4rem, 4.5vw, 4rem)",
                  fontWeight: 800,
                  lineHeight: 1.08,
                  letterSpacing: "-0.03em",
                  color: "#ffffff",
                  fontFamily: "'Space Grotesk', sans-serif",
                  margin: 0,
                }}
              >
                Advanced
                <br />
                <span
                  style={{
                    background: "linear-gradient(135deg, #00b4ff 0%, #00ffd0 50%, #a855f7 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Cybersecurity
                </span>
                <br />
                for the Modern World
              </h1>
            </div>

            {/* Subtext */}
            <p
              style={{
                fontSize: "1.05rem",
                color: "rgba(255,255,255,0.55)",
                lineHeight: 1.75,
                maxWidth: "480px",
                fontWeight: 400,
              }}
            >
              Protect your infrastructure with AI-driven threat detection, zero-trust architecture,
              and real-time incident response. Stay one step ahead of attackers — always.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/signup"
                className="group flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-white btn-glow-blue"
                style={{ fontWeight: 600, fontSize: "0.95rem", textDecoration: "none" }}
              >
                Start Free Trial
                <ArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              <button
                className="group flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-white transition-all duration-300"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  fontWeight: 500,
                  fontSize: "0.95rem",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,180,255,0.3)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.12)";
                }}
              >
                <div
                  className="flex items-center justify-center w-6 h-6 rounded-full"
                  style={{ background: "rgba(0,180,255,0.2)" }}
                >
                  <Play size={10} fill="currentColor" style={{ color: "#00b4ff", marginLeft: "1px" }} />
                </div>
                Watch Demo
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col gap-0.5">
                  <span
                    style={{
                      fontSize: "1.4rem",
                      fontWeight: 700,
                      color: "#fff",
                      fontFamily: "'Space Grotesk', sans-serif",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {stat.value}
                  </span>
                  <span style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.45)", fontWeight: 400 }}>
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Dashboard Visual */}
          <div className="relative hidden lg:flex items-center justify-center">
            {/* Main Dashboard Card */}
            <div
              className="animate-float w-full max-w-lg relative"
              style={{
                background: "rgba(8, 15, 30, 0.8)",
                backdropFilter: "blur(30px)",
                border: "1px solid rgba(0, 180, 255, 0.2)",
                borderRadius: "20px",
                boxShadow: "0 30px 80px rgba(0,0,0,0.5), 0 0 60px rgba(0, 180, 255, 0.08), inset 0 1px 0 rgba(255,255,255,0.05)",
                overflow: "hidden",
              }}
            >
              {/* Dashboard Header */}
              <div
                className="flex items-center justify-between px-5 py-3.5"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full" style={{ background: "#ff5f5f" }} />
                    <div className="w-3 h-3 rounded-full" style={{ background: "#ffbe2e" }} />
                    <div className="w-3 h-3 rounded-full" style={{ background: "#27c93f" }} />
                  </div>
                  <span
                    className="ml-2"
                    style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.4)", fontFamily: "JetBrains Mono, monospace" }}
                  >
                    cyberlab.io/dashboard
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ background: "#00ffd0", boxShadow: "0 0 6px #00ffd0" }}
                  />
                  <span style={{ fontSize: "0.7rem", color: "#00ffd0", fontWeight: 600 }}>LIVE</span>
                </div>
              </div>

              {/* Dashboard Body */}
              <div className="p-5">
                {/* Security Score */}
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.4)", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "4px" }}>
                      Security Score
                    </div>
                    <div style={{ fontSize: "2.8rem", fontWeight: 800, color: "#fff", fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1, letterSpacing: "-0.03em" }}>
                      {securityScore.toFixed(1)}
                      <span style={{ fontSize: "1rem", color: "rgba(255,255,255,0.4)", fontWeight: 400 }}>/100</span>
                    </div>
                    <div
                      className="flex items-center gap-1 mt-1"
                      style={{ fontSize: "0.75rem", color: "#00ffd0", fontWeight: 500 }}
                    >
                      <Activity size={12} />
                      +{securityChange}% from last week
                    </div>
                  </div>

                  {/* Circular progress */}
                  <div className="relative w-20 h-20">
                    <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
                      <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
                      <circle
                        cx="40" cy="40" r="34" fill="none"
                        stroke="url(#scoreGrad)"
                        strokeWidth="6"
                        strokeLinecap="round"
                        strokeDasharray={`${2 * Math.PI * 34 * 0.982} ${2 * Math.PI * 34}`}
                      />
                      <defs>
                        <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#00b4ff" />
                          <stop offset="100%" stopColor="#00ffd0" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Shield size={20} style={{ color: "#00b4ff" }} />
                    </div>
                  </div>
                </div>

                {/* Threat Chart area */}
                <div
                  className="rounded-xl p-4 mb-4"
                  style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.05)" }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.5)", fontWeight: 500 }}>
                      Threat Activity (24h)
                    </span>
                    <span style={{ fontSize: "0.72rem", color: "#00b4ff" }}>{threatsBlocked.toLocaleString()} blocked</span>
                  </div>

                  {/* Dynamic chart bars */}
                  <div className="flex items-end gap-1 h-14">
                    {chartData.map((height, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-sm transition-all duration-500"
                        style={{
                          height: `${height}%`,
                          background: i === 7 || i === 10 || i === 15
                            ? "linear-gradient(180deg, #ff4d6d, rgba(255,77,109,0.3))"
                            : `linear-gradient(180deg, rgba(0,180,255,${0.4 + (height / 100) * 0.4}), rgba(0,180,255,0.1))`,
                        }}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between mt-2">
                    <span style={{ fontSize: "0.62rem", color: "rgba(255,255,255,0.25)" }}>00:00</span>
                    <span style={{ fontSize: "0.62rem", color: "rgba(255,255,255,0.25)" }}>12:00</span>
                    <span style={{ fontSize: "0.62rem", color: "rgba(255,255,255,0.25)" }}>24:00</span>
                  </div>
                </div>

                {/* Live Alerts */}
                <div className="flex flex-col gap-2">
                  <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.4)", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "2px" }}>
                    Live Alerts
                  </div>
                  {liveAlerts.map((alert, i) => {
                    const Icon = alert.icon;
                    const c = alertColors[alert.type];
                    return (
                      <div
                        key={alert.id}
                        className={`flex items-center justify-between rounded-lg px-3 py-2 ${i === 0 ? 'alert-new' : ''}`}
                        style={{ background: c.bg, border: `1px solid ${c.border}` }}
                      >
                        <div className="flex items-center gap-2">
                          <Icon size={12} style={{ color: c.color }} />
                          <span style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.8)", fontWeight: 400 }}>
                            {alert.message}
                          </span>
                        </div>
                        <span style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.3)" }}>{alert.timeString}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Floating Cards - positioned outside dashboard */}
            {/* Top-left floating badge - Encryption */}
            <div
              className="absolute -left-24 top-8 animate-float-delayed z-10"
              style={{
                background: "rgba(8,15,30,0.95)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(168, 85, 247, 0.3)",
                borderRadius: "14px",
                padding: "12px 16px",
                boxShadow: "0 10px 40px rgba(0,0,0,0.5), 0 0 20px rgba(168,85,247,0.15)",
                minWidth: "140px",
              }}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(168,85,247,0.2)" }}
                >
                  <Lock size={14} style={{ color: "#a855f7" }} />
                </div>
                <div>
                  <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.4)", marginBottom: "1px", whiteSpace: "nowrap" }}>Encryption</div>
                  <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#fff" }}>AES-256</div>
                </div>
              </div>
            </div>

            {/* Bottom-right floating badge - Response Time */}
            <div
              className="absolute -right-28 bottom-12 animate-float z-10"
              style={{
                background: "rgba(8,15,30,0.95)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(0, 255, 208, 0.3)",
                borderRadius: "14px",
                padding: "12px 16px",
                boxShadow: "0 10px 40px rgba(0,0,0,0.5), 0 0 20px rgba(0,255,208,0.15)",
                minWidth: "140px",
                animationDelay: "1s",
              }}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(0,255,208,0.15)" }}
                >
                  <Zap size={14} style={{ color: "#00ffd0" }} />
                </div>
                <div>
                  <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.4)", marginBottom: "1px", whiteSpace: "nowrap" }}>Response</div>
                  <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#fff" }}>{responseTime.toFixed(2)}s avg</div>
                </div>
              </div>
            </div>

            {/* Top right globe indicator - Coverage */}
            <div
              className="absolute -right-24 top-4 animate-float-delayed z-10"
              style={{
                background: "rgba(8,15,30,0.95)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(0, 180, 255, 0.3)",
                borderRadius: "14px",
                padding: "12px 16px",
                boxShadow: "0 10px 40px rgba(0,0,0,0.5), 0 0 20px rgba(0,180,255,0.15)",
                minWidth: "140px",
                animationDelay: "2s",
              }}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(0,180,255,0.15)" }}
                >
                  <Globe size={14} style={{ color: "#00b4ff" }} />
                </div>
                <div>
                  <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.4)", marginBottom: "1px", whiteSpace: "nowrap" }}>Coverage</div>
                  <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#fff" }}>180 Countries</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animations for new alerts */}
      <style>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(15px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .alert-new {
          animation: slideInRight 0.3s ease-out;
        }
      `}</style>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(0deg, #050a14, transparent)" }}
      />
    </section>
  );
}