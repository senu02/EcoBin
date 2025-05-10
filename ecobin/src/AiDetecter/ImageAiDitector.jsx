import React, { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import * as tmImage from '@teachablemachine/image';

const WasteDetectorApp = () => {
  const webcamRef = useRef(null);
  const fileInputRef = useRef(null);
  const [model, setModel] = useState(null);
  const [label, setLabel] = useState('');
  const [probability, setProbability] = useState('');
  const [image, setImage] = useState(null);
  const [isWebcamActive, setIsWebcamActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [detectionHistory, setDetectionHistory] = useState([]);
  const [activeTab, setActiveTab] = useState('detector');
  const [isAnimating, setIsAnimating] = useState(false);

  const MODEL_URL = process.env.PUBLIC_URL + "/model/";

  // Load the Teachable Machine model
  useEffect(() => {
    const loadModel = async () => {
      try {
        setIsLoading(true);
        const loadedModel = await tmImage.load(MODEL_URL + "model.json", MODEL_URL + "metadata.json");
        setModel(loadedModel);
      } catch (error) {
        console.error("Error loading model:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadModel();
  }, []);

  // Detect waste type from image or webcam frame
  const detectWaste = async (source) => {
    if (!model) return;

    try {
      setIsAnimating(true);
      const predictions = await model.predict(source);
      const bestPrediction = predictions.reduce((prev, curr) => 
        prev.probability > curr.probability ? prev : curr
      );
      
      setLabel(bestPrediction.className);
      setProbability((bestPrediction.probability * 100).toFixed(2));

      // Add to detection history
      const newDetection = {
        label: bestPrediction.className,
        probability: (bestPrediction.probability * 100).toFixed(2),
        timestamp: new Date().toLocaleTimeString(),
        image: source instanceof HTMLImageElement ? source.src : null
      };
      
      setDetectionHistory(prev => [newDetection, ...prev.slice(0, 9)]);

      // Send to backend if confidence is high
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
    } catch (error) {
      console.error("Detection error:", error);
    } finally {
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  // Handle webcam frame capture
  useEffect(() => {
    let intervalId;

    if (isWebcamActive && model) {
      intervalId = setInterval(() => {
        if (webcamRef.current?.video?.readyState === 4) {
          detectWaste(webcamRef.current.video);
        }
      }, 1500);
    }

    return () => clearInterval(intervalId);
  }, [isWebcamActive, model]);

  // Handle image upload
  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imgUrl = URL.createObjectURL(file);
      setImage(imgUrl);
      const imgElement = new Image();
      imgElement.src = imgUrl;
      imgElement.onload = () => detectWaste(imgElement);
    }
  };

  // Toggle webcam on/off
  const toggleWebcam = () => {
    setIsWebcamActive(!isWebcamActive);
    if (!isWebcamActive) {
      setLabel('');
      setProbability('');
      setImage(null);
    }
  };

  // Get color based on waste type
  const getWasteColor = (wasteType) => {
    if (!wasteType) return 'gray';
    const type = wasteType.toLowerCase();
    if (type.includes('recyclable')) return 'green';
    if (type.includes('hazardous')) return 'red';
    if (type.includes('organic')) return 'amber';
    if (type.includes('plastic')) return 'blue';
    return 'indigo';
  };

  // Clear current detection
  const clearDetection = () => {
    setLabel('');
    setProbability('');
    setImage(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600 mb-3">
            EcoVision AI
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Smart waste classification using machine learning
          </p>
        </header>

        {/* Main Content */}
        <main className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Navigation Tabs */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('detector')}
              className={`flex-1 py-4 px-6 font-medium text-sm focus:outline-none transition-colors ${
                activeTab === 'detector' 
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Waste Detector
              </div>
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`flex-1 py-4 px-6 font-medium text-sm focus:outline-none transition-colors ${
                activeTab === 'history' 
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Detection History
              </div>
            </button>
          </div>

          {/* Content Area */}
          <div className="p-6 md:p-8">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-16">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-4"></div>
                <p className="text-gray-600">Loading AI model...</p>
              </div>
            ) : activeTab === 'detector' ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column - Input Methods */}
                <div className="space-y-6">
                  {/* Webcam Section */}
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      Live Camera Detection
                    </h2>
                    
                    {isWebcamActive ? (
                      <div className="relative">
                        <Webcam
                          ref={webcamRef}
                          audio={false}
                          screenshotFormat="image/jpeg"
                          className="rounded-lg shadow-md w-full h-64 object-cover border-2 border-blue-200"
                        />
                        {label && (
                          <div className={`absolute bottom-4 left-4 bg-${getWasteColor(label)}-600 text-white px-3 py-1 rounded-lg text-sm animate-pulse`}>
                            Detecting: {label}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="bg-gray-200 rounded-lg w-full h-64 flex items-center justify-center text-gray-500">
                        <p>Camera is currently off</p>
                      </div>
                    )}
                    
                    <button
                      onClick={toggleWebcam}
                      className={`mt-4 w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg ${
                        isWebcamActive 
                          ? 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700'
                          : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700'
                      }`}
                    >
                      {isWebcamActive ? (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Stop Camera
                        </>
                      ) : (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                          Start Camera
                        </>
                      )}
                    </button>
                  </div>

                  {/* Image Upload Section */}
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Image Upload
                    </h2>
                    
                    <input 
                      ref={fileInputRef} 
                      type="file" 
                      accept="image/*" 
                      onChange={handleUpload} 
                      className="hidden" 
                    />
                    
                    <button
                      onClick={() => fileInputRef.current.click()}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      Choose Image File
                    </button>
                    
                    {image && (
                      <div className="mt-4">
                        <div className="flex justify-between items-center mb-2">
                          <p className="text-sm font-medium text-gray-700">Selected Image</p>
                          <button 
                            onClick={clearDetection}
                            className="text-sm text-red-500 hover:text-red-700"
                          >
                            Clear
                          </button>
                        </div>
                        <img
                          src={image}
                          alt="Uploaded waste"
                          className="w-full h-48 object-contain rounded-lg shadow-sm border border-gray-200"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Column - Results */}
                <div className="space-y-6">
                  {/* Detection Results */}
                  <div className={`bg-gradient-to-br from-${getWasteColor(label)}-50 to-${getWasteColor(label)}-100 rounded-xl p-6 border border-${getWasteColor(label)}-200 transition-all duration-500 ${isAnimating ? 'animate-pulse' : ''}`}>
                    <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      Detection Results
                    </h2>
                    
                    {label ? (
                      <div className="space-y-6">
                        <div>
                          <p className="text-sm font-medium text-gray-600 mb-1">Waste Type</p>
                          <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-${getWasteColor(label)}-100 text-${getWasteColor(label)}-800`}>
                            {label}
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium text-gray-600 mb-2">Confidence Level</p>
                          <div className="flex items-center gap-3">
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div 
                                className={`bg-gradient-to-r from-${getWasteColor(label)}-400 to-${getWasteColor(label)}-600 h-2.5 rounded-full`} 
                                style={{ width: `${probability}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium text-gray-700">{probability}%</span>
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium text-gray-600 mb-2">Disposal Guidance</p>
                          <div className={`p-4 rounded-lg bg-${getWasteColor(label)}-50 border border-${getWasteColor(label)}-200`}>
                            {label.toLowerCase().includes('recyclable') ? (
                              <p className="text-gray-700">This item should be placed in the recycling bin. Make sure it's clean and dry.</p>
                            ) : label.toLowerCase().includes('hazardous') ? (
                              <p className="text-gray-700">This is hazardous waste. Please dispose at a designated hazardous waste facility.</p>
                            ) : label.toLowerCase().includes('organic') ? (
                              <p className="text-gray-700">This is organic waste. It can be composted or placed in organic waste bins.</p>
                            ) : (
                              <p className="text-gray-700">Please dispose in general waste unless local guidelines specify otherwise.</p>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="mt-3 text-gray-500">No detection yet. Upload an image or enable the camera.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              /* History Tab */
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Detection History</h2>
                
                {detectionHistory.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {detectionHistory.map((item, index) => (
                      <div 
                        key={index} 
                        className={`bg-white rounded-lg shadow-md overflow-hidden border-l-4 border-${getWasteColor(item.label)}-500 hover:shadow-lg transition-shadow duration-300`}
                      >
                        {item.image && (
                          <img 
                            src={item.image} 
                            alt="Detection" 
                            className="w-full h-40 object-cover"
                          />
                        )}
                        <div className="p-4">
                          <div className="flex justify-between items-start">
                            <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full bg-${getWasteColor(item.label)}-100 text-${getWasteColor(item.label)}-800`}>
                              {item.label}
                            </span>
                            <span className="text-xs text-gray-500">{item.timestamp}</span>
                          </div>
                          <div className="mt-3">
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-600">Confidence:</span>
                              <span className="font-medium">{item.probability}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                              <div 
                                className={`bg-${getWasteColor(item.label)}-500 h-1.5 rounded-full`}
                                style={{ width: `${item.probability}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="mt-4 text-lg font-medium text-gray-700">No detection history yet</h3>
                    <p className="mt-1 text-gray-500">Start detecting waste to see your history here.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-12 text-center text-sm text-gray-500">
          <p>EcoVision AI - Helping you sort waste responsibly</p>
        </footer>
      </div>
    </div>
  );
};

export default WasteDetectorApp;