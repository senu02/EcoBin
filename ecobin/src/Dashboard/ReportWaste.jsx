import React, { useEffect, useState } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import logo from "../Home/images/Logo.png"; // Update path if needed

const AutoGenerateReport = () => {
  const [wasteReports, setWasteReports] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/public/getAllReport")
      .then((response) => {
        setWasteReports(response.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const filteredReports = wasteReports.filter((report) =>
    report.wasteTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const downloadReport = (report) => {
    const doc = new jsPDF();

    // Add company logo
    doc.addImage(logo, "PNG", 10, 10, 40, 20);

    // Add company details
    doc.setFontSize(14);
    doc.text("Eco Waste Management Solutions", 60, 15);
    doc.setFontSize(10);
    doc.text("123 Green Street, Cityville, Earth - 12345", 60, 22);
    doc.text("Email: support@ecowaste.com | Phone: +123-456-7890", 60, 28);

    // Report Title (Auto-Assigned)
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Waste Management Report", 20, 50);
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");

    let yPosition = 65;

    // Report Details
    doc.text(`Report ID: ${report.id}`, 20, yPosition);
    yPosition += 10;
    doc.text(`Title: ${report.wasteTitle}`, 20, yPosition);
    yPosition += 10;
    doc.text(`Description: ${report.description}`, 20, yPosition);
    yPosition += 10;
    doc.text(`Date: ${report.date}`, 20, yPosition);
    yPosition += 10;
    doc.text(`Location: ${report.wasteLocation}`, 20, yPosition);
    yPosition += 10;
    doc.text(`Weight: ${report.wasteWeight} kg`, 20, yPosition);
    yPosition += 20;

    // Signature Section
    doc.setLineWidth(0.5);
    doc.line(20, yPosition, 80, yPosition); // Line for signature
    doc.text("Authorized Signature", 20, yPosition + 8);

    // Save the PDF
    doc.save(`WasteReport_${report.id}.pdf`);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white text-black p-4 shadow-lg">
        <h1 className="text-lg font-bold flex items-center space-x-2">
          ♻ <span>WasteTrack</span>
        </h1>
        <nav className="mt-4 space-y-3">
          <a
            href="/WasteManagementDashboard"
            className="block p-2 bg-green-600 text-white rounded-md shadow-md text-sm hover:bg-green-700 transition"
          >
            📊 Dashboard
          </a>
          <a
            href="/AnalyzePage"
            className="block p-2 rounded-md shadow-md text-sm hover:bg-green-600 hover:text-white transition"
          >
            📶 Analyze
          </a>
          <a
            href="/Leaderboard"
            className="block p-2 rounded-md shadow-md text-sm hover:bg-green-600 hover:text-white transition"
          >
            🏆 Rewards
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Waste Reports</h1>

        {/* Search Bar */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by Waste Title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 border border-gray-300 rounded-md w-full text-sm focus:ring-2 focus:ring-green-400 outline-none"
          />
        </div>

        {/* Stacked Small Cards Layout */}
        <div className="space-y-4">
          {filteredReports.map((report) => (
            <div
              key={report.id}
              className="bg-white shadow-md rounded-md p-3 border-l-4 border-green-500 hover:shadow-lg transition text-sm"
            >
              <div className="flex justify-between items-center">
                <h2 className="font-semibold text-gray-800 text-sm">
                  {report.wasteTitle}
                </h2>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                  {report.date}
                </span>
              </div>

              <p className="text-gray-600 mt-1">
                <strong>Description:</strong> {report.description}
              </p>
              <p className="text-gray-600 mt-1">
                <strong>Location:</strong> {report.wasteLocation}
              </p>
              <p className="text-gray-600 mt-1">
                <strong>Weight:</strong> {report.wasteWeight} kg
              </p>

              {/* Download Report Button */}
              <div className="mt-3">
                <button
                  onClick={() => downloadReport(report)}
                  className="bg-green-500 text-white px-3 py-1 rounded-md shadow-md text-xs hover:bg-green-600 transition"
                >
                  📥 Download Report
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Data Message */}
        {filteredReports.length === 0 && (
          <p className="text-center text-gray-500 mt-6 text-sm">
            No waste reports found.
          </p>
        )}
      </div>
    </div>
  );
};

export default AutoGenerateReport;
