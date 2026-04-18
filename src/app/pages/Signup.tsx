import { useState } from "react";
import { Shield, Eye, EyeOff, Lock, Mail, User, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

export function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:9000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }

      setSuccess("Account created successfully!");
      localStorage.setItem("token", data.data.token);
      localStorage.setItem("user", JSON.stringify(data.data.user));
      
      // Redirect to home after 2 seconds
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
            background: "radial-gradient(circle, #00b4ff 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="absolute bottom-20 left-10 w-96 h-96 rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle, #0066ff 0%, transparent 70%)",
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

        {/* Signup Card */}
        <div
          className="rounded-2xl p-8"
          style={{
            background: "rgba(8, 15, 30, 0.6)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(0, 180, 255, 0.15)",
            boxShadow: "0 20px 50px rgba(0,0,0,0.5), 0 0 30px rgba(0, 180, 255, 0.05)",
          }}
        >
          <div className="text-center mb-6">
            <h1
              className="text-2xl font-bold mb-2"
              style={{ color: "#fff", fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Create Your Account
            </h1>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.875rem" }}>
              Start your free trial and secure your infrastructure
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Error Message */}
            {error && (
              <div
                className="p-3 rounded-lg text-sm"
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
                className="p-3 rounded-lg text-sm"
                style={{
                  background: "rgba(34, 197, 94, 0.1)",
                  border: "1px solid rgba(34, 197, 94, 0.3)",
                  color: "#22c55e",
                }}
              >
                {success}
              </div>
            )}

            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label
                  htmlFor="firstName"
                  style={{ color: "rgba(255,255,255,0.8)" }}
                >
                  First Name
                </Label>
                <div className="relative">
                  <User
                    className="absolute left-3 top-1/2 -translate-y-1/2"
                    size={18}
                    style={{ color: "rgba(255,255,255,0.4)" }}
                  />
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="Noor"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="pl-10"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(0, 180, 255, 0.2)",
                      color: "#fff",
                    }}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="lastName"
                  style={{ color: "rgba(255,255,255,0.8)" }}
                >
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Jada"
                  value={formData.lastName}
                  onChange={handleChange}
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(0, 180, 255, 0.2)",
                    color: "#fff",
                  }}
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <Label
                htmlFor="email"
                style={{ color: "rgba(255,255,255,0.8)" }}
              >
                Email Address
              </Label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2"
                  size={18}
                  style={{ color: "rgba(255,255,255,0.4)" }}
                />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-10"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(0, 180, 255, 0.2)",
                    color: "#fff",
                  }}
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label
                htmlFor="password"
                style={{ color: "rgba(255,255,255,0.8)" }}
              >
                Password
              </Label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2"
                  size={18}
                  style={{ color: "rgba(255,255,255,0.4)" }}
                />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={handleChange}
                  className="pl-10 pr-10"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(0, 180, 255, 0.2)",
                    color: "#fff",
                  }}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {/* Password Requirements */}
              <div className="flex flex-wrap gap-2 mt-2">
                {["8+ characters", "1 uppercase", "1 number"].map((req) => (
                  <span
                    key={req}
                    className="flex items-center gap-1 px-2 py-1 rounded text-xs"
                    style={{
                      background: "rgba(0, 180, 255, 0.1)",
                      color: "rgba(0, 180, 255, 0.8)",
                    }}
                  >
                    <CheckCircle2 size={12} />
                    {req}
                  </span>
                ))}
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <Label
                htmlFor="confirmPassword"
                style={{ color: "rgba(255,255,255,0.8)" }}
              >
                Confirm Password
              </Label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2"
                  size={18}
                  style={{ color: "rgba(255,255,255,0.4)" }}
                />
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="pl-10 pr-10"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(0, 180, 255, 0.2)",
                    color: "#fff",
                  }}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="terms"
                className="w-4 h-4 mt-0.5 rounded cursor-pointer"
                style={{
                  accentColor: "#00b4ff",
                }}
                required
              />
              <Label
                htmlFor="terms"
                style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.75rem" }}
              >
                I agree to the{" "}
                <a href="#" style={{ color: "#00b4ff" }} className="hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" style={{ color: "#00b4ff" }} className="hover:underline">
                  Privacy Policy
                </a>
              </Label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
              style={{
                background: "linear-gradient(135deg, #0066ff, #00b4ff)",
                border: "none",
                height: "2.75rem",
                fontSize: "0.9375rem",
                fontWeight: 600,
                letterSpacing: "0.01em",
                opacity: isLoading ? 0.7 : 1,
                cursor: isLoading ? "not-allowed" : "pointer",
              }}
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin mr-2" />
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight size={18} />
                </>
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div
              className="flex-1 h-px"
              style={{ background: "rgba(255,255,255,0.1)" }}
            />
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem" }}>
              OR SIGN UP WITH
            </span>
            <div
              className="flex-1 h-px"
              style={{ background: "rgba(255,255,255,0.1)" }}
            />
          </div>

          {/* Social Signup */}
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="w-full"
              style={{
                background: "transparent",
                border: "1px solid rgba(0, 180, 255, 0.2)",
                color: "rgba(255,255,255,0.8)",
                height: "2.5rem",
              }}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Google
            </Button>
            <Button
              variant="outline"
              className="w-full"
              style={{
                background: "transparent",
                border: "1px solid rgba(0, 180, 255, 0.2)",
                color: "rgba(255,255,255,0.8)",
                height: "2.5rem",
              }}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </Button>
          </div>

          {/* Login Link */}
          <div className="text-center mt-6">
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.875rem" }}>
              Already have an account?{" "}
              <a
                href="/login"
                style={{ color: "#00b4ff", fontWeight: 500 }}
                className="hover:underline"
              >
                Sign in
              </a>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <a
            href="/"
            style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.875rem" }}
            className="hover:text-white transition-colors"
          >
            ← Back to home
          </a>
        </div>
      </div>
    </div>
  );
}
