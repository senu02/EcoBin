import React, { useEffect, useState } from "react";
import axios from "axios";

const WasteReportingTable = () => {
  const [wasteReports, setWasteReports] = useState([]);
  const [editReport, setEditReport] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [wasteImage, setWasteImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [reportDetails, setReportDetails] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/public/getAllReport")
      .then((response) => {
        setWasteReports(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleUpdate = (report) => {
    setEditReport(report);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this report?")) {
      axios
        .delete(`http://localhost:8080/public/deleteReport/${id}`)
        .then(() => {
          setWasteReports(wasteReports.filter((report) => report.id !== id));
        })
        .catch((error) => {
          console.error("Error deleting report:", error);
        });
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

      // Create a preview of the image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Set the preview image as a base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("wasteTitle", editReport.wasteTitle);
    formData.append("description", editReport.description);
    formData.append("date", editReport.date);
    formData.append("wasteLocation", editReport.wasteLocation);
    formData.append("wasteType", editReport.wasteType);
    formData.append("wasteWeight", editReport.wasteWeight);
    formData.append("customerName", editReport.customerName);
    formData.append("reword", editReport.reword);

    // Append the image to the FormData
    if (wasteImage) {
      formData.append("wasteImage", wasteImage);
    }

    axios
      .put(`http://localhost:8080/public/updateReport/${editReport.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        setWasteReports(
          wasteReports.map((r) =>
            r.id === editReport.id ? { ...editReport, wasteImage } : r
          )
        );
        setIsModalOpen(false);
      })
      .catch((error) => console.error("Error updating report:", error));
  };

  // Filter reports based on search query
  const filteredReports = wasteReports.filter((report) =>
    report.wasteTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white text-black p-6 shadow-md sticky top-0 h-screen">
        <h1 className="text-xl font-bold flex items-center space-x-2">
          ♻ <span>WasteTrack</span>
        </h1>
        <nav className="mt-6 space-y-4">
          <a
            href="/WasteManagementDashboard"
            className="w-full text-left p-3 bg-green-600 text-white rounded-md flex items-center space-x-2"
          >
            📊 <span>Dashboard</span>
          </a>
          <a
            href="/AnalyzePage"
            className="w-full text-left p-3 rounded-md hover:bg-green-600 hover:text-white flex items-center space-x-2"
          >
            📶 <span>Analyze</span>
          </a>
          <a
            href="/Leaderboard"
            className="w-full text-left p-3 rounded-md hover:bg-green-600 hover:text-white flex items-center space-x-2"
          >
            🏆 <span>Rewards</span>
          </a>
          <a
            href="/WasteReportingTable"
            className="w-full text-left p-3 rounded-md hover:bg-green-600 hover:text-white flex items-center space-x-2"
          >
           📋  <span>Report Data</span>
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-4">Waste Reporting Data</h1>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by Waste Title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Table */}
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-green-500 text-white">
            <tr>
              <th className="p-3 border">ID</th>
              <th className="p-3 border">Waste Title</th>
              <th className="p-3 border">Description</th>
              <th className="p-3 border">Date</th>
              <th className="p-3 border">Location</th>
              <th className="p-3 border">Type</th>
              <th className="p-3 border">Weight (kg)</th>
              <th className="p-3 border">Customer</th>
              <th className="p-3 border">Reward Points</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.map((report) => (
              <tr key={report.id} className="odd:bg-gray-100 even:bg-white">
                <td className="p-3 border">{report.id}</td>
                <td className="p-3 border">{report.wasteTitle}</td>
                <td className="p-3 border">{report.description}</td>
                <td className="p-3 border">{report.date}</td>
                <td className="p-3 border">{report.wasteLocation}</td>
                <td className="p-3 border">{report.wasteType}</td>
                <td className="p-3 border">{report.wasteWeight}</td>
                <td className="p-3 border">{report.customerName}</td>
                <td className="p-3 border">{report.reword}</td>
                <td className="p-3 border">
                  <button
                    onClick={() => handleUpdate(report)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleView(report)}
                    className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleDelete(report.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Update Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-md w-1/3">
            <h2 className="text-xl font-bold mb-4">Update Waste Report</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="wasteTitle"
                value={editReport.wasteTitle}
                onChange={handleChange}
                className="w-full p-2 border rounded mb-2"
                placeholder="Waste Title"
              />
              <input
                type="text"
                name="description"
                value={editReport.description}
                onChange={handleChange}
                className="w-full p-2 border rounded mb-2"
                placeholder="Description"
              />
              <input
                type="date"
                name="date"
                value={editReport.date}
                onChange={handleChange}
                className="w-full p-2 border rounded mb-2"
              />

              <div className="border-dashed border-2 border-gray-300 rounded-lg p-6 text-center mb-2">
                <input
                  type="file"
                  id="wasteImageUpload"
                  accept="image/*"
                  name="wasteImage"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <label
                  htmlFor="wasteImageUpload"
                  className="cursor-pointer flex flex-col items-center"
                >
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Waste"
                      className="w-60 h-40 object-cover rounded-md"
                    />
                  ) : (
                    <span className="text-gray-500">📷 Upload Waste Image</span>
                  )}
                </label>
              </div>

              <input
                type="text"
                name="wasteLocation"
                value={editReport.wasteLocation}
                onChange={handleChange}
                className="w-full p-2 border rounded mb-2"
                placeholder="Location"
              />
              <select
                name="wasteType"
                value={editReport.wasteType}
                onChange={handleChange}
                className="w-full p-2 border rounded mb-2"
              >
                <option value="Plastic">Plastic</option>
                <option value="Paper">Paper</option>
                <option value="Metal">Metal</option>
                <option value="Organic">Organic</option>
              </select>
              <input
                type="number"
                name="wasteWeight"
                value={editReport.wasteWeight}
                onChange={handleChange}
                className="w-full p-2 border rounded mb-2"
                placeholder="Estimated Amount (kg)"
              />
              <input
                type="text"
                name="customerName"
                value={editReport.customerName}
                onChange={handleChange}
                className="w-full p-2 border rounded mb-2"
                placeholder="Customer Name"
              />
              <input
                type="number"
                name="reword"
                value={editReport.reword}
                onChange={handleChange}
                className="w-full p-2 border rounded mb-2"
                placeholder="💰 Points"
              />

              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded w-full"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="mt-2 bg-gray-500 text-white px-4 py-2 rounded w-full"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {/* View Modal */}
      {viewModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-md w-1/3">
            <h2 className="text-xl font-bold mb-4">View Waste Report</h2>
            <div>
              <h3 className="font-semibold">Waste Title: {reportDetails.wasteTitle}</h3>
              <p><strong>Description:</strong> {reportDetails.description}</p>
              <p><strong>Date:</strong> {reportDetails.date}</p>
              <p><strong>Location:</strong> {reportDetails.wasteLocation}</p>
              <p><strong>Weight:</strong> {reportDetails.wasteWeight} kg</p>
              <p><strong>Customer:</strong> {reportDetails.customerName}</p>
              <p><strong>Reward:</strong> {reportDetails.reword} Points</p>
              {reportDetails.wasteImage && (
                <img
                  src={`data:image/jpeg;base64,${reportDetails.wasteImage}`}
                  alt="Waste"
                  className="w-60 h-40 object-cover rounded-md mt-4"
                />
              )}
              <button
                onClick={() => setViewModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded mt-4 w-full"
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