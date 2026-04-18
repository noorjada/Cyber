import { useState, useEffect, useRef, useCallback } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Shield,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Activity,
  MapPin,
  Globe,
  Server,
  Cpu,
  Lock,
  ArrowUpRight,
  RefreshCw,
  Zap,
} from "lucide-react";

// ============================================
// DYNAMIC CONFIGURATION & UTILITIES
// ============================================

// Alert types for random generation
const ALERT_TYPES = [
  { type: "critical", icon: XCircle, color: "#f87171", labels: ["DDoS Attack", "Data Breach", "Ransomware", "SQL Injection"], severity: 3 },
  { type: "warning", icon: AlertTriangle, color: "#fbbf24", labels: ["Brute Force Attempt", "Suspicious Login", "Port Scan", "Malware Detected"], severity: 2 },
  { type: "info", icon: Activity, color: "#00b4ff", labels: ["Port Scan Detected", "New Connection", "Traffic Spike", "Config Changed"], severity: 1 },
  { type: "success", icon: CheckCircle2, color: "#00ffd0", labels: ["Threat Neutralized", "Attack Blocked", "Vulnerability Patched", "Backup Completed"], severity: 0 },
];

const LOCATIONS = ["US-East-1", "US-West-2", "EU-West-1", "EU-West-2", "EU-Central-1", "AP-South-1", "AP-Northeast-1", "SA-East-1"];

// Helper: Format time ago
const formatTimeAgo = (date: Date): string => {
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (diff < 60) return "Just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  return `${Math.floor(diff / 3600)}h ago`;
};

// Helper: Generate random number in range
const random = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

// Helper: Format number with commas
const formatNumber = (num: number): string => num.toLocaleString();

// Custom Tooltip for chart
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: "rgba(8, 15, 30, 0.95)",
          border: "1px solid rgba(0,180,255,0.2)",
          borderRadius: "10px",
          padding: "10px 14px",
          backdropFilter: "blur(10px)",
        }}
      >
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.7rem", marginBottom: "4px" }}>{label}</p>
        <p style={{ color: "#f87171", fontSize: "0.8rem", fontWeight: 600 }}>
          Threats: {payload[0]?.value}
        </p>
        <p style={{ color: "#00b4ff", fontSize: "0.8rem", fontWeight: 600 }}>
          Blocked: {payload[1]?.value}
        </p>
      </div>
    );
  }
  return null;
};

export function DashboardPreview() {
  const [activeTab, setActiveTab] = useState("overview");
  const tabs = ["overview", "threats", "network", "compliance"];

  // ============================================
  // DYNAMIC STATE
  // ============================================

  // Metrics state - starts with static values, updates dynamically
  const [threatsBlocked, setThreatsBlocked] = useState(1284);
  const [responseTime, setResponseTime] = useState(0.08);
  const [activeEndpoints, setActiveEndpoints] = useState(4821);
  const [securityScore, setSecurityScore] = useState(98.2);

  // Chart data state - 24 hours with dynamic updates
  const [threatData, setThreatData] = useState([
    { time: "00:00", threats: 42, blocked: 41 },
    { time: "02:00", threats: 28, blocked: 28 },
    { time: "04:00", threats: 15, blocked: 15 },
    { time: "06:00", threats: 55, blocked: 54 },
    { time: "08:00", threats: 120, blocked: 118 },
    { time: "10:00", threats: 185, blocked: 183 },
    { time: "12:00", threats: 240, blocked: 238 },
    { time: "14:00", threats: 210, blocked: 209 },
    { time: "16:00", threats: 165, blocked: 164 },
    { time: "18:00", threats: 190, blocked: 189 },
    { time: "20:00", threats: 145, blocked: 144 },
    { time: "22:00", threats: 88, blocked: 87 },
    { time: "24:00", threats: 62, blocked: 62 },
  ]);

  // Alerts state - dynamic with timestamps
  const [alerts, setAlerts] = useState([
    { id: 1, type: "critical", icon: XCircle, color: "#f87171", label: "DDoS Attack", location: "US-East-1", time: new Date(), timeString: "Just now", resolved: false, severity: 3 },
    { id: 2, type: "warning", icon: AlertTriangle, color: "#fbbf24", label: "Brute Force Attempt", location: "EU-West-2", time: new Date(Date.now() - 120000), timeString: "2m ago", resolved: false, severity: 2 },
    { id: 3, type: "info", icon: Activity, color: "#00b4ff", label: "Port Scan Detected", location: "AP-South-1", time: new Date(Date.now() - 300000), timeString: "5m ago", resolved: true, severity: 1 },
    { id: 4, type: "success", icon: CheckCircle2, color: "#00ffd0", label: "Threat Neutralized", location: "US-West-2", time: new Date(Date.now() - 480000), timeString: "8m ago", resolved: true, severity: 0 },
    { id: 5, type: "warning", icon: AlertTriangle, color: "#fbbf24", label: "Suspicious Login", location: "EU-Central-1", time: new Date(Date.now() - 720000), timeString: "12m ago", resolved: false, severity: 2 },
  ]);

  // System Health state - slight fluctuations
  const [systemHealth, setSystemHealth] = useState([
    { label: "Firewall", value: 100, color: "#00ffd0" },
    { label: "IDS/IPS", value: 98, color: "#00b4ff" },
    { label: "DLP Engine", value: 96, color: "#a855f7" },
    { label: "Threat Intel", value: 99, color: "#00ffd0" },
  ]);

  // Track active alerts count
  const activeAlertsCount = alerts.filter(a => !a.resolved).length;

  // ============================================
  // DYNAMIC EFFECTS
  // ============================================

  // 1. Update alert timestamps every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setAlerts(prev => prev.map(alert => ({
        ...alert,
        timeString: formatTimeAgo(alert.time)
      })));
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  // 2. Generate new alerts every 5-8 seconds
  useEffect(() => {
    const generateAlert = () => {
      const alertType = ALERT_TYPES[random(0, ALERT_TYPES.length - 1)];
      const label = alertType.labels[random(0, alertType.labels.length - 1)];
      const location = LOCATIONS[random(0, LOCATIONS.length - 1)];
      const newAlert = {
        id: Date.now(),
        type: alertType.type,
        icon: alertType.icon,
        color: alertType.color,
        label,
        location,
        time: new Date(),
        timeString: "Just now",
        resolved: alertType.type === "success" ? true : Math.random() > 0.7,
        severity: alertType.severity,
      };

      setAlerts(prev => {
        const updated = [newAlert, ...prev.slice(0, 9)]; // Keep max 10 alerts
        return updated;
      });

      // Update security score based on critical alerts
      if (alertType.severity === 3) {
        setSecurityScore(prev => Math.max(85, prev - random(1, 3)));
      } else if (alertType.severity === 0) {
        setSecurityScore(prev => Math.min(99, prev + random(1, 2)));
      }
    };

    // Random interval between 5-8 seconds
    const scheduleNextAlert = () => {
      const delay = random(5000, 8000);
      return setTimeout(() => {
        generateAlert();
        scheduleNextAlert();
      }, delay);
    };

    const timeout = scheduleNextAlert();
    return () => clearTimeout(timeout);
  }, []);

  // 3. Update Threats Blocked - gradual increment every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setThreatsBlocked(prev => prev + random(1, 5));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // 4. Update Response Time - fluctuate between 0.05s and 0.15s
  useEffect(() => {
    const interval = setInterval(() => {
      const baseTime = 0.08;
      const fluctuation = (Math.random() - 0.5) * 0.08; // ±0.04s
      const newTime = Math.max(0.05, Math.min(0.15, baseTime + fluctuation));
      setResponseTime(newTime);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // 5. Update Active Endpoints - slight changes
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveEndpoints(prev => {
        const change = random(-2, 3);
        return Math.max(4700, Math.min(4900, prev + change));
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // 6. Update System Health - fluctuate between 95-100%
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemHealth(prev => prev.map(sys => ({
        ...sys,
        value: Math.max(95, Math.min(100, sys.value + (Math.random() - 0.5) * 2))
      })));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // 7. Real-time chart updates - add new data point every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setThreatData(prev => {
        // Generate realistic data with mid-day peaks (10-16 hours have higher activity)
        const now = new Date();
        const hour = now.getHours();
        const isPeak = hour >= 10 && hour <= 16;
        const baseThreats = isPeak ? random(180, 240) : random(40, 120);
        const threats = baseThreats + random(-20, 20);
        const blocked = threats - random(1, 5);

        const newData = [...prev.slice(1), {
          time: `${String(hour).padStart(2, '0')}:${String(random(0, 59)).padStart(2, '0')}`,
          threats,
          blocked
        }];
        return newData;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Computed metrics array for display
  const metrics = [
    { icon: Shield, label: "Threats Blocked Today", value: formatNumber(threatsBlocked), change: "+14%", color: "#00b4ff", isTime: false },
    { icon: Activity, label: "Avg Response Time", value: `${responseTime.toFixed(2)}s`, change: "-22%", color: "#00ffd0", isTime: true },
    { icon: Globe, label: "Active Endpoints", value: formatNumber(activeEndpoints), change: "+3%", color: "#a855f7", isTime: false },
    { icon: Lock, label: "Security Score", value: securityScore.toFixed(1), change: "+1.4", color: "#ff9d00", isTime: false },
  ];

  return (
    <section
      style={{
        background: "linear-gradient(180deg, #060d1e 0%, #050a14 100%)",
        padding: "80px 0 120px",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Animations for new alerts */}
      <style>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        .alert-new {
          animation: slideInRight 0.3s ease-out;
        }
        .metric-update {
          animation: pulse 0.5s ease-in-out;
        }
      `}</style>
      {/* Background glow */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(0, 180, 255, 0.04) 0%, transparent 70%)",
          }}
        />

        {/* Section Header */}
        <div className="text-center mb-12 relative">
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
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#00b4ff", boxShadow: "0 0 6px #00b4ff" }} />
            Live Demo
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
            Your Security Command Center
          </h2>

          <p
            style={{
              fontSize: "1rem",
              color: "rgba(255,255,255,0.5)",
              maxWidth: "480px",
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            One unified dashboard to monitor, detect, and respond to threats across your entire infrastructure.
          </p>
        </div>

        {/* Dashboard Container */}
        <div
          className="relative rounded-3xl overflow-hidden"
          style={{
            background: "rgba(6, 12, 25, 0.95)",
            border: "1px solid rgba(0, 180, 255, 0.15)",
            boxShadow: "0 40px 100px rgba(0, 0, 0, 0.6), 0 0 60px rgba(0, 180, 255, 0.06), inset 0 1px 0 rgba(255,255,255,0.04)",
          }}
        >
          {/* Toolbar */}
          <div
            className="flex items-center justify-between px-6 py-4"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
          >
            {/* Window controls */}
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full" style={{ background: "#ff5f5f" }} />
                <div className="w-3 h-3 rounded-full" style={{ background: "#ffbe2e" }} />
                <div className="w-3 h-3 rounded-full" style={{ background: "#27c93f" }} />
              </div>
              {/* Tabs */}
              <div
                className="hidden sm:flex items-center gap-1 ml-4 p-1 rounded-lg"
                style={{ background: "rgba(255,255,255,0.04)" }}
              >
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className="px-3 py-1.5 rounded-md text-xs capitalize transition-all duration-200"
                    style={{
                      background: activeTab === tab ? "rgba(0,180,255,0.15)" : "transparent",
                      color: activeTab === tab ? "#00b4ff" : "rgba(255,255,255,0.4)",
                      fontWeight: activeTab === tab ? 600 : 400,
                      border: activeTab === tab ? "1px solid rgba(0,180,255,0.25)" : "1px solid transparent",
                    }}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Right side indicators */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full" style={{ background: "#00ffd0", boxShadow: "0 0 6px #00ffd0" }} />
                <span style={{ fontSize: "0.72rem", color: "#00ffd0", fontWeight: 600 }}>ALL SYSTEMS OPERATIONAL</span>
              </div>
              <button
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                <RefreshCw size={11} />
                Live
              </button>
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="grid lg:grid-cols-3 gap-0">
            {/* Main Content - 2 cols */}
            <div className="lg:col-span-2 p-6" style={{ borderRight: "1px solid rgba(255,255,255,0.05)" }}>
              {/* Metrics Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                {metrics.map((m) => {
                  const Icon = m.icon;
                  return (
                    <div
                      key={m.label}
                      className="p-3 rounded-xl"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.07)",
                      }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Icon size={14} style={{ color: m.color }} />
                        <span
                          style={{
                            fontSize: "0.65rem",
                            color: m.change.startsWith("+") || m.change.startsWith("-")
                              ? m.change.startsWith("-") && m.label === "Avg Response Time"
                                ? "#00ffd0"
                                : m.change.startsWith("+") ? "#00ffd0" : "#f87171"
                              : "#00ffd0",
                            fontWeight: 600,
                          }}
                        >
                          {m.change}
                        </span>
                      </div>
                      <div style={{ fontSize: "1.25rem", fontWeight: 800, color: "#fff", fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.02em", lineHeight: 1 }}>
                        {m.value}
                      </div>
                      <div style={{ fontSize: "0.62rem", color: "rgba(255,255,255,0.35)", marginTop: "4px" }}>
                        {m.label}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Chart */}
              <div
                className="rounded-xl p-4"
                style={{
                  background: "rgba(0,0,0,0.25)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#fff" }}>Threat Activity</div>
                    <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.4)", marginTop: "2px" }}>
                      Past 24 hours · All regions
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-0.5 rounded" style={{ background: "#f87171" }} />
                      <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.45)" }}>Detected</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-0.5 rounded" style={{ background: "#00b4ff" }} />
                      <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.45)" }}>Blocked</span>
                    </div>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={160}>
                  <AreaChart data={threatData} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
                    <defs>
                      <linearGradient id="threatGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f87171" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#f87171" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="blockGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00b4ff" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#00b4ff" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                    <XAxis
                      dataKey="time"
                      tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 10 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 10 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="threats"
                      stroke="#f87171"
                      strokeWidth={2}
                      fill="url(#threatGrad)"
                    />
                    <Area
                      type="monotone"
                      dataKey="blocked"
                      stroke="#00b4ff"
                      strokeWidth={2}
                      fill="url(#blockGrad)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Threat Map placeholder */}
              <div
                className="mt-3 rounded-xl p-4 relative overflow-hidden"
                style={{
                  background: "rgba(0,0,0,0.25)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  height: "160px",
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#fff" }}>Threat Origins</span>
                  <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.4)" }}>Global map</span>
                </div>

                {/* Fake world map dots */}
                <div className="relative h-20 overflow-hidden">
                  {[
                    { x: "15%", y: "40%", color: "#f87171", size: 6 },
                    { x: "25%", y: "35%", color: "#f87171", size: 4 },
                    { x: "45%", y: "30%", color: "#fbbf24", size: 5 },
                    { x: "52%", y: "45%", color: "#00b4ff", size: 4 },
                    { x: "70%", y: "35%", color: "#f87171", size: 7 },
                    { x: "80%", y: "55%", color: "#a855f7", size: 4 },
                    { x: "35%", y: "60%", color: "#00ffd0", size: 3 },
                    { x: "60%", y: "65%", color: "#fbbf24", size: 3 },
                    { x: "88%", y: "45%", color: "#f87171", size: 5 },
                    { x: "8%", y: "55%", color: "#a855f7", size: 3 },
                  ].map((dot, i) => (
                    <div
                      key={i}
                      className="absolute rounded-full"
                      style={{
                        left: dot.x,
                        top: dot.y,
                        width: dot.size,
                        height: dot.size,
                        background: dot.color,
                        boxShadow: `0 0 ${dot.size * 2}px ${dot.color}`,
                        transform: "translate(-50%, -50%)",
                      }}
                    />
                  ))}
                  {/* Fake map lines */}
                  <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.12 }}>
                    <path d="M 0 30 Q 200 10 400 35 Q 600 55 800 30" stroke="#00b4ff" strokeWidth="1" fill="none" />
                    <path d="M 0 45 Q 150 55 300 40 Q 500 25 700 45 Q 800 50 900 40" stroke="#00b4ff" strokeWidth="1" fill="none" />
                  </svg>
                </div>

                <div className="flex items-center gap-4 mt-3">
                  {[
                    { flag: "🇨🇳", country: "China", count: 342 },
                    { flag: "🇷🇺", country: "Russia", count: 218 },
                    { flag: "🇺🇸", country: "USA", count: 156 },
                    { flag: "🇧🇷", country: "Brazil", count: 89 },
                  ].map((c) => (
                    <div key={c.country} className="flex items-center gap-1.5 flex-shrink-0">
                      <span style={{ fontSize: "0.75rem" }}>{c.flag}</span>
                      <span style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.45)", whiteSpace: "nowrap" }}>{c.country}</span>
                      <span style={{ fontSize: "0.65rem", color: "#f87171", fontWeight: 600 }}>{c.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Panel - Alerts */}
            <div className="p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#fff" }}>Security Alerts</div>
                  <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.4)", marginTop: "1px" }}>Real-time feed</div>
                </div>
                <div
                  className="flex items-center gap-1 px-2 py-1 rounded-lg"
                  style={{ background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.2)" }}
                >
                  <span style={{ fontSize: "0.65rem", color: "#f87171", fontWeight: 700 }}>
                    {activeAlertsCount} ACTIVE
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2.5">
                {alerts.map((alert, i) => {
                  const Icon = alert.icon;
                  return (
                    <div
                      key={alert.id}
                      className={`p-3.5 rounded-xl transition-all duration-200 cursor-pointer ${i === 0 ? 'alert-new' : ''}`}
                      style={{
                        background: alert.resolved ? "rgba(255,255,255,0.02)" : `${alert.color}10`,
                        border: `1px solid ${alert.resolved ? "rgba(255,255,255,0.06)" : alert.color + "25"}`,
                        opacity: alert.resolved ? 0.6 : 1,
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.background = `${alert.color}18`;
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.background = alert.resolved ? "rgba(255,255,255,0.02)" : `${alert.color}10`;
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{ background: alert.color + "20" }}
                        >
                          <Icon size={13} style={{ color: alert.color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "#fff" }}>
                              {alert.label}
                            </span>
                            {alert.resolved && (
                              <CheckCircle2 size={11} style={{ color: "#00ffd0", flexShrink: 0 }} />
                            )}
                          </div>
                          <div className="flex items-center gap-1.5 mt-1">
                            <MapPin size={9} style={{ color: "rgba(255,255,255,0.3)" }} />
                            <span style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.35)" }}>
                              {alert.location}
                            </span>
                            <span style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.2)" }}>·</span>
                            <span style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.3)" }}>
                              {alert.timeString}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* System Health */}
              <div className="mt-5">
                <div style={{ fontSize: "0.78rem", fontWeight: 600, color: "#fff", marginBottom: "12px" }}>System Health</div>
                {systemHealth.map((sys) => (
                  <div key={sys.label} className="mb-3">
                    <div className="flex items-center justify-between mb-1">
                      <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.5)" }}>{sys.label}</span>
                      <span style={{ fontSize: "0.7rem", color: sys.color, fontWeight: 600 }}>{Math.round(sys.value)}%</span>
                    </div>
                    <div className="h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.07)" }}>
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${sys.value}%`,
                          background: `linear-gradient(90deg, ${sys.color}80, ${sys.color})`,
                          boxShadow: `0 0 8px ${sys.color}50`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Endpoint Status */}
              <div
                className="mt-4 p-3 rounded-xl"
                style={{
                  background: "rgba(0,180,255,0.06)",
                  border: "1px solid rgba(0,180,255,0.15)",
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Server size={14} style={{ color: "#00b4ff" }} />
                    <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "#fff" }}>4,821 Endpoints</span>
                  </div>
                  <ArrowUpRight size={14} style={{ color: "#00b4ff" }} />
                </div>
                <div className="flex gap-3 mt-2.5">
                  <div className="text-center">
                    <div style={{ fontSize: "0.9rem", fontWeight: 800, color: "#00ffd0", fontFamily: "'Space Grotesk', sans-serif" }}>4,789</div>
                    <div style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.35)" }}>Protected</div>
                  </div>
                  <div className="text-center">
                    <div style={{ fontSize: "0.9rem", fontWeight: 800, color: "#fbbf24", fontFamily: "'Space Grotesk', sans-serif" }}>24</div>
                    <div style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.35)" }}>Pending</div>
                  </div>
                  <div className="text-center">
                    <div style={{ fontSize: "0.9rem", fontWeight: 800, color: "#f87171", fontFamily: "'Space Grotesk', sans-serif" }}>8</div>
                    <div style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.35)" }}>At Risk</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
