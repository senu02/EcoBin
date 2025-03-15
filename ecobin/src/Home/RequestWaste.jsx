import { useState } from "react";
import {
  FaBars,
  FaBell,
  FaUser,
  FaHome,
  FaTrash,
  FaPhone,
  FaCalendar,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";

export default function WastePickupRequest() {
  const [quantity, setQuantity] = useState(5);

  return (
    <div className="flex flex-col min-h-screen bg-green-50">
      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold text-green-900">Waste Pickup Request Form</h1>
          <div className="flex items-center space-x-4">
            <FaBell className="text-2xl text-green-900" />
            <FaUser className="text-2xl text-green-900" />
          </div>
        </div>

        {/* Form */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <form className="space-y-6">
            {/* Input Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full p-3 pl-10 border border-green-300 rounded-md focus:border-green-500 focus:ring-2 focus:ring-green-200"
                />
                <FaUser className="absolute left-3 top-3.5 text-green-500" />
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Address"
                  className="w-full p-3 pl-10 border border-green-300 rounded-md focus:border-green-500 focus:ring-2 focus:ring-green-200"
                />
                <FaHome className="absolute left-3 top-3.5 text-green-500" />
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Mobile Number"
                  className="w-full p-3 pl-10 border border-green-300 rounded-md focus:border-green-500 focus:ring-2 focus:ring-green-200"
                />
                <FaPhone className="absolute left-3 top-3.5 text-green-500" />
              </div>
            </div>

            {/* Waste Type */}
            <fieldset className="border border-green-300 p-4 rounded-md">
              <legend className="font-semibold text-green-900 px-2">Select Waste Type</legend>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                {[
                  "Organic Waste",
                  "Recyclable Waste (Paper, Plastic, Metal, Glass, etc.)",
                  "Hazardous Waste (Batteries, Chemicals, Medical Waste, etc.)",
                  "Electronic Waste (E-waste)",
                  "General Waste",
                  "Other",
                ].map((waste, index) => (
                  <label key={index} className="flex items-center space-x-2">
                    <input type="checkbox" className="h-5 w-5 accent-green-500" />
                    <span className="text-green-900">{waste}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            {/* Estimated Quantity */}
            <div className="flex items-center space-x-4">
              <label className="font-semibold text-green-900">Estimated Quantity:</label>
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  className="px-3 py-1 border border-green-300 rounded-md bg-green-200 text-green-900 hover:bg-green-300 transition-colors"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                >
                  -
                </button>
                <span className="text-lg font-semibold text-green-900">{quantity}</span>
                <button
                  type="button"
                  className="px-3 py-1 border border-green-300 rounded-md bg-green-200 text-green-900 hover:bg-green-300 transition-colors"
                  onClick={() => setQuantity((q) => q + 1)}
                >
                  +
                </button>
              </div>
            </div>

            {/* Frequency of Pickup */}
            <fieldset className="border border-green-300 p-4 rounded-md">
              <legend className="font-semibold text-green-900 px-2">Frequency of Pickup</legend>
              <div className="mt-2 space-y-2">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="h-5 w-5 accent-green-500" />
                  <span className="text-green-900">One-Time Request</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="h-5 w-5 accent-green-500" />
                  <span className="text-green-900">Recurring Request (Daily/Weekly/Monthly)</span>
                </label>
              </div>
            </fieldset>

            {/* Terms & Submit Button */}
            <div className="flex items-center space-x-2">
              <input type="checkbox" className="h-5 w-5 accent-green-500" />
              <span className="text-green-900">I agree to the terms & conditions of the waste management service.</span>
            </div>

            <button className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-md hover:from-green-700 hover:to-green-800 transition-all">
              Submit
            </button>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-green-500 text-white py-12 mt-auto">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#home" className="hover:text-green-200">Home</a></li>
                <li><a href="#services" className="hover:text-green-200">Services</a></li>
                <li><a href="#recycling" className="hover:text-green-200">Recycling</a></li>
                <li><a href="#about" className="hover:text-green-200">About Us</a></li>
                <li><a href="#contact" className="hover:text-green-200">Contact</a></li>
              </ul>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="text-lg font-bold mb-4">Contact Us</h3>
              <ul className="space-y-2">
                <li>123 Waste Management St.</li>
                <li>City, State, ZIP</li>
                <li>Email: info@ecobin.com</li>
                <li>Phone: +1 (123) 456-7890</li>
              </ul>
            </div>

            {/* Social Media Links */}
            <div>
              <h3 className="text-lg font-bold mb-4">Follow Us</h3>
              <ul className="flex space-x-4">
                <li>
                  <a href="#" className="text-white hover:text-green-200">
                    <FaFacebook className="w-6 h-6" />
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white hover:text-green-200">
                    <FaTwitter className="w-6 h-6" />
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white hover:text-green-200">
                    <FaLinkedin className="w-6 h-6" />
                  </a>
                </li>
              </ul>
            </div>

            {/* Newsletter Subscription */}
            <div>
              <h3 className="text-lg font-bold mb-4">Subscribe</h3>
              <p className="mb-4">Subscribe to our newsletter for updates and offers.</p>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="p-2 rounded-l-lg focus:outline-none text-black"
                />
                <button
                  type="submit"
                  className="bg-green-600 text-white p-2 rounded-r-lg hover:bg-green-700"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Copyright Notice */}
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p>&copy; 2025 Ecobin. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}