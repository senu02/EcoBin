import React, { useState } from 'react';
import heroImage from '../Home/images/home5.jpg'; 
import Image1 from '../Home/images/home4.jpeg';
import heroVideo from "../Home/images/video1.mp4";  // Replace with the actual path to your image
import { IoSearchOutline, IoMenuOutline, IoCloseOutline } from 'react-icons/io5';
import { FaFacebook, FaTwitter, FaPinterest, FaLinkedin } from 'react-icons/fa';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { motion } from "framer-motion";

const WastinWebsite = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  return (
    <div className="flex flex-col min-h-screen font-sans">
      {/* Header */}
      <header className="relative">
        {/* Header Top */}
        <div className="bg-gray-800 py-2">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <div className="text-white text-sm">
              Exclusive Offer! <span className="bg-green-500 px-2 py-1 ml-2">Save 10%</span>
            </div>
            <div className="flex items-center">
              <p className="text-white text-sm mr-4">Follow us:</p>
              <ul className="flex space-x-4">
                <li>
                  <a href="#" className="text-white hover:text-green-500">
                    <FaFacebook className="w-6 h-6" />
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white hover:text-green-500">
                    <FaTwitter className="w-6 h-6" />
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white hover:text-green-500">
                    <FaPinterest className="w-6 h-6" />
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white hover:text-green-500">
                    <FaLinkedin className="w-6 h-6" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Header Bottom */}
        <div className="bg-white py-4 shadow-md">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <a href="#" className="text-green-500-2xl font-bold uppercase">
              Ecobin
            </a>

            {/* Navbar */}
            <nav className={`absolute top-full right-0 bg-white w-full max-w-[350px] transition-all duration-300 overflow-hidden ${isNavbarOpen ? 'max-h-[275px]' : 'max-h-0'}`}>
              <ul>
                <li className="border-b border-gray-200">
                  <a href="#home" className="block px-6 py-3 text-black hover:bg-gray-100">
                    Home
                  </a>
                </li>
                <li className="border-b border-gray-200">
                  <a href="#services" className="block px-6 py-3 text-black hover:bg-gray-100">
                    Services
                  </a>
                </li>
                <li className="border-b border-gray-200">
                  <a href="#recycling" className="block px-6 py-3 text-black hover:bg-gray-100">
                    Recycling
                  </a>
                </li>
                <li className="border-b border-gray-200">
                  <a href="#dumpster" className="block px-6 py-3 text-black hover:bg-gray-100">
                    Dumpster Rental
                  </a>
                </li>
                <li className="border-b border-gray-200">
                  <a href="#about" className="block px-6 py-3 text-black hover:bg-gray-100">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#contact" className="block px-6 py-3 text-black hover:bg-gray-100">
                    Contact
                  </a>
                </li>
              </ul>
            </nav>

            {/* Header Actions */}
            <div className="flex items-center space-x-4">
              <button className="text-green-500 p-2 rounded-lg shadow-md hover:bg-green-500 hover:text-white">
                <IoSearchOutline className="w-6 h-6" />
              </button>
              <button
                className="text-black p-2 border border-black rounded-lg"
                onClick={toggleNavbar}
              >
                {isNavbarOpen ? (
                  <IoCloseOutline className="w-6 h-6" />
                ) : (
                  <IoMenuOutline className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

       {/* Hero Section */}
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={heroVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark overlay for better text visibility */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      {/* Content */}
      <div className="container mx-auto px-4 text-center z-10">
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-5xl font-bold text-white leading-tight mb-4"
        >
          Save costs and time
          <br />
          on your waste collection
        </motion.h1>

        {/* Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-white text-lg mb-8"
        >
          Efficient and eco-friendly waste management solutions tailored for you.
        </motion.p>

        {/* Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.5, type: "spring", stiffness: 100 }}
          className="mt-8 bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-medium py-3 px-6 rounded-md"
        >
          Contact us
        </motion.button>
      </div>
    </section>

    

      

{/* Services Section */}
<section className="py-16 bg-white">
  <div className="container mx-auto px-4">
    {/* Section Heading */}
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center mb-8"
    >
      <p className="text-gray-600 uppercase text-sm tracking-wider">What We're Offering</p>
      <h2 className="text-3xl font-light mt-2">The Services We're Providing</h2>
    </motion.div>

    {/* Service Cards */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {/* Zero Waste Card */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-gray-50 p-8 rounded-lg"
      >
        <div className="bg-white p-3 rounded-lg inline-block mb-4">
          <svg width="40" height="40" viewBox="0 0 40 40" className="fill-green-600">
            <circle cx="20" cy="25" r="10" className="fill-yellow-400 opacity-40" />
            <path d="M18,15 L22,15 L23,18 L17,18 Z" />
            <path d="M16,18 L24,18 L26,22 L14,22 Z" />
            <path d="M10,22 L30,22 L28,30 L12,30 Z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium mb-2">Zero Waste</h3>
        <p className="text-sm text-gray-500">Lorem ipsum dolor sit amet, adipisci do.</p>
      </motion.div>

      {/* Dumpster Rental Card */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-gray-50 p-8 rounded-lg"
      >
        <div className="bg-white p-3 rounded-lg inline-block mb-4">
          <svg width="40" height="40" viewBox="0 0 40 40" className="fill-green-600">
            <path d="M15,15 L25,15 L30,25 L10,25 Z" />
            <rect x="15" y="25" width="10" height="8" />
            <path d="M18,15 L22,15 L22,10 L18,10 Z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium mb-2">Dumpster Rental</h3>
        <p className="text-sm text-gray-500">Lorem ipsum dolor sit amet, adipisci do.</p>
      </motion.div>

      {/* Portable Toilet Card */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="bg-gray-50 p-8 rounded-lg"
      >
        <div className="bg-white p-3 rounded-lg inline-block mb-4">
          <svg width="40" height="40" viewBox="0 0 40 40" className="fill-green-600">
            <rect x="12" y="15" width="16" height="15" rx="2" />
            <rect x="15" y="17" width="4" height="6" rx="1" />
            <rect x="21" y="17" width="4" height="6" rx="1" />
            <path d="M16,10 L24,10 L26,15 L14,15 Z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium mb-2">Portable Toilet</h3>
        <p className="text-sm text-gray-500">Lorem ipsum dolor sit amet, adipisci do.</p>
      </motion.div>

      {/* Recycling Service Card */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="bg-gray-50 p-8 rounded-lg"
      >
        <div className="bg-white p-3 rounded-lg inline-block mb-4">
          <svg width="40" height="40" viewBox="0 0 40 40" className="fill-green-600">
            <path d="M20,10 L30,20 L25,25 L20,20 L15,25 L10,20 Z" />
            <path d="M20,20 L20,30" strokeWidth="2" />
            <path d="M15,25 L25,25" strokeWidth="2" />
          </svg>
        </div>
        <h3 className="text-lg font-medium mb-2">Recycling Service</h3>
        <p className="text-sm text-gray-500">Lorem ipsum dolor sit amet, adipisci do.</p>
      </motion.div>
    </div>
  </div>
</section>

   {/* About Section */}
<section className="bg-gradient-to-r from-blue-50 to-purple-50 py-20">
  <div className="container mx-auto px-4">
    <div className="flex flex-col md:flex-row items-center">
      {/* Image Section */}
      <div className="md:w-1/3 mb-8 md:mb-0 relative">
        <div className="relative overflow-hidden rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300">
          <img 
            src={Image1} 
            alt="About Us" 
            className="w-64 h-auto rounded-lg" 
          />
          <div className="absolute inset-0 bg-black bg-opacity-20 hover:bg-opacity-0 transition-opacity duration-300"></div>
        </div>
        <div className="absolute -bottom-8 -right-8 bg-white p-4 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800">Since 2017</h3>
          <p className="text-sm text-gray-600">Innovating Waste Solutions</p>
        </div>
      </div>

      {/* Text Section */}
      <div className="md:w-2/3 md:pl-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">About Our Company</h2>
        <p className="text-sm text-gray-600 mb-6"> {/* Changed to text-sm */}
          Founded in 2017, Ecobin has undergone an impressive journey from a startup into a global leader in smart waste solutions. Our goal from the beginning has been to help cities, businesses, and countries cope with the biggest challenges of waste management – lack of efficiency and transparency.
        </p>
        <p className="text-sm text-gray-600 mb-6"> {/* Changed to text-sm */}
          We started with one product: a waste fill-level monitoring solution that consisted of sensors measuring waste levels in bins and a smart waste management software system. Over the years, we have been expanding and perfecting our portfolio of services, which now range from waste and collection monitoring, route planning, factory waste management, to take-back systems and deposit return scheme integration.
        </p>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300">
          Learn More
        </button>
      </div>
    </div>
  </div>
</section>
{/* Contact Us Section */}
<section className="bg-gradient-to-r from-blue-50 to-purple-50 py-20">
  <div className="container mx-auto px-4">
    {/* Heading */}
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center mb-12"
    >
      <h2 className="text-4xl font-bold text-gray-800 mb-4">Contact Us</h2>
      <p className="text-lg text-gray-600">We'd love to hear from you! Reach out to us for any inquiries or feedback.</p>
    </motion.div>

    <div className="flex flex-col md:flex-row gap-8">
      {/* Contact Form */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="md:w-1/2 bg-white p-8 rounded-lg shadow-lg"
      >
        <form>
          <div className="mb-6">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="John Doe"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Your Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="johndoe@example.com"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Your Message</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="Write your message here..."
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            Send Message
          </button>
        </form>
      </motion.div>

      {/* Contact Information and Map */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="md:w-1/2"
      >
        {/* Contact Information */}
        <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Contact Information</h3>
          <div className="space-y-4">
            <div className="flex items-center">
              <svg
                className="w-6 h-6 text-blue-600 mr-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
              </svg>
              <p className="text-gray-600">456 Eco Park Road, Green Valley, Earth</p>
            </div>
            <div className="flex items-center">
              <svg
                className="w-6 h-6 text-blue-600 mr-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                ></path>
              </svg>
              <p className="text-gray-600">+1 (987) 654-3210</p>
            </div>
            <div className="flex items-center">
              <svg
                className="w-6 h-6 text-blue-600 mr-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                ></path>
              </svg>
              <p className="text-gray-600">contact@ecowaste.com</p>
            </div>
          </div>
        </div>

        {/* Google Map Embed */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Our Location</h3>
          <div className="overflow-hidden rounded-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.8354345093747!2d144.9537353153166!3d-37.816279742021665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577d2aabc5e2c6a!2sEcoWaste%20Solutions!5e0!3m2!1sen!2sus!4v1633023226784!5m2!1sen!2sus"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="EcoWaste Solutions Location"
            ></iframe>
          </div>
        </div>
      </motion.div>
    </div>
  </div>
</section>
      {/* Advanced Footer */}
      <footer className="bg-gray-900 text-white py-12">
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
                    <FaFacebook className="w-6 h-6" />
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white hover:text-green-500">
                    <FaTwitter className="w-6 h-6" />
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white hover:text-green-500">
                    <FaPinterest className="w-6 h-6" />
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white hover:text-green-500">
                    <FaLinkedin className="w-6 h-6" />
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
                  className="bg-green-500 text-white p-2 rounded-r-lg hover:bg-green-600"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Copyright Notice */}
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p>&copy; 2023 Ecobin. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WastinWebsite;