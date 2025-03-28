import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import UserService from "../Home/UserService";
import { motion } from "framer-motion";
import { FiCalendar, FiTruck, FiMapPin, FiCheckCircle, FiEdit, FiClock } from "react-icons/fi";
import { GiRecycle } from "react-icons/gi";
import { FaLeaf, FaTrashAlt } from "react-icons/fa";

const CollectionScheduleView = () => {
  let navigate = useNavigate();
  const { id } = useParams();

  const [collectionSchedule, setCollectionSchedule] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadSchedule();
    }
  }, [id]);

  const loadSchedule = async () => {
    try {
      setIsLoading(true);
      const result = await axios.get(`${UserService.BASE_URL}/public/getById/${id}`);
      setCollectionSchedule(result.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching schedule:", error);
      setIsLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-green-50 to-blue-50">
      {/* Main Content */}
      <motion.section 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl bg-white p-8 rounded-3xl shadow-xl border border-green-100"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center justify-center mb-4"
          >
            <FaLeaf className="text-green-500 text-4xl mr-3" />
            <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-blue-600">
              Waste Collection Schedule
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Your eco-friendly waste management details at a glance
          </motion.p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          </div>
        ) : collectionSchedule ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {/* Image Section */}
            <motion.div 
              variants={itemVariants}
              className="relative group overflow-hidden rounded-2xl shadow-lg border-2 border-green-200"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-blue-400 opacity-20 z-0"></div>
              <div className="relative z-10 p-6 flex flex-col h-full">
                <div className="flex items-center mb-4">
                  <FiTruck className="text-green-600 text-2xl mr-2" />
                  <h3 className="text-2xl font-semibold text-gray-800">Collection Vehicle</h3>
                </div>
                
                {collectionSchedule.truckImage ? (
                  <div className="flex-1 flex items-center justify-center">
                    <motion.img
                      whileHover={{ scale: 1.03 }}
                      src={`data:image/jpeg;base64,${collectionSchedule.truckImage}`}
                      alt="Garbage Truck"
                      className="w-full h-80 object-contain rounded-lg shadow-md"
                    />
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center bg-gray-100 rounded-lg p-8">
                    <FaTrashAlt className="text-gray-400 text-5xl mb-4" />
                    <p className="text-gray-500 text-center">No vehicle image available</p>
                  </div>
                )}
                
                <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-100">
                  <p className="text-sm text-gray-600 flex items-center">
                    <FiClock className="mr-2 text-green-600" />
                    Collection time: {collectionSchedule.collectionTime || "Not specified"}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Details Section */}
            <motion.div 
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-lg border-2 border-green-100 overflow-hidden"
            >
              <div className="bg-gradient-to-r from-green-500 to-green-600 p-4">
                <h3 className="text-2xl font-bold text-white flex items-center">
                  <FiEdit className="mr-2" />
                  Collection Details
                </h3>
              </div>
              
              <div className="p-6 space-y-5">
                <motion.div 
                  whileHover={{ x: 5 }}
                  className="flex items-start border-b border-gray-100 pb-4"
                >
                  <div className="bg-green-100 p-2 rounded-full mr-4">
                    <FiTruck className="text-green-600 text-xl" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-500 uppercase">Driver</h4>
                    <p className="text-lg font-medium text-gray-800">{collectionSchedule.driverName}</p>
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ x: 5 }}
                  className="flex items-start border-b border-gray-100 pb-4"
                >
                  <div className="bg-blue-100 p-2 rounded-full mr-4">
                    <GiRecycle className="text-blue-600 text-xl" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-500 uppercase">Waste Type</h4>
                    <p className="text-lg font-medium text-gray-800">{collectionSchedule.wasteType}</p>
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ x: 5 }}
                  className="flex items-start border-b border-gray-100 pb-4"
                >
                  <div className="bg-purple-100 p-2 rounded-full mr-4">
                    <FiCalendar className="text-purple-600 text-xl" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-500 uppercase">Collection Date</h4>
                    <p className="text-lg font-medium text-gray-800">{collectionSchedule.collectionDate}</p>
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ x: 5 }}
                  className="flex items-start border-b border-gray-100 pb-4"
                >
                  <div className="bg-yellow-100 p-2 rounded-full mr-4">
                    <FiMapPin className="text-yellow-600 text-xl" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-500 uppercase">Location</h4>
                    <p className="text-lg font-medium text-gray-800">{collectionSchedule.location}</p>
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ x: 5 }}
                  className="flex items-start border-b border-gray-100 pb-4"
                >
                  <div className="bg-red-100 p-2 rounded-full mr-4">
                    <FiCheckCircle className="text-red-600 text-xl" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-500 uppercase">Status</h4>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(collectionSchedule.status)}`}>
                      {collectionSchedule.status}
                    </span>
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ x: 5 }}
                  className="flex items-start"
                >
                  <div className="bg-indigo-100 p-2 rounded-full mr-4">
                    <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-500 uppercase">Remarks</h4>
                    <p className="text-lg font-medium text-gray-800">
                      {collectionSchedule.remark || "No remarks provided"}
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-red-500 text-5xl mb-4">⚠️</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">Schedule Not Found</h3>
            <p className="text-gray-500">The requested collection schedule could not be loaded.</p>
            <button 
              onClick={() => navigate(-1)}
              className="mt-6 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Go Back
            </button>
          </motion.div>
        )}
      </motion.section>

      {/* Footer */}
      <motion.footer 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-r from-green-600 to-blue-600 py-5 text-center text-white mt-10 w-full max-w-6xl rounded-b-3xl shadow-lg"
      >
        <div className="container mx-auto px-4">
          <p className="flex items-center justify-center">
            <FaLeaf className="mr-2" />
            © 2025 EcoCollect Waste Management System. All rights reserved.
          </p>
          <p className="mt-2 text-sm text-green-100">
            Committed to a cleaner, greener planet.
          </p>
        </div>
      </motion.footer>
    </div>
  );
};

export default CollectionScheduleView;