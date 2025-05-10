import { useNavigate } from "react-router-dom";

const AiNavigateDitector = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-4">
          Waste Collection System
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          Efficient waste detection and classification for a cleaner environment
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        {/* Image Detection Button */}
        <div 
          className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer"
          onClick={() => navigate("/imageDitector")}
        >
          <div className="p-6 flex flex-col items-center">
            <div className="bg-green-100 p-5 rounded-full mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Image Detection
            </h2>
            <p className="text-gray-500 text-center mb-4">
              Upload an image to detect and classify waste materials
            </p>
            <button className="px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors">
              Select Image
            </button>
          </div>
        </div>

        {/* Camera Detection Button */}
        <div 
          className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer"
          onClick={() => navigate("/aidetector")}
        >
          <div className="p-6 flex flex-col items-center">
            <div className="bg-blue-100 p-5 rounded-full mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Camera Detection
            </h2>
            <p className="text-gray-500 text-center mb-4">
              Use your camera to detect waste in real-time
            </p>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
              Open Camera
            </button>
          </div>
        </div>
      </div>

      <footer className="mt-16 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} Waste Collection System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AiNavigateDitector;