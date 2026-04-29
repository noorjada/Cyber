import {
    ArrowRight,
    Clock,
    Loader2,
    LogOut,
    Shield,
    Target,
    TrendingUp,
    Trophy,
    Zap
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { useAuth } from "../contexts/AuthContext";

export function Dashboard() {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    fetchDashboardData();
  }, [token, navigate]);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch(
        "http://localhost:9000/api/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        if (response.status === 403) {
          // User not verified
          navigate("/verify-account");
          return;
        }
        throw new Error("Failed to fetch dashboard data");
      }

      const data = await response.json();
      setDashboardData(data.data);
    } catch (err) {
      setError(err.message || "Failed to load dashboard");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (isLoading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "#050a14" }}
      >
        <div className="flex flex-col items-center gap-4">
          <Loader2 size={40} className="animate-spin" style={{ color: "#00b4ff" }} />
          <p style={{ color: "rgba(255,255,255,0.7)" }}>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "#050a14", minHeight: "100vh" }}>
      {/* Navigation Bar */}
      <nav
        style={{
          background: "rgba(8, 15, 30, 0.5)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(0, 180, 255, 0.1)",
        }}
        className="sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <a href="/" className="flex items-center gap-2.5">
            <div
              className="flex items-center justify-center w-10 h-10 rounded-lg"
              style={{
                background: "linear-gradient(135deg, #0066ff, #00b4ff)",
                boxShadow: "0 0 30px rgba(0, 180, 255, 0.5)",
              }}
            >
              <Shield size={20} className="text-white" fill="currentColor" />
            </div>
            <span
              className="text-white"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "1.25rem",
                fontWeight: 700,
              }}
            >
              Cyber<span style={{ color: "#00b4ff" }}>Lab</span>
            </span>
          </a>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #0066ff, #00b4ff)",
                }}
              >
                <span style={{ color: "white", fontWeight: "bold" }}>
                  {user?.username?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p style={{ color: "white", fontWeight: 500, fontSize: "0.9rem" }}>
                  {user?.username}
                </p>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.75rem" }}>
                  {user?.email}
                </p>
              </div>
            </div>

            <Button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm"
              style={{
                background: "rgba(239, 68, 68, 0.1)",
                color: "#ef4444",
                border: "1px solid rgba(239, 68, 68, 0.3)",
              }}
            >
              <LogOut size={16} />
              Logout
            </Button>
          </div>
        </div>
      </nav>

      {error && (
        <div
          className="max-w-7xl mx-auto px-4 mt-6 p-4 rounded-lg"
          style={{
            background: "rgba(239, 68, 68, 0.1)",
            border: "1px solid rgba(239, 68, 68, 0.3)",
            color: "#ef4444",
          }}
        >
          {error}
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-12">
          <h1
            className="text-4xl font-bold mb-2"
            style={{
              color: "white",
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            Welcome back, {user?.username}!
          </h1>
          <p style={{ color: "rgba(255,255,255,0.6)" }}>
            Continue your cybersecurity learning journey
          </p>
        </div>

        {/* Stats Grid */}
        {dashboardData?.progress && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            {/* Level Card */}
            <div
              className="rounded-2xl p-6"
              style={{
                background: "rgba(8, 15, 30, 0.6)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(0, 180, 255, 0.15)",
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.875rem" }}>
                  Current Level
                </p>
                <Trophy
                  size={20}
                  style={{ color: "#fbbf24" }}
                />
              </div>
              <p
                className="text-3xl font-bold"
                style={{ color: "#fbbf24" }}
              >
                {dashboardData.progress.level || 1}
              </p>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.75rem", marginTop: "4px" }}>
                Progress to next level
              </p>
            </div>

            {/* XP Card */}
            <div
              className="rounded-2xl p-6"
              style={{
                background: "rgba(8, 15, 30, 0.6)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(0, 180, 255, 0.15)",
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.875rem" }}>
                  Total XP
                </p>
                <Zap
                  size={20}
                  style={{ color: "#00b4ff" }}
                />
              </div>
              <p
                className="text-3xl font-bold"
                style={{ color: "#00b4ff" }}
              >
                {dashboardData.progress.total_xp || 0}
              </p>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.75rem", marginTop: "4px" }}>
                +150 from recent challenge
              </p>
            </div>

            {/* Challenges Completed */}
            <div
              className="rounded-2xl p-6"
              style={{
                background: "rgba(8, 15, 30, 0.6)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(0, 180, 255, 0.15)",
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.875rem" }}>
                  Challenges
                </p>
                <Target
                  size={20}
                  style={{ color: "#22c55e" }}
                />
              </div>
              <p
                className="text-3xl font-bold"
                style={{ color: "#22c55e" }}
              >
                {dashboardData.progress.challenges_completed || 0}
              </p>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.75rem", marginTop: "4px" }}>
                Completed challenges
              </p>
            </div>

            {/* Streak */}
            <div
              className="rounded-2xl p-6"
              style={{
                background: "rgba(8, 15, 30, 0.6)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(0, 180, 255, 0.15)",
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.875rem" }}>
                  Active Days
                </p>
                <TrendingUp
                  size={20}
                  style={{ color: "#ef4444" }}
                />
              </div>
              <p
                className="text-3xl font-bold"
                style={{ color: "#ef4444" }}
              >
                5
              </p>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.75rem", marginTop: "4px" }}>
                Keep the streak going!
              </p>
            </div>
          </div>
        )}

        {/* Recent Activity & Challenges Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div
            className="lg:col-span-2 rounded-2xl p-6"
            style={{
              background: "rgba(8, 15, 30, 0.6)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(0, 180, 255, 0.15)",
            }}
          >
            <h2
              className="text-xl font-bold mb-6"
              style={{ color: "white", fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Recent Activity
            </h2>

            {dashboardData?.recentActivity && dashboardData.recentActivity.length > 0 ? (
              <div className="space-y-4">
                {dashboardData.recentActivity.map((activity, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-4 pb-4 border-b border-gray-800 last:border-b-0"
                  >
                    <Clock size={18} style={{ color: "#00b4ff", marginTop: "2px" }} />
                    <div className="flex-1">
                      <p style={{ color: "white", fontSize: "0.9rem", fontWeight: 500 }}>
                        {activity.action}
                      </p>
                      {activity.details && (
                        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem" }}>
                          {activity.details}
                        </p>
                      )}
                      <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem", marginTop: "4px" }}>
                        {new Date(activity.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: "rgba(255,255,255,0.5)", textAlign: "center", padding: "20px 0" }}>
                No recent activity yet. Start a challenge to get started!
              </p>
            )}
          </div>

          {/* Challenges List */}
          <div
            className="rounded-2xl p-6"
            style={{
              background: "rgba(8, 15, 30, 0.6)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(0, 180, 255, 0.15)",
            }}
          >
            <h2
              className="text-xl font-bold mb-6"
              style={{ color: "white", fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Available Challenges
            </h2>

            {dashboardData?.challenges && dashboardData.challenges.length > 0 ? (
              <div className="space-y-3">
                {dashboardData.challenges.slice(0, 5).map((challenge, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg"
                    style={{
                      background: "rgba(0, 180, 255, 0.05)",
                      border: "1px solid rgba(0, 180, 255, 0.1)",
                    }}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <p
                        style={{ color: "white", fontSize: "0.9rem", fontWeight: 500 }}
                        className="flex-1"
                      >
                        {challenge.title}
                      </p>
                      <span
                        className="text-xs px-2 py-1 rounded"
                        style={{
                          background:
                            challenge.difficulty === "easy"
                              ? "rgba(34, 197, 94, 0.1)"
                              : challenge.difficulty === "medium"
                              ? "rgba(251, 191, 36, 0.1)"
                              : "rgba(239, 68, 68, 0.1)",
                          color:
                            challenge.difficulty === "easy"
                              ? "#22c55e"
                              : challenge.difficulty === "medium"
                              ? "#fbbf24"
                              : "#ef4444",
                        }}
                      >
                        {challenge.difficulty}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.75rem" }}>
                        {challenge.category}
                      </p>
                      <span
                        style={{
                          color: "#00b4ff",
                          fontSize: "0.75rem",
                          fontWeight: 600,
                        }}
                      >
                        +{challenge.xp_reward} XP
                      </span>
                    </div>
                  </div>
                ))}

                <Button
                  onClick={() => navigate("/challenges")}
                  className="w-full mt-4 h-10 rounded-lg font-medium flex items-center justify-center gap-2"
                  style={{
                    background: "linear-gradient(135deg, #0066ff, #00b4ff)",
                    color: "white",
                  }}
                >
                  View All Challenges
                  <ArrowRight size={16} />
                </Button>
              </div>
            ) : (
              <p style={{ color: "rgba(255,255,255,0.5)", textAlign: "center", padding: "20px 0" }}>
                No challenges available yet
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
