import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { FaUser, FaHome, FaPhone } from "react-icons/fa";
import { AiOutlineCheckCircle } from "react-icons/ai";
import UserService from "../Home/UserService";

export default function EditRequestPickup() {
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    loadUpdateRequest();
  }, []);

  const [updateWasteRequest, setUpdateWasteRequest] = useState({
    name: "",
    address: "",
    mobile: "",
    wasteType: "",
    quantity: 1,
    frequencyPickup: "",
  });
  const [showSuccessPopup, setShowSuccessPopup] = useState(false); 

  const { name, address, mobile, wasteType, quantity, frequencyPickup } = updateWasteRequest;

  const loadUpdateRequest = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/public/getIdByRequest/${id}`);
      setUpdateWasteRequest(result.data);
    } catch (error) {
      console.error("Error loading request:", error);
    }
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateWasteRequest((prevState) => ({ ...prevState, [name]: value }));
  };

  const increaseQuantity = () => {
    setUpdateWasteRequest((prevState) => ({ ...prevState, quantity: prevState.quantity + 1 }));
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setUpdateWasteRequest((prevState) => ({ ...prevState, quantity: prevState.quantity - 1 }));
    }
  };


  const onSubmit = async (e)=>{
    e.preventDefault();
    await axios.put(`http://localhost:8080/public/updateWasteRequest/${id}`, updateWasteRequest);
    navigate("/ViewPickup")
}

const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", updateWasteRequest.name);
      formData.append("address", updateWasteRequest.address);
      formData.append("mobile", updateWasteRequest.mobile);
      formData.append("wasteType", updateWasteRequest.wasteType);
      formData.append("quantity", updateWasteRequest.quantity);
      formData.append("frequencyPickup", updateWasteRequest.frequencyPickup);


      await axios.put(`${UserService.BASE_URL}/public/updateWasteRequest/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Show success modal
     

      // Redirect after a brief delay to show the success message
      setTimeout(() => {
        navigate("/collectionreport");
      }, 2000);
    } catch (error) {
      console.error("Error submitting the form:", error.response?.data || error.message);
    }
  };
  

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-green-50 to-green-100">
      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <div className="flex justify-center mb-4">
              <AiOutlineCheckCircle className="text-green-500 text-6xl" />
            </div>
            <h3 className="text-xl font-semibold text-center text-green-500">Request Updated Successfully!</h3>
            <p className="text-center text-gray-600 mt-2">Your request has been updated.</p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold text-green-900">Update Waste Pickup Request</h1>
        </div>

        {/* Form */}
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-3xl mx-auto">
          <form className="space-y-8" onSubmit={onSubmit}>
            {/* Input Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full p-4 pl-12 border-2 border-green-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 shadow-md transition duration-200 ease-in-out"
                  name="name"
                  value={updateWasteRequest.name}
                  onChange={onInputChange}
                  required
                  disabled
                />
                <FaUser className="absolute left-4 top-4 text-green-500" />
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Address"
                  className="w-full p-4 pl-12 border-2 border-green-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 shadow-md transition duration-200 ease-in-out"
                  name="address"
                  value={updateWasteRequest.address}
                  onChange={onInputChange}
                  required
                />
                <FaHome className="absolute left-4 top-4 text-green-500" />
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Mobile Number"
                  className="w-full p-4 pl-12 border-2 border-green-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 shadow-md transition duration-200 ease-in-out"
                  name="mobile"
                  value={updateWasteRequest.mobile}
                  onChange={onInputChange}
                  required
                />
                <FaPhone className="absolute left-4 top-4 text-green-500" />
              </div>
            </div>

            {/* Waste Type (Dropdown) */}
            <div className="relative">
              <label className="text-lg font-medium text-green-900">Select Waste Type:</label>
              <select
                name="wasteType"
                value={updateWasteRequest.wasteType}
                onChange={onInputChange}
                className="w-full p-4 mt-2 border-2 border-green-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 shadow-md"
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
            <div className="flex items-center space-x-8">
              <label className="text-lg font-medium text-green-900">Estimated Quantity:</label>
              <div className="flex items-center space-x-4">
                <button
                  type="button"
                  className="px-6 py-2 border-2 border-green-300 rounded-lg bg-green-200 text-green-900 hover:bg-green-300 transition-colors"
                  onClick={decreaseQuantity}
                >
                  -
                </button>
                <span className="text-2xl font-semibold text-green-900">{quantity}</span>
                <button
                  type="button"
                  className="px-6 py-2 border-2 border-green-300 rounded-lg bg-green-200 text-green-900 hover:bg-green-300 transition-colors"
                  onClick={increaseQuantity}
                >
                  +
                </button>
              </div>
            </div>

            {/* Frequency of Pickup */}
            <fieldset className="border-2 border-green-300 p-6 rounded-lg">
              <legend className="text-lg font-medium text-green-900">Frequency of Pickup</legend>
              <div className="mt-4 space-y-4">
                <label className="flex items-center space-x-4">
                  <input
                    type="radio"
                    name="frequencyPickup"
                    value="One-Time"
                    checked={frequencyPickup === "One-Time"}
                    onChange={onInputChange}
                    className="w-5 h-5"
                  />
                  <span className="text-green-900">One-Time Request</span>
                </label>
                <label className="flex items-center space-x-4">
                  <input
                    type="radio"
                    name="frequencyPickup"
                    value="Recurring"
                    checked={frequencyPickup === "Recurring"}
                    onChange={onInputChange}
                    className="w-5 h-5"
                  />
                  <span className="text-green-900">Recurring Request (Daily/Weekly/Monthly)</span>
                </label>
              </div>
            </fieldset>

            <button className="w-full bg-green-600 text-white py-4 rounded-lg shadow-lg hover:bg-green-700 transition-all duration-300 ease-in-out">
              Update Request
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
