import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineCheckCircle } from "react-icons/ai";

export default function WasteReport() {
  const [wasteImage, setwasteImage] = useState(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  let navigate = useNavigate();

  const [wasteReporting, setwasteReporting] = useState({
    wasteTitle: "",
    date: "",
    wasteType: "",
    wasteWeight: "",
    wasteLocation: "",
    description: "",
    reword: "",
    customerName: "",
    wasteImage: null,
  });

  const onInputChange = (e) => {
    const { name, value, files, type } = e.target;

    if (type === "file") {
      setwasteReporting({ ...wasteReporting, [name]: files[0] });
    } else {
      setwasteReporting({ ...wasteReporting, [name]: value });
    }
  };


  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      setwasteImage(URL.createObjectURL(file));
      setwasteReporting({ ...wasteReporting, wasteImage: file });
    }
  };


  const onSubmit = async (e) => {
    e.preventDefault();

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

      await axios.post("http://localhost:8080/public/addReporting", formData, {
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
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white text-black p-6 shadow-md">
        <h1 className="text-xl font-bold flex items-center space-x-2">
          ♻ <span>WasteTrack</span>
        </h1>
        <nav className="mt-6 space-y-4">
          <button className="w-full text-left p-3 bg-green-600 text-white rounded-md flex items-center space-x-2">
            📊 <span>Dashboard</span>
          </button>
          <button className="w-full text-left p-3 rounded-md hover:bg-green-600 hover:text-white flex items-center space-x-2">
            📶 <span>Analyze</span>
          </button>
          <button className="w-full text-left p-3 rounded-md hover:bg-green-600 hover:text-white flex items-center space-x-2">
            🏆 <span>Rewards</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-gray-500 flex items-center space-x-2">Total Waste 🗑</h2>
            <p className="text-2xl font-bold">2,450 kg</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-gray-500 flex items-center space-x-2">Active Locations 🗺</h2>
            <p className="text-2xl font-bold">18</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-gray-500 flex items-center space-x-2">Total Rewards 🎁</h2>
            <p className="text-2xl font-bold">1,200 pts</p>
          </div>
        </div>

        <form onSubmit={onSubmit}>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Add New Waste Report</h2>

          {/* Title, Description, Date Input */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            <input
              type="text"
              placeholder="📑 Waste Report Title"
              className="p-3 border rounded-md w-full bg-gray-100"
              name="wasteTitle" 
              value={wasteReporting.wasteTitle}
              onChange={onInputChange}
              
            />
            <input
              type="text"
              placeholder="📝 Description"
              className="p-3 border rounded-md w-full bg-gray-100"
              name="description" 
              value={wasteReporting.description}
              onChange={onInputChange}
            />
            <input
              type="date"
              className="p-3 border rounded-md w-full bg-gray-100"
              name="date" 
              value={wasteReporting.date}
              onChange={onInputChange}
            />
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

          {/* Input Fields */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            <input
              type="text"
              placeholder="📍 Enter location"
              className="p-3 border rounded-md w-full bg-gray-100"
              name="wasteLocation" 
              value={wasteReporting.wasteLocation}
              onChange={onInputChange}
            />
            <select className="p-3 border rounded-md w-full bg-gray-100" name="wasteType" value={wasteReporting.wasteType}  onChange={onInputChange}>
              <option value="Plastic">Plastic</option>
              <option value="Paper">Paper</option>
              <option value="Metal">Metal</option>
              <option value="Organic">Organic</option>
            </select>
            <input
              type="number"
              placeholder="Estimated Amount (kg)"
              className="p-3 border rounded-md w-full bg-gray-100"
              name="wasteWeight" 
              value={wasteReporting.wasteWeight}
              onChange={onInputChange}
            />
            <input
              type="text"
              placeholder="👤 Customer Name"
              className="p-3 border rounded-md w-full bg-gray-100"
              name="customerName" 
              value={wasteReporting.customerName}
              onChange={onInputChange}
            />
            <input
              type="number"
              placeholder="💰 Points"
              className="p-3 border rounded-md w-full bg-gray-100"
              name="reword" 
              value={wasteReporting.reword}
              onChange={onInputChange}
            />
          </div>

          {/* Submit Button */}
          <button
            className="mt-4 bg-green-600 hover:bg-green-700 text-white p-3 rounded-md w-full"
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
              <tr className="border-b">
                <td className="p-2">Jan 15, 2025</td>
                <td className="p-2">John Doe</td>
                <td className="p-2">Plastic</td>
                <td className="p-2">5.2 kg</td>
                <td className="p-2">North Street</td>
                <td className="p-2">+52 pts</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">Jan 14, 2025</td>
                <td className="p-2">Jane Smith</td>
                <td className="p-2">Paper</td>
                <td className="p-2">3.8 kg</td>
                <td className="p-2">West Avenue</td>
                <td className="p-2">+38 pts</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
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