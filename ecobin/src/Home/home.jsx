import React, { useEffect, useState, useRef } from 'react';
import heroImage from '../Home/images/home5.jpg'; 
import Icon from '../Home/images/recycle-bin.png'; 
import Image from '../Home/images/home4.jpeg'; 
import Image1 from '../Home/images/Logo.png';
import BannerImage from '../Home/images/Bin.jpg';
import heroVideo from "../Home/images/video1.mp4";
import { IoSearchOutline, IoMenuOutline, IoCloseOutline } from 'react-icons/io5';
import { FaFacebook, FaTwitter, FaPinterest, FaLinkedin, FaLeaf, FaRecycle, FaChartLine, FaUserFriends, FaRobot } from 'react-icons/fa';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useInView } from 'react-intersection-observer';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { AiOutlineCheckCircle } from "react-icons/ai";
import UserService from './UserService';

// Animation variants
const slideInLeft = {
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const slideInRight = {
  hidden: { x: 100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const Home = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  let navigate = useNavigate();
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  // Animation controls
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  const [contact, setContact] = useState({
    name: "",
    email: "",
    message: "",
  });

  const { name, email, message } = contact;

  const onInputChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${UserService.BASE_URL}/public/addContact`, contact);
    setShowSuccessPopup(true);
    setTimeout(() => setShowSuccessPopup(false), 3000);
    setContact({ name: "", email: email, message: "" });
  };

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setContact((prevData) => ({ ...prevData, email: storedEmail }));
    }
  }, []);

  const reviews = [
    {
      id: 1,
      name: "Tharush De Silva",
      review: "Great service! Very efficient and eco-friendly.",
      rating: 5,
    },
    {
      id: 2,
      name: "Janaki Sooriyaarachchi",
      review: "Highly recommend their dumpster rental service.",
      rating: 4,
    },
    {
      id: 3,
      name: "Sampath Perera",
      review: "Excellent customer support and timely service.",
      rating: 5,
    },
  ];

  // New state for features
  const [activeFeature, setActiveFeature] = useState(0);
  const [showStats, setShowStats] = useState(false);
  const [stats, setStats] = useState({
    wasteCollected: 0,
    users: 0,
    locations: 0,
    recyclingRate: 0
  });

  // Features data
  const features = [
    {
      icon: <FaLeaf className="text-4xl text-green-500" />,
      title: "Smart Waste Collection",
      description: "AI-powered waste classification and collection scheduling"
    },
    {
      icon: <FaRecycle className="text-4xl text-green-500" />,
      title: "Eco-Friendly Solutions",
      description: "Sustainable waste management practices and recycling programs"
    },
    {
      icon: <FaChartLine className="text-4xl text-green-500" />,
      title: "Real-time Analytics",
      description: "Track waste collection metrics and environmental impact"
    },
    {
      icon: <FaUserFriends className="text-4xl text-green-500" />,
      title: "Community Engagement",
      description: "Join a network of eco-conscious individuals and organizations"
    }
  ];

  // Create separate refs for each animated section
  const [servicesRef, servicesInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [infoRef, infoInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [secondSectionRef, secondSectionInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [aboutRef, aboutInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [bannerRef, bannerInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [contactRef, contactInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [testimonialsRef, testimonialsInView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <div className="flex flex-col min-h-screen font-sans relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-green-300 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-32 w-[600px] h-[600px] bg-blue-300 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-300 rounded-full opacity-10 blur-3xl"></div>
      </div>

      {/* Success Popup */}
      {showSuccessPopup && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center"
        >
          <AiOutlineCheckCircle className="mr-2 text-xl" />
          Message sent successfully!
        </motion.div>
      )}

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <video
          autoPlay
          loop
          muted
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center text-white px-4"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500"
          >
            Smart Waste Management
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto"
          >
            Join us in creating a cleaner, greener future through innovative waste management solutions
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/WastePickupRequest">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-lg text-lg font-semibold"
              >
                Request Pickup
              </motion.button>
            </Link>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-green-600 px-8 py-3 rounded-lg text-lg font-semibold"
              onClick={() => setShowStats(true)}
            >
              View Impact
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 100 }}
              animate={{ 
                opacity: [0.3, 0.6, 0.3],
                y: [0, -20, 0],
                x: [0, Math.random() * 100 - 50, 0]
              }}
              transition={{
                duration: 5 + i,
                repeat: Infinity,
                delay: i * 0.5
              }}
              className="absolute w-4 h-4 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
            />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2 
              variants={itemVariants} 
              className="text-4xl font-bold text-gray-800 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-blue-500"
            >
              Our Features
            </motion.h2>
            <motion.p 
              variants={itemVariants} 
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Discover how our platform can help you manage waste more efficiently
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  y: -10,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
                className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <motion.div 
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                  className="mb-4"
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stats Modal */}
      <AnimatePresence>
        {showStats && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setShowStats(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-xl p-8 max-w-2xl w-full mx-4"
              onClick={e => e.stopPropagation()}
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Impact</h2>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-2xl font-bold text-green-600">{stats.wasteCollected} kg</h3>
                  <p className="text-gray-600">Waste Collected</p>
                </div>
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-2xl font-bold text-green-600">{stats.users}+</h3>
                  <p className="text-gray-600">Active Users</p>
                </div>
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-2xl font-bold text-green-600">{stats.locations}</h3>
                  <p className="text-gray-600">Locations Served</p>
                </div>
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-2xl font-bold text-green-600">{stats.recyclingRate}%</h3>
                  <p className="text-gray-600">Recycling Rate</p>
                </div>
              </div>
              <button
                onClick={() => setShowStats(false)}
                className="mt-6 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Services Section */}
      <section id="services" ref={servicesRef} className="py-20 bg-gradient-to-br from-white to-green-50 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-4 relative">
          {/* Section Header */}
          <motion.div
            initial="hidden"
            animate={servicesInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.span 
              variants={itemVariants}
              className="text-green-500 font-semibold tracking-wider uppercase text-sm"
            >
              Our Services
            </motion.span>
            <motion.h2 
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold mt-4 bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-blue-600"
            >
              Comprehensive Waste Solutions
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg"
            >
              Discover our range of innovative waste management services designed to make your life easier and our planet cleaner
            </motion.p>
          </motion.div>

          {/* Service Cards Grid */}
          <motion.div
            initial="hidden"
            animate={servicesInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {/* Zero Waste Service */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative p-8">
                <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-white/20 transition-colors duration-300">
                  <svg className="w-8 h-8 text-green-600 group-hover:text-white transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800 group-hover:text-white transition-colors duration-300">Zero Waste</h3>
                <p className="text-gray-600 group-hover:text-white/90 transition-colors duration-300">
                  Comprehensive waste reduction strategies and sustainable recycling practices for businesses and communities.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-6 px-6 py-2 bg-green-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  Learn More
                </motion.button>
              </div>
            </motion.div>

            {/* Dumpster Rental Service */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative p-8">
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-white/20 transition-colors duration-300">
                  <svg className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800 group-hover:text-white transition-colors duration-300">Dumpster Rental</h3>
                <p className="text-gray-600 group-hover:text-white/90 transition-colors duration-300">
                  Flexible dumpster rental solutions for residential, commercial, and construction needs.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  Learn More
                </motion.button>
              </div>
            </motion.div>

            {/* Portable Toilet Service */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative p-8">
                <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-white/20 transition-colors duration-300">
                  <svg className="w-8 h-8 text-purple-600 group-hover:text-white transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800 group-hover:text-white transition-colors duration-300">Portable Toilet</h3>
                <p className="text-gray-600 group-hover:text-white/90 transition-colors duration-300">
                  High-quality portable toilet rentals for events, construction sites, and outdoor activities.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-6 px-6 py-2 bg-purple-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  Learn More
                </motion.button>
              </div>
            </motion.div>

            {/* Recycling Service */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative p-8">
                <div className="w-16 h-16 bg-teal-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-white/20 transition-colors duration-300">
                  <svg className="w-8 h-8 text-teal-600 group-hover:text-white transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800 group-hover:text-white transition-colors duration-300">Recycling Service</h3>
                <p className="text-gray-600 group-hover:text-white/90 transition-colors duration-300">
                  Comprehensive recycling solutions for responsible waste disposal and environmental conservation.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-6 px-6 py-2 bg-teal-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  Learn More
                </motion.button>
              </div>
            </motion.div>
          </motion.div>

          {/* Service Stats */}
          <motion.div
            initial="hidden"
            animate={servicesInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-8"
          >
            {[
              { number: "500+", label: "Active Clients", color: "green" },
              { number: "1000+", label: "Projects Completed", color: "blue" },
              { number: "50+", label: "Expert Team", color: "purple" },
              { number: "24/7", label: "Support Available", color: "teal" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white rounded-xl p-6 shadow-lg text-center transform hover:scale-105 transition-transform duration-300"
              >
                <h3 className={`text-4xl font-bold text-${stat.color}-600 mb-2`}>{stat.number}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Info Section */}
      <section ref={infoRef} className="bg-white px-6 py-16 text-center relative overflow-hidden">
        <motion.div
          initial="hidden"
          animate={infoInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="max-w-3xl mx-auto relative z-10"
        >
          <motion.h1 
            variants={itemVariants}
            className="text-green-600 text-4xl font-bold"
          >
            Ecobin smart waste solution
          </motion.h1>
          <motion.p 
            variants={itemVariants}
            className="mt-6 text-gray-700 text-lg"
          >
            The expectations from waste collection companies have remarkably grown
            in the past years. Garbage pick-up and waste collection alone are no
            longer enough for cities and businesses.
          </motion.p>
          <motion.p 
            variants={itemVariants}
            className="mt-6 text-gray-700 text-lg"
          >
            Whether your motivation is driven by optimization and efficiency of your own
            operations, improvement of service quality or you simply look for a
            competitive advantage, we offer a variety of smart tools and
            solutions that can support you.
          </motion.p>
        </motion.div>

        {/* Animated background elements */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={infoInView ? { scale: 1, opacity: 0.5 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="absolute top-10 left-10 w-16 h-16 bg-gray-100 rounded-full"
        ></motion.div>

        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={infoInView ? { scale: 1, opacity: 0.5 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="absolute bottom-10 right-10 w-16 h-16 bg-green-100 rounded-full"
        ></motion.div>
      </section>

      {/* Second Section */}
      <section ref={secondSectionRef} className="flex items-center justify-between px-10 py-16 bg-white overflow-hidden">
        {/* Left Content */}
        <motion.div
          initial="hidden"
          animate={secondSectionInView ? "visible" : "hidden"}
          variants={slideInLeft}
          className="max-w-2xl"
        >
          {/* Icon */}
          <motion.div 
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.8 }}
            className="mb-4"
          >
            <img
              src={Icon}
              alt="Icon"
              className="w-12 h-12"
            />
          </motion.div>
          {/* Title */}
          <h1 className="text-green-600 text-5xl font-bold leading-tight">
            Ability to collect more material with the same infrastructure
          </h1>
          {/* Description */}
          <p className="mt-6 text-gray-700 text-lg">
            For companies collecting valuable materials, it is the volume that matters the most.
            As these commodities usually have a very irregular filling cycle, deployment of smart
            fill-level monitoring <span className="text-green-600 font-semibold">sensors </span>
            might completely avoid blind driving and ensure you are able to collect the volumes
            you need fast.
          </p>
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial="hidden"
          animate={secondSectionInView ? "visible" : "hidden"}
          variants={slideInRight}
          className="w-1/3 flex justify-end"
        >
          <motion.img 
            src={Image} 
            alt="Garbage Truck" 
            className="w-3/4 rounded-lg shadow-lg"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" ref={aboutRef} className="bg-gradient-to-r from-blue-50 to-purple-50 py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate={aboutInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="flex flex-col md:flex-row items-center"
          >
            {/* Image Section */}
            <motion.div 
              variants={itemVariants}
              className="md:w-1/3 mb-8 md:mb-0 relative"
            >
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="relative overflow-hidden rounded-lg shadow-2xl"
              >
                <img
                  src={Image1}
                  alt="About Us"
                  className="w-64 h-auto rounded-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 hover:bg-opacity-0 transition-opacity duration-300"></div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={aboutInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-8 -right-8 bg-white p-4 rounded-lg shadow-lg"
              >
                <h3 className="text-lg font-semibold text-gray-800">Since 2017</h3>
                <p className="text-sm text-gray-600">Innovating Waste Solutions</p>
              </motion.div>
            </motion.div>

            {/* Text Section */}
            <motion.div 
              variants={itemVariants}
              className="md:w-2/3 md:pl-12"
            >
              <h2 className="text-4xl font-bold text-green-600 mb-6">About Our Company</h2>
              <p className="text-base text-gray-700 mb-6 font-serif">
                Founded in 2017, Ecobin has undergone an impressive journey from a startup into a global leader in smart waste solutions.
              </p>
              <p className="text-base text-gray-700 mb-6 font-serif">
                We started with one product: a waste fill-level monitoring solution that consisted of sensors measuring waste levels in bins and a smart waste management software system.
              </p>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors duration-300"
              >
                Learn More
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Banner Section */}
      <section
        ref={bannerRef}
        className="relative bg-cover bg-center h-[450px]"
        style={{ backgroundImage: `url(${BannerImage})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={bannerInView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
          className="container mx-auto px-4 relative z-10 text-center text-white h-full flex flex-col justify-center"
        >
          <motion.h1 
            initial={{ y: -50 }}
            animate={bannerInView ? { y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold mb-4"
          >
            Welcome to EcoWaste Solutions
          </motion.h1>
          <motion.p 
            initial={{ y: 50 }}
            animate={bannerInView ? { y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg mb-6"
          >
            We provide sustainable waste management solutions for a cleaner, greener world.
          </motion.p>
          <motion.button
            initial={{ scale: 0.8 }}
            animate={bannerInView ? { scale: 1 } : {}}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors duration-300 mx-auto"
            onClick={() => window.location.href = "#learn-more"}
          >
            Learn More
          </motion.button>
        </motion.div>
      </section>

      {/* Contact Us Section */}
      <section id="contact" ref={contactRef} className="bg-gradient-to-r from-blue-50 to-purple-50 py-12 overflow-hidden">
        <div className="container mx-auto px-4">
          {/* Heading */}
          <motion.div
            initial="hidden"
            animate={contactInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="text-center mb-8"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-4xl font-bold text-green-600 mb-3"
            >
              Contact Us
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-lg text-gray-600"
            >
              We'd love to hear from you! Reach out to us for any inquiries or feedback.
            </motion.p>
          </motion.div>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Contact Form */}
            <motion.div
              initial="hidden"
              animate={contactInView ? "visible" : "hidden"}
              variants={slideInLeft}
              className="md:w-1/2 bg-white p-6 rounded-lg shadow-lg"
            >
              <form onSubmit={(e) => onSubmit(e)}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => onInputChange(e)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Name"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    readOnly
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="johndoe@example.com"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={message}
                    onChange={(e) => onInputChange(e)}
                    rows="6"
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Write your message here..."
                    required
                  ></textarea>
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-300"
                >
                  Send Message
                </motion.button>
              </form>
            </motion.div>

            {/* Contact Information and Map */}
            <motion.div
              initial="hidden"
              animate={contactInView ? "visible" : "hidden"}
              variants={slideInRight}
              className="md:w-1/2"
            >
              {/* Contact Information */}
              <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <p className="text-gray-600">456 Eco Park Road, Kohuwala, Nugegoda</p>
                  </div>
                  <div className="flex items-center">
                    <p className="text-gray-600">+94 771687613</p>
                  </div>
                  <div className="flex items-center">
                    <p className="text-gray-600">contact@ecobin.com</p>
                  </div>
                </div>
              </div>

              {/* Google Map Embed */}
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Our Location</h3>
                <motion.div 
                  whileHover={{ scale: 1.01 }}
                  className="overflow-hidden rounded-lg"
                >
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.8354345093747!2d144.9537353153166!3d-37.816279742021665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577d2aabc5e2c6a!2sEcoWaste%20Solutions!5e0!3m2!1sen!2sus!4v1633023226784!5m2!1sen!2sus"
                    width="100%"
                    height="250"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    title="EcoWaste Solutions Location"
                  ></iframe>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section ref={testimonialsRef} className="w-full py-12 bg-gray-100 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-center text-green-500 mb-6"
          >
            What Our Customers Say
          </motion.h2>
          <motion.div
            initial="hidden"
            animate={testimonialsInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="grid md:grid-cols-3 gap-6"
          >
            {reviews.map((review) => (
              <motion.div 
                key={review.id} 
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <p className="text-gray-700 mb-2">{review.review}</p>
                <div className="flex items-center space-x-1">
                  {Array.from({ length: review.rating }).map((_, index) => (
                    <span key={index} className="text-yellow-500 text-lg">⭐</span>
                  ))}
                </div>
                <p className="mt-2 font-semibold text-gray-800">- {review.name}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* AI Chatbot Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 z-50"
      >
        <motion.button
          className="relative group"
          whileHover={{ y: -5 }}
        >
          {/* Main Button */}
          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full shadow-lg flex items-center justify-center relative overflow-hidden">
            <FaRobot className="text-white text-2xl" />
            
            {/* Pulse Animation */}
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="w-full h-full bg-green-400 rounded-full"></div>
            </motion.div>
          </div>

          {/* Tooltip */}
          <div className="absolute right-20 top-1/2 transform -translate-y-1/2 bg-white px-4 py-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            <p className="text-gray-800 font-medium">Chat with AI Assistant</p>
            <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 rotate-45 w-2 h-2 bg-white"></div>
          </div>

          {/* Notification Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold"
          >
            1
          </motion.div>
        </motion.button>
      </motion.div>

      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-green-600 to-black text-white py-16 relative overflow-hidden"
      >
        {/* Footer background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-blue-500"></div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-green-400"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <div className="flex items-center space-x-2">
                <img src={Image1} alt="Logo" className="w-10 h-10" />
                <h3 className="text-xl font-bold">EcoBin</h3>
              </div>
              <p className="text-gray-300 text-sm">
                Leading the way in sustainable waste management solutions for a cleaner, greener future.
              </p>
              <div className="flex space-x-4">
                <motion.a
                  whileHover={{ scale: 1.1, y: -2 }}
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  <FontAwesomeIcon icon={faFacebook} className="w-5 h-5" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1, y: -2 }}
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  <FontAwesomeIcon icon={faTwitter} className="w-5 h-5" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1, y: -2 }}
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  <FontAwesomeIcon icon={faInstagram} className="w-5 h-5" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1, y: -2 }}
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  <FontAwesomeIcon icon={faLinkedin} className="w-5 h-5" />
                </motion.a>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h3 className="text-lg font-bold">Quick Links</h3>
              <ul className="space-y-2">
                {[
                  { name: "Home", href: "#home" },
                  { name: "Services", href: "#services" },
                  { name: "About Us", href: "#about" },
                  { name: "Contact", href: "#contact" },
                  { name: "Blog", href: "#blog" }
                ].map((link, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ x: 5 }}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    <a href={link.href} className="flex items-center">
                      <span className="w-1 h-1 bg-green-500 rounded-full mr-2"></span>
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h3 className="text-lg font-bold">Our Services</h3>
              <ul className="space-y-2">
                {[
                  "Waste Collection",
                  "Recycling Solutions",
                  "Sustainability Consulting",
                  "Environmental Impact Analysis",
                  "Waste Management Training"
                ].map((service, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ x: 5 }}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    <span className="flex items-center">
                      <span className="w-1 h-1 bg-green-500 rounded-full mr-2"></span>
                      {service}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Newsletter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h3 className="text-lg font-bold">Newsletter</h3>
              <p className="text-gray-300 text-sm">
                Subscribe to our newsletter for the latest updates and offers.
              </p>
              <form className="space-y-3">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-green-500 text-white placeholder-gray-400"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-500 text-white px-4 py-1 rounded-md hover:bg-green-600 transition-colors"
                  >
                    Subscribe
                  </motion.button>
                </div>
              </form>
              <div className="flex items-center space-x-2 text-gray-300 text-sm">
                <FaLeaf className="text-green-500" />
                <span>Join our eco-friendly community</span>
              </div>
            </motion.div>
          </div>

          {/* Bottom Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            viewport={{ once: true }}
            className="border-t border-white/10 mt-12 pt-8"
          >
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-300 text-sm">
                © {new Date().getFullYear()} EcoBin. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="text-gray-300 hover:text-white text-sm transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="text-gray-300 hover:text-white text-sm transition-colors">
                  Terms of Service
                </a>
                <a href="#" className="text-gray-300 hover:text-white text-sm transition-colors">
                  Cookie Policy
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.footer>
    </div>
  );
};

export default Home;