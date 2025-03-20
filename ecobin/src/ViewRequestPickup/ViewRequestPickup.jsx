import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { PencilIcon, TrashIcon } from '@heroicons/react/solid';
import UserService from "../Home/UserService";

const RequestWasteDetails = () => {
  const [requestWasteDetails, setRequestWasteDetails] = useState([]);
  const [userDetails, setUserDetails] = useState(null);
  const { id } = useParams(); 

  const loggedInUserName = localStorage.getItem("name");

  useEffect(() => {
    loadWasteDetails();
  }, []);

  const loadWasteDetails = async () => {
    try {
      const result = await axios.get(`${UserService.BASE_URL}/public/getAllRequest`);

      const filteredRequests = result.data.filter(request => request.name === loggedInUserName);

      if (filteredRequests.length > 0) {
        setRequestWasteDetails(filteredRequests);
        setUserDetails(filteredRequests[0]); 
      }
    } catch (error) {
      console.error("Error loading waste details:", error);
    }
  };

  if (!userDetails) {
    return <div className="text-center text-xl text-gray-500">No Data...</div>;
  }

  const deleteWasteRequest = async (id) => {
    try {
      await axios.delete(`${UserService.BASE_URL}/public/deleteWasteRequest/${id}`);
      loadWasteDetails(); 
    } catch (error) {
      console.error("Error deleting waste request:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-200 via-green-300 to-green-400 flex items-center justify-center p-6">
      <div className="bg-white rounded-xl shadow-lg max-w-4xl w-full p-8 space-y-8">
        {/* Display User Info */}
        <div className="flex items-center space-x-8 mb-6">
          {/* Avatar with the first letter */}
          <div className="w-24 h-24 rounded-full bg-green-700 text-white flex items-center justify-center text-5xl font-semibold">
            {loggedInUserName && loggedInUserName.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-3xl font-bold text-green-800">{loggedInUserName}</h2>
            <p className="text-gray-600 text-lg mt-2">Email: {userDetails.address}</p>
            <p className="text-gray-600 text-lg mt-1">Phone: {userDetails.mobile}</p>
          </div>
        </div>

        {/* Display Waste Requests with Dividers */}
        <div className="space-y-6">
          {requestWasteDetails.map((wasteDetail, index) => (
            <div key={index} className="bg-blue-100 p-8 rounded-lg shadow-md">
              {/* Waste Type */}
              <div className="flex justify-between items-center mb-4 border-b border-gray-300 pb-4">
                <h3 className="font-semibold text-lg text-blue-600">Waste Type</h3>
                <p className="text-gray-700 text-lg">{wasteDetail.wasteType}</p>
              </div>

              {/* Quantity */}
              <div className="flex justify-between items-center mb-4 border-b border-gray-300 pb-4">
                <h3 className="font-semibold text-lg text-blue-600">Quantity</h3>
                <p className="text-gray-700 text-lg">{wasteDetail.quantity}</p>
              </div>

              {/* Frequency Pickup */}
              <div className="flex justify-between items-center mb-4 border-b border-gray-300 pb-4">
                <h3 className="font-semibold text-lg text-blue-600">Frequency Pickup</h3>
                <p className="text-gray-700 text-lg">{wasteDetail.frequencyPickup}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4 justify-center">
                <Link to={`/editepickup/${wasteDetail.id}`} className="w-full">
                  <button 
                    className="w-full bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-700 transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center space-x-2"
                  >
                    <PencilIcon className="w-5 h-5" />
                    <span>Edit</span>
                  </button>
                </Link>

                <button 
                  onClick={() => deleteWasteRequest(wasteDetail.id)} 
                  className="w-full bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-red-700 transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <TrashIcon className="w-5 h-5" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RequestWasteDetails;
