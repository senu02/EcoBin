import React from 'react';
import profilePhoto from '../Home/images/Premium Vector _ Young man Face Avater Vector illustration design.jpeg'; // Import profile photo
import coverPhoto from '../Home/images/p1.jpeg'; // Import cover photo

const ProfileHeader = () => {

  const name = localStorage.getItem('name');
    const email = localStorage.getItem('email');
    const gender = localStorage.getItem('gender');
    const age = localStorage.getItem('age');
    const role = localStorage.getItem('role');

  return (
    <div className="bg-white rounded-lg shadow-md max-w-2xl mx-auto overflow-hidden">
      {/* Cover Photo */}
      <div className="relative h-40">
        <img
          src={coverPhoto}
          alt="Cover"
          className="w-full h-full object-cover"
        />
        {/* Profile Photo */}
        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
          <img
            src={profilePhoto}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-white"
          />
        </div>
      </div>

      {/* Profile Header */}
      <div className="text-center mt-16">
        <h1 className="text-3xl font-bold text-gray-800 uppercase">{name}</h1>
        
        {/* Age, Gender, and Email */}
        <div className="mt-4 space-y-1">
          <p className="text-gray-600">
            <span className="font-semibold">Age:</span> {age}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Gender:</span>{gender}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Email:</span> {email}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4 mt-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
          Edit Profile
        </button>
        <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition duration-300">
          Settings
        </button>
      </div>

      {/* Waste Pickup Details Section */}
      <div className="mt-6 px-6">
        <h2 className="text-xl font-semibold text-gray-800">Waste Pickup Details</h2>
        <div className="mt-2 bg-gray-100 p-4 rounded-lg">
          <p className="text-gray-700">
            <span className="font-semibold">Scheduled Pickup:</span> Every Monday & Thursday
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Next Pickup Date:</span> March 21, 2025
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Pickup Location:</span> 123 Green Street, Eco City
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Status:</span> Confirmed
          </p>
        </div>
      </div>

      {/* Update Reminder */}
      <div className="mt-6 bg-yellow-100 p-4 rounded-lg mx-6 mb-6">
        <p className="text-yellow-700 font-semibold">Update</p>
        <p className="text-yellow-600 text-sm">
          Keep your profile updated so that recruiters know you better.
        </p>
      </div>
    </div>
  );
};

export default ProfileHeader;