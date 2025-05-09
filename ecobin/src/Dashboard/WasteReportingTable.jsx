import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { PencilIcon, TrashIcon, EyeIcon, SearchIcon } from '@heroicons/react/solid';
import UserService from "../Home/UserService";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const WasteReportingTable = () => {
  const [wasteReports, setWasteReports] = useState([]);
  const [editReport, setEditReport] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [wasteImage, setWasteImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [reportDetails, setReportDetails] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await axios.get(`${UserService.BASE_URL}/public/getAllReport`);
      setWasteReports(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load waste reports");
      setLoading(false);
    }
  };

  const handleUpdate = (report) => {
    setEditReport(report);
    setImagePreview(report.wasteImage ? `data:image/jpeg;base64,${report.wasteImage}` : null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this report?")) {
      setIsDeleting(true);
      try {
        await axios.delete(`${UserService.BASE_URL}/public/deleteReport/${id}`);
        setWasteReports(wasteReports.filter((report) => report.id !== id));
        toast.success("Report deleted successfully");
      } catch (error) {
        console.error("Error deleting report:", error);
        toast.error("Failed to delete report");
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const handleView = (report) => {
    setReportDetails(report);
    setViewModalOpen(true);
  };

  const handleChange = (e) => {
    setEditReport({ ...editReport, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setWasteImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!editReport?.wasteTitle?.trim()) {
      errors.wasteTitle = 'Waste title is required';
    } else if (editReport.wasteTitle.length < 3) {
      errors.wasteTitle = 'Waste title must be at least 3 characters';
    }

    if (!editReport?.date) {
      errors.date = 'Date is required';
    }

    if (!editReport?.wasteLocation?.trim()) {
      errors.wasteLocation = 'Location is required';
    }

    if (!editReport?.wasteType) {
      errors.wasteType = 'Waste type is required';
    }

    if (!editReport?.wasteWeight) {
      errors.wasteWeight = 'Weight is required';
    } else if (editReport.wasteWeight <= 0) {
      errors.wasteWeight = 'Weight must be greater than 0';
    }

    if (!editReport?.customerName?.trim()) {
      errors.customerName = 'Customer name is required';
    }

    if (!editReport?.reword) {
      errors.reword = 'Reward points are required';
    } else if (editReport.reword < 0) {
      errors.reword = 'Reward points cannot be negative';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    const formData = new FormData();
    formData.append("wasteTitle", editReport.wasteTitle);
    formData.append("description", editReport.description);
    formData.append("date", editReport.date);
    formData.append("wasteLocation", editReport.wasteLocation);
    formData.append("wasteType", editReport.wasteType);
    formData.append("wasteWeight", editReport.wasteWeight);
    formData.append("customerName", editReport.customerName);
    formData.append("reword", editReport.reword);
    
    if (wasteImage) {
      formData.append("wasteImage", wasteImage);
    }

    try {
      await axios.put(`${UserService.BASE_URL}/public/updateReport/${editReport.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Report updated successfully");
      fetchReports();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating report:", error);
      toast.error("Failed to update report");
    }
  };

  const filteredReports = wasteReports.filter((report) => 
    Object.values(report).some((value) => 
      value && value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const getStatusBadge = (status) => {
    const statusClasses = {
      Completed: 'bg-green-100 text-green-800',
      Pending: 'bg-yellow-100 text-yellow-800',
      'In Progress': 'bg-blue-100 text-blue-800',
      Cancelled: 'bg-red-100 text-red-800'
    };
    return statusClasses[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white text-black p-6 shadow-lg sticky top-0 h-screen">
        <h1 className="text-2xl font-bold flex items-center space-x-2 mb-8">
          <span className="text-green-600">♻</span>
          <span>WasteTrack</span>
        </h1>
        <nav className="space-y-2">
          <Link
            to="/WasteManagementDashboard"
            className="w-full text-left p-3 bg-green-600 text-white rounded-lg flex items-center space-x-2 shadow-md hover:bg-green-700 transition-colors duration-200"
          >
            <span className="text-xl">📊</span>
            <span>Dashboard</span>
          </Link>
          <Link
            to="/AnalyzePage"
            className="w-full text-left p-3 rounded-lg hover:bg-green-600 hover:text-white flex items-center space-x-2 transition-colors duration-200"
          >
            <span className="text-xl">📶</span>
            <span>Analyze</span>
          </Link>
          <Link
            to="/Leaderboard"
            className="w-full text-left p-3 rounded-lg hover:bg-green-600 hover:text-white flex items-center space-x-2 transition-colors duration-200"
          >
            <span className="text-xl">🏆</span>
            <span>Rewards</span>
          </Link>
          <Link
            to="/WasteReportingTable"
            className="w-full text-left p-3 rounded-lg hover:bg-green-600 hover:text-white flex items-center space-x-2 transition-colors duration-200"
          >
            <span className="text-xl">📋</span>
            <span>Report Data</span>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Waste Reporting Data</h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search reports..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>
          </div>

          {/* Table */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            </div>
          ) : (
            <div className="bg-white shadow-lg rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-green-600">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">ID</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Waste Title</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Date</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Location</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Type</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Weight (kg)</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredReports.length > 0 ? (
                      filteredReports.map((report) => (
                        <tr key={report.id} className="hover:bg-gray-50 transition-colors duration-200">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{report.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{report.wasteTitle}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.wasteLocation}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.wasteType}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.wasteWeight}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(report.status)}`}>
                              {report.status || 'Pending'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-3">
                              <button
                                onClick={() => handleUpdate(report)}
                                className="text-green-600 hover:text-green-900 transition-colors duration-200"
                                title="Edit"
                              >
                                <PencilIcon className="h-5 w-5" />
                              </button>
                              <button
                                onClick={() => handleView(report)}
                                className="text-blue-600 hover:text-blue-900 transition-colors duration-200"
                                title="View"
                              >
                                <EyeIcon className="h-5 w-5" />
                              </button>
                              <button
                                onClick={() => handleDelete(report.id)}
                                disabled={isDeleting}
                                className="text-red-600 hover:text-red-900 disabled:opacity-50 transition-colors duration-200"
                                title="Delete"
                              >
                                <TrashIcon className="h-5 w-5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8" className="px-6 py-8 text-center text-sm text-gray-500">
                          <div className="flex flex-col items-center justify-center">
                            <svg className="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p>No reports found</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Update Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
          <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-2xl transform transition-all">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Update Waste Report</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Waste Title</label>
                  <input
                    type="text"
                    name="wasteTitle"
                    value={editReport?.wasteTitle || ''}
                    onChange={handleChange}
                    className={`w-full p-3 rounded-lg border ${formErrors.wasteTitle ? 'border-red-500 bg-red-50' : 'border-gray-300'} focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200`}
                    placeholder="Enter waste title"
                    required
                  />
                  {formErrors.wasteTitle && (
                    <p className="text-sm text-red-600 mt-1 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {formErrors.wasteTitle}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={editReport?.date || ''}
                    onChange={handleChange}
                    className={`w-full p-3 rounded-lg border ${formErrors.date ? 'border-red-500 bg-red-50' : 'border-gray-300'} focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200`}
                    required
                  />
                  {formErrors.date && (
                    <p className="text-sm text-red-600 mt-1 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {formErrors.date}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Location</label>
                  <input
                    type="text"
                    name="wasteLocation"
                    value={editReport?.wasteLocation || ''}
                    onChange={handleChange}
                    className={`w-full p-3 rounded-lg border ${formErrors.wasteLocation ? 'border-red-500 bg-red-50' : 'border-gray-300'} focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200`}
                    placeholder="Enter location"
                    required
                  />
                  {formErrors.wasteLocation && (
                    <p className="text-sm text-red-600 mt-1 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {formErrors.wasteLocation}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Waste Type</label>
                  <select
                    name="wasteType"
                    value={editReport?.wasteType || ''}
                    onChange={handleChange}
                    className={`w-full p-3 rounded-lg border ${formErrors.wasteType ? 'border-red-500 bg-red-50' : 'border-gray-300'} focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200`}
                    required
                  >
                    <option value="">Select Type</option>
                    <option value="Plastic">Plastic</option>
                    <option value="Paper">Paper</option>
                    <option value="Metal">Metal</option>
                    <option value="Organic">Organic</option>
                    <option value="Glass">Glass</option>
                  </select>
                  {formErrors.wasteType && (
                    <p className="text-sm text-red-600 mt-1 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {formErrors.wasteType}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Weight (kg)</label>
                  <input
                    type="number"
                    name="wasteWeight"
                    value={editReport?.wasteWeight || ''}
                    onChange={handleChange}
                    min="0.1"
                    step="0.1"
                    className={`w-full p-3 rounded-lg border ${formErrors.wasteWeight ? 'border-red-500 bg-red-50' : 'border-gray-300'} focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200`}
                    placeholder="Enter weight"
                    required
                  />
                  {formErrors.wasteWeight && (
                    <p className="text-sm text-red-600 mt-1 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {formErrors.wasteWeight}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Customer Name</label>
                  <input
                    type="text"
                    name="customerName"
                    value={editReport?.customerName || ''}
                    onChange={handleChange}
                    className={`w-full p-3 rounded-lg border ${formErrors.customerName ? 'border-red-500 bg-red-50' : 'border-gray-300'} focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200`}
                    placeholder="Enter customer name"
                    required
                  />
                  {formErrors.customerName && (
                    <p className="text-sm text-red-600 mt-1 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {formErrors.customerName}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Reward Points</label>
                  <input
                    type="number"
                    name="reword"
                    value={editReport?.reword || ''}
                    onChange={handleChange}
                    min="0"
                    className={`w-full p-3 rounded-lg border ${formErrors.reword ? 'border-red-500 bg-red-50' : 'border-gray-300'} focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200`}
                    placeholder="Enter reward points"
                    required
                  />
                  {formErrors.reword && (
                    <p className="text-sm text-red-600 mt-1 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {formErrors.reword}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Description</label>
                  <textarea
                    name="description"
                    value={editReport?.description || ''}
                    onChange={handleChange}
                    rows="2"
                    className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter description"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Waste Image</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-green-500 transition-colors duration-200">
                    <input
                      type="file"
                      id="wasteImageUpload"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <label htmlFor="wasteImageUpload" className="cursor-pointer">
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          alt="Waste Preview"
                          className="h-32 w-full object-cover rounded-md"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center text-gray-500">
                          <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>Click to upload image</span>
                          <span className="text-xs">(JPEG, PNG)</span>
                        </div>
                      )}
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Modal */}
      {viewModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl">
            <h2 className="text-xl font-bold mb-4">Waste Report Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Basic Information</h3>
                <div className="space-y-2">
                  <p><span className="font-medium">Title:</span> {reportDetails?.wasteTitle}</p>
                  <p><span className="font-medium">Date:</span> {reportDetails?.date}</p>
                  <p><span className="font-medium">Location:</span> {reportDetails?.wasteLocation}</p>
                  <p><span className="font-medium">Type:</span> {reportDetails?.wasteType}</p>
                  <p><span className="font-medium">Weight:</span> {reportDetails?.wasteWeight} kg</p>
                  <p><span className="font-medium">Customer:</span> {reportDetails?.customerName}</p>
                  <p><span className="font-medium">Reward Points:</span> {reportDetails?.reword}</p>
                  <p><span className="font-medium">Status:</span> 
                    <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(reportDetails?.status)}`}>
                      {reportDetails?.status || 'Pending'}
                    </span>
                  </p>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-gray-700 mb-4">{reportDetails?.description || 'No description provided'}</p>
                {reportDetails?.wasteImage && (
                  <>
                    <h3 className="text-lg font-semibold mb-2">Waste Image</h3>
                    <img
                      src={`data:image/jpeg;base64,${reportDetails.wasteImage}`}
                      alt="Waste"
                      className="h-48 w-full object-contain rounded-md border border-gray-200"
                    />
                  </>
                )}
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setViewModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WasteReportingTable;