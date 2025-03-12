import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from "recharts";
import Calendar from 'react-calendar';
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios for fetching data
import 'react-calendar/dist/Calendar.css'; // Import styles for the calendar
import UserService from "../Home/UserService";

const AnalyzePage = () => {
  // State to hold fetched data for the charts
  const [lineChartData, setLineChartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);
  const [date, setDate] = useState(new Date());

  // Fetch data for charts from the backend
  useEffect(() => {
    axios.get(`${UserService.BASE_URL}/public/getAllReport`)
      .then((response) => {
        const wasteReports = response.data;
        
        // Process line chart data (example: total waste weight by month)
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const monthlyWaste = months.map((month, index) => {
          const monthReports = wasteReports.filter(report => new Date(report.date).getMonth() === index);
          const totalWaste = monthReports.reduce((total, report) => total + report.wasteWeight, 0);
          return { name: month, value: totalWaste };
        });
        setLineChartData(monthlyWaste);

        // Process bar chart data (example: waste by type)
        const wasteTypes = Array.from(new Set(wasteReports.map(report => report.wasteType)));
        const wasteTypeData = wasteTypes.map(type => {
          const typeReports = wasteReports.filter(report => report.wasteType === type);
          return { name: type, value: typeReports.length };
        });
        setBarChartData(wasteTypeData);
      })
      .catch((error) => {
        console.error("Error fetching waste report data:", error);
      });
  }, []);

  const onDateChange = (newDate) => setDate(newDate);

  // Define colors for each bar
  const barColors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white text-black p-6 shadow-md">
        <h1 className="text-xl font-bold flex items-center space-x-2">
          ♻ <span>WasteTrack</span>
        </h1>
        <nav className="mt-6 space-y-4">
          <a href="/WasteManagementDashboard" className="w-full text-left p-3 bg-green-600 text-white rounded-md flex items-center space-x-2">
            📊 <span>Dashboard</span>
          </a>
          <a href="/AnalyzePage" className="w-full text-left p-3 rounded-md hover:bg-green-600 hover:text-white flex items-center space-x-2">
            📶 <span>Analyze</span>
          </a>
          <a href="/Leaderboard" className="w-full text-left p-3 rounded-md hover:bg-green-600 hover:text-white flex items-center space-x-2">
            🏆<span>Rewards</span>
          </a>
          <a
            href="/WasteReportingTable"
            className="w-full text-left p-3 rounded-md hover:bg-green-600 hover:text-white flex items-center space-x-2"
          >
           📋  <span>Report Data</span>
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Analyze Data</h2>
        
        {/* Layout for Line Graph and Calendar */}
        <div className="flex space-x-8">
          {/* Left Side: Line Chart */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Line Chart</h3>
            <LineChart width={500} height={300} data={lineChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
          </div>

          {/* Right Side: Calendar */}
          <div className="w-72">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Calendar</h3>
            <Calendar
              onChange={onDateChange}
              value={date}
              className="border p-2 rounded-md shadow-sm"
            />
          </div>
        </div>

        {/* Bar Chart */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Bar Chart</h3>
          <BarChart width={500} height={300} data={barChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            {barChartData.map((entry, index) => (
              <Bar
                key={entry.name}
                dataKey="value"
                fill={barColors[index % barColors.length]} // Cycle through colors
                name={entry.name}
              />
            ))}
          </BarChart>
        </div>
      </main>
    </div>
  );
};

export default AnalyzePage;