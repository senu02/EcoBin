import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const CollectionScheduleView = () => {
  let navigate = useNavigate();
  const { id } = useParams();

  const [collectionSchedule, setCollectionSchedule] = useState(null);

  useEffect(() => {
    if (id) {
      loadSchedule();
    }
  }, [id]);

  const loadSchedule = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/public/getById/${id}`);
      console.log("Fetched Data:", result.data);
      setCollectionSchedule(result.data);
    } catch (error) {
      console.error("Error fetching schedule:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50">
      {/* Collection Schedule Section */}
      <section className="w-full max-w-5xl bg-white p-10 rounded-3xl shadow-2xl border border-gray-300">
        <div className="text-center">
          <h2 className="text-5xl font-extrabold  text-black ">
            Waste Collection Schedule 🍃
          </h2>
          <p className="text-lg mt-3 text-gray-700 italic">
            Stay updated with your waste collection schedule.
          </p>
        </div>

        <div className="mt-10">
          {collectionSchedule ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Image Box with Green Gradient */}
              <div className="bg-gradient-to-br from-green-200 to-green-400 p-6 rounded-xl shadow-lg flex flex-col items-center border border-green-500">
                {/* Truck Image Label with Leaf Icon */}
                <p className="text-2xl font-semibold text-white mb-4 flex items-center">
                  <span className="mr-2">📸</span>Truck Image
                </p>

                {collectionSchedule.truckImage ? (
                  <img
                    src={`data:image/jpeg;base64,${collectionSchedule.truckImage}`}
                    alt="Garbage Truck"
                    className="w-full h-96 object-cover rounded-lg shadow-md"
                  />
                ) : (
                  <p className="text-gray-500">No Image Available</p>
                )}
              </div>

              {/* Collection Details Box with Hover Effect */}
              <div className="bg-gradient-to-br from-green-200 to-green-400 p-8 rounded-xl shadow-lg border border-green-500 ">
                <h3 className="text-4xl font-extrabold text-black   mb-6 text-center flex items-center justify-center">
                  <span className="mr-2">📋</span>Collection Details
                </h3>
                <div className="space-y-5">
                  {/* Hoverable Collection Details Row */}
                  <div className="flex justify-between border-b border-white/50 pb-2 hover:bg-green-600 p-2 rounded-lg transition-all cursor-pointer">
                    <span className="text-xl font-semibold">🚛 Driver Name:</span>
                    <span className="text-lg">{collectionSchedule.driverName}</span>
                  </div>

                  <div className="flex justify-between border-b border-white/50 pb-2 hover:bg-green-600 p-2 rounded-lg transition-all cursor-pointer">
                    <span className="text-xl font-semibold">♻ Waste Type:</span>
                    <span className="text-lg">{collectionSchedule.wasteType}</span>
                  </div>

                  <div className="flex justify-between border-b border-white/50 pb-2 hover:bg-green-600 p-2 rounded-lg transition-all cursor-pointer">
                    <span className="text-xl font-semibold">📅 Collection Date:</span>
                    <span className="text-lg">{collectionSchedule.collectionDate}</span>
                  </div>

                  <div className="flex justify-between border-b border-white/50 pb-2 hover:bg-green-600 p-2 rounded-lg transition-all cursor-pointer">
                    <span className="text-xl font-semibold">📍 Location:</span>
                    <span className="text-lg">{collectionSchedule.location}</span>
                  </div>

                  <div className="flex justify-between border-b border-white/50 pb-2 hover:bg-green-600 p-2 rounded-lg transition-all cursor-pointer">
                    <span className="text-xl font-semibold">✅ Status:</span>
                    <span className="text-lg">{collectionSchedule.status}</span>
                  </div>

                  <div className="flex justify-between hover:bg-green-600 p-2 rounded-lg transition-all cursor-pointer">
                    <span className="text-xl font-semibold">📝 Remark:</span>
                    <span className="text-lg">{collectionSchedule.remark}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-xl text-red-600 text-center">Loading schedule or no data found...</p>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-700 py-4 text-center text-white mt-10 w-full rounded-t-3xl shadow-md">
        <p>&copy; 2025 Smart Waste Collection System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default CollectionScheduleView;
