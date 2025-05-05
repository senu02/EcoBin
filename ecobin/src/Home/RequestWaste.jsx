import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserService from "./UserService";
import { FaUser, FaHome, FaPhone, FaCamera, FaRobot } from "react-icons/fa";
import { AiOutlineCheckCircle, AiOutlineExclamationCircle, AiOutlineMessage } from "react-icons/ai";
import image from "./images/BIN2.jpg";
import photo1 from "./images/ph1.jpg";
import photo2 from "./images/ph2.jpg";
import photo3 from "./images/ph3.jpg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { motion } from "framer-motion";

export default function WastePickupRequest() {
  const navigate = useNavigate();

  const [wasteRequest, setWasteRequest] = useState({
    name: "",
    address: "",
    mobile: "",
    wasteType: "",
    quantity: 1,
    frequencyPickup: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    address: "",
    mobile: "",
    wasteType: "",
    frequencyPickup: "",
  });

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { name, address, mobile, wasteType, quantity, frequencyPickup } = wasteRequest;

  useEffect(() => {
    const userName = localStorage.getItem('name');
    const userAddress = localStorage.getItem('address');
    
    setWasteRequest((prev) => ({
      ...prev,
      name: userName || '',
      address: userAddress || '',
    }));
  }, []);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      name: "",
      address: "",
      mobile: "",
      wasteType: "",
      frequencyPickup: "",
    };

    if (!name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!address.trim()) {
      newErrors.address = "Address is required";
      isValid = false;
    } 

    if (!mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
      isValid = false;
    } else if (!/^\d{10}$/.test(mobile)) {
      newErrors.mobile = "Mobile number must be 10 digits";
      isValid = false;
    }

    if (!wasteType) {
      newErrors.wasteType = "Please select a waste type";
      isValid = false;
    }

    if (!frequencyPickup) {
      newErrors.frequencyPickup = "Please select pickup frequency";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "mobile") {
      if (value === "" || /^\d{0,10}$/.test(value)) {
        setWasteRequest({ ...wasteRequest, [name]: value });
      }
    } else {
      setWasteRequest({ ...wasteRequest, [name]: value });
    }
    
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const increaseQuantity = () => {
    setWasteRequest((prev) => ({ ...prev, quantity: prev.quantity + 1 }));
  };

  const decreaseQuantity = () => {
    setWasteRequest((prev) => ({
      ...prev,
      quantity: Math.max(1, prev.quantity - 1),
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm() && !isSubmitting) {
      setIsSubmitting(true);
      try {
        await axios.post(`${UserService.BASE_URL}/public/addRequest`, wasteRequest);
        setShowSuccessPopup(true);
        setTimeout(() => {
          setShowSuccessPopup(false);
          navigate("/");
        }, 3000);
      } catch (error) {
        console.error("Error submitting waste pickup request:", error);
        alert("Failed to submit request. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 relative overflow-hidden">
      {/* Decorative Green Circle */}
      <div className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-green-300 rounded-full opacity-30 blur-2xl z-0 pointer-events-none"></div>

      {/* Success Popup */}
      {showSuccessPopup && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50"
        >
          <div className="bg-white p-8 rounded-2xl shadow-2xl transform transition-all duration-300">
            <div className="flex justify-center mb-6">
              <AiOutlineCheckCircle className="text-green-500 text-7xl animate-bounce" />
            </div>
            <h3 className="text-2xl font-bold text-center text-green-600 mb-2">Request Added Successfully!</h3>
            <p className="text-center text-gray-600">Your request has been saved and will be processed shortly.</p>
          </div>
        </motion.div>
      )}

      {/* Header Section */}
      <motion.section 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto py-16 px-4"
      >
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              On-request bin pick-up / <br />
              <span className="text-green-600">Emptying the bin on request</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Experience our comfortable and top-notch quality service-oriented waste management solution. 
              Submit your requests through our platform for immediate response and efficient waste collection.
            </p>
          </div>
          <div className="flex-shrink-0">
            <img
              src={image}
              alt="On-request bin pick-up"
              className="w-96 h-80 object-cover rounded-2xl shadow-xl transform hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="max-w-6xl mx-auto py-16 px-4"
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Advanced Features & Benefits
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Experience our comprehensive waste management solutions designed for efficiency and sustainability
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              id: "01",
              icon: <FaRobot className="text-3xl text-green-500" />,
              title: "Smart Collection System",
              description: "AI-powered waste collection scheduling and route optimization for maximum efficiency",
              benefits: ["Real-time tracking", "Automated scheduling", "Route optimization"]
            },
            {
              id: "02",
              icon: <FaHome className="text-3xl text-green-500" />,
              title: "Cost-Effective Solutions",
              description: "Optimized waste management strategies to reduce operational costs",
              benefits: ["Reduced fuel consumption", "Lower maintenance costs", "Efficient resource allocation"]
            },
            {
              id: "03",
              icon: <AiOutlineCheckCircle className="text-3xl text-green-500" />,
              title: "ESG Reporting",
              description: "Comprehensive environmental, social, and governance reporting capabilities",
              benefits: ["Carbon footprint tracking", "Sustainability metrics", "Compliance reporting"]
            },
            {
              id: "04",
              icon: <FaCamera className="text-3xl text-green-500" />,
              title: "Real-time Monitoring",
              description: "Live tracking and supervision of waste collection operations",
              benefits: ["GPS tracking", "Live updates", "Performance analytics"]
            },
            {
              id: "05",
              icon: <FaHome className="text-3xl text-green-500" />,
              title: "Infrastructure Overview",
              description: "Complete visibility into waste management infrastructure",
              benefits: ["Asset management", "Capacity planning", "Maintenance scheduling"]
            },
            {
              id: "06",
              icon: <AiOutlineMessage className="text-3xl text-green-500" />,
              title: "Waste Flow Tracking",
              description: "End-to-end tracking of waste from collection to disposal",
              benefits: ["Traceability", "Quality control", "Process optimization"]
            }
          ].map((feature) => (
            <motion.div 
              key={feature.id}
              whileHover={{ scale: 1.05, y: -10 }}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="bg-green-100 text-green-600 font-bold text-lg px-4 py-2 rounded-lg">
                  {feature.id}
                </span>
                <div className="bg-green-50 p-3 rounded-full">
                  {feature.icon}
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 mb-4">
                {feature.description}
              </p>
              
              <ul className="space-y-2">
                {feature.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <AiOutlineCheckCircle className="text-green-500 mr-2" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Feature Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { number: "98%", label: "Customer Satisfaction", icon: <AiOutlineCheckCircle className="text-3xl text-green-500" /> },
            { number: "24/7", label: "Support Available", icon: <FaPhone className="text-3xl text-green-500" /> },
            { number: "100%", label: "Eco-Friendly", icon: <FaHome className="text-3xl text-green-500" /> }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-lg text-center"
            >
              <div className="flex justify-center mb-4">
                {stat.icon}
              </div>
              <h3 className="text-4xl font-bold text-green-600 mb-2">{stat.number}</h3>
              <p className="text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Photo Gallery Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="max-w-7xl mx-auto py-20 px-4"
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Waste Management Journey
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover how we're making a difference in waste management and environmental conservation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { 
              src: photo1, 
              alt: "Waste Collection Process",
              description: "Efficient waste collection systems in action",
              category: "Collection"
            },
            { 
              src: photo2, 
              alt: "Recycling Facility",
              description: "State-of-the-art recycling facilities",
              category: "Recycling"
            },
            { 
              src: photo3, 
              alt: "Eco-friendly Solutions",
              description: "Sustainable waste management practices",
              category: "Sustainability"
            },
          
          ].map((photo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative overflow-hidden rounded-2xl shadow-xl"
            >
              <div className="aspect-w-4 aspect-h-3">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="inline-block px-3 py-1 bg-green-500 text-white text-sm font-semibold rounded-full mb-3">
                    {photo.category}
                  </span>
                  <h3 className="text-white text-xl font-bold mb-2">{photo.alt}</h3>
                  <p className="text-gray-200 text-sm">{photo.description}</p>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <FaCamera className="text-white text-xl" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Gallery Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { number: "500+", label: "Tons of Waste Recycled" },
            { number: "1000+", label: "Happy Customers" },
            { number: "50+", label: "Communities Served" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-lg text-center"
            >
              <h3 className="text-4xl font-bold text-green-600 mb-2">{stat.number}</h3>
              <p className="text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Main Form Section */}
      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="max-w-4xl mx-auto p-8"
      >
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Waste Pickup Request Form</h1>
          
          <form className="space-y-8" onSubmit={onSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Name Field */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Name"
                  className={`w-full p-4 pl-12 border-2 ${errors.name ? 'border-red-500' : 'border-green-200'} rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all`}
                  name="name"
                  value={name}
                  onChange={onInputChange}
                  disabled
                />
                <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-500 text-xl" />
                {errors.name && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <AiOutlineExclamationCircle className="mr-1" />
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Address Field */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Address"
                  className={`w-full p-4 pl-12 border-2 ${errors.address ? 'border-red-500' : 'border-green-200'} rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all`}
                  name="address"
                  value={address}
                  onChange={onInputChange}
                />
                <FaHome className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-500 text-xl" />
                {errors.address && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <AiOutlineExclamationCircle className="mr-1" />
                    {errors.address}
                  </p>
                )}
              </div>

              {/* Mobile Field */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Mobile Number"
                  className={`w-full p-4 pl-12 border-2 ${errors.mobile ? 'border-red-500' : 'border-green-200'} rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all`}
                  name="mobile"
                  value={mobile}
                  onChange={onInputChange}
                  maxLength="10"
                />
                <FaPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-500 text-xl" />
                {errors.mobile && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <AiOutlineExclamationCircle className="mr-1" />
                    {errors.mobile}
                  </p>
                )}
              </div>

              {/* Waste Type Dropdown */}
              <div className="relative">
                <label className="block text-gray-700 font-medium mb-2">Select Waste Type</label>
                <select
                  name="wasteType"
                  value={wasteType}
                  onChange={onInputChange}
                  className={`w-full p-4 border-2 ${errors.wasteType ? 'border-red-500' : 'border-green-200'} rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all`}
                >
                  <option value="" disabled>Select waste type</option>
                  <option value="Organic Waste">Organic Waste</option>
                  <option value="Recyclable Waste">Recyclable Waste</option>
                  <option value="Hazardous Waste">Hazardous Waste</option>
                  <option value="Electronic Waste">Electronic Waste</option>
                  <option value="General Waste">General Waste</option>
                  <option value="Other">Other</option>
                </select>
                {errors.wasteType && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <AiOutlineExclamationCircle className="mr-1" />
                    {errors.wasteType}
                  </p>
                )}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="bg-green-50 p-6 rounded-xl">
              <label className="block text-gray-700 font-medium mb-4">Estimated Quantity</label>
              <div className="flex items-center justify-center space-x-6">
                <button
                  type="button"
                  onClick={decreaseQuantity}
                  className="w-12 h-12 bg-green-200 text-green-700 rounded-full flex items-center justify-center text-2xl hover:bg-green-300 transition-colors"
                >
                  -
                </button>
                <span className="text-3xl font-bold text-green-700 w-12 text-center">{quantity}</span>
                <button
                  type="button"
                  onClick={increaseQuantity}
                  className="w-12 h-12 bg-green-200 text-green-700 rounded-full flex items-center justify-center text-2xl hover:bg-green-300 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Frequency Radio Buttons */}
            <div className={`p-6 rounded-xl ${errors.frequencyPickup ? 'bg-red-50' : 'bg-green-50'}`}>
              <label className="block text-gray-700 font-medium mb-4">Frequency of Pickup</label>
              <div className="space-y-4">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="frequencyPickup"
                    value="One-Time"
                    checked={frequencyPickup === "One-Time"}
                    onChange={onInputChange}
                    className="w-5 h-5 text-green-600 focus:ring-green-500"
                  />
                  <span className="text-gray-700">One-Time Request</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="frequencyPickup"
                    value="Recurring"
                    checked={frequencyPickup === "Recurring"}
                    onChange={onInputChange}
                    className="w-5 h-5 text-green-600 focus:ring-green-500"
                  />
                  <span className="text-gray-700">Recurring Request (Daily/Weekly/Monthly)</span>
                </label>
              </div>
              {errors.frequencyPickup && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <AiOutlineExclamationCircle className="mr-1" />
                  {errors.frequencyPickup}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 px-6 rounded-xl text-white font-bold text-lg transition-all ${
                isSubmitting 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Request'}
            </motion.button>
          </form>
        </div>
      </motion.main>

      {/* AI Chatbot Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 z-50"
      >
        <motion.button
          className="relative group"
          whileHover={{ y: -5 }}
        >
          {/* Main Button */}
          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full shadow-lg flex items-center justify-center relative overflow-hidden">
            <FaRobot className="text-white text-2xl" />
            
            {/* Pulse Animation */}
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="w-full h-full bg-green-400 rounded-full"></div>
            </motion.div>
          </div>

          {/* Tooltip */}
          <div className="absolute right-20 top-1/2 transform -translate-y-1/2 bg-white px-4 py-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            <p className="text-gray-800 font-medium">Chat with AI Assistant</p>
            <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 rotate-45 w-2 h-2 bg-white"></div>
          </div>

          {/* Notification Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold"
          >
            1
          </motion.div>
        </motion.button>
      </motion.div>

      {/* Advanced Footer */}
      <footer className="bg-gradient-to-r from-green-800 to-green-900 text-white relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 via-green-300 to-green-400"></div>
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-green-400 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-green-400 rounded-full opacity-10 blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 py-20 relative">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Company Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <span className="bg-green-500 p-2 rounded-lg mr-3">
                  <FaHome className="text-xl" />
                </span>
                EcoBin
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Leading the way in sustainable waste management solutions for a cleaner, greener future.
              </p>
              <div className="flex space-x-4">
                <motion.a
                  whileHover={{ scale: 1.1, y: -5 }}
                  href="#"
                  className="w-10 h-10 bg-green-700 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
                >
                  <FontAwesomeIcon icon={faFacebook} className="text-white" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1, y: -5 }}
                  href="#"
                  className="w-10 h-10 bg-green-700 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
                >
                  <FontAwesomeIcon icon={faTwitter} className="text-white" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1, y: -5 }}
                  href="#"
                  className="w-10 h-10 bg-green-700 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
                >
                  <FontAwesomeIcon icon={faLinkedin} className="text-white" />
                </motion.a>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-xl font-bold mb-6">Quick Links</h3>
              <ul className="space-y-4">
                {[
                  { name: "Home", href: "#home" },
                  { name: "Services", href: "#services" },
                  { name: "About Us", href: "#about" },
                  { name: "Contact", href: "#contact" },
                  { name: "Blog", href: "#blog" }
                ].map((link, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ x: 10 }}
                    className="flex items-center"
                  >
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                    <a href={link.href} className="text-gray-300 hover:text-white transition-colors">
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-xl font-bold mb-6">Contact Us</h3>
              <ul className="space-y-4">
                <motion.li
                  whileHover={{ x: 10 }}
                  className="flex items-center space-x-3"
                >
                  <FaHome className="text-green-400" />
                  <span className="text-gray-300">456 Eco Park Road, Kohuwala, Nugegoda</span>
                </motion.li>
                <motion.li
                  whileHover={{ x: 10 }}
                  className="flex items-center space-x-3"
                >
                  <FaPhone className="text-green-400" />
                  <span className="text-gray-300">+94 771687613</span>
                </motion.li>
                <motion.li
                  whileHover={{ x: 10 }}
                  className="flex items-center space-x-3"
                >
                  <FaUser className="text-green-400" />
                  <span className="text-gray-300">contact@ecobin.com</span>
                </motion.li>
              </ul>
            </motion.div>

            {/* Newsletter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-xl font-bold mb-6">Newsletter</h3>
              <p className="text-gray-300 mb-4">Subscribe to our newsletter for updates and offers.</p>
              <form className="space-y-4">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="w-full p-4 pl-12 bg-green-900/50 border border-green-700 rounded-lg focus:outline-none focus:border-green-500 text-white placeholder-gray-400"
                    required
                  />
                  <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-400" />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-green-500 text-white py-4 rounded-lg font-semibold hover:bg-green-600 transition-colors"
                >
                  Subscribe Now
                </motion.button>
              </form>
            </motion.div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-green-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-gray-300">
                &copy; {new Date().getFullYear()} EcoBin. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}