import React, { useState, useEffect } from 'react';
import profilePhoto from '../Home/images/Premium Vector _ Young man Face Avater Vector illustration design.jpeg'; // Import profile photo
import coverPhoto from '../Home/images/p1.jpeg'; // Import cover photo
import { motion } from 'framer-motion';
import { FaEdit, FaCog, FaBell, FaChartLine, FaRecycle, FaHistory } from 'react-icons/fa';

const ProfileHeader = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [stats, setStats] = useState({
    totalPickups: 45,
    wasteRecycled: '120 kg',
    pointsEarned: 850,
    streak: 12
  });

  const name = localStorage.getItem('name');
  const email = localStorage.getItem('email');
  const gender = localStorage.getItem('gender');
  const age = localStorage.getItem('age');
  const role = localStorage.getItem('role');

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-lg max-w-3xl mx-auto overflow-hidden"
    >
      {/* Cover Photo with Overlay */}
      <div className="relative h-56">
        <img
          src={coverPhoto}
          alt="Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50"></div>
        
        {/* Profile Photo with Animation */}
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="absolute -bottom-20 left-1/2 transform -translate-x-1/2"
        >
          <img
            src={profilePhoto}
            alt="Profile"
            className="w-40 h-40 rounded-full border-4 border-white shadow-xl"
          />
        </motion.div>
      </div>

      {/* Profile Header with Enhanced Typography */}
      <div className="text-center mt-24 px-8">
        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-3xl font-bold text-gray-800 uppercase tracking-wide"
        >
          {name}
        </motion.h1>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-blue-50 p-5 rounded-xl shadow-sm"
          >
            <FaRecycle className="text-blue-500 text-2xl mx-auto mb-3" />
            <p className="text-2xl font-bold text-blue-600">{stats.totalPickups}</p>
            <p className="text-sm text-gray-600">Total Pickups</p>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-green-50 p-5 rounded-xl shadow-sm"
          >
            <FaChartLine className="text-green-500 text-2xl mx-auto mb-3" />
            <p className="text-2xl font-bold text-green-600">{stats.wasteRecycled}</p>
            <p className="text-sm text-gray-600">Waste Recycled</p>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-purple-50 p-5 rounded-xl shadow-sm"
          >
            <FaBell className="text-purple-500 text-2xl mx-auto mb-3" />
            <p className="text-2xl font-bold text-purple-600">{stats.pointsEarned}</p>
            <p className="text-sm text-gray-600">Points Earned</p>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-orange-50 p-5 rounded-xl shadow-sm"
          >
            <FaHistory className="text-orange-500 text-2xl mx-auto mb-3" />
            <p className="text-2xl font-bold text-orange-600">{stats.streak}</p>
            <p className="text-sm text-gray-600">Day Streak</p>
          </motion.div>
        </div>

        {/* Profile Details with Icons */}
        <div className="mt-10 space-y-4 bg-gray-50 p-8 rounded-xl">
          <div className="flex items-center justify-center space-x-3">
            <span className="text-gray-600 font-medium text-lg">Age:</span>
            <span className="text-gray-800 text-lg">{age}</span>
          </div>
          <div className="flex items-center justify-center space-x-3">
            <span className="text-gray-600 font-medium text-lg">Gender:</span>
            <span className="text-gray-800 text-lg">{gender}</span>
          </div>
          <div className="flex items-center justify-center space-x-3">
            <span className="text-gray-600 font-medium text-lg">Email:</span>
            <span className="text-gray-800 text-lg">{email}</span>
          </div>
        </div>
      </div>

      {/* Enhanced Action Buttons */}
      <div className="flex justify-center space-x-6 mt-8 px-8">
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition duration-300 flex items-center space-x-3 text-lg"
          onClick={() => setIsEditing(!isEditing)}
        >
          <FaEdit className="text-xl" />
          <span>Edit Profile</span>
        </motion.button>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gray-200 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-300 transition duration-300 flex items-center space-x-3 text-lg"
        >
          <FaCog className="text-xl" />
          <span>Settings</span>
        </motion.button>
      </div>

      {/* Waste Pickup Details Section with Enhanced Design */}
      <div className="mt-10 px-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Waste Pickup Details</h2>
        <div className="bg-gradient-to-r from-blue-50 to-green-50 p-8 rounded-xl shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <p className="text-gray-700 text-lg">
                <span className="font-semibold">Scheduled Pickup:</span> Every Monday & Thursday
              </p>
              <p className="text-gray-700 text-lg">
                <span className="font-semibold">Next Pickup Date:</span> March 21, 2025
              </p>
            </div>
            <div className="space-y-3">
              <p className="text-gray-700 text-lg">
                <span className="font-semibold">Pickup Location:</span> 123 Green Street, Eco City
              </p>
              <p className="text-gray-700 text-lg">
                <span className="font-semibold">Status:</span> 
                <span className="ml-3 px-4 py-1.5 bg-green-100 text-green-800 rounded-full text-sm">Confirmed</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Update Reminder */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-10 bg-gradient-to-r from-yellow-50 to-orange-50 p-8 rounded-xl mx-8 mb-10"
      >
        <p className="text-yellow-800 font-semibold text-xl">Profile Update Reminder</p>
        <p className="text-yellow-700 text-base mt-3">
          Keep your profile updated to help us provide better service and track your environmental impact.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default ProfileHeader;