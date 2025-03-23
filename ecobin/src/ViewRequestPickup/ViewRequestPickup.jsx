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
      <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full p-6 space-y-6"> {/* Adjusted max-width and padding */}
        {/* Display User Info */}
        <div className="flex items-center space-x-6 mb-4"> {/* Adjusted spacing */}
          {/* Avatar with the first letter */}
          <div className="w-20 h-20 rounded-full bg-green-700 text-white flex items-center justify-center text-4xl font-semibold"> {/* Adjusted size */}
            {loggedInUserName && loggedInUserName.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-green-800">{loggedInUserName}</h2> {/* Adjusted font size */}
            <p className="text-gray-600 text-md mt-1">Email: {userDetails.address}</p> {/* Adjusted font size */}
            <p className="text-gray-600 text-md mt-1">Phone: {userDetails.mobile}</p> {/* Adjusted font size */}
          </div>
        </div>

        {/* Display Waste Requests with Dividers */}
        <div className="space-y-4"> {/* Adjusted spacing */}
          {requestWasteDetails.map((wasteDetail, index) => (
            <div key={index} className="bg-blue-100 p-6 rounded-lg shadow-md"> {/* Adjusted padding */}
              {/* Waste Type */}
              <div className="flex justify-between items-center mb-3 border-b border-gray-300 pb-3"> {/* Adjusted spacing */}
                <h3 className="font-semibold text-md text-blue-600">Waste Type</h3> {/* Adjusted font size */}
                <p className="text-gray-700 text-md">{wasteDetail.wasteType}</p> {/* Adjusted font size */}
              </div>

              {/* Quantity */}
              <div className="flex justify-between items-center mb-3 border-b border-gray-300 pb-3"> {/* Adjusted spacing */}
                <h3 className="font-semibold text-md text-blue-600">Quantity</h3> {/* Adjusted font size */}
                <p className="text-gray-700 text-md">{wasteDetail.quantity}</p> {/* Adjusted font size */}
              </div>

              {/* Frequency Pickup */}
              <div className="flex justify-between items-center mb-3 border-b border-gray-300 pb-3"> {/* Adjusted spacing */}
                <h3 className="font-semibold text-md text-blue-600">Frequency Pickup</h3> {/* Adjusted font size */}
                <p className="text-gray-700 text-md">{wasteDetail.frequencyPickup}</p> {/* Adjusted font size */}
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 justify-center"> {/* Adjusted spacing */}
                <Link to={`/editepickup/${wasteDetail.id}`} className="w-full">
                  <button 
                    className="w-full bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-green-700 transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center space-x-2"
                  >
                    <PencilIcon className="w-4 h-4" /> {/* Adjusted icon size */}
                    <span>Edit</span>
                  </button>
                </Link>

                <button 
                  onClick={() => deleteWasteRequest(wasteDetail.id)} 
                  className="w-full bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-red-700 transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <TrashIcon className="w-4 h-4" /> {/* Adjusted icon size */}
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