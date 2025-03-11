import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from "recharts";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import styles for the calendar

const AnalyzePage = () => {
  // Sample data for the charts
  const lineChartData = [
    { name: "Jan", value: 400 },
    { name: "Feb", value: 300 },
    { name: "Mar", value: 500 },
    { name: "Apr", value: 200 },
  ];

  const barChartData = [
    { name: "A", value: 2400 },
    { name: "B", value: 1398 },
    { name: "C", value: 9800 },
    { name: "D", value: 3908 },
  ];

  // State for managing the calendar
  const [date, setDate] = useState(new Date());

  // Handle calendar date change
  const onDateChange = (newDate) => setDate(newDate);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-72 bg-white p-6 shadow-md">
        <h1 className="text-2xl font-bold text-gray-800">Leaderboard</h1>
        <nav className="mt-6 space-y-3">
          <button className="w-full text-left p-3 bg-green-600 text-white rounded-md flex items-center">
            📊 <span className="ml-2">Dashboard</span>
          </button>
          <button className="w-full text-left p-3 rounded-md hover:bg-green-600 hover:text-white flex items-center">
            📶 <span className="ml-2">Analyze</span>
          </button>
          <button className="w-full text-left p-3 rounded-md hover:bg-green-600 hover:text-white flex items-center">
            🏆 <span className="ml-2">Rewards</span>
          </button>
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
            <Bar dataKey="value" fill="#82ca9d" />
          </BarChart>
        </div>
      </main>
    </div>
  );
};

export default AnalyzePage;
