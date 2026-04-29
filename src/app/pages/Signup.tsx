import { ArrowRight, CheckCircle2, Eye, EyeOff, Loader2, Lock, Mail, Shield, User } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

export function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
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

      setSuccess("Account created! Check your email to verify your account.");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      
      // Redirect to verification page after 2 seconds
      setTimeout(() => {
        navigate("/verify-account");
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
                className="p-3 rounded-lg text-sm flex items-start gap-2"
                style={{
                  background: "rgba(34, 197, 94, 0.1)",
                  border: "1px solid rgba(34, 197, 94, 0.3)",
                  color: "#22c55e",
                }}
              >
                <CheckCircle2 size={16} className="mt-0.5 shrink-0" />
                <div>{success}</div>
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
                    placeholder="First name"
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
                <div className="relative">
                  <User
                    className="absolute left-3 top-1/2 -translate-y-1/2"
                    size={18}
                    style={{ color: "rgba(255,255,255,0.4)" }}
                  />
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="pl-10"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(0, 180, 255, 0.2)",
                      color: "#fff",
                    }}
                  />
                </div>
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
                  placeholder="you@example.com"
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

            {/* Password Fields */}
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
                  placeholder="At least 8 characters"
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
            </div>

            {/* Confirm Password */}
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

            {/* Terms */}
            <div className="flex items-start gap-2 pt-2">
              <input
                type="checkbox"
                id="terms"
                className="w-4 h-4 rounded cursor-pointer mt-1"
                style={{
                  accentColor: "#00b4ff",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(0, 180, 255, 0.3)",
                }}
                required
              />
              <Label
                htmlFor="terms"
                style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.875rem" }}
              >
                I agree to the Terms of Service and Privacy Policy
              </Label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full mt-6"
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

          {/* Login Link */}
          <div className="text-center mt-6">
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.875rem" }}>
              Already have an account?{" "}
              <a
                href="/login"
                style={{ color: "#00b4ff", cursor: "pointer" }}
                className="hover:underline"
              >
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
