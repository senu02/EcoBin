import { Link } from "react-router-dom"; // Import Link for navigation
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { motion } from "framer-motion";
import "react-circular-progressbar/dist/styles.css";
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
  FaIndustry,
} from "react-icons/fa";
import logo from "../Home/images/Logo.png";

export default function WasteManagementDashboard() {
  const attendancePercentage = 70;

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-green-500 p-6 text-white flex flex-col justify-between">
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
            <Link to="/" className="flex items-center w-full text-left bg-white text-black p-2 rounded-md">
              <FaHome className="mr-2" /> Dashboard
            </Link>
            <Link to="/account" className="flex items-center w-full text-left bg-white text-black p-2 rounded-md">
              <FaUser className="mr-2" /> Your Account
            </Link>
            <Link to="/settings" className="flex items-center w-full text-left bg-white text-black p-2 rounded-md">
              <FaCog className="mr-2" /> Settings
            </Link>
            <Link to="/help" className="flex items-center w-full text-left bg-white text-black p-2 rounded-md">
              <FaQuestionCircle className="mr-2" /> Help
            </Link>
          </nav>
        </div>

        {/* Sign Out Button */}
        <button className="flex items-center bg-black text-white p-2 rounded-md">
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
          <Link to="/waste-classification">
            <motion.div
              className="border rounded-lg p-6 flex flex-col items-center transition-transform transform hover:scale-105 hover:shadow-lg"
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
              className="border rounded-lg p-6 flex flex-col items-center transition-transform transform hover:scale-105 hover:shadow-lg"
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
              className="border rounded-lg p-6 flex flex-col items-center transition-transform transform hover:scale-105 hover:shadow-lg"
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
              className="border rounded-lg p-6 flex flex-col items-center transition-transform transform hover:scale-105 hover:shadow-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <FaFileAlt className="text-green-600 text-4xl mb-2" />
              <p className="font-bold text-gray-700">Generate Waste Reports</p>
            </motion.div>
          </Link>

          {/* Request Pickup */}
          <Link to="/request-pickup">
            <motion.div
              className="border rounded-lg p-6 flex flex-col items-center transition-transform transform hover:scale-105 hover:shadow-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <FaRecycle className="text-green-600 text-4xl mb-2" />
              <p className="font-bold text-gray-700">Request Pickup</p>
            </motion.div>
          </Link>

          {/* Monitor Disposal Efficiency */}
          <Link to="/monitor-disposal">
            <motion.div
              className="border rounded-lg p-6 flex flex-col items-center transition-transform transform hover:scale-105 hover:shadow-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <FaIndustry className="text-green-600 text-4xl mb-2" />
              <p className="font-bold text-gray-700">Monitor Disposal Efficiency</p>
            </motion.div>
          </Link>
        </div>
      </main>
    </div>
  );
}
