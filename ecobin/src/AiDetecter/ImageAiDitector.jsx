import React, { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import * as tmImage from '@teachablemachine/image';

const ImageAiDitector = () => {
  const webcamRef = useRef(null); // Reference for accessing the webcam
  const fileInputRef = useRef(null); // Reference for accessing file input
  const [model, setModel] = useState(null); // Stores the Teachable Machine model
  const [label, setLabel] = useState(''); // Detected label
  const [probability, setProbability] = useState(''); // Confidence score
  const [image, setImage] = useState(null); // Uploaded image
  const [isWebcamActive, setIsWebcamActive] = useState(false); // Webcam toggle state

  const MODEL_URL = process.env.PUBLIC_URL + "/model/";

  useEffect(() => {
    // Load the machine learning model when the component mounts
    const loadModel = async () => {
      const loadedModel = await tmImage.load(MODEL_URL + "model.json", MODEL_URL + "metadata.json");
      setModel(loadedModel);
      console.log("Model Loaded");
    };
    loadModel();
  }, []);

  const detectWaste = async (source) => {
    if (model) {
      // Run prediction on the given image or video frame
      const predictions = await model.predict(source);
      const bestPrediction = predictions.reduce((prev, curr) =>
        prev.probability > curr.probability ? prev : curr);
      setLabel(bestPrediction.className);
      setProbability((bestPrediction.probability * 100).toFixed(2));

      // Send data to the backend if confidence is high
      if (bestPrediction.probability > 0.7) {
        await fetch('http://localhost:8080/public/detections', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            objectType: bestPrediction.className,
            confidence: bestPrediction.probability,
            timestamp: new Date().toISOString(),
          }),
        });
      }
    }
  };

  useEffect(() => {
    let intervalId;

    if (isWebcamActive && model) {
      // Capture webcam frames every second for real-time detection
      intervalId = setInterval(() => {
        if (webcamRef.current && webcamRef.current.video.readyState === 4) {
          detectWaste(webcamRef.current.video);
        }
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isWebcamActive, model]);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Convert uploaded image to a usable format and classify it
      const img = URL.createObjectURL(file);
      setImage(img);
      const imgElement = new Image();
      imgElement.src = img;
      imgElement.onload = () => detectWaste(imgElement);
    }
  };

  const toggleWebcam = () => {
    setIsWebcamActive(!isWebcamActive);
    setLabel('');
    setProbability('');
  };

  return (
    <div className="flex flex-col items-center p-8 bg-gray-50 rounded-xl shadow-xl max-w-xl mx-auto">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Waste Type Detector</h1>

      {/* Webcam */}
      {isWebcamActive && (
        <div className="w-full flex flex-col items-center mb-6">
          <Webcam
            ref={webcamRef}
            audio={false}
            screenshotFormat="image/jpeg"
            className="rounded-lg shadow-lg w-full h-[300px] mb-4"
          />
          <p className="text-gray-600">Real-time detection active...</p>
        </div>
      )}

      {/* Image Upload */}
      <div className="mb-6">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleUpload}
          className="hidden"
        />
        <button
          onClick={() => fileInputRef.current.click()}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Upload Image
        </button>
      </div>

      {/* Webcam Toggle */}
      <button
        onClick={toggleWebcam}
        className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition duration-200"
      >
        {isWebcamActive ? 'Close Webcam' : 'Open Webcam'}
      </button>

      {/* Detection Result */}
      {label && (
        <div className="mt-6 text-lg text-center">
          <p className="text-xl text-blue-700 font-semibold">Detected: <strong>{label}</strong></p>
          <p className="text-gray-700">Confidence: <strong>{probability}%</strong></p>
        </div>
      )}

      {/* Display uploaded image */}
      {image && (
        <div className="mt-6">
          <img
            src={image}
            alt="Uploaded"
            className="w-[150px] h-[150px] object-cover rounded-lg shadow-lg mx-auto"
          />
        </div>
      )}
    </div>
  );
};

export default ImageAiDitector;
