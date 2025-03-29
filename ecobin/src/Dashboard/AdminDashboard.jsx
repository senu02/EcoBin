import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { motion, AnimatePresence } from "framer-motion";
import "react-circular-progressbar/dist/styles.css";
import { FaPhoneAlt } from "react-icons/fa";
import {
  FaHome,
  FaUser,
  FaCog,
  FaQuestionCircle,
  FaSignOutAlt,
  FaRecycle,
  FaTrash,
  FaMapMarkerAlt,
  FaFileAlt,
  FaTimes,
} from "react-icons/fa";
import logo from "../Home/images/Logo.png";
import UserService from "../Home/UserService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function WasteManagementDashboard() {
  const attendancePercentage = 70;
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    setShowLogoutConfirmation(true);
  };

  const handleCancelLogout = () => {
    setShowLogoutConfirmation(false);
  };

  const handleConfirmLogout = async () => {
    setIsLoggingOut(true);
    try {
      // Simulate async operation (in a real app, you might have an API call here)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Perform logout
      UserService.logout();
      
      // Show success message
      toast.success("You have been logged out successfully", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      
      // Navigate to login page
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed. Please try again.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } finally {
      setIsLoggingOut(false);
      setShowLogoutConfirmation(false);
    }
  };

  return (
    <div className="flex min-h-screen relative">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-green-600 to-black p-6 text-white flex flex-col justify-between">
        <div>
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <div className="bg-white p-4 rounded-full">
              <img
                src={logo}
                alt="Waste Management Logo"
                className="w-20 h-20 object-contain"
              />
            </div>
          </div>

          {/* Navigation Menu with Links */}
          <nav className="space-y-4">
            <Link to="/" className="flex items-center w-full text-left bg-white text-black p-2 rounded-md hover:bg-gray-100 transition-colors">
              <FaHome className="mr-2" /> Home Page
            </Link>
            <Link to="/ProfileHeader" className="flex items-center w-full text-left bg-white text-black p-2 rounded-md hover:bg-gray-100 transition-colors">
              <FaUser className="mr-2" /> Your Account
            </Link>
            <Link to="/settings" className="flex items-center w-full text-left bg-white text-black p-2 rounded-md hover:bg-gray-100 transition-colors">
              <FaCog className="mr-2" /> Settings
            </Link>
            <Link to="/help" className="flex items-center w-full text-left bg-white text-black p-2 rounded-md hover:bg-gray-100 transition-colors">
              <FaQuestionCircle className="mr-2" /> Help
            </Link>
          </nav>
        </div>

        {/* Sign Out Button */}
        <button 
          onClick={handleLogoutClick}
          disabled={isLoggingOut}
          className={`flex items-center justify-center bg-black text-white p-3 rounded-md w-full ${
            isLoggingOut ? "opacity-75 cursor-not-allowed" : "hover:bg-gray-800 transition-colors"
          }`}
        >
          <FaSignOutAlt className="mr-2" /> Sign out
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 flex flex-col items-center justify-center min-h-screen">
        <motion.h1
          className="text-4xl font-bold mb-6 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Waste Management Dashboard
        </motion.h1>

        <div className="grid grid-cols-3 gap-6">
          {/* Waste Classification */}
          <Link to="/aidetector">
            <motion.div
              className="border rounded-lg p-6 flex flex-col items-center transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="w-24 h-24">
                <CircularProgressbar
                  value={attendancePercentage}
                  text={`${attendancePercentage}%`}
                  styles={buildStyles({ pathColor: "green", textColor: "black" })}
                />
              </div>
              <p className="mt-4 font-bold text-green-600">Waste Classification</p>
            </motion.div>
          </Link>

          {/* Waste Report Management */}
          <Link to="/WasteReport">
            <motion.div
              className="border rounded-lg p-6 flex flex-col items-center transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <FaTrash className="text-green-600 text-4xl mb-2" />
              <p className="font-bold text-gray-700">Waste Report Management</p>
            </motion.div>
          </Link>

          {/* Collection Scheduling */}
          <Link to="/WasteTrackDashboard">
            <motion.div
              className="border rounded-lg p-6 flex flex-col items-center transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <FaMapMarkerAlt className="text-green-600 text-4xl mb-2" />
              <p className="font-bold text-gray-700">Collection Scheduling</p>
            </motion.div>
          </Link>

          {/* Generate Waste Reports */}
          <Link to="/AutoGenerateReport">
            <motion.div
              className="border rounded-lg p-6 flex flex-col items-center transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <FaFileAlt className="text-green-600 text-4xl mb-2" />
              <p className="font-bold text-gray-700">Generate Waste Reports</p>
            </motion.div>
          </Link>

          {/* Request Pickup */}
          <Link to="/WasteRequestTable">
            <motion.div
              className="border rounded-lg p-6 flex flex-col items-center transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <FaRecycle className="text-green-600 text-4xl mb-2" />
              <p className="font-bold text-gray-700">Request Pickup</p>
            </motion.div>
          </Link>

          {/* Contact Details */}
          <Link to="/ContactDetails">
            <motion.div
              className="border rounded-lg p-6 flex flex-col items-center transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <FaPhoneAlt className="text-green-600 text-4xl mb-2" />
              <p className="font-bold text-gray-700">Contact Details</p>
            </motion.div>
          </Link>
        </div>
      </main>

      {/* Logout Confirmation Modal */}
      <AnimatePresence>
        {showLogoutConfirmation && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="bg-white rounded-xl p-6 w-full max-w-md relative"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
            >
              <button
                onClick={handleCancelLogout}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <FaTimes className="text-xl" />
              </button>

              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
                  <FaSignOutAlt className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Confirm Logout</h3>
                <p className="text-gray-500 mb-6">
                  Are you sure you want to log out of your account?
                </p>
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={handleCancelLogout}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmLogout}
                    disabled={isLoggingOut}
                    className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors ${
                      isLoggingOut ? "opacity-75 cursor-not-allowed" : ""
                    }`}
                  >
                    {isLoggingOut ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Logging out...
                      </span>
                    ) : (
                      "Logout"
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading Overlay */}
      <AnimatePresence>
        {isLoggingOut && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="w-24 h-24 mb-4"
              animate={{
                rotate: 360,
                transition: { duration: 1.5, repeat: Infinity, ease: "linear" }
              }}
            >
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path
                  d="M50 15A35 35 0 1 0 50 85A35 35 0 1 0 50 15Z"
                  stroke="#10B981"
                  strokeWidth="10"
                  fill="none"
                  strokeDasharray="164.93361431346415 56.97787143782138"
                />
              </svg>
            </motion.div>
            <motion.p
              className="text-white text-xl font-medium"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Logging you out...
            </motion.p>
            <motion.p
              className="text-gray-300 mt-2"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Please wait while we secure your data
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}