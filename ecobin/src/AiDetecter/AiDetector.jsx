import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Webcam from "react-webcam";
import axios from "axios";
import { FaHome, FaUser, FaCog, FaQuestionCircle, FaSignOutAlt } from "react-icons/fa";
import logo from "../Home/images/Logo.png";

const AiDetector = () => {
  // Reference to the webcam component
  const webcamRef = useRef(null);
  
  // State for storing classification result, loading state, and bounding box data
  const [classification, setClassification] = useState("");
  const [loading, setLoading] = useState(false);
  const [boundingBox, setBoundingBox] = useState(null);

  useEffect(() => {
    // Sets up an interval to capture and classify images every 5 seconds
    const interval = setInterval(() => {
      captureAndClassify();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const captureAndClassify = async () => {
    // Capture an image from the webcam
    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) return;

    setLoading(true);
    try {
      // Send image to the classification API
      const response = await axios.post("http://localhost:8080/public/classify", { image: imageSrc });
      setClassification(response.data.result);
      setBoundingBox(response.data.boundingBox);
    } catch (error) {
      console.error("Classification failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">

      {/* Sidebar navigation */}
      <aside className="w-64 bg-gradient-to-b from-green-600 to-black p-6 text-white flex flex-col justify-between">
        <div>
          {/* Logo section */}
          <div className="flex justify-center mb-4">
            <div className="bg-white p-4 rounded-full">
              <img
                src={logo}
                alt="Waste Management Logo"
                className="w-20 h-20 object-contain"
              />
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="space-y-4">
            <Link to="/WasteManagementDashboard" className="flex items-center w-full text-left bg-white text-black p-2 rounded-md">
              <FaHome className="mr-2" />Admin Dashboard
            </Link>
            <Link to="/account" className="flex items-center w-full text-left bg-white text-black p-2 rounded-md">
              <FaUser className="mr-2" /> Your Account
            </Link>
            <Link to="/settings" className="flex items-center w-full text-left bg-white text-black p-2 rounded-md">
              <FaCog className="mr-2" /> Settings
            </Link>
            <Link to="/help" className="flex items-center w-full text-left bg-white text-black p-2 rounded-md">
              <FaQuestionCircle className="mr-2" /> Help
            </Link>
          </nav>
        </div>

        {/* Sign Out Button */}
        <button className="flex items-center bg-black text-white p-2 rounded-md">
          <FaSignOutAlt className="mr-2" /> Sign out
        </button>
      </aside>

      {/* Main Content Section */}
      <main className="flex-1 p-6 sm:p-10 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-6 text-center">Waste Classification</h1>

        <div className="relative">
          {/* Webcam feed display */}
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width="100%"
            videoConstraints={{
              facingMode: "environment",
            }}
            className="rounded-md shadow-lg"
          />

          {/* Bounding Box around detected objects */}
          {boundingBox && (
            <div
              className="absolute"
              style={{
                left: `${boundingBox.x}px`,
                top: `${boundingBox.y}px`,
                width: `${boundingBox.width}px`,
                height: `${boundingBox.height}px`,
                border: "2px solid red",
                pointerEvents: "none",
              }}
            />
          )}

          {/* Display classification result */}
          <div className="absolute bottom-0 w-full p-2 bg-opacity-60 bg-black text-white text-center">
            {loading ? <span>Classifying...</span> : classification && <div className="text-lg font-bold">Detected: {classification}</div>}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AiDetector;
