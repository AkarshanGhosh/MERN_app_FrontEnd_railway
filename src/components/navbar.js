// Navbar.js
import React, { useEffect, useState } from "react"; // Import useState for managing menu visibility
import { Link, useLocation } from "react-router-dom"; // Import Link and useLocation for navigation

const Navbar = () => {
  let location = useLocation(); // Get the current location
  const [isOpen, setIsOpen] = useState(false); // State to manage mobile menu visibility

  useEffect(() => {
    console.log(location.pathname); // Log current path for debugging
  }, [location]);

  // Define an inline style object for the active link
  const activeStyle = {
    backgroundColor: "#4a5568", // Customize as needed
    color: "#ffffff",
  };

  // Function to toggle the mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen); // Toggle the state of the menu
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link className="text-white text-lg font-bold" to="/">
          Railway
        </Link>

        {/* Mobile menu toggle icon */}
        <button onClick={toggleMenu} className="md:hidden focus:outline-none">
          <img src="/uploads/menu-white.png" alt="Menu" className="w-8 h-8" />{" "}
          {/* Replace with your image path */}
        </button>

        <div className="hidden md:flex space-x-4">
          {" "}
          {/* Desktop menu links */}
          <Link
            className="text-white hover:bg-gray-700 px-3 py-2 rounded"
            style={location.pathname === "/" ? activeStyle : {}}
            to="/"
          >
            Home
          </Link>
          <Link
            className="text-white hover:bg-gray-700 px-3 py-2 rounded"
            style={location.pathname === "/signup" ? activeStyle : {}}
            to="/signup"
          >
            Sign Up
          </Link>
          <Link
            className="text-white hover:bg-gray-700 px-3 py-2 rounded"
            style={location.pathname === "/signin" ? activeStyle : {}}
            to="/signin"
          >
            Sign In
          </Link>
          <Link
            className="text-white hover:bg-gray-700 px-3 py-2 rounded"
            style={location.pathname === "/contact" ? activeStyle : {}}
            to="/contact"
          >
            Contact Us
          </Link>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && ( // Only render dropdown if isOpen is true
        <div className="md:hidden bg-gray-700 mt-2 rounded-lg p-2">
          <Link
            className="block text-white hover:bg-gray-600 px-3 py-2 rounded"
            style={location.pathname === "/" ? activeStyle : {}}
            to="/"
            onClick={toggleMenu} // Close menu on click
          >
            Home
          </Link>
          <Link
            className="block text-white hover:bg-gray-600 px-3 py-2 rounded"
            style={location.pathname === "/signup" ? activeStyle : {}}
            to="/signup"
            onClick={toggleMenu} // Close menu on click
          >
            Sign Up
          </Link>
          <Link
            className="block text-white hover:bg-gray-600 px-3 py-2 rounded"
            style={location.pathname === "/signin" ? activeStyle : {}}
            to="/signin"
            onClick={toggleMenu} // Close menu on click
          >
            Sign In
          </Link>
          <Link
            className="block text-white hover:bg-gray-600 px-3 py-2 rounded"
            style={location.pathname === "/contact" ? activeStyle : {}}
            to="/contact"
            onClick={toggleMenu} // Close menu on click
          >
            Contact Us
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
