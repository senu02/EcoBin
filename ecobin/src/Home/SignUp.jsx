import { useState } from "react";
import logo from "../Home/images/Logo.png";
import { useNavigate } from "react-router-dom";
import UserService from "./UserService";
import { AiOutlineCheckCircle } from "react-icons/ai";

export default function SignupForm() {
  const [formData, setFormData] = useState({
    role: "",
    name: "",
    email: "",
    gender: "",
    age: "",
    password: "",
  });

  const [disableInputs, setDisableInputs] = useState(false);
  const [showSecretPopup, setShowSecretPopup] = useState(false);
  const [secretKey, setSecretKey] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "role") {
      if (value === "ADMIN") {
        setShowSecretPopup(true);
      } else {
        setDisableInputs(false);
      }
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSecretSubmit = () => {
    if (secretKey === "ecobin") {
      setShowSecretPopup(false);
      setDisableInputs(false);
    } else {
      setError("Incorrect Secret Key! Other inputs disabled.");
      setShowSecretPopup(false);
      setDisableInputs(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const response = await UserService.register(formData, token);

      if (response.status === 400) {
        setError("Registration failed. Please check your details.");
        return;
      }

      setFormData({
        name: "",
        email: "",
        age: "",
        gender: "",
        password: "",
        role: "",
      });

      setShowSuccessPopup(true);
      setTimeout(() => {
        setShowSuccessPopup(false);
        navigate("/login");
      }, 2000);
    } catch (error) {
      setError("An error occurred during registration. Please try again.");
      console.error("Registration error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-50 to-teal-50 relative overflow-hidden">
      {/* Eco-themed background elements */}
      <div className="absolute inset-0 z-0">
        {/* Floating leaves */}
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className={`absolute ${i%3 === 0 ? 'text-green-400' : i%2 === 0 ? 'text-emerald-300' : 'text-teal-300'} opacity-60`}
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
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNlOGY4ZjMiIG9wYWNpdHk9IjAuMiI+PHBhdGggZD0iTTMwIDB2NjBNMCAzMGg2MCIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
      </div>

      {/* Main Signup Card */}
      <div className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-xl w-full max-w-md z-10 border border-white/20">
        {/* Logo Section */}
        <div className="flex justify-center mb-4">
          <div className="relative">
            <img src={logo} alt="Company Logo" className="w-24 z-10 relative" />
            <div className="absolute -inset-2 bg-emerald-400/20 rounded-full blur-md z-0"></div>
          </div>
        </div>

        {/* Title Section */}
        <h2 className="text-3xl font-bold text-center text-emerald-900 mb-2">
          Join Our Eco-Community
        </h2>
        <p className="text-center text-emerald-700/80 mb-5">
          Create your account to start your green journey
        </p>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100/80 text-red-700 rounded-lg text-center border border-red-200">
            {error}
          </div>
        )}

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Role Selection */}
          <div className="relative">
            <select
              name="role"
              className={`w-full px-4 py-3 pl-10 bg-white/70 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-300 focus:border-emerald-300 text-emerald-900 appearance-none ${
                disableInputs ? "bg-gray-100/50" : ""
              }`}
              value={formData.role}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Role</option>
              <option value="ADMIN">Admin</option>
              <option value="USER">User</option>
            </select>
            <div className="absolute left-3 top-3 text-emerald-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
          </div>

          {/* Full Name */}
          <div className="relative">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className={`w-full px-4 py-3 pl-10 bg-white/70 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-300 focus:border-emerald-300 text-emerald-900 ${
                disableInputs ? "bg-gray-100/50" : ""
              }`}
              value={formData.name}
              onChange={handleInputChange}
              required
              disabled={disableInputs}
            />
            <div className="absolute left-3 top-3 text-emerald-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
          </div>

          {/* Email */}
          <div className="relative">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className={`w-full px-4 py-3 pl-10 bg-white/70 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-300 focus:border-emerald-300 text-emerald-900 ${
                disableInputs ? "bg-gray-100/50" : ""
              }`}
              value={formData.email}
              onChange={handleInputChange}
              required
              disabled={disableInputs}
            />
            <div className="absolute left-3 top-3 text-emerald-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>

          {/* Gender */}
          <div className="relative">
            <select
              name="gender"
              className={`w-full px-4 py-3 pl-10 bg-white/70 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-300 focus:border-emerald-300 text-emerald-900 appearance-none ${
                disableInputs ? "bg-gray-100/50" : ""
              }`}
              value={formData.gender}
              onChange={handleInputChange}
              required
              disabled={disableInputs}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <div className="absolute left-3 top-3 text-emerald-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
          </div>

          {/* Age */}
          <div className="relative">
            <input
              type="number"
              name="age"
              placeholder="Age"
              className={`w-full px-4 py-3 pl-10 bg-white/70 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-300 focus:border-emerald-300 text-emerald-900 ${
                disableInputs ? "bg-gray-100/50" : ""
              }`}
              value={formData.age}
              onChange={handleInputChange}
              required
              disabled={disableInputs}
              min="1"
            />
            <div className="absolute left-3 top-3 text-emerald-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type="password"
              name="password"
              placeholder="Password"
              className={`w-full px-4 py-3 pl-10 bg-white/70 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-300 focus:border-emerald-300 text-emerald-900 ${
                disableInputs ? "bg-gray-100/50" : ""
              }`}
              value={formData.password}
              onChange={handleInputChange}
              required
              disabled={disableInputs}
            />
            <div className="absolute left-3 top-3 text-emerald-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-300 ${
              loading || disableInputs
                ? "bg-emerald-400 cursor-not-allowed"
                : "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-md hover:shadow-emerald-200"
            }`}
            disabled={loading || disableInputs}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Creating Account...
              </span>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center text-emerald-700 mt-6">
          Already have an account?{" "}
          <a
            href="/login"
            className="font-medium text-emerald-600 hover:text-emerald-500 underline"
          >
            Login
          </a>
        </p>
      </div>

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-80">
            <div className="flex justify-center mb-4">
              <AiOutlineCheckCircle className="text-green-500 text-6xl" />
            </div>
            <h3 className="text-xl font-semibold text-center text-green-500">
              Account Created!
            </h3>
            <p className="text-center text-gray-600 mt-2">
              Your eco-account is ready to use.
            </p>
          </div>
        </div>
      )}

      {/* Secret Key Popup */}
      {showSecretPopup && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-80">
            <h3 className="text-xl font-semibold mb-3 text-center text-emerald-800">
              Admin Verification
            </h3>
            <p className="text-emerald-700 mb-4 text-center">
              Enter the eco-secret key to register as admin
            </p>
            <div className="relative">
              <input
                type="password"
                className="w-full px-4 py-2 pl-10 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-300"
                placeholder="Secret Key"
                value={secretKey}
                onChange={(e) => setSecretKey(e.target.value)}
              />
              <div className="absolute left-3 top-3 text-emerald-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => {
                  setShowSecretPopup(false);
                  setFormData({ ...formData, role: "" });
                }}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSecretSubmit}
                className="bg-emerald-500 text-white px-4 py-2 rounded-md hover:bg-emerald-600 transition"
              >
                Verify
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Animation styles */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
      `}</style>
    </div>
  );
}