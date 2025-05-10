import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PencilIcon, TrashIcon, PlusIcon, DocumentDownloadIcon, CheckCircleIcon } from '@heroicons/react/solid';
import UserService from '../Home/UserService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

const WasteRequestTable = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateId, setUpdateId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [formData, setFormData] = useState({
    status: '',
    wasteType: '',
    quantity: '',
    address: '',
    collectionDate: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await axios.get(`${UserService.BASE_URL}/public/getAllRequest`);
      setRequests(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching requests:', error);
      toast.error('Failed to load waste requests');
      setLoading(false);
    }
  };

  const deleteRequest = async (id) => {
    setIsDeleting(true);
    setDeleteId(id);
    try {
      await axios.delete(`${UserService.BASE_URL}/public/deleteWasteRequest/${id}`);
      toast.success('Request deleted successfully');
      fetchRequests();
    } catch (error) {
      console.error('Error deleting request:', error);
      toast.error('Failed to delete request');
    } finally {
      setIsDeleting(false);
      setDeleteId(null);
    }
  };

  const updateStatus = async (id) => {
    setIsUpdating(true);
    setUpdateId(id);
    try {
      const response = await axios.put(
        `${UserService.BASE_URL}/public/updateStatus/${id}`,
        { status: 'In Progress' }
      );

      if (response.status === 200) {
        // Update local state
        setRequests(prevRequests => 
          prevRequests.map(request => 
            request.id === id 
              ? { ...request, status: 'In Progress' }
              : request
          )
        );
        toast.success('Status updated successfully');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
    } finally {
      setIsUpdating(false);
      setUpdateId(null);
    }
  };

  const generatePDF = () => {
    // Create new PDF instance
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(18);
    doc.setTextColor(40);
    doc.text('Waste Collection Requests', 14, 22);
    
    // Add date
    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 30);
    
    // Prepare data for the table
    const tableData = requests.map(request => [
      request.id,
      request.name,
      request.wasteType,
      `${request.quantity} kg`,
      request.address,
      request.status || 'Pending',
      new Date(request.collectionDate).toLocaleDateString()
    ]);
    
    // Add the table using autoTable plugin
    autoTable(doc, {
      head: [
        ['ID', 'Customer', 'Waste Type', 'Quantity', 'Location', 'Status', 'Collection Date']
      ],
      body: tableData,
      startY: 40,
      theme: 'grid',
      headStyles: {
        fillColor: [34, 139, 34], // Green color for header
        textColor: 255
      },
      alternateRowStyles: {
        fillColor: [240, 240, 240]
      },
      styles: {
        fontSize: 8,
        cellPadding: 2,
        overflow: 'linebreak'
      },
      columnStyles: {
        0: { cellWidth: 10 },
        1: { cellWidth: 25 },
        2: { cellWidth: 20 },
        3: { cellWidth: 15 },
        4: { cellWidth: 30 },
        5: { cellWidth: 15 },
        6: { cellWidth: 20 }
      },
      margin: { top: 40 }
    });
    
    // Save the PDF
    doc.save(`waste-requests-${new Date().toISOString().slice(0, 10)}.pdf`);
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      Completed: 'bg-green-100 text-green-800',
      Pending: 'bg-yellow-100 text-yellow-800',
      'In Progress': 'bg-blue-100 text-blue-800',
      Cancelled: 'bg-red-100 text-red-800'
    };
    return statusClasses[status] || 'bg-gray-100 text-gray-800';
  };

  const getWasteTypeColor = (type) => {
    const typeColors = {
      Plastic: 'bg-blue-500',
      Paper: 'bg-yellow-500',
      Metal: 'bg-gray-500',
      Organic: 'bg-green-500',
      Glass: 'bg-purple-500'
    };
    return typeColors[type] || 'bg-indigo-500';
  };

  const handleEdit = (request) => {
    setSelectedRequest(request);
    setFormData({
      status: request.status || 'Pending',
      wasteType: request.wasteType || '',
      quantity: request.quantity || '',
      address: request.address || '',
      collectionDate: request.collectionDate || ''
    });
    setShowEditModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      const response = await axios.put(
        `${UserService.BASE_URL}/public/updateWasteRequest/${selectedRequest.id}`,
        formData
      );

      if (response.status === 200) {
        setRequests(prevRequests => 
          prevRequests.map(request => 
            request.id === selectedRequest.id 
              ? { ...request, ...formData }
              : request
          )
        );
        toast.success('Request updated successfully');
        setShowEditModal(false);
      }
    } catch (error) {
      console.error('Error updating request:', error);
      toast.error('Failed to update request');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white text-black p-6 shadow-md">
        <h1 className="text-xl font-bold flex items-center space-x-2">
          ♻ <span>WasteTrack</span>
        </h1>
        <nav className="mt-6 space-y-4">
          <Link
            to="/WasteManagementDashboard"
            className="w-full text-left p-3 bg-green-600 text-white rounded-md flex items-center space-x-2"
          >
            📊 <span>Dashboard</span>
          </Link>
          <Link
            to="/AnalyzePage"
            className="w-full text-left p-3 rounded-md hover:bg-green-600 hover:text-white flex items-center space-x-2"
          >
            📶 <span>Analyze</span>
          </Link>
          <Link
            to="/Leaderboard"
            className="w-full text-left p-3 rounded-md hover:bg-green-600 hover:text-white flex items-center space-x-2"
          >
            🏆 <span>Rewards</span>
          </Link>
          <Link
            to="/WasteReportingTable"
            className="w-full text-left p-3 rounded-md hover:bg-green-600 hover:text-white flex items-center space-x-2"
          >
            📋 <span>Report Data</span>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Waste Collection Requests</h1>
            <div className="flex space-x-2">
              <button
                onClick={generatePDF}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <DocumentDownloadIcon className="-ml-1 mr-2 h-5 w-5" />
                Export PDF
              </button>
              <Link
                to="/add-waste-request"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
                Add New Request
              </Link>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            </div>
          ) : (
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Request ID
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Waste Type
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quantity (kg)
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Location
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Collection Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {requests.map((request) => (
                      <tr key={request.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          #{request.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {request.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className={`flex-shrink-0 h-4 w-4 rounded-full ${getWasteTypeColor(request.wasteType)}`}></div>
                            <div className="ml-2 text-sm text-gray-900">{request.wasteType}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {request.quantity}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {request.address}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(request.status)}`}>
                            {request.status || 'Pending'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(request.collectionDate).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            {request.status === 'Pending' && (
                              <button
                                onClick={() => updateStatus(request.id)}
                                disabled={isUpdating && updateId === request.id}
                                className="text-blue-600 hover:text-blue-900 disabled:opacity-50"
                                title="Update Status"
                              >
                                {isUpdating && updateId === request.id ? (
                                  <svg className="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                  </svg>
                                ) : (
                                  <CheckCircleIcon className="h-5 w-5" />
                                )}
                              </button>
                            )}
                            <button
                              onClick={() => handleEdit(request)}
                              className="text-green-600 hover:text-green-900 transition-colors duration-200"
                              title="Edit Request"
                            >
                              <PencilIcon className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => deleteRequest(request.id)}
                              disabled={isDeleting && deleteId === request.id}
                              className="text-red-600 hover:text-red-900 disabled:opacity-50"
                              title="Delete Request"
                            >
                              {isDeleting && deleteId === request.id ? (
                                <svg className="animate-spin h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                              ) : (
                                <TrashIcon className="h-5 w-5" />
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Update Waste Request</h2>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleUpdateSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    required
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Waste Type</label>
                  <select
                    name="wasteType"
                    value={formData.wasteType}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    required
                  >
                    <option value="">Select Type</option>
                    <option value="Plastic">Plastic</option>
                    <option value="Paper">Paper</option>
                    <option value="Metal">Metal</option>
                    <option value="Organic">Organic</option>
                    <option value="Glass">Glass</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Quantity (kg)</label>
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    required
                    min="0"
                    step="0.1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Collection Date</label>
                  <input
                    type="datetime-local"
                    name="collectionDate"
                    value={formData.collectionDate}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    required
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isUpdating}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                  >
                    {isUpdating ? 'Updating...' : 'Update Request'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WasteRequestTable;