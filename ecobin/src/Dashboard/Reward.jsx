import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserService from "../Home/UserService";

export default function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const navigate = useNavigate();

  // Fetch leaderboard data from the backend
  useEffect(() => {
    axios
      .get(`${UserService.BASE_URL}/public/getAllReport`) // Replace with your API endpoint
      .then((response) => {
        // Sort the data by points in descending order
        const sortedData = response.data
          .sort((a, b) => b.reword - a.reword) // Assuming 'reword' is the points field
          .slice(0, 10); // Get the top 10 performers
        setLeaderboardData(sortedData);
      })
      .catch((error) => {
        console.error("Error fetching leaderboard data:", error);
      });
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
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
           📋  <span>Report Data</span>
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">🏆 Top Performers</h2>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-green-600 text-white">
                <th className="p-3 text-left">Rank</th>
                <th className="p-3 text-left">Customer Name</th>
                <th className="p-3 text-left">Points</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardData.map((entry, index) => (
                <tr key={index} className="border-b hover:bg-green-50">
                  <td className="p-3 font-bold">#{index + 1}</td>
                  <td className="p-3 flex items-center">
                    {/* Display customer name */}
                    {entry.customerName}
                  </td>
                  <td className="p-3 text-green-600 font-semibold">
                    {entry.reword} pts
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}