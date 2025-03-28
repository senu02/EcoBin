import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { PencilIcon, TrashIcon, HomeIcon } from '@heroicons/react/solid';
import { motion, AnimatePresence } from "framer-motion";
import UserService from "../Home/UserService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RequestWasteDetails = () => {
  const [requestWasteDetails, setRequestWasteDetails] = useState([]);
  const [userDetails, setUserDetails] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const { id } = useParams(); 
  const navigate = useNavigate();

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
      toast.error("Failed to load waste requests", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const deleteWasteRequest = async (id) => {
    setIsDeleting(true);
    setDeleteId(id);
    try {
      await axios.delete(`${UserService.BASE_URL}/public/deleteWasteRequest/${id}`);
      toast.success("Request deleted successfully");
      loadWasteDetails();
    } catch (error) {
      console.error("Error deleting waste request:", error);
      toast.error("Failed to delete request");
    } finally {
      setIsDeleting(false);
      setDeleteId(null);
    }
  };

  if (!userDetails) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-700 via-green-800 to-black flex items-center justify-center p-4">
        <div className="text-center p-8 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg max-w-md w-full">
          <div className="mx-auto h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Waste Requests Found</h3>
          <p className="text-gray-600 mb-6">You haven't created any waste pickup requests yet.</p>
          <Link 
            to="/request-pickup" 
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Create New Request
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-700 via-green-800 to-black py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header with Home Button */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-white/10 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 backdrop-blur-sm"
          >
            <HomeIcon className="-ml-1 mr-2 h-5 w-5" />
            Home
          </button>
        </div>

        {/* User Profile Card */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg mb-8 border border-white/20"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center">
            <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white text-2xl font-bold shadow-md">
                {loggedInUserName && loggedInUserName.charAt(0).toUpperCase()}
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{loggedInUserName}</h1>
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                <div className="flex items-center text-sm text-gray-700">
                  <svg className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {userDetails.address}
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <svg className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {userDetails.mobile}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Waste Requests */}
        <div className="space-y-4">
          <AnimatePresence>
            {requestWasteDetails.map((wasteDetail) => (
              <motion.div
                key={wasteDetail.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="bg-white/90 backdrop-blur-sm overflow-hidden rounded-lg shadow-lg border border-white/20 hover:shadow-xl transition-shadow duration-200"
              >
                <div className="px-5 py-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                      <span className={`inline-block w-3 h-3 rounded-full mr-2 ${
                        wasteDetail.wasteType === 'Plastic' ? 'bg-blue-500' :
                        wasteDetail.wasteType === 'Paper' ? 'bg-yellow-500' :
                        wasteDetail.wasteType === 'Metal' ? 'bg-gray-500' :
                        wasteDetail.wasteType === 'Glass' ? 'bg-green-500' :
                        'bg-purple-500'
                      }`}></span>
                      {wasteDetail.wasteType}
                    </h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {wasteDetail.frequencyPickup}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Quantity</p>
                      <p className="font-medium text-gray-900">{wasteDetail.quantity}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Status</p>
                      <p className="font-medium text-gray-900">Pending</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50/80 px-5 py-3 flex justify-end space-x-3 border-t border-gray-200/50">
                  <Link
                    to={`/editepickup/${wasteDetail.id}`}
                    className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    <PencilIcon className="-ml-0.5 mr-1.5 h-4 w-4 text-gray-500" />
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteWasteRequest(wasteDetail.id)}
                    disabled={isDeleting && deleteId === wasteDetail.id}
                    className={`inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${
                      isDeleting && deleteId === wasteDetail.id ? 'opacity-75' : ''
                    }`}
                  >
                    {isDeleting && deleteId === wasteDetail.id ? (
                      <>
                        <svg className="animate-spin -ml-0.5 mr-1.5 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Deleting...
                      </>
                    ) : (
                      <>
                        <TrashIcon className="-ml-0.5 mr-1.5 h-4 w-4" />
                        Delete
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {requestWasteDetails.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-8 text-center mt-8 border border-white/20"
          >
            <div className="mx-auto h-24 w-24 text-gray-300 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Waste Requests</h3>
            <p className="text-gray-600 mb-6">You haven't created any waste pickup requests yet.</p>
            <Link 
              to="/request-pickup" 
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Create New Request
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default RequestWasteDetails;