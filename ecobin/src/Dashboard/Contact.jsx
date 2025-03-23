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
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-green-500 p-6 text-white flex flex-col justify-between">
        <div>
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <div className="bg-white p-4 rounded-full">
              <img src={logo} alt="Waste Management Logo" className="w-20 h-20 object-contain" />
            </div>
          </div>

          {/* Navigation Menu with Links */}
          <nav className="space-y-4">
            <Link to="/WasteManagementDashboard" className="flex items-center w-full text-left bg-white text-black p-2 rounded-md">
              <FaHome className="mr-2" /> Dashboard
            </Link>
            <Link to="/account" className="flex items-center w-full text-left bg-white text-black p-2 rounded-md">
              <FaUser className="mr-2" /> Your Account
            </Link>
            <Link to="/settings" className="flex items-center w-full text-left bg-white text-black p-2 rounded-md">
              <FaCog className="mr-2" /> Settings
            </Link>
            <Link to="/help" className="flex items-center w-full text-left bg-white text-black p-2 rounded-md">
              <FaQuestionCircle className="mr-2" /> Help
            </Link>
          </nav>
        </div>

        {/* Sign Out Button */}
        <button className="flex items-center bg-black text-white p-2 rounded-md">
          <FaSignOutAlt className="mr-2" /> Sign out
        </button>
      </aside>

      {/* Main Content Section */}
      <main className="flex-1 p-10 bg-gray-100">
        <h1 className="text-4xl font-bold mb-6">Contact Details</h1>
        <div className="space-y-4">
          {contactDetails.length === 0 ? (
            <p>No contact details available</p>
          ) : (
            contactDetails.map(contact => (
              <div key={contact.id} className="bg-white p-6 rounded-md shadow-md">
                <h2 className="text-xl font-semibold">{contact.name}</h2>
                <p><strong>Email:</strong> {contact.email}</p>
                <p><strong>Message:</strong> {contact.message}</p>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default ContactDetails;
