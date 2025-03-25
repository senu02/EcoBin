import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import { Link } from "react-router-dom";
import logo from "../Home/images/Logo.png";
import UserService from "../Home/UserService";
import QRCode from "qrcode";

function CollectionScheduleGenerateReport() {
    const [collectionSchedule, setCollectionSchedule] = useState([]);
    const [loading, setLoading] = useState(true);
    const [qrCodeDataURL, setQRCodeDataURL] = useState("");

    useEffect(() => {
        setTimeout(() => {
            loadSchedule();
            generateQRCode();
        }, 1500);
    }, []);

    const loadSchedule = async () => {
        try {
            const result = await axios.get(`${UserService.BASE_URL}/public/getAllSchedule`);
            setCollectionSchedule(result.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false);
        }
    };

    const generateQRCode = async () => {
        try {
            // You can customize what data to include in the QR code
            const qrData = `WasteTrack Collection Schedule Report\nGenerated on: ${new Date().toLocaleString()}`;
            const url = await QRCode.toDataURL(qrData, {
                width: 150,
                margin: 2,
                color: {
                    dark: '#000000',  // Black dots
                    light: '#ffffff' // White background
                }
            });
            setQRCodeDataURL(url);
        } catch (err) {
            console.error("Error generating QR code:", err);
        }
    };

    const generatePDF = () => {
        const doc = new jsPDF();
        const currentDateTime = new Date().toLocaleString();

        // Load image asynchronously
        const img = new Image();
        img.src = logo;

        img.onload = async () => {
            // Add Logo
            doc.addImage(img, "PNG", 75, 5, 60, 20);

            // Report Title
            doc.setFontSize(20);
            doc.setTextColor(34, 139, 34);
            doc.text("Waste Collection Schedule Report", 14, 35);

            // Date and Time
            doc.setFontSize(12);
            doc.setTextColor(0, 0, 0);
            doc.text(`Generated on: ${currentDateTime}`, 14, 45);

            let yPosition = 60; // Start position for text

            collectionSchedule.forEach((schedule, index) => {
                doc.setFontSize(14);
                doc.setTextColor(0, 0, 128);
                doc.text(`Schedule ${index + 1}`, 14, yPosition);

                doc.setFontSize(12);
                doc.setTextColor(0, 0, 0);
                doc.text(`Truck ID: ${schedule.id}`, 14, yPosition + 8);
                doc.text(`Driver Name: ${schedule.driverName}`, 14, yPosition + 16);
                doc.text(`Waste Type: ${schedule.wasteType}`, 14, yPosition + 24);
                doc.text(`Collection Date: ${schedule.collectionDate}`, 14, yPosition + 32);
                doc.text(`Status: ${schedule.status}`, 14, yPosition + 40);

                yPosition += 55;

                if (yPosition > 270) {
                    doc.addPage();
                    yPosition = 20;
                }
            });

            // Add QR Code to the PDF
            if (qrCodeDataURL) {
                // Position the QR code at the bottom right
                const qrSize = 40;
                const pageWidth = doc.internal.pageSize.getWidth();
                doc.addImage(qrCodeDataURL, 'PNG', pageWidth - qrSize - 20, yPosition + 20, qrSize, qrSize);
                doc.setFontSize(10);
                doc.text("Scan to verify this report", pageWidth - qrSize - 20, yPosition + 20 + qrSize + 5);
            }

            // Signature Space
            doc.text("Signature: __________________", 14, yPosition + 20);

            // Save PDF
            doc.save("Collection_Schedule_Report.pdf");
        };
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-8">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
                {/* Logo */}
                <div className="flex justify-center mb-6">
                    <img src={logo} alt="WasteTrack Logo" className="h-28 w-28 object-contain" />
                </div>

                <h1 className="text-4xl font-extrabold text-center text-green-700 mb-4">
                    Waste Collection Schedule Report
                </h1>

                <p className="text-gray-600 text-center text-lg mb-6">
                    Stay informed with the latest collection schedules and waste management updates.
                </p>

                {loading ? (
                    <p className="text-center text-gray-500 text-lg animate-pulse">
                        Fetching data... Please wait ⏳
                    </p>
                ) : (
                    <>
                        <button
                            onClick={generatePDF}
                            className="w-full bg-green-600 text-white text-lg font-semibold p-4 rounded-xl 
                            shadow-md hover:bg-green-700 transition-all duration-300 transform hover:scale-105"
                        >
                            📄 Download PDF Report
                        </button>

                        <div className="mt-8 space-y-6">
                            {collectionSchedule.map((schedule, index) => (
                                <div key={schedule.id} className="bg-white p-5 rounded-xl shadow-md border-l-8 border-green-500">
                                    <h2 className="text-xl font-semibold text-green-700">🚛 Schedule {index + 1}</h2>
                                    <p className="text-gray-700"><strong>Truck ID:</strong> {schedule.id}</p>
                                    <p className="text-gray-700"><strong>Driver Name:</strong> {schedule.driverName}</p>
                                    <p className="text-gray-700"><strong>Waste Type:</strong> {schedule.wasteType}</p>
                                    <p className="text-gray-700"><strong>Collection Date:</strong> {schedule.collectionDate}</p>
                                    <p className="text-gray-700"><strong>Status:</strong> 
                                        <span className={`ml-2 px-2 py-1 rounded-full text-sm 
                                            ${schedule.status === "Completed" ? "bg-green-200 text-green-800" : 
                                            schedule.status === "Pending" ? "bg-yellow-200 text-yellow-800" : 
                                            "bg-red-200 text-red-800"}`}>
                                            {schedule.status}
                                        </span>
                                    </p>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                <Link to="/WasteTrackDashboard" 
                    className="block text-center mt-6 text-green-700 font-semibold text-lg hover:text-green-900 transition">
                    ⬅️ Back to Dashboard
                </Link>
            </div>
        </div>
    );
}

export default CollectionScheduleGenerateReport;