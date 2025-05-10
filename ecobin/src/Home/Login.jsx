import { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import companyLogo from "../Home/images/Logo.png";
import { useNavigate } from "react-router-dom";
import UserService from "./UserService";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(async () => {
      try {
        const userData = await UserService.login(email, password);
        console.log(userData);

        if (userData.token) {
          localStorage.setItem("token", userData.token);
          localStorage.setItem("role", userData.role);
          localStorage.setItem("name", userData.name);
          localStorage.setItem("email", userData.email);

          if (userData.role === "USER") {
            navigate("/");
          } else if (userData.role === "ADMIN") {
            navigate("/WasteManagementDashboard");
          }
        } else {
          setError(userData.message);
        }
      } catch (error) {
        setError("An error occurred while logging in. Please try again.");
      } finally {
        setLoading(false);
      }
    }, 2000);
  };

  const handleGoogleSuccess = (response) => {
    console.log("Google Login Success:", response);
  };

  const handleGoogleFailure = (error) => {
    console.log("Google Login Failed:", error);
  };

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 relative overflow-hidden">
        {/* Advanced eco-themed background elements */}
        <div className="absolute inset-0 z-0">
          {/* Animated floating leaves */}
          {[...Array(8)].map((_, i) => (
            <div 
              key={i}
              className={`absolute ${i%2 ? 'text-emerald-400' : 'text-teal-400'} opacity-60`}
              style={{
                fontSize: `${Math.random() * 20 + 10}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 10 + 10}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`,
                transform: `rotate(${Math.random() * 360}deg)`
              }}
            >
              {i%3 === 0 ? '♻️' : i%2 === 0 ? '🌱' : '🍃'}
            </div>
          ))}

          {/* Subtle grid pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNlOGY4ZjMiIG9wYWNpdHk9IjAuMyI+PHBhdGggZD0iTTMwIDB2NjBNMCAzMGg2MCIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
        </div>

        {/* Main login card with glass morphism effect */}
        <div className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-md z-10 border border-white/20 relative overflow-hidden">
          {/* Decorative accent elements */}
          <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-emerald-200/30 blur-xl"></div>
          <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-teal-200/30 blur-xl"></div>
          
          {/* Company Logo with eco accent */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <img src={companyLogo} alt="Company Logo" className="w-24 h-24 z-10 relative" />
              <div className="absolute -inset-2 bg-emerald-400/20 rounded-full blur-md z-0"></div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-center text-emerald-900 mb-2">
            Welcome Back!
          </h2>
          <p className="text-center text-emerald-700/80 mb-6">Login to your eco-account</p>

          {error && (
            <div className="mb-4 p-3 bg-red-100/80 text-red-700 rounded-lg text-center border border-red-200">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Input */}
            <div className="relative">
              <input
                type="email"
                name="email"
                placeholder="Email address"
                className="w-full px-4 py-3 bg-white/70 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-300 focus:border-emerald-300 text-emerald-900 placeholder-emerald-400/70 transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div className="absolute left-4 top-3 text-emerald-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>

            {/* Password Input */}
            <div className="relative">
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full px-4 py-3 bg-white/70 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-300 focus:border-emerald-300 text-emerald-900 placeholder-emerald-400/70 transition-all pl-12"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="absolute left-4 top-3 text-emerald-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            </div>

            {/* Remember me & Forgot password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-emerald-500 focus:ring-emerald-400 border-emerald-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-emerald-700">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-emerald-600 hover:text-emerald-500">
                  Forgot password?
                </a>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-300 ${
                loading ? 'bg-emerald-400' : 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-md hover:shadow-emerald-200'
              }`}
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                "Login"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-emerald-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white/80 text-emerald-500">Or continue with</span>
            </div>
          </div>

          {/* Google Login Button */}
          <div className="mt-4">
            <GoogleLogin 
              onSuccess={handleGoogleSuccess} 
              onError={handleGoogleFailure} 
              theme="filled_blue"
              shape="pill"
              size="large"
            />
          </div>

          {/* Signup Link */}
          <p className="text-center text-emerald-700 mt-6">
            Don't have an account?{" "}
            <a href="/SignupForm" className="font-medium text-emerald-600 hover:text-emerald-500 underline">
              Sign Up
            </a>
          </p>
        </div>

        {/* Global styles for animations */}
        <style jsx>{`
          @keyframes float {
            0% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(5deg); }
            100% { transform: translateY(0) rotate(0deg); }
          }
        `}</style>
      </div>
    </GoogleOAuthProvider>
  );
}