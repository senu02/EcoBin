import { useState } from "react";

export default function WasteReport() {
  const [image, setImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImage(URL.createObjectURL(file));
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white text-black p-6 shadow-md">
        <h1 className="text-xl font-bold flex items-center space-x-2">
          ♻️ <span>WasteTrack</span>
        </h1>
        <nav className="mt-6 space-y-4">
          <button className="w-full text-left p-3 bg-green-600 text-white rounded-md flex items-center space-x-2">
            📊 <span>Dashboard</span>
          </button>
          <button className="w-full text-left p-3 rounded-md hover:bg-green-600 hover:text-white flex items-center space-x-2">
            📍 <span>Locations</span>
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
            <h2 className="text-gray-500 flex items-center space-x-2">Total Waste 🗑️</h2>
            <p className="text-2xl font-bold">2,450 kg</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-gray-500 flex items-center space-x-2">Active Locations 📍</h2>
            <p className="text-2xl font-bold">18</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-gray-500 flex items-center space-x-2">Total Rewards 🎁</h2>
            <p className="text-2xl font-bold">1,200 pts</p>
          </div>
        </div>

        {/* Add Waste Entry Form */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Add New Waste Entry</h2>

          {/* Image Upload */}
          <div className="border-dashed border-2 border-gray-300 rounded-lg p-6 text-center mt-4">
            <input type="file" className="hidden" id="wasteImageUpload" onChange={handleImageUpload} />
            <label htmlFor="wasteImageUpload" className="cursor-pointer flex flex-col items-center">
              {image ? (
                <img src={image} alt="Waste" className="w-full h-40 object-cover rounded-md" />
              ) : (
                <span className="text-gray-500">⬆️ Drop your image here or browse</span>
              )}
            </label>
          </div>

          {/* Input Fields */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            <input type="text" placeholder="📍 Enter location" className="p-3 border rounded-md w-full bg-gray-100" />
            <select className="p-3 border rounded-md w-full bg-gray-100">
              <option>Plastic</option>
              <option>Paper</option>
              <option>Metal</option>
              <option>Organic</option>
            </select>
            <input type="number" placeholder="Estimated Amount (kg)" className="p-3 border rounded-md w-full bg-gray-100" />
            <input type="text" placeholder="👤 Customer Name" className="p-3 border rounded-md w-full bg-gray-100" />
          </div>

          {/* Submit Button */}
          <button className="mt-4 bg-green-600 hover:bg-green-700 text-white p-3 rounded-md w-full">
            Submit Entry
          </button>
        </div>

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
    </div>
  );
}
