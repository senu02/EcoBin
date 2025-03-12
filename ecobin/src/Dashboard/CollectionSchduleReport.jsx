import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import UserService from '../Home/UserService';

function CollectionSchduleReport() {
    const [collectionSchedule, setCollectionSchedule] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        loadSchedule();
    }, []);

    const loadSchedule = async () => {
        const result = await axios.get(`${UserService.BASE_URL}/public/getAllSchedule`);
        setCollectionSchedule(result.data);
    };

    const deleteCollectionSchedule = async (id)=>{
        await axios.delete(`${UserService.BASE_URL}/public/deleteSchedule/${id}`)
        loadSchedule();
    }

    // Function to get the appropriate Tailwind color class based on status
    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending':
                return 'bg-yellow-500'; // Yellow for Pending
            case 'Completed':
                return 'bg-green-500'; // Green for Complete
            case 'In Progress':
                return 'bg-blue-500'; // Blue for In Progress
            default:
                return 'bg-gray-500'; // Gray for any other status
        }
    };

    return (
        <div>
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
                        
                        {/* Add custom margin here to increase space between the two buttons */}
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
                    <h1 className="text-5xl font-extrabold  bg-clip-text mb-8 text-center shadow-xl transform transition-all hover:scale-110 hover:text-green-700">
                        WasteTrack Record
                    </h1>

                    <p className="text-lg text-gray-500 mb-6 text-center">
                        Track the progress of all waste management activities, schedules, and status updates in one place.
                    </p>

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
                                {collectionSchedule.map((schedule) => (
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
                                            {/* Centering Image */}
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
                                            {/* Centering Action Icons */}
                                            <div className="flex justify-center space-x-3">
                                                <Link to={`/collectionview/${schedule.id}`} className="bg-blue-500 p-3 rounded-full text-white cursor-pointer hover:bg-blue-600 transition-colors">
                                                    <FaEye />
                                                </Link>
                                                <Link to={`/collectionupdate/${schedule.id}`} className="bg-yellow-500 p-3 rounded-full text-white cursor-pointer hover:bg-yellow-600 transition-colors">
                                                    <FaEdit />
                                                </Link>
                                                <button className="bg-red-500 p-3 rounded-full text-white cursor-pointer hover:bg-red-600 transition-colors" onClick={()=>deleteCollectionSchedule(schedule.id)}>
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
