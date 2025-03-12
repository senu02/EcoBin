import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import UserService from "../Home/UserService";

export default function CollectionScheduleAnalytics() {
  let navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`${UserService.BASE_URL}/public/getAllSchedule`)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Process data for different charts
  const wasteTypeData = data.reduce((acc, item) => {
    acc[item.wasteType] = (acc[item.wasteType] || 0) + 1;
    return acc;
  }, {});
  const wasteTypeChart = Object.keys(wasteTypeData).map((key) => ({ name: key, value: wasteTypeData[key] }));

  const collectionDateData = data.reduce((acc, item) => {
    acc[item.collectionDate] = (acc[item.collectionDate] || 0) + 1;
    return acc;
  }, {});
  const collectionDateChart = Object.keys(collectionDateData).map((key) => ({ name: key, value: collectionDateData[key] }));

  const locationData = data.reduce((acc, item) => {
    acc[item.location] = (acc[item.location] || 0) + 1;
    return acc;
  }, {});
  const locationChart = Object.keys(locationData).map((key) => ({ name: key, value: locationData[key] }));

  const statusData = data.reduce((acc, item) => {
    acc[item.status] = (acc[item.status] || 0) + 1;
    return acc;
  }, {});
  const statusChart = Object.keys(statusData).map((key) => ({ name: key, value: statusData[key] }));

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white p-6 shadow-md">
        <h1 className="text-xl font-bold flex items-center space-x-2">
          <span>♻️ WasteTrack</span>
        </h1>
        <nav className="mt-6">
            <Link to="/WasteTrackDashboard">
              <button className="w-full text-left p-2 rounded-md hover:bg-green-500 hover:text-white mt-5">📊 Dashboard</button>
            </Link>
            
            {/* Add custom margin here to increase space between the two buttons */}
            <Link to="/collectionreport">
              <button className="w-full text-left p-2 rounded-md hover:bg-green-500 hover:text-white mt-5">📄 Schedule Report</button>
            </Link>
            
            <Link to="/Collectionanalythics">
              <button className="w-full text-left p-2 bg-green-500 text-white rounded-md hover:bg-green-600 mt-5">📈 Analytics</button>
            </Link>
            <Link to="/CollectionGenarateReport">
              <button className="w-full text-left p-2 rounded-md hover:bg-green-500 hover:text-white mt-5">📝 Generate PDF Report</button>
            </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
      <h1 className="text-4xl font-extrabold bg-gradient-to-r from-yellow-400 to-red-500 text-transparent bg-clip-text mb-6 shadow-lg transform transition-all hover:scale-105 hover:text-red-800 text-center">
  Schedule Report
</h1>


        <div className="grid grid-cols-2 gap-6">
          {/* Waste Type Chart */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="font-semibold text-lg">Waste Type Distribution</h2>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={wasteTypeChart} dataKey="value" nameKey="name" fill="#8884d8" label>
                  {wasteTypeChart.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={"#" + ((Math.random() * 0xffffff) << 0).toString(16)} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Collection Date Chart */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="font-semibold text-lg">Collection Date Trends</h2>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={collectionDateChart}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Location Chart */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="font-semibold text-lg">Collection by Location</h2>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={locationChart}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#ffc658" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Status Chart */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="font-semibold text-lg">Collection Status Overview</h2>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={statusChart} dataKey="value" nameKey="name" fill="#8884d8" label>
                  {statusChart.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={"#" + ((Math.random() * 0xffffff) << 0).toString(16)} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </div>
  );
}
