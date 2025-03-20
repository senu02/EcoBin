import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams,Link } from "react-router-dom";
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
      loadWasteDetails(); // Reload the waste details after deletion
    } catch (error) {
      console.error("Error deleting waste request:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-100 to-green-300 flex items-center justify-center p-6">
      <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full p-6 space-y-6">
        {/* Display User Info Once */}
        <div className="flex items-center space-x-6 mb-6">
          {/* Avatar with the first letter */}
          <div className="w-24 h-24 rounded-full bg-green-600 text-white flex items-center justify-center text-3xl font-semibold">
            {loggedInUserName && loggedInUserName.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-3xl font-extrabold text-green-800">{loggedInUserName}</h2>
            <p className="text-gray-700 text-sm">Email: {userDetails.address}</p>
            <p className="text-gray-700 text-sm">Phone: {userDetails.mobile}</p>
          </div>
        </div>

        {/* Display Waste Requests as Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {requestWasteDetails.map((wasteDetail, index) => (
            <div key={index} className="bg-green-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
              <h3 className="font-semibold mb-2 text-lg text-green-600">Waste Type</h3>
              <p className="text-gray-600">{wasteDetail.wasteType}</p>

              <h3 className="font-semibold mb-2 text-lg text-green-600">Quantity</h3>
              <p className="text-gray-600">{wasteDetail.quantity}</p>

              <h3 className="font-semibold mb-2 text-lg text-green-600">Frequency Pickup</h3>
              <p className="text-gray-600">{wasteDetail.frequencyPickup}</p>

              {/* Action Buttons with Icons */}
              <div className="mt-4 flex space-x-4 justify-center">

              <Link to={`/editepickup/${wasteDetail.id}`} className='btn btn-outline-primary mx-2'>

                <button 
                  className="bg-green-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-700 transition duration-300 ease-in-out transform hover:scale-105 flex items-center space-x-2"
                >
                  <PencilIcon className="w-5 h-5" />
                  <span>Edit</span>
                </button>

                </Link>

                <button 
                  onClick={() => deleteWasteRequest(wasteDetail.id)} 
                  className="bg-red-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-700 transition duration-300 ease-in-out transform hover:scale-105 flex items-center space-x-2"
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
