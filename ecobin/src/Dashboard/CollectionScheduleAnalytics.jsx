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

  // Color palette for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <div className="flex min-h-screen bg-gray-50 overflow-hidden">
      {/* Fixed Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-emerald-800 to-emerald-900 p-6 shadow-lg fixed h-full">
        <h1 className="text-xl font-bold flex items-center space-x-2 text-white">
          <span>♻️ WasteTrack</span>
        </h1>
        <nav className="mt-8">
          <Link to="/WasteTrackDashboard">
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
            <button className="w-full text-left p-3 rounded-md bg-emerald-700 text-white mt-4 transition-all duration-300 flex items-center gap-2">
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
        <h1 className="text-4xl font-extrabold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-900">
          Collection Analytics Dashboard
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Waste Type Chart */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
            <h2 className="font-semibold text-xl mb-4 text-emerald-800">Waste Type Distribution</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie 
                    data={wasteTypeChart} 
                    dataKey="value" 
                    nameKey="name" 
                    cx="50%" 
                    cy="50%" 
                    outerRadius={80}
                    fill="#8884d8" 
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {wasteTypeChart.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value, name, props) => [
                      value, 
                      `${name}: ${(props.payload.percent * 100).toFixed(1)}%`
                    ]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Status Chart */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
            <h2 className="font-semibold text-xl mb-4 text-emerald-800">Collection Status Overview</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusChart}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {statusChart.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value, name, props) => [
                      value, 
                      `${name}: ${(props.payload.percent * 100).toFixed(1)}%`
                    ]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Collection Date Chart */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
            <h2 className="font-semibold text-xl mb-4 text-emerald-800">Collection Date Trends</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={collectionDateChart}>
                  <XAxis 
                    dataKey="name" 
                    tick={{ fontSize: 12 }}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis />
                  <Tooltip />
                  <Bar 
                    dataKey="value" 
                    fill="#82ca9d" 
                    radius={[4, 4, 0, 0]}
                    animationDuration={1500}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Location Chart */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
            <h2 className="font-semibold text-xl mb-4 text-emerald-800">Collection by Location</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={locationChart}>
                  <XAxis 
                    dataKey="name" 
                    tick={{ fontSize: 12 }}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis />
                  <Tooltip />
                  <Bar 
                    dataKey="value" 
                    fill="#ffc658" 
                    radius={[4, 4, 0, 0]}
                    animationDuration={1500}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}