import { useState } from "react";
import logo from "../Home/images/Logo.png"; // Import company logo

export default function SignupForm() {
  const [formData, setFormData] = useState({
    role: "",
    fullName: "",
    email: "",
    gender: "",
    age: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img src={logo} alt="Company Logo" className="w-24" />
        </div>

        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Create Account!
        </h2>
        <p className="text-center text-gray-600 mb-5">
          Join us today! Enter your details to create your account.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Role Dropdown */}
          <select
            name="role"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="">👤 Select Role</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>

          {/* Full Name */}
          <input
            type="text"
            name="fullName"
            placeholder="👤 Full Name"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
            value={formData.fullName}
            onChange={handleChange}
            required
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="✉️ Email"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
            value={formData.email}
            onChange={handleChange}
            required
          />

          {/* Gender Dropdown */}
          <select
            name="gender"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">⚥ Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          {/* Age */}
          <input
            type="number"
            name="age"
            placeholder="🎂 Age"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
            value={formData.age}
            onChange={handleChange}
            required
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="🔒 Password"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
            value={formData.password}
            onChange={handleChange}
            required
          />

          {/* Sign Up Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
