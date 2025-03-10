import React from 'react';

const WasteTrack = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-6">
          <h1 className="text-2xl font-bold">WasteTrack</h1>
          <nav className="mt-6">
            <ul>
              <li className="mb-4">
                <a href="#" className="text-gray-700 hover:text-indigo-600">Dashboard</a>
              </li>
              <li className="mb-4">
                <a href="#" className="text-gray-700 hover:text-indigo-600">Locations</a>
              </li>
              <li className="mb-4">
                <a href="#" className="text-gray-700 hover:text-indigo-600">Rewards</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navigation Bar */}
        <div className="bg-white shadow-md p-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Dashboard</h2>
            <div className="flex items-center">
              <input type="text" placeholder="Search..." className="px-4 py-2 border rounded-md" />
              <button className="ml-4 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">Search</button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold">Total Waste</h2>
              <p className="text-3xl font-bold">2,450 kg</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold">Active Locations</h2>
              <p className="text-3xl font-bold">18</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold">Total Rewards</h2>
              <p className="text-3xl font-bold">1,200 pts</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-lg font-semibold mb-4">Add New Waste Entry</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Estimated Amount (kg)</label>
                <input type="number" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="0.00" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="Enter location" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Waste Type</label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                  <option>Plastic</option>
                  <option>Paper</option>
                  <option>Glass</option>
                  <option>Metal</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Customer Name</label>
                <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="Enter name" />
              </div>

              <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700">Submit Entry</button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Recent Entries</h2>
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rewards</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Jan 15, 2025</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">John Doe</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Plastic</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">5.2 kg</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">North Street</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">+52 pts</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Jan 14, 2025</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Jane Smith</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Paper</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">3.8 kg</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">West Avenue</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">+38 pts</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WasteTrack;