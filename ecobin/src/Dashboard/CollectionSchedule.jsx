import { useState } from "react";

export default function WasteTrackDashboard() {
  const [truckImage, setTruckImage] = useState(null);
  
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setTruckImage(URL.createObjectURL(file));
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white p-6 shadow-md">
        <h1 className="text-xl font-bold flex items-center space-x-2">
          <span>♻️ WasteTrack</span>
        </h1>
        <nav className="mt-6 space-y-4">
          <button className="w-full text-left p-2 bg-green-500 text-white rounded-md">📊 Dashboard</button>
          <button className="w-full text-left p-2 rounded-md hover:bg-green-500 hover:text-white">🗑️ Waste Records</button>
          <button className="w-full text-left p-2 rounded-md hover:bg-green-500 hover:text-white">🎁 Rewards</button>
          <button className="w-full text-left p-2 rounded-md hover:bg-green-500 hover:text-white">👥 Customers</button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Dashboard Header */}
        <h1 className="text-3xl font-bold mb-6">WasteTrack Dashboard</h1>

        {/* Analytics Section */}
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
        <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Truck Image</h2>
          <div className="border-dashed border-2 border-gray-300 rounded-lg p-6 text-center mt-4">
            <input type="file" className="hidden" id="truckImageUpload" onChange={handleImageUpload} />
            <label htmlFor="truckImageUpload" className="cursor-pointer">
              {truckImage ? (
                <img src={truckImage} alt="Truck" className="w-full h-40 object-cover rounded-md" />
              ) : (
                <div className="flex flex-col items-center">
                  <span className="text-gray-500">📷 Upload Truck Image</span>
                </div>
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
            <input type="text" placeholder="🚛 Truck ID" className="p-3 border rounded-md w-full bg-gray-100" />
            <input type="text" placeholder="👤 Driver Name" className="p-3 border rounded-md w-full bg-gray-100" />
            <input type="datetime-local" className="p-3 border rounded-md w-full bg-gray-100" />
          </div>

          {/* Submit Button */}
          <button className="mt-4 bg-green-500 text-white p-3 rounded-md w-full hover:bg-green-600">Create</button>
        </div>
      </main>
    </div>
  );
}
