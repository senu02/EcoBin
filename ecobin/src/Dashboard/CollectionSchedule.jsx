import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AiOutlineCheckCircle } from "react-icons/ai";
import UserService from "../Home/UserService";

export default function WasteTrackDashboard() {
  const [truckImage, setTruckImage] = useState(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
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

  const onInputChange = (e) => {
    const { name, value, files, type } = e.target;

    if (type === "file") {
      setCollectionSchedule({ ...collectionSchedule, [name]: files[0] });
    } else {
      setCollectionSchedule({ ...collectionSchedule, [name]: value });
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      setTruckImage(URL.createObjectURL(file));
      setCollectionSchedule({ ...collectionSchedule, truckImage: file });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

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
            <Link to="/WasteTrackDashboard">
              <button className="w-full text-left p-2 bg-green-500 text-white rounded-md hover:bg-green-600">📊 Dashboard</button>
            </Link>
            
            {/* Add custom margin here to increase space between the two buttons */}
            <Link to="/collectionreport">
              <button className="w-full text-left p-2 rounded-md hover:bg-green-500 hover:text-white mt-5">📄 Schedule Report</button>
            </Link>
            
            <Link to="/Collectionanalythics">
              <button className="w-full text-left p-2 rounded-md hover:bg-green-500 hover:text-white mt-5">📈 Analytics</button>
            </Link>
            <Link to="/CollectionGenarateReport">
              <button className="w-full text-left p-2 rounded-md hover:bg-green-500 hover:text-white mt-5">📝 Generate PDF Report</button>
            </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Dashboard Header */}
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-green-500 to-blue-500 text-transparent bg-clip-text mb-6 shadow-lg transform transition-all hover:scale-105 hover:text-green-800 text-center">
          WasteTrack Dashboard
        </h1>
        {/* Waste Analytics Section */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="font-semibold text-lg">Waste Disposal in Four Cities</h2>
            <img src="/bar-chart.png" alt="Waste Analytics" className="mt-2 w-full h-52 object-contain"/>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="font-semibold text-lg">Pie Chart</h2>
            <img src="/pie-chart.png" alt="Waste Distribution" className="mt-2 w-full h-52 object-contain"/>
          </div>
        </div>

        {/* Form Section */}
        <form onSubmit={onSubmit}>
          <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Truck Image</h2>

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
                  <img src={truckImage} alt="Truck" className="w-60 h-40 object-cover rounded-md" />
                ) : (
                  <div className="flex flex-col items-center">
                    <span className="text-gray-500">📷 Upload Truck Image</span>
                  </div>
                )}
              </label>
            </div>

            {/* Input Fields */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              <input type="text" placeholder="📍 Enter location" className="p-3 border rounded-md w-full bg-gray-100" name="location" value={collectionSchedule.location} onChange={onInputChange} />
              <select className="p-3 border rounded-md w-full bg-gray-100" name="wasteType" value={collectionSchedule.wasteType} onChange={onInputChange}>
                <option>---Collection Type---</option>
                <option value="Plastic">🛍️ Plastic</option>
                <option value="Paper">📄 Paper</option>
                <option value="Metal">🔩 Metal</option>
                <option value="Organic">🍃 Organic</option>
              </select>
              <select className="p-3 border rounded-md w-full bg-gray-100" name="status" value={collectionSchedule.status} onChange={onInputChange}>
                <option>---Status---</option>
                <option value="Pending">⏳ Pending</option>
                <option value="In Progress">🔄 In Progress</option>
                <option value="Completed">✅ Completed</option>
              </select>
              <input type="text" placeholder="👤 Driver Name" className="p-3 border rounded-md w-full bg-gray-100" name="driverName" value={collectionSchedule.driverName} onChange={onInputChange} />
              <input type="datetime-local" className="p-3 border rounded-md w-full bg-gray-100" name="collectionDate" value={collectionSchedule.collectionDate} onChange={onInputChange} />
              <input type="text" className="p-3 border rounded-md w-full bg-gray-100" placeholder="💬 Remarks" name="remark" value={collectionSchedule.remark} onChange={onInputChange} />
            </div>

            {/* Submit Button */}
            <button className="mt-4 bg-green-500 text-white p-3 rounded-md w-full hover:bg-green-600">Create</button>
          </div>
        </form>
      </main>

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <div className="flex justify-center mb-4">
              <AiOutlineCheckCircle className="text-green-500 text-6xl" />
            </div>
            <h3 className="text-xl font-semibold text-center text-green-500">Schedule Added Successfully!</h3>
            <p className="text-center text-gray-600 mt-2">Your collection schedule has been saved.</p>
          </div>
        </div>
      )}
    </div>
  );
}
