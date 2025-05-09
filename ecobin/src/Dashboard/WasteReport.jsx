import React from 'react';
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { 
  FaRecycle,
  FaTrash,
  FaMapMarkerAlt,
  FaUser,
  FaCoins,
  FaCalendarAlt,
  FaFileAlt,
  FaImage,
  FaChartBar,
  FaTrophy,
  FaClipboardList
} from "react-icons/fa";
import UserService from "../Home/UserService";

const WasteReport = () => {
  const navigate = useNavigate();
  const [wasteImage, setWasteImage] = useState(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [recentEntries, setRecentEntries] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  const [formProgress, setFormProgress] = useState(0);
  const [selectedWasteTypeIcon, setSelectedWasteTypeIcon] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const wasteTypeIcons = {
    Plastic: <FaTrash className="text-blue-500" />,
    Paper: <FaFileAlt className="text-yellow-500" />,
    Metal: <FaRecycle className="text-gray-500" />,
    Organic: <FaRecycle className="text-green-500" />
  };

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const [wasteReporting, setWasteReporting] = useState({
    wasteTitle: "",
    date: getTodayDate(),
    wasteType: "",
    wasteWeight: "",
    wasteLocation: "",
    description: "",
    reword: "",
    customerName: "",
    wasteImage: null,
  });

  useEffect(() => {
    const fetchRecentEntries = async () => {
      try {
        const response = await axios.get(`${UserService.BASE_URL}/public/getAllReport`);
        if (response.data && Array.isArray(response.data)) {
          const sortedData = response.data
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 5);
          setRecentEntries(sortedData);
        }
      } catch (error) {
        console.error("Error fetching recent entries:", error);
        setRecentEntries([]);
      }
    };

    fetchRecentEntries();
  }, []);

  useEffect(() => {
    const requiredFields = ['wasteTitle', 'wasteType', 'wasteWeight', 'wasteLocation', 'customerName', 'reword', 'wasteImage'];
    const filledFields = requiredFields.filter(field => {
      const value = wasteReporting[field];
      return value !== null && value !== '';
    }).length;
    
    setFormProgress((filledFields / requiredFields.length) * 100);
  }, [wasteReporting]);

  const onInputChange = (e) => {
    const { name, value, files, type } = e.target;
    
    if (name === "wasteType") {
      setSelectedWasteTypeIcon(wasteTypeIcons[value] || null);
    }
    
    if (name === "customerName") {
      const filteredValue = value.replace(/[^a-zA-Z\s.,'-]/g, '');
      setWasteReporting(prev => ({ ...prev, [name]: filteredValue }));
    } 
    else if (name === "wasteWeight") {
      const sanitizedValue = value.replace(/[^0-9.]/g, '');
      const positiveValue = sanitizedValue === '' ? '' : Math.abs(parseFloat(sanitizedValue)).toString();
      setWasteReporting(prev => ({ ...prev, [name]: positiveValue }));
    }
    else if (type === "file") {
      if (files && files[0]) {
        setWasteReporting(prev => ({ ...prev, [name]: files[0] }));
      }
    } else {
      setWasteReporting(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setValidationErrors(prev => ({
          ...prev,
          wasteImage: "Image size should be less than 5MB"
        }));
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setWasteImage(e.target.result);
      };
      reader.readAsDataURL(file);
      setWasteReporting(prev => ({ ...prev, wasteImage: file }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!wasteReporting.wasteTitle.trim()) {
      errors.wasteTitle = "Title is required.";
    }
    
    if (!wasteReporting.wasteType) {
      errors.wasteType = "Waste type is required.";
    }
    
    if (!wasteReporting.wasteWeight || isNaN(wasteReporting.wasteWeight) || parseFloat(wasteReporting.wasteWeight) <= 0) {
      errors.wasteWeight = "Please enter a valid positive weight.";
    }
    
    if (!wasteReporting.wasteLocation.trim()) {
      errors.wasteLocation = "Location is required.";
    }
    
    if (!wasteReporting.customerName.trim()) {
      errors.customerName = "Customer name is required.";
    } else if (!/^[a-zA-Z\s.,'-]+$/.test(wasteReporting.customerName)) {
      errors.customerName = "Name can only contain letters, spaces, and basic punctuation.";
    }
    
    if (!wasteReporting.reword || isNaN(wasteReporting.reword) || parseFloat(wasteReporting.reword) < 0) {
      errors.reword = "Please enter valid reward points (0 or more).";
    }
    
    if (!wasteReporting.wasteImage) {
      errors.wasteImage = "Please upload an image of the waste.";
    }

    return errors;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    const errors = validateForm();
    setValidationErrors(errors);

    if (Object.keys(errors).length === 0) {
      setIsSubmitting(true);
      try {
        const formData = new FormData();
        
        Object.entries(wasteReporting).forEach(([key, value]) => {
          if (value !== null) {
            formData.append(key, value);
          }
        });

        const response = await axios.post(
          `${UserService.BASE_URL}/public/addReporting`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.data) {
          setShowSuccessPopup(true);
          setTimeout(() => {
            setShowSuccessPopup(false);
            navigate("/WasteReport");
          }, 2000);
        }
      } catch (error) {
        console.error("Error submitting the form:", error);
        setValidationErrors(prev => ({
          ...prev,
          submit: error.response?.data?.message || "Failed to submit the form. Please try again."
        }));
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Sidebar */}
      <aside className="w-72 bg-gradient-to-b from-white to-gray-50 text-black p-6 shadow-lg border-r border-gray-100">
        <div className="flex items-center space-x-3 mb-8">
          <div className="bg-green-500 p-2 rounded-lg shadow-md">
            <FaRecycle className="text-white text-2xl" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
            WasteTrack
          </h1>
        </div>

        <nav className="space-y-2">
          <a
            href="/WasteManagementDashboard"
            className="group flex items-center space-x-3 p-3 rounded-xl bg-green-600 text-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <div className="bg-white/20 p-2 rounded-lg">
              <FaChartBar className="text-xl" />
            </div>
            <span className="font-medium">Dashboard</span>
          </a>

          <a
            href="/AnalyzePage"
            className="group flex items-center space-x-3 p-3 rounded-xl text-gray-700 hover:bg-green-50 hover:text-green-600 transition-all duration-300"
          >
            <div className="bg-gray-100 group-hover:bg-green-100 p-2 rounded-lg transition-colors duration-300">
              <FaFileAlt className="text-xl text-gray-600 group-hover:text-green-600" />
            </div>
            <span className="font-medium">Analyze</span>
          </a>

          <a
            href="/Leaderboard"
            className="group flex items-center space-x-3 p-3 rounded-xl text-gray-700 hover:bg-green-50 hover:text-green-600 transition-all duration-300"
          >
            <div className="bg-gray-100 group-hover:bg-green-100 p-2 rounded-lg transition-colors duration-300">
              <FaTrophy className="text-xl text-gray-600 group-hover:text-green-600" />
            </div>
            <span className="font-medium">Rewards</span>
          </a>

          <a
            href="/WasteReportingTable"
            className="group flex items-center space-x-3 p-3 rounded-xl text-gray-700 hover:bg-green-50 hover:text-green-600 transition-all duration-300"
          >
            <div className="bg-gray-100 group-hover:bg-green-100 p-2 rounded-lg transition-colors duration-300">
              <FaClipboardList className="text-xl text-gray-600 group-hover:text-green-600" />
            </div>
            <span className="font-medium">Report Data</span>
          </a>
        </nav>

        <div className="mt-8 p-4 bg-green-50 rounded-xl border border-green-100">
          <div className="flex items-center space-x-3 mb-3">
            <div className="bg-green-500 p-2 rounded-lg">
              <FaCoins className="text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Points</p>
              <p className="text-xl font-bold text-green-700">1,200</p>
            </div>
          </div>
          <div className="h-2 bg-green-100 rounded-full overflow-hidden">
            <div className="h-full bg-green-500 rounded-full" style={{ width: '75%' }}></div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Next level: 1,500 points</p>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-500 p-2 rounded-lg">
              <FaMapMarkerAlt className="text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Active Locations</p>
              <p className="text-xl font-bold text-blue-700">18</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Form Progress</span>
            <span className="text-sm font-medium text-gray-700">{Math.round(formProgress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-gradient-to-r from-green-500 to-green-700 h-2.5 rounded-full transition-all duration-300" 
              style={{ width: `${formProgress}%` }}
            ></div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-gray-500 text-sm font-medium">Total Waste</h2>
                <p className="text-2xl font-bold text-gray-800">2,450 kg</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <FaTrash className="text-2xl text-green-500" />
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-gray-500 text-sm font-medium">Active Locations</h2>
                <p className="text-2xl font-bold text-gray-800">18</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <FaMapMarkerAlt className="text-2xl text-blue-500" />
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-gray-500 text-sm font-medium">Total Rewards</h2>
                <p className="text-2xl font-bold text-gray-800">1,200 pts</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <FaCoins className="text-2xl text-yellow-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Waste Report</h2>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <FaFileAlt className="inline mr-2" /> Waste Report Title
                  </label>
                  <input
                    type="text"
                    placeholder="Enter title"
                    className={`p-3 border rounded-lg w-full bg-gray-50 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 ${validationErrors.wasteTitle ? 'border-red-500' : 'border-gray-200'}`}
                    name="wasteTitle"
                    value={wasteReporting.wasteTitle}
                    onChange={onInputChange}
                  />
                  {validationErrors.wasteTitle && <span className="text-red-500 text-sm">{validationErrors.wasteTitle}</span>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <FaFileAlt className="inline mr-2" /> Description
                  </label>
                  <textarea
                    placeholder="Enter description"
                    className="p-3 border border-gray-200 rounded-lg w-full bg-gray-50 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                    name="description"
                    value={wasteReporting.description}
                    onChange={onInputChange}
                    rows="3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <FaCalendarAlt className="inline mr-2" /> Date
                  </label>
                  <input
                    type="text"
                    readOnly
                    className="p-3 border border-gray-200 rounded-lg w-full bg-gray-100"
                    name="date"
                    value={wasteReporting.date}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <FaRecycle className="inline mr-2" /> Waste Type
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(wasteTypeIcons).map(([type, icon]) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => {
                          setWasteReporting(prev => ({ ...prev, wasteType: type }));
                          setSelectedWasteTypeIcon(icon);
                        }}
                        className={`p-3 border rounded-lg flex items-center justify-center space-x-2 transition-all duration-200 ${
                          wasteReporting.wasteType === type
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-200 hover:border-green-500'
                        }`}
                      >
                        {icon}
                        <span>{type}</span>
                      </button>
                    ))}
                  </div>
                  {validationErrors.wasteType && <span className="text-red-500 text-sm">{validationErrors.wasteType}</span>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <FaTrash className="inline mr-2" /> Weight (kg)
                  </label>
                  <input
                    type="number"
                    placeholder="Enter weight"
                    className={`p-3 border rounded-lg w-full bg-gray-50 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 ${validationErrors.wasteWeight ? 'border-red-500' : 'border-gray-200'}`}
                    name="wasteWeight"
                    value={wasteReporting.wasteWeight}
                    onChange={onInputChange}
                    min="0.01"
                    step="0.01"
                  />
                  {validationErrors.wasteWeight && <span className="text-red-500 text-sm">{validationErrors.wasteWeight}</span>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <FaMapMarkerAlt className="inline mr-2" /> Location
                  </label>
                  <input
                    type="text"
                    placeholder="Enter location"
                    className={`p-3 border rounded-lg w-full bg-gray-50 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 ${validationErrors.wasteLocation ? 'border-red-500' : 'border-gray-200'}`}
                    name="wasteLocation"
                    value={wasteReporting.wasteLocation}
                    onChange={onInputChange}
                  />
                  {validationErrors.wasteLocation && <span className="text-red-500 text-sm">{validationErrors.wasteLocation}</span>}
                </div>
              </div>
            </div>

            {/* Image Upload */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaImage className="inline mr-2" /> Waste Image
              </label>
              <div className={`border-2 border-dashed rounded-lg p-6 text-center transition-all duration-200 ${
                wasteImage ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-green-500'
              }`}>
                <input
                  type="file"
                  className="hidden"
                  id="wasteImageUpload"
                  accept="image/*"
                  name="wasteImage"
                  onChange={handleImageUpload}
                />
                <label htmlFor="wasteImageUpload" className="cursor-pointer flex flex-col items-center">
                  {wasteImage ? (
                    <div className="relative">
                      <img src={wasteImage} alt="Waste" className="w-60 h-40 object-cover rounded-lg shadow-md" />
                      <button
                        type="button"
                        onClick={() => {
                          setWasteImage(null);
                          setWasteReporting(prev => ({ ...prev, wasteImage: null }));
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors duration-200"
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <FaImage className="text-4xl text-gray-400 mb-2" />
                      <span className="text-gray-500">Click to upload waste image</span>
                      <span className="text-sm text-gray-400 mt-1">PNG, JPG up to 5MB</span>
                    </div>
                  )}
                </label>
              </div>
              {validationErrors.wasteImage && <span className="text-red-500 text-sm">{validationErrors.wasteImage}</span>}
            </div>

            <div className="grid grid-cols-2 gap-6 mt-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <FaUser className="inline mr-2" /> Customer Name
                </label>
                <input
                  type="text"
                  placeholder="Enter customer name"
                  className={`p-3 border rounded-lg w-full bg-gray-50 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 ${validationErrors.customerName ? 'border-red-500' : 'border-gray-200'}`}
                  name="customerName"
                  value={wasteReporting.customerName}
                  onChange={onInputChange}
                />
                {validationErrors.customerName && <span className="text-red-500 text-sm">{validationErrors.customerName}</span>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <FaCoins className="inline mr-2" /> Reward Points
                </label>
                <input
                  type="number"
                  placeholder="Enter reward points"
                  className={`p-3 border rounded-lg w-full bg-gray-50 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 ${validationErrors.reword ? 'border-red-500' : 'border-gray-200'}`}
                  name="reword"
                  value={wasteReporting.reword}
                  onChange={onInputChange}
                  min="0"
                />
                {validationErrors.reword && <span className="text-red-500 text-sm">{validationErrors.reword}</span>}
              </div>
            </div>

            <button 
              type="submit"
              disabled={isSubmitting}
              className={`mt-6 w-full bg-gradient-to-r from-green-500 to-green-700 text-white p-4 rounded-lg font-medium transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:from-green-600 hover:to-green-800'}`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Report'}
            </button>
          </div>
        </form>

        {/* Recent Entries */}
        <div className="mt-6 bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Entries</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-gray-200">
                  <th className="p-3 text-sm font-medium text-gray-500">Date</th>
                  <th className="p-3 text-sm font-medium text-gray-500">Customer</th>
                  <th className="p-3 text-sm font-medium text-gray-500">Type</th>
                  <th className="p-3 text-sm font-medium text-gray-500">Amount</th>
                  <th className="p-3 text-sm font-medium text-gray-500">Location</th>
                  <th className="p-3 text-sm font-medium text-gray-500">Rewards</th>
                </tr>
              </thead>
              <tbody>
                {recentEntries.map((entry, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200">
                    <td className="p-3">{new Date(entry.date).toLocaleDateString()}</td>
                    <td className="p-3 font-medium">{entry.customerName}</td>
                    <td className="p-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {entry.wasteType}
                      </span>
                    </td>
                    <td className="p-3">{entry.wasteWeight} kg</td>
                    <td className="p-3">{entry.wasteLocation}</td>
                    <td className="p-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        +{entry.reword} pts
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-xl shadow-2xl w-96 transform transition-all duration-300 scale-100">
            <div className="flex justify-center mb-4">
              <div className="bg-green-100 p-3 rounded-full">
                <AiOutlineCheckCircle className="text-green-500 text-5xl" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-center text-gray-800 mb-2">Success!</h3>
            <p className="text-center text-gray-600">Your waste report has been successfully submitted.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WasteReport;