import React, { useEffect, useState } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import QRCode from "qrcode"; // Import QRCode library
import logo from "../Home/images/Logo.png"; // Update path if needed
import UserService from "../Home/UserService";
import { FaShareAlt, FaEnvelope, FaLink } from "react-icons/fa"; // Icons for sharing

const AutoGenerateReport = () => {
  const [wasteReports, setWasteReports] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios
      .get(`${UserService.BASE_URL}/public/getAllReport`)
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

  // Function to generate and download QR code with waste details
  const generateQRCode = (report) => {
    // Create a string with only the essential waste details
    const wasteDetails = `Report ID: ${report.id}
Title: ${report.wasteTitle}
Description: ${report.description}
Date: ${report.date}
Location: ${report.wasteLocation}
Weight: ${report.wasteWeight} kg`;

    // Generate QR code as a data URL
    QRCode.toDataURL(wasteDetails, { width: 300, margin: 2 }, (err, url) => {
      if (err) {
        console.error("Error generating QR code:", err);
        return;
      }

      // Create a temporary link to trigger the download
      const link = document.createElement("a");
      link.href = url;
      link.download = `QRCode_${report.id}.png`; // File name for download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

  // Function to share waste details
  const shareWasteDetails = (report) => {
    // Create a string with the waste details
    const wasteDetails = `
      Waste Details
      -------------
      Title: ${report.wasteTitle}
      Description: ${report.description}
      Date: ${report.date}
      Location: ${report.wasteLocation}
      Weight: ${report.wasteWeight} kg
    `;

    if (navigator.share) {
      // Use the Web Share API if available (for mobile devices)
      navigator
        .share({
          title: `Waste Details: ${report.wasteTitle}`,
          text: wasteDetails,
        })
        .then(() => console.log("Shared successfully"))
        .catch((error) => console.error("Error sharing:", error));
    } else {
      // Fallback for desktop or unsupported browsers
      alert(`Waste Details:\n${wasteDetails}`);
    }
  };

  // Function to copy waste details to clipboard
  const copyWasteDetails = (report) => {
    // Create a string with the waste details
    const wasteDetails = `
      Waste Details
      -------------
      Title: ${report.wasteTitle}
      Description: ${report.description}
      Date: ${report.date}
      Location: ${report.wasteLocation}
      Weight: ${report.wasteWeight} kg
    `;

    navigator.clipboard
      .writeText(wasteDetails)
      .then(() => alert("Waste details copied to clipboard!"))
      .catch((error) => console.error("Error copying details:", error));
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
      className="bg-gradient-to-r from-emerald-500 to-teal-700 text-white shadow-md rounded-md p-3 border-l-4 border-emerald-300 hover:shadow-lg transition text-sm"
    >
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-white text-sm">{report.wasteTitle}</h2>
        <span className="text-xs bg-white text-emerald-700 px-2 py-1 rounded-full">
          {report.date}
        </span>
      </div>

      <p className="text-gray-100 mt-1">
        <strong>Description:</strong> {report.description}
      </p>
      <p className="text-gray-100 mt-1">
        <strong>Location:</strong> {report.wasteLocation}
      </p>
      <p className="text-gray-100 mt-1">
        <strong>Weight:</strong> {report.wasteWeight} kg
      </p>

              {/* Download Report Button */}
              <div className="mt-3 flex space-x-2">
                <button
                  onClick={() => downloadReport(report)}
                  className="bg-green-500 text-white px-3 py-1 rounded-md shadow-md text-xs hover:bg-green-600 transition"
                >
                  📥 Download Report
                </button>

                {/* Generate QR Code Button */}
                <button
                  onClick={() => generateQRCode(report)}
                  className="bg-blue-500 text-white px-3 py-1 rounded-md shadow-md text-xs hover:bg-blue-600 transition"
                >
                  📲 Generate QR Code
                </button>

                {/* Share Waste Details Button */}
                <button
                  onClick={() => shareWasteDetails(report)}
                  className="bg-purple-500 text-white px-3 py-1 rounded-md shadow-md text-xs hover:bg-purple-600 transition"
                >
                  <FaShareAlt className="inline-block" /> Share Details
                </button>

                {/* Copy Waste Details Button */}
                <button
                  onClick={() => copyWasteDetails(report)}
                  className="bg-gray-500 text-white px-3 py-1 rounded-md shadow-md text-xs hover:bg-gray-600 transition"
                >
                  <FaLink className="inline-block" /> Copy Details
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