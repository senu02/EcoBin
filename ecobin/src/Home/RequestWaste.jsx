import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserService from "./UserService";
import { FaUser, FaHome, FaPhone } from "react-icons/fa";
import { AiOutlineCheckCircle, AiOutlineExclamationCircle } from "react-icons/ai";
import image from "./images/r2.png";
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
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
        <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
          Key Features and Benefits
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { id: "01", text: "Automated waste collection system" },
            { id: "02", text: "Cost-effective collection solutions" },
            { id: "03", text: "Enhanced ESG reporting capabilities" },
            { id: "04", text: "Real-time collector supervision" },
            { id: "05", text: "Comprehensive waste infrastructure overview" },
            { id: "06", text: "Complete waste flow tracking system" },
          ].map((item) => (
            <motion.div 
              key={item.id}
              whileHover={{ scale: 1.05 }}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <span className="bg-green-100 text-green-600 font-bold text-lg px-4 py-2 rounded-lg inline-block mb-4">
                {item.id}
              </span>
              <p className="text-gray-700 text-lg">{item.text}</p>
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

      {/* Footer */}
      <footer className="bg-gradient-to-r from-green-800 to-green-900 text-white py-16 mt-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <h3 className="text-xl font-bold mb-6">Quick Links</h3>
              <ul className="space-y-3">
                <li><a href="#home" className="hover:text-green-300 transition-colors">Home</a></li>
                <li><a href="#services" className="hover:text-green-300 transition-colors">Services</a></li>
                <li><a href="#recycling" className="hover:text-green-300 transition-colors">Recycling</a></li>
                <li><a href="#about" className="hover:text-green-300 transition-colors">About Us</a></li>
                <li><a href="#contact" className="hover:text-green-300 transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-6">Contact Us</h3>
              <ul className="space-y-3">
                <li className="flex items-center space-x-2">
                  <FaHome className="text-green-300" />
                  <span>456 Eco Park Road, Kohuwala, Nugegoda</span>
                </li>
                <li className="flex items-center space-x-2">
                  <FaPhone className="text-green-300" />
                  <span>+94 771687613</span>
                </li>
                <li className="flex items-center space-x-2">
                  <FaUser className="text-green-300" />
                  <span>contact@ecobin.com</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-6">Follow Us</h3>
              <div className="flex space-x-6">
                <a href="#" className="text-white hover:text-green-300 transition-colors">
                  <FontAwesomeIcon icon={faFacebook} className="w-6 h-6" />
                </a>
                <a href="#" className="text-white hover:text-green-300 transition-colors">
                  <FontAwesomeIcon icon={faTwitter} className="w-6 h-6" />
                </a>
                <a href="#" className="text-white hover:text-green-300 transition-colors">
                  <FontAwesomeIcon icon={faLinkedin} className="w-6 h-6" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-6">Newsletter</h3>
              <p className="mb-4">Subscribe to our newsletter for updates and offers.</p>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 p-3 rounded-l-lg focus:outline-none text-gray-900"
                  required
                />
                <button
                  type="submit"
                  className="bg-green-600 text-white px-6 py-3 rounded-r-lg hover:bg-green-700 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          <div className="border-t border-green-700 mt-12 pt-8 text-center">
            <p>&copy; {new Date().getFullYear()} Ecobin. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}