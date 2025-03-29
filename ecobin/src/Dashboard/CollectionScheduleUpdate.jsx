import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FiUpload } from "react-icons/fi";
import { FaCheckCircle } from "react-icons/fa";
import UserService from "../Home/UserService";

const CollectionScheduleUpdate = () => {
  let navigate = useNavigate();
  const { id } = useParams();
  const [minDate, setMinDate] = useState("");

  const [collectionSchedule, setCollectionSchedule] = useState({
    driverName: "",
    wasteType: "",
    collectionDate: "",
    location: "",
    status: "",
    remark: "",
    truckImage: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const today = new Date();
    const offset = today.getTimezoneOffset();
    today.setMinutes(today.getMinutes() - offset);
    setMinDate(today.toISOString().slice(0, 16));

    if (id) {
      loadSchedule();
    }
  }, [id]);

  const loadSchedule = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/public/getById/${id}`);
      setCollectionSchedule(result.data);

      if (result.data.truckImage) {
        setImagePreview(result.data.truckImage);
      }
    } catch (error) {
      console.error("Error fetching schedule:", error);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const nameRegex = /^[A-Za-z\s]+$/;
    const locationRegex = /^[A-Za-z\s,]+$/;

    if (!collectionSchedule.driverName.trim()) {
      newErrors.driverName = "Driver name is required";
    } else if (!nameRegex.test(collectionSchedule.driverName)) {
      newErrors.driverName = "Only letters are allowed";
    }

    if (!collectionSchedule.location.trim()) {
      newErrors.location = "Location is required";
    } else if (!locationRegex.test(collectionSchedule.location)) {
      newErrors.location = "Only letters and commas are allowed";
    }

    if (!collectionSchedule.wasteType) {
      newErrors.wasteType = "Waste type is required";
    }

    if (!collectionSchedule.status) {
      newErrors.status = "Status is required";
    }

    if (!collectionSchedule.collectionDate) {
      newErrors.collectionDate = "Collection date is required";
    } else {
      const selectedDate = new Date(collectionSchedule.collectionDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.collectionDate = "Date cannot be in the past";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "driverName") {
      const lettersOnly = value.replace(/[^A-Za-z\s]/g, '');
      setCollectionSchedule({
        ...collectionSchedule,
        [name]: lettersOnly,
      });
    } else {
      setCollectionSchedule({
        ...collectionSchedule,
        [name]: value,
      });
    }
    
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCollectionSchedule({ ...collectionSchedule, truckImage: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const formData = new FormData();
      formData.append("driverName", collectionSchedule.driverName);
      formData.append("wasteType", collectionSchedule.wasteType);
      formData.append("collectionDate", collectionSchedule.collectionDate);
      formData.append("location", collectionSchedule.location);
      formData.append("status", collectionSchedule.status);
      formData.append("remark", collectionSchedule.remark);
      
      if (collectionSchedule.truckImage) {
        formData.append("truckImage", collectionSchedule.truckImage);
      }

      await axios.put(`${UserService.BASE_URL}/public/updateSchedule/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setShowSuccessModal(true);
      setTimeout(() => {
        navigate("/collectionreport");
      }, 2000);
    } catch (error) {
      console.error("Error submitting the form:", error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-2xl border border-gray-100 overflow-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Update Collection Schedule</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-green-400 to-blue-500 mx-auto rounded-full"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Driver Name & Waste Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label htmlFor="driverName" className="block text-sm font-medium text-gray-700 mb-1">
                Driver Name
              </label>
              <input
                type="text"
                id="driverName"
                name="driverName"
                value={collectionSchedule.driverName}
                onChange={handleChange}
                required
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                  errors.driverName ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                }`}
                placeholder="Enter driver name"
              />
              {errors.driverName && (
                <p className="text-red-500 text-xs mt-1">{errors.driverName}</p>
              )}
            </div>

            <div className="flex flex-col">
              <label htmlFor="wasteType" className="block text-sm font-medium text-gray-700 mb-1">
                Waste Type
              </label>
              <select
                id="wasteType"
                name="wasteType"
                value={collectionSchedule.wasteType}
                onChange={handleChange}
                required
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                  errors.wasteType ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <option value="" disabled>Select waste type</option>
                <option value="Plastic">🛍️ Plastic</option>
                <option value="Paper">📄 Paper</option>
                <option value="Metal">🔩 Metal</option>
                <option value="Organic">🍃 Organic</option>
              </select>
              {errors.wasteType && (
                <p className="text-red-500 text-xs mt-1">{errors.wasteType}</p>
              )}
            </div>
          </div>

          {/* Collection Date & Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label htmlFor="collectionDate" className="block text-sm font-medium text-gray-700 mb-1">
                Collection Date
              </label>
              <input
                type="datetime-local"
                id="collectionDate"
                name="collectionDate"
                value={collectionSchedule.collectionDate}
                onChange={handleChange}
                required
                min={minDate}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                  errors.collectionDate ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                }`}
              />
              {errors.collectionDate && (
                <p className="text-red-500 text-xs mt-1">{errors.collectionDate}</p>
              )}
            </div>

            <div className="flex flex-col">
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={collectionSchedule.location}
                onChange={handleChange}
                required
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                  errors.location ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                }`}
                placeholder="Enter location"
              />
              {errors.location && (
                <p className="text-red-500 text-xs mt-1">{errors.location}</p>
              )}
            </div>
          </div>

          {/* Status */}
          <div className="flex flex-col">
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={collectionSchedule.status}
              onChange={handleChange}
              required
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                errors.status ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <option value="" disabled>Select status</option>
              <option value="Pending">⏳ Pending</option>
              <option value="In Progress">🔄 In Progress</option>
              <option value="Completed">✅ Completed</option>
            </select>
            {errors.status && (
              <p className="text-red-500 text-xs mt-1">{errors.status}</p>
            )}
          </div>

          {/* Image Upload */}
          <div className="flex flex-col">
            <label className="block text-sm font-medium text-gray-700 mb-1">Truck Image</label>
            <div className="relative w-full">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                id="imageUpload"
              />
              <label 
                htmlFor="imageUpload"
                className="flex items-center justify-between p-3 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all cursor-pointer"
              >
                <div className="flex items-center">
                  <FiUpload className="text-gray-500 text-xl mr-2" />
                  <span className="text-gray-700">
                    {imagePreview ? "Change Image" : "Choose an image"}
                  </span>
                </div>
                {imagePreview && (
                  <span className="text-green-600 text-sm">Image selected</span>
                )}
              </label>
            </div>
            {imagePreview && (
              <div className="mt-3 flex justify-center">
                <div className="relative w-full max-w-xs">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="h-48 w-full object-cover rounded-lg border border-gray-200 shadow-sm" 
                  />
                </div>
              </div>
            )}
          </div>

          {/* Remark */}
          <div className="flex flex-col">
            <label htmlFor="remark" className="block text-sm font-medium text-gray-700 mb-1">
              Remarks
            </label>
            <textarea
              id="remark"
              name="remark"
              value={collectionSchedule.remark}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all hover:border-gray-400"
              placeholder="Any additional notes..."
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-3 px-6 bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            >
              Update Schedule
            </button>
          </div>
        </form>
      </div>

      {/* Success Modal (unchanged as requested) */}
      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 h-52">
            <div className="flex items-center justify-center mb-4">
              <FaCheckCircle className="text-green-500 text-5xl" />
            </div>
            <h3 className="text-center text-lg font-semibold text-gray-800 mb-4">Schedule Updated Successfully!</h3>
            <p className="text-center text-gray-600">Redirecting to collection report...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CollectionScheduleUpdate;