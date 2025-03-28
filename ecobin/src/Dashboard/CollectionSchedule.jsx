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
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white p-6 shadow-md">
        <h1 className="text-xl font-bold flex items-center space-x-2">
          <span>♻️ WasteTrack</span>
        </h1>
        <nav className="mt-8">
          <Link to="/WasteManagementDashboard">
            <button className="w-full text-left p-2 rounded-md hover:bg-green-500 hover:text-white mt-5 transition-colors">📊 Dashboard</button>
          </Link>
          <Link to="/collectionreport">
            <button className="w-full text-left p-2 rounded-md hover:bg-green-500 hover:text-white mt-5 transition-colors">📄 Schedule Report</button>
          </Link>
          <Link to="/Collectionanalythics">
            <button className="w-full text-left p-2 rounded-md hover:bg-green-500 hover:text-white mt-5 transition-colors">📈 Analytics</button>
          </Link>
          <Link to="/CollectionGenarateReport">
            <button className="w-full text-left p-2 rounded-md hover:bg-green-500 hover:text-white mt-5 transition-colors">📝 Generate PDF Report</button>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-4xl font-extrabold bg-clip-text mb-6 shadow-lg text-center text-emerald-800">
          Collection Schedule Dashboard
        </h1>

        {/* Waste Type Count Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {/* Plastic */}
          <div className="bg-gradient-to-r from-emerald-500 to-emerald-800 text-white p-6 rounded-lg shadow-lg hover:scale-105 transition-all duration-300 border-2 border-emerald-700">
            <div className="flex items-center space-x-4">
              <span className="text-5xl">🛍️</span>
              <div>
                <h2 className="font-semibold text-xl">Plastic</h2>
                <p className="text-4xl font-bold">{wasteTypeCount.plastic}</p>
              </div>
            </div>
          </div>

          {/* Paper */}
          <div className="bg-gradient-to-r from-teal-500 to-teal-800 text-white p-6 rounded-lg shadow-lg hover:scale-105 transition-all duration-300 border-2 border-teal-700">
            <div className="flex items-center space-x-4">
              <span className="text-5xl">📄</span>
              <div>
                <h2 className="font-semibold text-xl">Paper</h2>
                <p className="text-4xl font-bold">{wasteTypeCount.paper}</p>
              </div>
            </div>
          </div>

          {/* Metal */}
          <div className="bg-gradient-to-r from-green-500 to-green-800 text-white p-6 rounded-lg shadow-lg hover:scale-105 transition-all duration-300 border-2 border-green-700">
            <div className="flex items-center space-x-4">
              <span className="text-5xl">🔩</span>
              <div>
                <h2 className="font-semibold text-xl">Metal</h2>
                <p className="text-4xl font-bold">{wasteTypeCount.metal}</p>
              </div>
            </div>
          </div>

          {/* Organic */}
          <div className="bg-gradient-to-r from-lime-500 to-lime-800 text-white p-6 rounded-lg shadow-lg hover:scale-105 transition-all duration-300 border-2 border-lime-700">
            <div className="flex items-center space-x-4">
              <span className="text-5xl">🍃</span>
              <div>
                <h2 className="font-semibold text-xl">Organic</h2>
                <p className="text-4xl font-bold">{wasteTypeCount.organic}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Status Count Box */}
        <div className="bg-gradient-to-r from-emerald-800 to-emerald-900 p-6 rounded-lg shadow-lg border-4 border-emerald-800 hover:scale-[1.02] transition-all duration-300 mb-6">
          <h2 className="font-semibold text-xl text-center mb-6 text-white">Collection Status</h2>
          <div className="flex justify-between gap-4">
            {/* Pending */}
            <div className="bg-gradient-to-br from-emerald-300 to-emerald-700 text-white p-6 rounded-lg shadow-md w-1/3 hover:bg-emerald-600 transition-colors duration-300">
              <FaRegHourglass className="text-5xl mb-3 mx-auto" />
              <p className="font-semibold text-lg text-center">Pending</p>
              <p className="text-3xl font-bold text-center">{statusCount.pending}</p>
            </div>

            {/* In Progress */}
            <div className="bg-gradient-to-br from-emerald-300 to-emerald-700 text-white p-6 rounded-lg shadow-md w-1/3 hover:bg-emerald-600 transition-colors duration-300">
              <FaSyncAlt className="text-5xl mb-3 mx-auto" />
              <p className="font-semibold text-lg text-center">In Progress</p>
              <p className="text-3xl font-bold text-center">{statusCount.inProgress}</p>
            </div>

            {/* Completed */}
            <div className="bg-gradient-to-br from-emerald-300 to-emerald-700 text-white p-6 rounded-lg shadow-md w-1/3 hover:bg-emerald-600 transition-colors duration-300">
              <FaCheckCircle className="text-5xl mb-3 mx-auto" />
              <p className="font-semibold text-lg text-center">Completed</p>
              <p className="text-3xl font-bold text-center">{statusCount.completed}</p>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <form onSubmit={onSubmit}>
          <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-emerald-800">Truck Image</h2>

            {/* Image Upload */}
            <div className="border-dashed border-2 border-gray-300 rounded-lg p-6 text-center mt-4">
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
                  <img src={truckImage} alt="Truck" className="w-60 h-40 object-cover rounded-md mx-auto" />
                ) : (
                  <div className="flex flex-col items-center text-gray-500">
                    <span className="text-5xl mb-2">📷</span>
                    <span>Upload Truck Image</span>
                  </div>
                )}
              </label>
              {errors.truckImage && <p className="text-red-500 text-sm mt-2">{errors.truckImage}</p>}
            </div>

            {/* Input Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-emerald-700 mb-1">📍 Location</label>
                <input 
                  type="text" 
                  placeholder="Enter location" 
                  className={`p-3 border rounded-md w-full ${errors.location ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50 focus:border-emerald-500 focus:ring-emerald-500'}`} 
                  name="location" 
                  value={collectionSchedule.location} 
                  onChange={onInputChange} 
                />
                {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-emerald-700 mb-1">🗑️ Waste Type</label>
                <select 
                  className={`p-3 border rounded-md w-full ${errors.wasteType ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50 focus:border-emerald-500 focus:ring-emerald-500'}`} 
                  name="wasteType" 
                  value={collectionSchedule.wasteType} 
                  onChange={onInputChange}
                >
                  <option value="">Select collection type</option>
                  <option value="Plastic">🛍️ Plastic</option>
                  <option value="Paper">📄 Paper</option>
                  <option value="Metal">🔩 Metal</option>
                  <option value="Organic">🍃 Organic</option>
                </select>
                {errors.wasteType && <p className="text-red-500 text-sm mt-1">{errors.wasteType}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-emerald-700 mb-1">📊 Status</label>
                <select 
                  className={`p-3 border rounded-md w-full ${errors.status ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50 focus:border-emerald-500 focus:ring-emerald-500'}`} 
                  name="status" 
                  value={collectionSchedule.status} 
                  onChange={onInputChange}
                >
                  <option value="">Select status</option>
                  <option value="Pending">⏳ Pending</option>
                  <option value="In Progress">🔄 In Progress</option>
                  <option value="Completed">✅ Completed</option>
                </select>
                {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-emerald-700 mb-1">👤 Driver Name</label>
                <input 
                  type="text" 
                  placeholder="Enter driver name" 
                  className={`p-3 border rounded-md w-full ${errors.driverName ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50 focus:border-emerald-500 focus:ring-emerald-500'}`} 
                  name="driverName" 
                  value={collectionSchedule.driverName} 
                  onChange={onInputChange} 
                />
                {errors.driverName && <p className="text-red-500 text-sm mt-1">{errors.driverName}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-emerald-700 mb-1">📅 Collection Date</label>
                <input 
                  type="datetime-local" 
                  className={`p-3 border rounded-md w-full ${errors.collectionDate ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50 focus:border-emerald-500 focus:ring-emerald-500'}`} 
                  name="collectionDate" 
                  value={collectionSchedule.collectionDate} 
                  onChange={onInputChange}
                  min={minDate}
                />
                {errors.collectionDate && <p className="text-red-500 text-sm mt-1">{errors.collectionDate}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-emerald-700 mb-1">💬 Remarks</label>
                <input 
                  type="text" 
                  className="p-3 border border-gray-300 rounded-md w-full bg-gray-50 focus:border-emerald-500 focus:ring-emerald-500" 
                  placeholder="Enter remarks" 
                  name="remark" 
                  value={collectionSchedule.remark} 
                  onChange={onInputChange} 
                />
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              className="mt-6 bg-emerald-600 text-white p-3 rounded-md w-full hover:bg-emerald-700 transition-colors font-semibold text-lg"
            >
              Create Schedule
            </button>
          </div>
        </form>

        {/* Success Popup */}
        {showSuccessPopup && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-lg shadow-xl w-96 text-center animate-pop-in">
              <div className="flex justify-center mb-4">
                <AiOutlineCheckCircle className="text-emerald-500 text-6xl animate-bounce" />
              </div>
              <h3 className="text-2xl font-bold text-emerald-600 mb-2">Success!</h3>
              <p className="text-gray-600 mb-4">Schedule created successfully</p>
              <button 
                onClick={() => setShowSuccessPopup(false)}
                className="px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition-colors"
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