import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link for routing
import { FaHome, FaUser, FaCog, FaQuestionCircle, FaSignOutAlt } from "react-icons/fa"; // Import necessary icons
import logo from "../Home/images/Logo.png"; // Make sure to provide the correct path to your logo image

const ContactDetails = () => {
  const [contactDetails, setContactDetails] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch contact details from the backend
    axios.get("http://localhost:8080/public/allContact")
      .then(response => {
        setContactDetails(response.data);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setError("There was an error fetching contact details.");
      });
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

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
            📋 <span>Report Data</span>
          </a>
        </nav>
      </aside>

      {/* Main Content Section */}
      <main className="flex-1 p-10 bg-gray-100">
        <h1 className="text-4xl font-bold mb-6">Contact Details</h1>
        <div className="space-y-4">
          {contactDetails.length === 0 ? (
            <p>No contact details available</p>
          ) : (
            contactDetails.map(contact => (
              <div key={contact.id} className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                <h2 className="text-2xl font-semibold text-green-600 mb-3">{contact.name}</h2>
                <div className="space-y-2">
                  <p className="text-gray-700"><span className="font-medium text-gray-900">Email:</span> {contact.email}</p>
                  <p className="text-gray-700"><span className="font-medium text-gray-900">Message:</span> {contact.message}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default ContactDetails;
