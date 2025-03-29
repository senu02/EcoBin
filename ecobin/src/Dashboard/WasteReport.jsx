import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineCheckCircle } from "react-icons/ai";
import UserService from "../Home/UserService";

export default function WasteReport() {
  const [wasteImage, setWasteImage] = useState(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [recentEntries, setRecentEntries] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  let navigate = useNavigate();

  // Get today's date in YYYY-MM-DD format
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [wasteReporting, setWasteReporting] = useState({
    wasteTitle: "",
    date: getTodayDate(), // Set default to today's date
    wasteType: "",
    wasteWeight: "",
    wasteLocation: "",
    description: "",
    reword: "",
    customerName: "",
    wasteImage: null,
  });

  // Fetch recent entries from the backend
  useEffect(() => {
    axios
      .get(`${UserService.BASE_URL}/public/getAllReport`)
      .then((response) => {
        const sortedData = response.data
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 5);
        setRecentEntries(sortedData);
      })
      .catch((error) => {
        console.error("Error fetching recent entries:", error);
      });
  }, []);

  const onInputChange = (e) => {
    const { name, value, files, type } = e.target;
    
    // Special handling for customerName to prevent numbers and special characters
    if (name === "customerName") {
      // Only allow letters, spaces, and basic punctuation
      const filteredValue = value.replace(/[^a-zA-Z\s.,'-]/g, '');
      setWasteReporting({ ...wasteReporting, [name]: filteredValue });
    } 
    // Special handling for wasteWeight to prevent negative numbers
    else if (name === "wasteWeight") {
      // Remove any non-digit characters except decimal point
      const sanitizedValue = value.replace(/[^0-9.]/g, '');
      // Ensure the value is positive
      const positiveValue = sanitizedValue === '' ? '' : Math.abs(parseFloat(sanitizedValue)).toString();
      setWasteReporting({ ...wasteReporting, [name]: positiveValue });
    }
    else if (type === "file") {
      setWasteReporting({ ...wasteReporting, [name]: files[0] });
    } else {
      setWasteReporting({ ...wasteReporting, [name]: value });
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setWasteImage(URL.createObjectURL(file));
      setWasteReporting({ ...wasteReporting, wasteImage: file });
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!wasteReporting.wasteTitle) errors.wasteTitle = "Title is required.";
    if (!wasteReporting.wasteType) errors.wasteType = "Waste type is required.";
    if (!wasteReporting.wasteWeight || isNaN(wasteReporting.wasteWeight) || parseFloat(wasteReporting.wasteWeight) <= 0)
      errors.wasteWeight = "Please enter a valid positive weight.";
    if (!wasteReporting.wasteLocation) errors.wasteLocation = "Location is required.";
    
    // Enhanced customer name validation
    if (!wasteReporting.customerName) {
      errors.customerName = "Customer name is required.";
    } else if (!/^[a-zA-Z\s.,'-]+$/.test(wasteReporting.customerName)) {
      errors.customerName = "Name can only contain letters, spaces, and basic punctuation.";
    }
    
    if (!wasteReporting.reword || isNaN(wasteReporting.reword) || wasteReporting.reword < 0)
      errors.reword = "Please enter valid reward points (0 or more).";
    if (!wasteReporting.wasteImage) errors.wasteImage = "Please upload an image of the waste.";

    return errors;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    setValidationErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const formData = new FormData();
        formData.append("wasteTitle", wasteReporting.wasteTitle);
        formData.append("date", wasteReporting.date);
        formData.append("wasteType", wasteReporting.wasteType);
        formData.append("wasteWeight", wasteReporting.wasteWeight);
        formData.append("wasteLocation", wasteReporting.wasteLocation);
        formData.append("description", wasteReporting.description);
        formData.append("reword", wasteReporting.reword);
        formData.append("customerName", wasteReporting.customerName);
        formData.append("wasteImage", wasteReporting.wasteImage);

        await axios.post(`${UserService.BASE_URL}/public/addReporting`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        setShowSuccessPopup(true);
        setTimeout(() => {
          setShowSuccessPopup(false);
          navigate("/WasteReport");
        }, 2000);
      } catch (error) {
        console.error("Error submitting the form:", error.response?.data || error.message);
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white text-black p-6 shadow-md">
        <h1 className="text-xl font-bold flex items-center space-x-2">
          ♻ <span>WasteTrack</span>
        </h1>
        <nav className="mt-6 space-y-4">
          <a
            href="/WasteManagementDashboard"
            className="w-full text-left p-3 bg-green-600 text-white rounded-md flex items-center space-x-2"
          >
            📊 <span>Dashboard</span>
          </a>
          <a
            href="/AnalyzePage"
            className="w-full text-left p-3 rounded-md hover:bg-green-600 hover:text-white flex items-center space-x-2"
          >
            📶 <span>Analyze</span>
          </a>
          <a
            href="/Leaderboard"
            className="w-full text-left p-3 rounded-md hover:bg-green-600 hover:text-white flex items-center space-x-2"
          >
            🏆 <span>Rewards</span>
          </a>
          <a
            href="/WasteReportingTable"
            className="w-full text-left p-3 rounded-md hover:bg-green-600 hover:text-white flex items-center space-x-2"
          >
            📋 <span>Report Data</span>
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="bg-gradient-to-r from-green-600 to-black p-4 rounded-lg shadow-md text-white">
            <h2 className="text-gray-200 flex items-center space-x-2">Total Waste 🗑</h2>
            <p className="text-2xl font-bold">2,450 kg</p>
          </div>
          <div className="bg-gradient-to-r from-green-600 to-black p-4 rounded-lg shadow-md text-white">
            <h2 className="text-gray-200 flex items-center space-x-2">Active Locations 🗺</h2>
            <p className="text-2xl font-bold">18</p>
          </div>
          <div className="bg-gradient-to-r from-green-600 to-black p-4 rounded-lg shadow-md text-white">
            <h2 className="text-gray-200 flex items-center space-x-2">Total Rewards 🎁</h2>
            <p className="text-2xl font-bold">1,200 pts</p>
          </div>
        </div>

        {/* Waste Report Form */}
        <form onSubmit={onSubmit}>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Add New Waste Report</h2>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <input
                  type="text"
                  placeholder="📑 Waste Report Title"
                  className={`p-3 border rounded-md w-full bg-gray-100 ${validationErrors.wasteTitle ? 'border-red-500' : ''}`}
                  name="wasteTitle"
                  value={wasteReporting.wasteTitle}
                  onChange={onInputChange}
                />
                {validationErrors.wasteTitle && <span className="text-red-500 text-sm">{validationErrors.wasteTitle}</span>}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="📝 Description"
                  className="p-3 border rounded-md w-full bg-gray-100"
                  name="description"
                  value={wasteReporting.description}
                  onChange={onInputChange}
                />
              </div>
              <div>
                <input
                  type="text"
                  readOnly
                  className="p-3 border rounded-md w-full bg-gray-200"
                  name="date"
                  value={wasteReporting.date}
                />
                <span className="text-gray-500 text-sm">Today's date (cannot be changed)</span>
              </div>
            </div>

            {/* Image Upload */}
            <div className="border-dashed border-2 border-gray-300 rounded-lg p-6 text-center mt-4">
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
                  <img src={wasteImage} alt="Truck" className="w-60 h-40 object-cover rounded-md" />
                ) : (
                  <div className="flex flex-col items-center">
                    <span className="text-gray-500">📷 Upload Truck Image</span>
                  </div>
                )}
              </label>
            </div>
            {validationErrors.wasteImage && <span className="text-red-500 text-sm">{validationErrors.wasteImage}</span>}

            {/* Input Fields */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <input
                  type="text"
                  placeholder="📍 Enter location"
                  className={`p-3 border rounded-md w-full bg-gray-100 ${validationErrors.wasteLocation ? 'border-red-500' : ''}`}
                  name="wasteLocation"
                  value={wasteReporting.wasteLocation}
                  onChange={onInputChange}
                />
                {validationErrors.wasteLocation && <span className="text-red-500 text-sm">{validationErrors.wasteLocation}</span>}
              </div>
              <div>
                <select
                  className={`p-3 border rounded-md w-full bg-gray-100 ${validationErrors.wasteType ? 'border-red-500' : ''}`}
                  name="wasteType"
                  value={wasteReporting.wasteType}
                  onChange={onInputChange}
                >
                  <option value="">Select Waste Type</option>
                  <option value="Plastic">Plastic</option>
                  <option value="Paper">Paper</option>
                  <option value="Metal">Metal</option>
                  <option value="Organic">Organic</option>
                </select>
                {validationErrors.wasteType && <span className="text-red-500 text-sm">{validationErrors.wasteType}</span>}
              </div>
              <div>
                <input
                  type="number"
                  placeholder="Estimated Amount (kg)"
                  className={`p-3 border rounded-md w-full bg-gray-100 ${validationErrors.wasteWeight ? 'border-red-500' : ''}`}
                  name="wasteWeight"
                  value={wasteReporting.wasteWeight}
                  onChange={onInputChange}
                  min="0.01"
                  step="0.01"
                />
                {validationErrors.wasteWeight && <span className="text-red-500 text-sm">{validationErrors.wasteWeight}</span>}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="👤 Customer Name"
                  className={`p-3 border rounded-md w-full bg-gray-100 ${validationErrors.customerName ? 'border-red-500' : ''}`}
                  name="customerName"
                  value={wasteReporting.customerName}
                  onChange={onInputChange}
                />
                {validationErrors.customerName && <span className="text-red-500 text-sm">{validationErrors.customerName}</span>}
              </div>
              <div>
                <input
                  type="number"
                  placeholder="💰 Points"
                  className={`p-3 border rounded-md w-full bg-gray-100 ${validationErrors.reword ? 'border-red-500' : ''}`}
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
              className="mt-4 bg-gradient-to-r from-green-600 to-black hover:from-green-700 hover:to-black text-white p-3 rounded-md w-full"
            >
              Submit Entry
            </button>
          </div>
        </form>

        {/* Recent Entries */}
        <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Recent Entries</h2>
          <table className="w-full mt-4 border-collapse">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="p-2">Date</th>
                <th className="p-2">Customer</th>
                <th className="p-2">Type</th>
                <th className="p-2">Amount</th>
                <th className="p-2">Location</th>
                <th className="p-2">Rewards</th>
              </tr>
            </thead>
            <tbody>
              {recentEntries.map((entry, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2">{new Date(entry.date).toLocaleDateString()}</td>
                  <td className="p-2">{entry.customerName}</td>
                  <td className="p-2">{entry.wasteType}</td>
                  <td className="p-2">{entry.wasteWeight} kg</td>
                  <td className="p-2">{entry.wasteLocation}</td>
                  <td className="p-2">+{entry.reword} pts</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <div className="flex justify-center mb-4">
              <AiOutlineCheckCircle className="text-green-500 text-6xl" />
            </div>
            <h3 className="text-xl font-semibold text-center text-green-500">Report Added Successfully!</h3>
            <p className="text-center text-gray-600 mt-2">Your waste collection has been saved.</p>
          </div>
        </div>
      )}
    </div>
  );
}