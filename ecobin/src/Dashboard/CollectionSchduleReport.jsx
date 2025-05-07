import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaEye, FaEdit, FaTrash, FaSearch } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import UserService from '../Home/UserService';

function CollectionSchduleReport() {
    const [collectionSchedule, setCollectionSchedule] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [scheduleToDelete, setScheduleToDelete] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        loadSchedule();
    }, []);

    const loadSchedule = async () => {
        const result = await axios.get(`${UserService.BASE_URL}/public/getAllSchedule`);
        setCollectionSchedule(result.data);
    };

    const handleDeleteClick = (schedule) => {
        setScheduleToDelete(schedule);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        if (scheduleToDelete) {
            await axios.delete(`${UserService.BASE_URL}/public/deleteSchedule/${scheduleToDelete.id}`);
            loadSchedule();
        }
        setShowDeleteModal(false);
        setScheduleToDelete(null);
    };

    const cancelDelete = () => {
        setShowDeleteModal(false);
        setScheduleToDelete(null);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending':
                return 'bg-yellow-500';
            case 'Completed':
                return 'bg-green-500';
            case 'In Progress':
                return 'bg-blue-500';
            default:
                return 'bg-gray-500';
        }
    };

    const filteredSchedules = collectionSchedule.filter(schedule => 
        schedule.id.toString().includes(searchQuery) || 
        schedule.driverName.toLowerCase().includes(searchQuery.toLowerCase()) || 
        schedule.wasteType.toLowerCase().includes(searchQuery.toLowerCase()) || 
        schedule.collectionDate.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                        <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
                        <p className="mb-6">Are you sure you want to delete the schedule for truck ID: {scheduleToDelete?.id}?</p>
                        <div className="flex justify-end space-x-4">
                            <button 
                                onClick={cancelDelete}
                                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition-colors"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={confirmDelete}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex min-h-screen bg-gray-100">
                {/* Sidebar */}
                <aside className="w-64 bg-white p-6 shadow-md">
                    <h1 className="text-xl font-bold flex items-center space-x-2">
                        <span>♻️ WasteTrack</span>
                    </h1>
                    <nav className="mt-6">
                        <Link to="/WasteTrackDashboard">
                            <button className="w-full text-left p-2 rounded-md hover:bg-green-500 hover:text-white mt-5">📊 Dashboard</button>
                        </Link>

                        <Link to="/collectionreport">
                            <button className="w-full text-left p-2 bg-green-500 text-white rounded-md hover:bg-green-600 mt-5">📄 Schedule Report</button>
                        </Link>

                        <Link to="/Collectionanalythics">
                            <button className="w-full text-left p-2 rounded-md hover:bg-green-500 hover:text-white mt-5">📈 Analytics</button>
                        </Link>
                        <Link to="/CollectionGenarateReport">
                            <button className="w-full text-left p-2 rounded-md hover:bg-green-500 hover:text-white mt-5">📝 Generate PDF Report</button>
                        </Link>
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-6">
                    {/* Dashboard Header */}
                    <h1 className="text-5xl font-extrabold  bg-clip-text mb-8 text-center shadow-xl transform transition-all">
                        WasteTrack Record
                    </h1>

                    <p className="text-lg text-gray-500 mb-6 text-center">
                        Track the progress of all waste management activities, schedules, and status updates in one place.
                    </p>

                    {/* Search Bar with Icon */}
                    <div className="mb-6 flex justify-center">
                        <div className="relative w-80">
                            <input
                                type="text"
                                className="w-full p-3 pl-10 pr-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder="Search by Truck ID, Driver Name, Waste Type, or Date"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <FaSearch 
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                                size={20} 
                            />
                        </div>
                    </div>

                    {/* Table Section */}
                    <div className="overflow-x-auto rounded-lg shadow-lg bg-white">
                        <table className="min-w-full bg-white">
                            <thead className="bg-green-500 text-white">
                                <tr>
                                    <th className="py-4 px-6 text-center">Truck ID</th>
                                    <th className="py-4 px-6 text-center">D.Name</th>
                                    <th className="py-4 px-6 text-center">Waste Type</th>
                                    <th className="py-4 px-6 text-center">C.Date</th>
                                    <th className="py-4 px-6 text-center">Status</th>
                                    <th className="py-4 px-6 text-center">Image</th>
                                    <th className="py-4 px-6 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredSchedules.map((schedule) => (
                                    <tr key={schedule.id} className="hover:bg-gray-200 cursor-pointer">
                                        <td className="py-3 px-6 text-center">{schedule.id}</td>
                                        <td className="py-3 px-6 text-center">{schedule.driverName}</td>
                                        <td className="py-3 px-6 text-center">{schedule.wasteType}</td>
                                        <td className="py-3 px-6 text-center">{schedule.collectionDate}</td>
                                        <td className="py-3 px-6 text-center">
                                            <span className={`text-white py-1 px-3 rounded-full ${getStatusColor(schedule.status)}`}>
                                                {schedule.status}
                                            </span>
                                        </td>

                                        <td className="py-3 px-6 text-center">
                                            {schedule.truckImage && (
                                                <div className="flex justify-center items-center">
                                                    <img
                                                        src={`data:image/jpeg;base64,${schedule.truckImage}`}
                                                        alt="Truck"
                                                        style={{ width: '50px', height: '50px' }}
                                                    />
                                                </div>
                                            )}
                                        </td>

                                        <td className="py-3 px-6 text-center">
                                            <div className="flex justify-center space-x-3">
                                                <Link to={`/collectionview/${schedule.id}`} className="bg-blue-500 p-3 rounded-full text-white cursor-pointer hover:bg-blue-600 transition-colors">
                                                    <FaEye />
                                                </Link>
                                                <Link to={`/collectionupdate/${schedule.id}`} className="bg-yellow-500 p-3 rounded-full text-white cursor-pointer hover:bg-yellow-600 transition-colors">
                                                    <FaEdit />
                                                </Link>
                                                <button 
                                                    className="bg-red-500 p-3 rounded-full text-white cursor-pointer hover:bg-red-600 transition-colors" 
                                                    onClick={() => handleDeleteClick(schedule)}
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default CollectionSchduleReport;