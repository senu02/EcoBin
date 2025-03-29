import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserService from "./UserService";
import { FaUser, FaHome, FaPhone } from "react-icons/fa";
import { AiOutlineCheckCircle, AiOutlineExclamationCircle } from "react-icons/ai";
import image from "./images/r2.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faLinkedin } from "@fortawesome/free-brands-svg-icons";

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

    // Name validation
    if (!name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    // Address validation
    if (!address.trim()) {
      newErrors.address = "Address is required";
      isValid = false;
    } 

    // Mobile validation
    if (!mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
      isValid = false;
    } else if (!/^\d{10}$/.test(mobile)) {
      newErrors.mobile = "Mobile number must be 10 digits";
      isValid = false;
    }

    // Waste type validation
    if (!wasteType) {
      newErrors.wasteType = "Please select a waste type";
      isValid = false;
    }

    // Frequency validation
    if (!frequencyPickup) {
      newErrors.frequencyPickup = "Please select pickup frequency";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    
    // For mobile field, only allow numbers and limit to 10 digits
    if (name === "mobile") {
      if (value === "" || /^\d{0,10}$/.test(value)) {
        setWasteRequest({ ...wasteRequest, [name]: value });
      }
    } else {
      setWasteRequest({ ...wasteRequest, [name]: value });
    }
    
    // Clear error when user starts typing
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
    <div className="flex flex-col min-h-screen bg-green-50">
      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <div className="flex justify-center mb-4">
              <AiOutlineCheckCircle className="text-green-500 text-6xl" />
            </div>
            <h3 className="text-xl font-semibold text-center text-green-500">Request Added Successfully!</h3>
            <p className="text-center text-gray-600 mt-2">Your Request has been saved.</p>
          </div>
        </div>
      )}

      {/* Header Section */}
      <section className="max-w-5xl mx-auto py-12 px-4">
        <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
          <div className="flex flex-col space-y-4 flex-1">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              On-request bin pick-up / <br />
              Emptying the bin on request
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Comfortable and top-notch quality service-oriented premises might welcome the opportunity to immediately respond to inquiries for a pick-up or delivery. The requests can be submitted via a mobile app or via request buttons. The requests, however, are not limited to waste only – they can support different kinds of areas – such as the delivery of office accessories, or refreshment.
            </p>
          </div>

          <div className="flex-shrink-0">
            <img
              src={image}
              alt="On-request bin pick-up"
              className="w-90 h-80 object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-5xl mx-auto text-center py-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
          Key functionalities and <br /> benefits of our solution
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { id: "01", text: "Automation of waste collection" },
            { id: "02", text: "Increased efficiency of collection (lower expenses)" },
            { id: "03", text: "Increased quality of ESG Reporting" },
            { id: "04", text: "Collector supervision (internal and external)" },
            { id: "05", text: "Waste infrastructure overview (floorplan bins, stands, vehicles)" },
            { id: "06", text: "Waste flow registration and tracking of the whole collection process" },
          ].map((item) => (
            <div key={item.id} className="flex items-center space-x-4">
              <span className="bg-green-100 text-green-600 font-bold text-lg px-4 py-2 rounded-lg">
                {item.id}
              </span>
              <p className="text-gray-700">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Main Form Section */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold text-green-900">Waste Pickup Request Form</h1>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6">
          <form className="space-y-6" onSubmit={onSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Field */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Name"
                  className={`w-full p-3 pl-10 border ${errors.name ? 'border-red-500' : 'border-green-300'} rounded-md focus:border-green-500 focus:ring-2 focus:ring-green-200`}
                  name="name"
                  value={name}
                  onChange={onInputChange}
                  disabled
                />
                <FaUser className="absolute left-3 top-3.5 text-green-500" />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
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
                  className={`w-full p-3 pl-10 border ${errors.address ? 'border-red-500' : 'border-green-300'} rounded-md focus:border-green-500 focus:ring-2 focus:ring-green-200`}
                  name="address"
                  value={address}
                  onChange={onInputChange}
                />
                <FaHome className="absolute left-3 top-3.5 text-green-500" />
                {errors.address && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
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
                  className={`w-full p-3 pl-10 border ${errors.mobile ? 'border-red-500' : 'border-green-300'} rounded-md focus:border-green-500 focus:ring-2 focus:ring-green-200`}
                  name="mobile"
                  value={mobile}
                  onChange={onInputChange}
                  maxLength="10"
                />
                <FaPhone className="absolute left-3 top-3.5 text-green-500" />
                {errors.mobile && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AiOutlineExclamationCircle className="mr-1" />
                    {errors.mobile}
                  </p>
                )}
              </div>
            </div>

            {/* Waste Type Dropdown */}
            <div className="relative">
              <label className="font-semibold text-green-900">Select Waste Type:</label>
              <select
                name="wasteType"
                value={wasteType}
                onChange={onInputChange}
                className={`w-full p-3 border ${errors.wasteType ? 'border-red-500' : 'border-green-300'} rounded-md focus:border-green-500 focus:ring-2 focus:ring-green-200 mt-2`}
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
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AiOutlineExclamationCircle className="mr-1" />
                  {errors.wasteType}
                </p>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center space-x-4">
              <label className="font-semibold text-green-900">Estimated Quantity:</label>
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  className="px-3 py-1 border border-green-300 rounded-md bg-green-200 text-green-900 hover:bg-green-300 transition-colors"
                  onClick={decreaseQuantity}
                >
                  -
                </button>
                <span className="text-lg font-semibold text-green-900">{quantity}</span>
                <button
                  type="button"
                  className="px-3 py-1 border border-green-300 rounded-md bg-green-200 text-green-900 hover:bg-green-300 transition-colors"
                  onClick={increaseQuantity}
                >
                  +
                </button>
              </div>
            </div>

            {/* Frequency Radio Buttons */}
            <fieldset className={`border ${errors.frequencyPickup ? 'border-red-500' : 'border-green-300'} p-4 rounded-md`}>
              <legend className="font-semibold text-green-900 px-2">Frequency of Pickup</legend>
              <div className="mt-2 space-y-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="frequencyPickup"
                    value="One-Time"
                    checked={frequencyPickup === "One-Time"}
                    onChange={onInputChange}
                    className="text-green-600 focus:ring-green-500"
                  />
                  <span className="text-green-900">One-Time Request</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="frequencyPickup"
                    value="Recurring"
                    checked={frequencyPickup === "Recurring"}
                    onChange={onInputChange}
                    className="text-green-600 focus:ring-green-500"
                  />
                  <span className="text-green-900">
                    Recurring Request (Daily/Weekly/Monthly)
                  </span>
                </label>
              </div>
              {errors.frequencyPickup && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AiOutlineExclamationCircle className="mr-1" />
                  {errors.frequencyPickup}
                </p>
              )}
            </fieldset>

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-all ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-green-600 to-black text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#home" className="hover:text-green-300">Home</a></li>
                <li><a href="#services" className="hover:text-green-300">Services</a></li>
                <li><a href="#recycling" className="hover:text-green-300">Recycling</a></li>
                <li><a href="#about" className="hover:text-green-300">About Us</a></li>
                <li><a href="#contact" className="hover:text-green-300">Contact</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Contact Us</h3>
              <ul className="space-y-2">
                <li>456 Eco Park Road,</li>
                <li>Kohuwala, Nugegoda</li>
                <li>Email: contact@ecobin.com</li>
                <li>Phone: +94 771687613</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Follow Us</h3>
              <ul className="flex space-x-4">
                <li>
                  <a href="#" className="text-white hover:text-green-300">
                    <FontAwesomeIcon icon={faFacebook} className="w-6 h-6" />
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white hover:text-green-300">
                    <FontAwesomeIcon icon={faTwitter} className="w-6 h-6" />
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white hover:text-green-300">
                    <FontAwesomeIcon icon={faLinkedin} className="w-6 h-6" />
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Subscribe</h3>
              <p className="mb-4">Subscribe to our newsletter for updates and offers.</p>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="p-2 rounded-l-lg focus:outline-none text-black"
                  required
                />
                <button
                  type="submit"
                  className="bg-green-700 text-white p-2 rounded-r-lg hover:bg-green-800"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p>&copy; {new Date().getFullYear()} Ecobin. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}