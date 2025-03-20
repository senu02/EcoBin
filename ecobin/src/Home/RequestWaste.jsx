import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserService from "./UserService";
import { FaUser, FaHome, FaPhone } from "react-icons/fa";
import { AiOutlineCheckCircle } from "react-icons/ai";

export default function WastePickupRequest() {
  let navigate = useNavigate();

  const [wasteRequest, setWasteRequest] = useState({
    name: "",
    address: "",
    mobile: "",
    wasteType: "",
    quantity: 1,
    frequencyPickup: "",
  });

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const { name, address, mobile, wasteType, quantity, frequencyPickup } = wasteRequest;

  // Set initial values from localStorage
  useEffect(() => {
    const userName = localStorage.getItem('name');
    const userAddress = localStorage.getItem('address');
    
    // Pre-fill the form with the name and address from localStorage if available
    setWasteRequest((prev) => ({
      ...prev,
      name: userName || '',
      address: userAddress || '',
    }));
  }, []);

  // Handle input changes
  const onInputChange = (e) => {
    setWasteRequest({ ...wasteRequest, [e.target.name]: e.target.value });
  };

  // Handle quantity increment and decrement
  const increaseQuantity = () => {
    setWasteRequest((prev) => ({ ...prev, quantity: prev.quantity + 1 }));
  };

  const decreaseQuantity = () => {
    setWasteRequest((prev) => ({
      ...prev,
      quantity: Math.max(1, prev.quantity - 1),
    }));
  };

  // Submit form
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${UserService.BASE_URL}/public/addRequest`, wasteRequest);
      setShowSuccessPopup(true); // Show success popup
      setTimeout(() => {
        setShowSuccessPopup(false); // Hide success popup after 3 seconds
        navigate("/"); // Navigate to home page
      }, 3000); // Adjust this timeout value as needed
    } catch (error) {
      console.error("Error submitting waste pickup request:", error);
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

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold text-green-900">Waste Pickup Request Form</h1>
        </div>

        {/* Form */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <form className="space-y-6" onSubmit={onSubmit}>
            {/* Input Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full p-3 pl-10 border border-green-300 rounded-md focus:border-green-500 focus:ring-2 focus:ring-green-200"
                  name="name"
                  value={name}
                  onChange={onInputChange}
                  required
                />
                <FaUser className="absolute left-3 top-3.5 text-green-500" />
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Address"
                  className="w-full p-3 pl-10 border border-green-300 rounded-md focus:border-green-500 focus:ring-2 focus:ring-green-200"
                  name="address"
                  value={address}
                  onChange={onInputChange}
                  required
                />
                <FaHome className="absolute left-3 top-3.5 text-green-500" />
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Mobile Number"
                  className="w-full p-3 pl-10 border border-green-300 rounded-md focus:border-green-500 focus:ring-2 focus:ring-green-200"
                  name="mobile"
                  value={mobile}
                  onChange={onInputChange}
                  required
                />
                <FaPhone className="absolute left-3 top-3.5 text-green-500" />
              </div>
            </div>

            {/* Waste Type (Dropdown) */}
            <div className="relative">
              <label className="font-semibold text-green-900">Select Waste Type:</label>
              <select
                name="wasteType"
                value={wasteType}
                onChange={onInputChange}
                className="w-full p-3 border border-green-300 rounded-md focus:border-green-500 focus:ring-2 focus:ring-green-200 mt-2"
                required
              >
                <option value="" disabled>Select waste type</option>
                <option value="Organic Waste">Organic Waste</option>
                <option value="Recyclable Waste">Recyclable Waste</option>
                <option value="Hazardous Waste">Hazardous Waste</option>
                <option value="Electronic Waste">Electronic Waste</option>
                <option value="General Waste">General Waste</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Estimated Quantity */}
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

            {/* Frequency of Pickup */}
            <fieldset className="border border-green-300 p-4 rounded-md">
              <legend className="font-semibold text-green-900 px-2">Frequency of Pickup</legend>
              <div className="mt-2 space-y-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="frequencyPickup"
                    value="One-Time"
                    checked={frequencyPickup === "One-Time"}
                    onChange={onInputChange}
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
                  />
                  <span className="text-green-900">
                    Recurring Request (Daily/Weekly/Monthly)
                  </span>
                </label>
              </div>
            </fieldset>

            <button className="w-full bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-all">
              Submit
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
