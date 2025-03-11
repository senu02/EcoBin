import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FiUpload } from "react-icons/fi"; // Import Upload Icon
import { FaCheckCircle } from "react-icons/fa"; // Import Checkmark Icon

const CollectionScheduleUpdate = () => {
  let navigate = useNavigate();
  const { id } = useParams();

  const [collectionSchedule, setCollectionSchedule] = useState({
    driverName: "",
    wasteType: "",
    collectionDate: "",
    location: "",
    status: "",
    remark: "",
    truckImage: null, // Add image field here
  });

  const [imagePreview, setImagePreview] = useState(null); // To hold the image preview
  const [showSuccessModal, setShowSuccessModal] = useState(false); // State to control success modal

  useEffect(() => {
    if (id) {
      loadSchedule();
    }
  }, [id]);

  // Function to load the schedule from the API
  const loadSchedule = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/public/getById/${id}`);
      setCollectionSchedule(result.data);

      // Check if there is a previous image URL and set it
      if (result.data.truckImage) {
        setImagePreview(result.data.truckImage); // Assuming 'truckImage' field holds the URL to the image
      }
    } catch (error) {
      console.error("Error fetching schedule:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCollectionSchedule({
      ...collectionSchedule,
      [name]: value,
    });
  };

  // Handle the image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCollectionSchedule({ ...collectionSchedule, truckImage: file });
      setImagePreview(URL.createObjectURL(file)); // Set preview for the uploaded image
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("driverName", collectionSchedule.driverName);
      formData.append("wasteType", collectionSchedule.wasteType);
      formData.append("collectionDate", collectionSchedule.collectionDate);
      formData.append("location", collectionSchedule.location);
      formData.append("status", collectionSchedule.status);
      formData.append("remark", collectionSchedule.remark);
      
      if (collectionSchedule.truckImage) {
        formData.append("truckImage", collectionSchedule.truckImage); // Include the image in form data if it's selected
      }

      await axios.put(`http://localhost:8080/public/updateSchedule/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Show success modal
      setShowSuccessModal(true);

      // Redirect after a brief delay to show the success message
      setTimeout(() => {
        navigate("/collectionreport");
      }, 2000);
    } catch (error) {
      console.error("Error submitting the form:", error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 overflow-hidden">
      <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-lg border border-gray-200 overflow-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Update Collection Schedule 🍃</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Driver Name & Waste Type */}
          <div className="flex flex-row space-x-4">
            <div className="flex flex-col w-1/2">
              <label htmlFor="driverName" className="block text-sm font-medium text-gray-700">
                Driver Name
              </label>
              <input
                type="text"
                id="driverName"
                name="driverName"
                value={collectionSchedule.driverName}
                onChange={handleChange}
                required
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="flex flex-col w-1/2">
              <label htmlFor="wasteType" className="block text-sm font-medium text-gray-700">
                Waste Type
              </label>
              <select
                id="wasteType"
                name="wasteType"
                value={collectionSchedule.wasteType}
                onChange={handleChange}
                required
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
              >
                <option value="Plastic">🛍️ Plastic</option>
                <option value="Paper">📄 Paper</option>
                <option value="Metal">🔩 Metal</option>
                <option value="Organic">🍃 Organic</option>
              </select>
            </div>
          </div>

          {/* Collection Date & Location */}
          <div className="flex flex-row space-x-4">
            <div className="flex flex-col w-1/2">
              <label htmlFor="collectionDate" className="block text-sm font-medium text-gray-700">
                Collection Date
              </label>
              <input
                type="datetime-local"
                id="collectionDate"
                name="collectionDate"
                value={collectionSchedule.collectionDate}
                onChange={handleChange}
                required
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="flex flex-col w-1/2">
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={collectionSchedule.location}
                onChange={handleChange}
                required
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          {/* Status */}
          <div className="flex flex-col">
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={collectionSchedule.status}
              onChange={handleChange}
              required
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
            >
              <option value="Pending">⏳Pending</option>
              <option value="In Progress">🔄In Progress</option>
              <option value="Completed">✅Completed</option>
            </select>
          </div>

          {/* Image Upload */}
          <div className="flex flex-col">
            <label className="block text-sm font-medium text-gray-700">Upload Image</label>
            <div className="relative w-full mt-2">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="flex items-center justify-center p-3 border border-gray-300 rounded-md bg-gray-100 hover:bg-gray-200">
                <FiUpload className="text-gray-500 text-xl" />
                <span className="ml-2 text-gray-700">
                  {imagePreview ? "Image Selected" : "Choose Image"}
                </span>
              </div>
            </div>
          </div>

          {/* Remark */}
          <div className="flex flex-col">
            <label htmlFor="remark" className="block text-sm font-medium text-gray-700">
              Remark
            </label>
            <textarea
              id="remark"
              name="remark"
              value={collectionSchedule.remark}
              onChange={handleChange}
              rows="4"
              required
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full p-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 focus:ring-2 focus:ring-green-500"
            >
              Update Schedule
            </button>
          </div>
        </form>
      </div>

      {/* Success Modal */}
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
