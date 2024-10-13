// Navbar.js
import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  let location = useLocation();

  useEffect(() => {
    console.log(location.pathname);
  }, [location]);

  // Define an inline style object for the active link
  const activeStyle = {
    backgroundColor: "#4a5568", // Customize as needed
    color: "#ffffff",
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link className="text-white text-lg font-bold" to="/">
          Railway
        </Link>
        <div className="hidden md:flex space-x-4">
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
    </nav>
  );
};

export default Navbar;
