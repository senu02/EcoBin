import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ChevronUp, Settings, LogOut } from "lucide-react";
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

  return (
    <nav className="bg-white text-gray-900 shadow-md relative z-50">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        <Link to="/select-item" className="flex items-center space-x-3 cursor-pointer">
          <img src={companyLogo} alt="Waste Management Logo" className="h-12 w-12 rounded-full" />
          <span className="text-2xl font-bold tracking-wide hover:text-green-600 transition-all">
            Waste Management
          </span>
        </Link>

        <div className="hidden md:flex space-x-8 items-center">
          <NavLink to="/" label="Home" isHome />
          <NavLink label="Services" />
          <NavLink label="About" />
          <NavLink label="Contact" />

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
