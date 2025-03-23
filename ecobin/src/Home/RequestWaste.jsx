import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserService from "./UserService";
import { FaUser, FaHome, FaPhone } from "react-icons/fa";
import { AiOutlineCheckCircle } from "react-icons/ai";
import image from "./images/r2.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesomeIcon
import { faFacebook, faTwitter, faLinkedin } from "@fortawesome/free-brands-svg-icons";



export default function WastePickupRequest() {
  let navigate = useNavigate();

  const [wasteRequest, setWasteRequest] = useState({
    name: "",
    address: "",
    mobile: "",
    wasteType: "",
    quantity: 1,
    frequencyPickup: "",
  });

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const { name, address, mobile, wasteType, quantity, frequencyPickup } = wasteRequest;

  
  useEffect(() => {
    const userName = localStorage.getItem('name');
    const userAddress = localStorage.getItem('address');
    
    
    setWasteRequest((prev) => ({
      ...prev,
      name: userName || '',
      address: userAddress || '',
    }));
  }, []);


  const onInputChange = (e) => {
    setWasteRequest({ ...wasteRequest, [e.target.name]: e.target.value });
  };


  const increaseQuantity = () => {
    setWasteRequest((prev) => ({ ...prev, quantity: prev.quantity + 1 }));
  };

  const decreaseQuantity = () => {
    setWasteRequest((prev) => ({
      ...prev,
      quantity: Math.max(1, prev.quantity - 1),
    }));
  };


  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${UserService.BASE_URL}/public/addRequest`, wasteRequest);
      setShowSuccessPopup(true); 
      setTimeout(() => {
        setShowSuccessPopup(false); 
        navigate("/"); 
      }, 3000);
    } catch (error) {
      console.error("Error submitting waste pickup request:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-green-50">
      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <div className="flex justify-center mb-4">
              <AiOutlineCheckCircle className="text-green-500 text-6xl" />
            </div>
            <h3 className="text-xl font-semibold text-center text-green-500">Request Added Successfully!</h3>
            <p className="text-center text-gray-600 mt-2">Your Request has been saved.</p>
          </div>
        </div>
      )}
<section className="max-w-5xl mx-auto py-12 px-4">
      <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
       

        {/* Middle: Content */}
        <div className="flex flex-col space-y-4 flex-1">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            On-request bin pick-up / <br />
            Emptying the bin on request
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Comfortable and top-notch quality service-oriented premises might welcome the opportunity to immediately respond to inquiries for a pick-up or delivery. The requests can be submitted via a mobile app or via request buttons. The requests, however, are not limited to waste only – they can support different kinds of areas – such as the delivery of office accessories, or refreshment.
          </p>
        </div>

        {/* Right Side: Image */}
        <div className="flex-shrink-0">
          <img
            src={image} // Use the imported image
            alt="On-request bin pick-up"
            className="w-90 h-80 object-cover rounded-lg shadow-lg" // Adjust size and styling as needed
          />
        </div>
      </div>
    </section>


      <section className="max-w-5xl mx-auto text-center py-12">
  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
    Key functionalities and <br /> benefits of our solution
  </h2>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {[
      { id: "01", text: "Automation of waste collection" },
      { id: "02", text: "Increased efficiency of collection (lower expenses)" },
      { id: "03", text: "Increased quality of ESG Reporting" },
      { id: "04", text: "Collector supervision (internal and external)" },
      { id: "05", text: "Waste infrastructure overview (floorplan bins, stands, vehicles)" },
      { id: "06", text: "Waste flow registration and tracking of the whole collection process" },
    ].map((item) => (
      <div key={item.id} className="flex items-center space-x-4">
        <span className="bg-green-100 text-green-600 font-bold text-lg px-4 py-2 rounded-lg">
          {item.id}
        </span>
        <p className="text-gray-700">{item.text}</p>
      </div>
    ))}
  </div>
</section>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold text-green-900">Waste Pickup Request Form</h1>
        </div>

        {/* Form */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <form className="space-y-6" onSubmit={onSubmit}>
            {/* Input Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full p-3 pl-10 border border-green-300 rounded-md focus:border-green-500 focus:ring-2 focus:ring-green-200"
                  name="name"
                  value={name}
                  onChange={onInputChange}
                  required
                />
                <FaUser className="absolute left-3 top-3.5 text-green-500" />
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Address"
                  className="w-full p-3 pl-10 border border-green-300 rounded-md focus:border-green-500 focus:ring-2 focus:ring-green-200"
                  name="address"
                  value={address}
                  onChange={onInputChange}
                  required
                />
                <FaHome className="absolute left-3 top-3.5 text-green-500" />
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Mobile Number"
                  className="w-full p-3 pl-10 border border-green-300 rounded-md focus:border-green-500 focus:ring-2 focus:ring-green-200"
                  name="mobile"
                  value={mobile}
                  onChange={onInputChange}
                  required
                />
                <FaPhone className="absolute left-3 top-3.5 text-green-500" />
              </div>
            </div>

            {/* Waste Type (Dropdown) */}
            <div className="relative">
              <label className="font-semibold text-green-900">Select Waste Type:</label>
              <select
                name="wasteType"
                value={wasteType}
                onChange={onInputChange}
                className="w-full p-3 border border-green-300 rounded-md focus:border-green-500 focus:ring-2 focus:ring-green-200 mt-2"
                required
              >
                <option value="" disabled>Select waste type</option>
                <option value="Organic Waste">Organic Waste</option>
                <option value="Recyclable Waste">Recyclable Waste</option>
                <option value="Hazardous Waste">Hazardous Waste</option>
                <option value="Electronic Waste">Electronic Waste</option>
                <option value="General Waste">General Waste</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Estimated Quantity */}
            <div className="flex items-center space-x-4">
              <label className="font-semibold text-green-900">Estimated Quantity:</label>
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  className="px-3 py-1 border border-green-300 rounded-md bg-green-200 text-green-900 hover:bg-green-300 transition-colors"
                  onClick={decreaseQuantity}
                >
                  -
                </button>
                <span className="text-lg font-semibold text-green-900">{quantity}</span>
                <button
                  type="button"
                  className="px-3 py-1 border border-green-300 rounded-md bg-green-200 text-green-900 hover:bg-green-300 transition-colors"
                  onClick={increaseQuantity}
                >
                  +
                </button>
              </div>
            </div>

            {/* Frequency of Pickup */}
            <fieldset className="border border-green-300 p-4 rounded-md">
              <legend className="font-semibold text-green-900 px-2">Frequency of Pickup</legend>
              <div className="mt-2 space-y-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="frequencyPickup"
                    value="One-Time"
                    checked={frequencyPickup === "One-Time"}
                    onChange={onInputChange}
                  />
                  <span className="text-green-900">One-Time Request</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="frequencyPickup"
                    value="Recurring"
                    checked={frequencyPickup === "Recurring"}
                    onChange={onInputChange}
                  />
                  <span className="text-green-900">
                    Recurring Request (Daily/Weekly/Monthly)
                  </span>
                </label>
              </div>
            </fieldset>

            <button className="w-full bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-all">
              Submit
            </button>
          </form>
        </div>
       
      </main>
       {/* Footer */}
       <footer className="bg-green-500 text-white py-12">
                <div className="container mx-auto px-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Quick Links */}
                    <div>
                      <h3 className="text-lg font-bold mb-4">Quick Links</h3>
                      <ul className="space-y-2">
                        <li><a href="#home" className="hover:text-green-500">Home</a></li>
                        <li><a href="#services" className="hover:text-green-500">Services</a></li>
                        <li><a href="#recycling" className="hover:text-green-500">Recycling</a></li>
                        <li><a href="#about" className="hover:text-green-500">About Us</a></li>
                        <li><a href="#contact" className="hover:text-green-500">Contact</a></li>
                      </ul>
                    </div>
        
                    {/* Contact Information */}
                    <div>
                      <h3 className="text-lg font-bold mb-4">Contact Us</h3>
                      <ul className="space-y-2">
                        <li>123 Waste Management St.</li>
                        <li>City, State, ZIP</li>
                        <li>Email: info@ecobin.com</li>
                        <li>Phone: +1 (123) 456-7890</li>
                      </ul>
                    </div>
        
                    {/* Social Media Links */}
                    <div>
                      <h3 className="text-lg font-bold mb-4">Follow Us</h3>
                      <ul className="flex space-x-4">
                        <li>
                          <a href="#" className="text-white hover:text-green-500">
                            <FontAwesomeIcon icon={faFacebook} className="w-6 h-6" />
                          </a>
                        </li>
                        <li>
                          <a href="#" className="text-white hover:text-green-500">
                            <FontAwesomeIcon icon={faTwitter} className="w-6 h-6" />
                          </a>
                        </li>
                        <li>
                          <a href="#" className="text-white hover:text-green-500">
                            <FontAwesomeIcon icon={faLinkedin} className="w-6 h-6" />
                          </a>
                        </li>
                      </ul>
                    </div>
        
                    {/* Newsletter Subscription */}
                    <div>
                      <h3 className="text-lg font-bold mb-4">Subscribe</h3>
                      <p className="mb-4">Subscribe to our newsletter for updates and offers.</p>
                      <form className="flex">
                        <input
                          type="email"
                          placeholder="Your email"
                          className="p-2 rounded-l-lg focus:outline-none text-black"
                        />
                        <button
                          type="submit"
                          className="bg-green-600 text-white p-2 rounded-r-lg hover:bg-green-700"
                        >
                          Subscribe
                        </button>
                      </form>
                    </div>
                  </div>
        
                  {/* Copyright Notice */}
                  <div className="border-t border-gray-800 mt-8 pt-8 text-center">
                    <p>&copy; 2025 Ecobin. All rights reserved.</p>
                  </div>
                </div>
              </footer>
    </div>
  );
}
