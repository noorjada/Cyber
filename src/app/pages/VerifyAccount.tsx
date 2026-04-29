import { CheckCircle2, Loader2, Mail, Shield } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useAuth } from "../contexts/AuthContext";

export function VerifyAccount() {
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login, user } = useAuth();

  useEffect(() => {
    // Check if token is in URL
    const urlToken = searchParams.get("token");
    if (urlToken) {
      setToken(urlToken);
      // Auto-verify if token is present
      verifyToken(urlToken);
    }
  }, [searchParams]);

  const verifyToken = async (verificationToken) => {
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch(
        "http://localhost:9000/api/auth/verify-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: verificationToken,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Verification failed");
      }

      setSuccess("Email verified successfully!");
      setIsVerified(true);
      
      // Auto login the user
      login(data.data.user, data.data.token);

      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (err) {
      setError(err.message || "Invalid or expired verification link");
      setIsVerified(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyToken = async (e) => {
    e.preventDefault();
    if (!token.trim()) {
      setError("Please enter or check the verification link");
      return;
    }
    await verifyToken(token);
  };

  const handleResendEmail = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!email.trim()) {
      setError("Please enter your email");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:9000/api/auth/resend-verification",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to resend email");
      }

      setSuccess("Verification email sent! Check your inbox.");
      setEmail("");
    } catch (err) {
      setError(err.message || "Failed to resend verification email");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-8"
      style={{ background: "#050a14" }}
    >
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-20 right-10 w-72 h-72 rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, #0066ff 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="absolute bottom-20 left-10 w-96 h-96 rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle, #00b4ff 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      <div className="w-full max-w-lg relative z-10">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <a href="/" className="flex items-center gap-2.5 cursor-pointer group">
            <div
              className="relative flex items-center justify-center w-10 h-10 rounded-lg"
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
        </div>

        {/* Verification Card */}
        <div
          className="rounded-2xl p-8"
          style={{
            background: "rgba(8, 15, 30, 0.6)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(0, 180, 255, 0.15)",
            boxShadow:
              "0 20px 50px rgba(0,0,0,0.5), 0 0 30px rgba(0, 180, 255, 0.05)",
          }}
        >
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Mail size={40} style={{ color: "#00b4ff" }} />
            </div>
            <h1
              className="text-2xl font-bold mb-2"
              style={{ color: "#fff", fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Verify Your Email
            </h1>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.875rem" }}>
              Check your email for a verification link to activate your account
            </p>
          </div>

          {/* Success State */}
          {isVerified && (
            <div
              className="p-4 rounded-lg mb-6 flex items-center gap-3"
              style={{
                background: "rgba(34, 197, 94, 0.1)",
                border: "1px solid rgba(34, 197, 94, 0.3)",
              }}
            >
              <CheckCircle2 size={20} style={{ color: "#22c55e" }} />
              <div>
                <p style={{ color: "#22c55e", fontWeight: 500 }}>
                  Email verified successfully!
                </p>
                <p style={{ color: "rgba(34, 197, 94, 0.7)", fontSize: "0.875rem" }}>
                  Redirecting to dashboard...
                </p>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div
              className="p-3 rounded-lg text-sm mb-6"
              style={{
                background: "rgba(239, 68, 68, 0.1)",
                border: "1px solid rgba(239, 68, 68, 0.3)",
                color: "#ef4444",
              }}
            >
              {error}
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div
              className="p-3 rounded-lg text-sm mb-6"
              style={{
                background: "rgba(34, 197, 94, 0.1)",
                border: "1px solid rgba(34, 197, 94, 0.3)",
                color: "#22c55e",
              }}
            >
              {success}
            </div>
          )}

          {!isVerified && (
            <>
              {/* Tab Navigation */}
              <div className="flex gap-4 mb-6 border-b border-gray-700">
                <button
                  onClick={() => document.getElementById("verify-link-form").classList.remove("hidden")}
                  style={{
                    color: token ? "#00b4ff" : "rgba(255,255,255,0.6)",
                    borderBottom: token ? "2px solid #00b4ff" : "none",
                    paddingBottom: "8px",
                    fontSize: "14px",
                    fontWeight: 500,
                  }}
                  className="flex-1 text-center transition-colors"
                >
                  Click Link
                </button>
                <button
                  onClick={() => document.getElementById("resend-email-form").classList.remove("hidden")}
                  style={{
                    color: !token ? "#00b4ff" : "rgba(255,255,255,0.6)",
                    borderBottom: !token ? "2px solid #00b4ff" : "none",
                    paddingBottom: "8px",
                    fontSize: "14px",
                    fontWeight: 500,
                  }}
                  className="flex-1 text-center transition-colors"
                >
                  Resend Email
                </button>
              </div>

              {/* Verify Link Form */}
              <form
                id="verify-link-form"
                onSubmit={handleVerifyToken}
                className="space-y-4"
              >
                <div>
                  <Label
                    htmlFor="token"
                    style={{
                      color: "rgba(255,255,255,0.7)",
                      fontSize: "0.875rem",
                      fontWeight: 500,
                    }}
                  >
                    Verification Code
                  </Label>
                  <Input
                    id="token"
                    type="text"
                    placeholder="Paste the token from your email"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    disabled={isLoading}
                    style={{
                      background: "rgba(255, 255, 255, 0.05)",
                      border: "1px solid rgba(0, 180, 255, 0.2)",
                      color: "white",
                      marginTop: "6px",
                    }}
                    className="placeholder-gray-600"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-10 rounded-lg font-medium flex items-center justify-center gap-2"
                  style={{
                    background:
                      isLoading || !token
                        ? "rgba(0, 102, 255, 0.5)"
                        : "linear-gradient(135deg, #0066ff, #00b4ff)",
                    color: "white",
                    cursor: isLoading || !token ? "not-allowed" : "pointer",
                  }}
                >
                  {isLoading && <Loader2 size={16} className="animate-spin" />}
                  {isLoading ? "Verifying..." : "Verify Email"}
                </Button>
              </form>

              {/* Resend Email Form */}
              <form
                id="resend-email-form"
                onSubmit={handleResendEmail}
                className="space-y-4 hidden"
              >
                <div>
                  <Label
                    htmlFor="email"
                    style={{
                      color: "rgba(255,255,255,0.7)",
                      fontSize: "0.875rem",
                      fontWeight: 500,
                    }}
                  >
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    style={{
                      background: "rgba(255, 255, 255, 0.05)",
                      border: "1px solid rgba(0, 180, 255, 0.2)",
                      color: "white",
                      marginTop: "6px",
                    }}
                    className="placeholder-gray-600"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-10 rounded-lg font-medium flex items-center justify-center gap-2"
                  style={{
                    background:
                      isLoading || !email
                        ? "rgba(0, 102, 255, 0.5)"
                        : "linear-gradient(135deg, #0066ff, #00b4ff)",
                    color: "white",
                    cursor: isLoading || !email ? "not-allowed" : "pointer",
                  }}
                >
                  {isLoading && <Loader2 size={16} className="animate-spin" />}
                  {isLoading ? "Sending..." : "Resend Verification Email"}
                </Button>
              </form>

              <div className="text-center mt-6">
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.875rem" }}>
                  Already verified?{" "}
                  <a
                    href="/login"
                    style={{ color: "#00b4ff", cursor: "pointer" }}
                    className="hover:underline"
                  >
                    Log in
                  </a>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
