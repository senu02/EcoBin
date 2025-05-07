import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { FaRegHourglass, FaSyncAlt, FaCheckCircle } from "react-icons/fa";
import UserService from "../Home/UserService";

export default function WasteTrackDashboard() {
  const [truckImage, setTruckImage] = useState(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [errors, setErrors] = useState({});
  const [minDate, setMinDate] = useState("");
  let navigate = useNavigate();

  const [collectionSchedule, setCollectionSchedule] = useState({
    driverName: "",
    wasteType: "",
    collectionDate: "",
    location: "",
    status: "",
    remark: "",
    truckImage: null,
  });

  const [wasteTypeCount, setWasteTypeCount] = useState({
    plastic: 0,
    paper: 0,
    metal: 0,
    organic: 0,
  });

  const [statusCount, setStatusCount] = useState({
    pending: 0,
    inProgress: 0,
    completed: 0,
  });

  useEffect(() => {
    const today = new Date();
    const offset = today.getTimezoneOffset();
    today.setMinutes(today.getMinutes() - offset);
    setMinDate(today.toISOString().slice(0, 16));

    const fetchSchedules = async () => {
      try {
        const response = await axios.get("http://localhost:8080/public/getAllSchedule");
        const schedules = response.data;

        const wasteCounts = { plastic: 0, paper: 0, metal: 0, organic: 0 };
        const statusCounts = { pending: 0, inProgress: 0, completed: 0 };

        schedules.forEach((schedule) => {
          if (schedule.wasteType === "Plastic") wasteCounts.plastic++;
          if (schedule.wasteType === "Paper") wasteCounts.paper++;
          if (schedule.wasteType === "Metal") wasteCounts.metal++;
          if (schedule.wasteType === "Organic") wasteCounts.organic++;

          if (schedule.status === "Pending") statusCounts.pending++;
          if (schedule.status === "In Progress") statusCounts.inProgress++;
          if (schedule.status === "Completed") statusCounts.completed++;
        });

        setWasteTypeCount(wasteCounts);
        setStatusCount(statusCounts);
      } catch (error) {
        console.error("Error fetching schedules:", error);
      }
    };

    fetchSchedules();
  }, []);

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
      newErrors.location = "Only letters, spaces and commas are allowed";
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

    if (!collectionSchedule.truckImage) {
      newErrors.truckImage = "Truck image is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onInputChange = (e) => {
    const { name, value, files, type } = e.target;

    if (type === "file") {
      setCollectionSchedule({ ...collectionSchedule, [name]: files[0] });
      if (files[0]) {
        setErrors({ ...errors, truckImage: null });
      }
    } else {
      if (name === "driverName") {
        const lettersOnly = value.replace(/[^A-Za-z\s]/g, '');
        setCollectionSchedule({ ...collectionSchedule, [name]: lettersOnly });
      } else if (name === "location") {
        // Only allow letters, spaces, and commas
        const validChars = value.replace(/[^A-Za-z\s,]/g, '');
        setCollectionSchedule({ ...collectionSchedule, [name]: validChars });
      } else {
        setCollectionSchedule({ ...collectionSchedule, [name]: value });
      }
      
      if (errors[name]) {
        setErrors({ ...errors, [name]: null });
      }
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      setTruckImage(URL.createObjectURL(file));
      setCollectionSchedule({ ...collectionSchedule, truckImage: file });
      setErrors({ ...errors, truckImage: null });
    }
  };

  const onSubmit = async (e) => {
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
      formData.append("truckImage", collectionSchedule.truckImage);

      await axios.post(`${UserService.BASE_URL}/public/addSchedule`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setShowSuccessPopup(true);
      setTimeout(() => {
        setShowSuccessPopup(false);
        navigate("/WasteTrackDashboard");
      }, 2000);
    } catch (error) {
      console.error("Error submitting the form:", error.response?.data || error.message);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 overflow-hidden">
      {/* Fixed Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-emerald-800 to-emerald-900 p-6 shadow-lg fixed h-full">
        <h1 className="text-xl font-bold flex items-center space-x-2 text-white">
          <span>♻️ WasteTrack</span>
        </h1>
        <nav className="mt-8">
          <Link to="/WasteManagementDashboard">
            <button className="w-full text-left p-3 rounded-md hover:bg-emerald-700 hover:text-white mt-4 transition-all duration-300 flex items-center gap-2 text-white">
              <span className="text-lg">📊</span> Dashboard
            </button>
          </Link>
          <Link to="/collectionreport">
            <button className="w-full text-left p-3 rounded-md hover:bg-emerald-700 hover:text-white mt-4 transition-all duration-300 flex items-center gap-2 text-white">
              <span className="text-lg">📄</span> Schedule Report
            </button>
          </Link>
          <Link to="/Collectionanalythics">
            <button className="w-full text-left p-3 rounded-md hover:bg-emerald-700 hover:text-white mt-4 transition-all duration-300 flex items-center gap-2 text-white">
              <span className="text-lg">📈</span> Analytics
            </button>
          </Link>
          <Link to="/CollectionGenarateReport">
            <button className="w-full text-left p-3 rounded-md hover:bg-emerald-700 hover:text-white mt-4 transition-all duration-300 flex items-center gap-2 text-white">
              <span className="text-lg">📝</span> Generate PDF
            </button>
          </Link>
        </nav>
      </aside>

      {/* Scrollable Main Content */}
      <main className="flex-1 p-6 ml-64 overflow-y-auto">
        <h1 className="text-4xl font-extrabold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-900">
          Waste Collection Dashboard
        </h1>

        {/* Waste Type Count Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Plastic */}
          <div className="bg-gradient-to-br from-blue-400 to-blue-600 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center space-x-4">
              <div className="bg-white bg-opacity-20 p-3 rounded-full">
                <span className="text-3xl">🛍️</span>
              </div>
              <div>
                <h2 className="font-semibold text-lg">Plastic</h2>
                <p className="text-3xl font-bold">{wasteTypeCount.plastic}</p>
                <p className="text-sm opacity-80">Collections</p>
              </div>
            </div>
          </div>

          {/* Paper */}
          <div className="bg-gradient-to-br from-amber-400 to-amber-600 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center space-x-4">
              <div className="bg-white bg-opacity-20 p-3 rounded-full">
                <span className="text-3xl">📄</span>
              </div>
              <div>
                <h2 className="font-semibold text-lg">Paper</h2>
                <p className="text-3xl font-bold">{wasteTypeCount.paper}</p>
                <p className="text-sm opacity-80">Collections</p>
              </div>
            </div>
          </div>

          {/* Metal */}
          <div className="bg-gradient-to-br from-gray-400 to-gray-600 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center space-x-4">
              <div className="bg-white bg-opacity-20 p-3 rounded-full">
                <span className="text-3xl">🔩</span>
              </div>
              <div>
                <h2 className="font-semibold text-lg">Metal</h2>
                <p className="text-3xl font-bold">{wasteTypeCount.metal}</p>
                <p className="text-sm opacity-80">Collections</p>
              </div>
            </div>
          </div>

          {/* Organic */}
          <div className="bg-gradient-to-br from-green-400 to-green-600 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center space-x-4">
              <div className="bg-white bg-opacity-20 p-3 rounded-full">
                <span className="text-3xl">🍃</span>
              </div>
              <div>
                <h2 className="font-semibold text-lg">Organic</h2>
                <p className="text-3xl font-bold">{wasteTypeCount.organic}</p>
                <p className="text-sm opacity-80">Collections</p>
              </div>
            </div>
          </div>
        </div>

        {/* Status Count Box */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 mb-8">
          <h2 className="font-semibold text-xl text-center mb-6 text-emerald-800">Collection Status Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Pending */}
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-l-4 border-yellow-400 p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-center space-x-4">
                <div className="bg-yellow-100 p-3 rounded-full">
                  <FaRegHourglass className="text-yellow-600 text-xl" />
                </div>
                <div>
                  <p className="font-semibold text-gray-700">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">{statusCount.pending}</p>
                  <p className="text-xs text-gray-500">Awaiting collection</p>
                </div>
              </div>
            </div>

            {/* In Progress */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-l-4 border-blue-400 p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <FaSyncAlt className="text-blue-600 text-xl" />
                </div>
                <div>
                  <p className="font-semibold text-gray-700">In Progress</p>
                  <p className="text-2xl font-bold text-blue-600">{statusCount.inProgress}</p>
                  <p className="text-xs text-gray-500">Currently collecting</p>
                </div>
              </div>
            </div>

            {/* Completed */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 border-l-4 border-green-400 p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <FaCheckCircle className="text-green-600 text-xl" />
                </div>
                <div>
                  <p className="font-semibold text-gray-700">Completed</p>
                  <p className="text-2xl font-bold text-green-600">{statusCount.completed}</p>
                  <p className="text-xs text-gray-500">Successfully collected</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <form onSubmit={onSubmit}>
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <h2 className="text-xl font-semibold text-emerald-800 mb-4">Schedule New Collection</h2>

            {/* Image Upload */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Truck Image</label>
              <div className={`border-2 border-dashed ${errors.truckImage ? 'border-red-400 bg-red-50' : 'border-gray-300 hover:border-emerald-400'} rounded-xl p-6 text-center transition-all duration-300`}>
                <input
                  type="file"
                  className="hidden"
                  id="truckImageUpload"
                  accept="image/*"
                  name="truckImage"
                  onChange={handleImageUpload}
                />
                <label htmlFor="truckImageUpload" className="cursor-pointer">
                  {truckImage ? (
                    <div className="flex flex-col items-center">
                      <img src={truckImage} alt="Truck" className="w-full max-w-xs h-48 object-contain rounded-md mx-auto" />
                      <span className="mt-2 text-sm text-emerald-600">Click to change image</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center text-gray-500">
                      <span className="text-5xl mb-2">📷</span>
                      <span>Upload Truck Image</span>
                      <span className="text-xs mt-1">JPEG, PNG (Max 5MB)</span>
                    </div>
                  )}
                </label>
                {errors.truckImage && <p className="text-red-500 text-sm mt-2">{errors.truckImage}</p>}
              </div>
            </div>

            {/* Input Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">📍 Location</label>
                <input 
                  type="text" 
                  placeholder="Enter collection location" 
                  className={`w-full p-3 rounded-lg border ${errors.location ? 'border-red-400 bg-red-50' : 'border-gray-300 hover:border-emerald-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200'} transition-colors duration-300`} 
                  name="location" 
                  value={collectionSchedule.location} 
                  onChange={onInputChange}
                  onKeyPress={(e) => {
                    // Prevent number input
                    if (!/[A-Za-z\s,]/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                />
                {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">🗑️ Waste Type</label>
                <select 
                  className={`w-full p-3 rounded-lg border ${errors.wasteType ? 'border-red-400 bg-red-50' : 'border-gray-300 hover:border-emerald-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200'} transition-colors duration-300`} 
                  name="wasteType" 
                  value={collectionSchedule.wasteType} 
                  onChange={onInputChange}
                >
                  <option value="">Select waste type</option>
                  <option value="Plastic">🛍️ Plastic</option>
                  <option value="Paper">📄 Paper</option>
                  <option value="Metal">🔩 Metal</option>
                  <option value="Organic">🍃 Organic</option>
                </select>
                {errors.wasteType && <p className="text-red-500 text-sm mt-1">{errors.wasteType}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">📊 Status</label>
                <select 
                  className={`w-full p-3 rounded-lg border ${errors.status ? 'border-red-400 bg-red-50' : 'border-gray-300 hover:border-emerald-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200'} transition-colors duration-300`} 
                  name="status" 
                  value={collectionSchedule.status} 
                  onChange={onInputChange}
                >
                  <option value="">Select collection status</option>
                  <option value="Pending">⏳ Pending</option>
                  <option value="In Progress">🔄 In Progress</option>
                  <option value="Completed">✅ Completed</option>
                </select>
                {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">👤 Driver Name</label>
                <input 
                  type="text" 
                  placeholder="Enter driver's name" 
                  className={`w-full p-3 rounded-lg border ${errors.driverName ? 'border-red-400 bg-red-50' : 'border-gray-300 hover:border-emerald-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200'} transition-colors duration-300`} 
                  name="driverName" 
                  value={collectionSchedule.driverName} 
                  onChange={onInputChange} 
                />
                {errors.driverName && <p className="text-red-500 text-sm mt-1">{errors.driverName}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">📅 Collection Date</label>
                <input 
                  type="datetime-local" 
                  className={`w-full p-3 rounded-lg border ${errors.collectionDate ? 'border-red-400 bg-red-50' : 'border-gray-300 hover:border-emerald-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200'} transition-colors duration-300`} 
                  name="collectionDate" 
                  value={collectionSchedule.collectionDate} 
                  onChange={onInputChange}
                  min={minDate}
                />
                {errors.collectionDate && <p className="text-red-500 text-sm mt-1">{errors.collectionDate}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">💬 Remarks</label>
                <input 
                  type="text" 
                  className="w-full p-3 rounded-lg border border-gray-300 hover:border-emerald-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-colors duration-300" 
                  placeholder="Additional notes (optional)" 
                  name="remark" 
                  value={collectionSchedule.remark} 
                  onChange={onInputChange} 
                />
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              className="mt-8 w-full bg-gradient-to-r from-emerald-500 to-emerald-700 text-white py-3 px-4 rounded-lg shadow-md hover:shadow-lg hover:from-emerald-600 hover:to-emerald-800 transition-all duration-300 font-semibold text-lg"
            >
              🚛 Schedule Collection
            </button>
          </div>
        </form>

        {/* Success Popup */}
        {showSuccessPopup && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 backdrop-blur-sm">
            <div className="bg-white p-8 rounded-xl shadow-2xl w-96 text-center animate-pop-in">
              <div className="flex justify-center mb-4">
                <div className="bg-emerald-100 p-4 rounded-full">
                  <AiOutlineCheckCircle className="text-emerald-600 text-4xl" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-emerald-700 mb-2">Success!</h3>
              <p className="text-gray-600 mb-6">Collection scheduled successfully</p>
              <button 
                onClick={() => setShowSuccessPopup(false)}
                className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-300 shadow-sm"
              >
                Continue
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}