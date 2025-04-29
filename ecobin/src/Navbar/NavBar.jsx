import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, ChevronUp, Settings, LogOut, User, List } from "lucide-react";
import companyLogo from "../Home/images/Logo.png";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [userName, setUserName] = useState("");
  const [userInitial, setUserInitial] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [progress, setProgress] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Get the user data from localStorage
    const name = localStorage.getItem("name");
    console.log("User name from localStorage:", name); // Debugging: Check if name is stored correctly

    if (name) {
      setUserName(name);
      setUserInitial(name.charAt(0).toUpperCase()); // Set the first letter as uppercase
      setIsLoggedIn(true);
    }

    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    setIsLoggingOut(true);
    setProgress(0);

    let progressInterval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            setIsLoggingOut(false);
            setIsLoggedIn(false);
            setUserName("");
            setUserInitial("");
            localStorage.removeItem("name");
            localStorage.removeItem("token");
            navigate("/login");
          }, 500);
          return 100;
        }
        return oldProgress + 10;
      });
    }, 200);
  };

  const scrollToSection = (sectionId) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className="bg-white text-gray-900 shadow-md relative z-50">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        <Link to="/" className="flex items-center space-x-3 cursor-pointer">
          <img src={companyLogo} alt="Waste Management Logo" className="h-12 w-12 rounded-full" />
          <span className="text-2xl font-bold tracking-wide hover:text-green-600 transition-all">
            Waste Management
          </span>
        </Link>

        <div className="hidden md:flex space-x-8 items-center">
          <NavLink to="/" label="Home" isHome />
          <button 
            onClick={() => scrollToSection('services')}
            className="px-4 py-2 font-medium hover:text-green-600 transition-all duration-300"
          >
            Services
          </button>
          <button 
            onClick={() => scrollToSection('about')}
            className="px-4 py-2 font-medium hover:text-green-600 transition-all duration-300"
          >
            About Us
          </button>
          <button 
            onClick={() => scrollToSection('contact')}
            className="px-4 py-2 font-medium hover:text-green-600 transition-all duration-300"
          >
            Contact Us
          </button>

          {!isLoggedIn ? (
            <>
              <NavLink to="/login" label="Login" />
              <NavLink to="/SignupForm" label="SignUp" />
            </>
          ) : (
            <div className="relative flex items-center space-x-3">
              {/* User Initial */}
              <div
                className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-semibold text-lg cursor-pointer"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                {userInitial || "U"} {/* Display user initial or default to "U" */}
              </div>
              <span className="text-lg font-medium text-gray-800">{userName || "User"}</span>
              {dropdownOpen && (
                <div className="absolute top-12 right-0 bg-white border border-gray-200 rounded-lg shadow-lg w-48 z-50">
                  <ul className="space-y-2 p-3">
                    <li>
                      <Link to="/settings" className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-200 rounded-md">
                        <Settings className="mr-2" size={18} /> Settings
                      </Link>
                    </li>
                    <li>
                      <Link to="/ProfileHeader" className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-200 rounded-md">
                        <User className="mr-2" size={18} /> View Profile
                      </Link>
                    </li>
                    <li>
                      <Link to="/ViewPickup" className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-200 rounded-md">
                        <List className="mr-2" size={18} /> View Requests
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-gray-800 hover:bg-gray-200 rounded-md"
                      >
                        <LogOut className="mr-2" size={18} /> Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        <button
          className="md:hidden text-gray-900 hover:text-green-600 transition-all duration-300"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg">
          <div className="container mx-auto px-6 py-4">
            <div className="flex flex-col space-y-4">
              <NavLink to="/" label="Home" isHome />
              <button 
                onClick={() => {
                  scrollToSection('services');
                  setIsOpen(false);
                }}
                className="px-4 py-2 font-medium hover:text-green-600 transition-all duration-300 text-left"
              >
                Services
              </button>
              <button 
                onClick={() => {
                  scrollToSection('about');
                  setIsOpen(false);
                }}
                className="px-4 py-2 font-medium hover:text-green-600 transition-all duration-300 text-left"
              >
                About Us
              </button>
              <button 
                onClick={() => {
                  scrollToSection('contact');
                  setIsOpen(false);
                }}
                className="px-4 py-2 font-medium hover:text-green-600 transition-all duration-300 text-left"
              >
                Contact Us
              </button>
              {!isLoggedIn ? (
                <>
                  <NavLink to="/login" label="Login" />
                  <NavLink to="/SignupForm" label="SignUp" />
                </>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Link to="/settings" className="px-4 py-2 font-medium hover:text-green-600 transition-all duration-300">
                    Settings
                  </Link>
                  <Link to="/ProfileHeader" className="px-4 py-2 font-medium hover:text-green-600 transition-all duration-300">
                    View Profile
                  </Link>
                  <Link to="/ViewPickup" className="px-4 py-2 font-medium hover:text-green-600 transition-all duration-300">
                    View Requests
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 font-medium hover:text-green-600 transition-all duration-300 text-left"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-10 right-10 bg-green-600 text-white p-3 rounded-full shadow-lg hover:bg-green-700 transition-all duration-300"
        >
          <ChevronUp size={24} />
        </button>
      )}

      {isLoggingOut && (
        <div
          className="absolute left-0 bottom-0 h-1 bg-green-500 transition-all duration-200"
          style={{ width: `${progress}%` }}
        ></div>
      )}
    </nav>
  );
}

const NavLink = ({ to, label, isHome }) => (
  <Link
    to={to}
    className={`block px-4 py-2 font-medium hover:text-green-600 transition-all duration-300 ${isHome ? "bg-green-600 text-white hover:bg-green-700 rounded-full" : ""}`}
  >
    {label}
  </Link>
);

export default Navbar;
