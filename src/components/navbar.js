// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link className="text-white text-lg font-bold" to="/">
          Navbar
        </Link>
        <div className="hidden md:flex space-x-4">
          <Link className="text-white hover:bg-gray-700 px-3 py-2 rounded" to="/">
            Home
          </Link>
          <Link className="text-white hover:bg-gray-700 px-3 py-2 rounded" to="/signup">
            Sign Up
          </Link>
          <Link className="text-white hover:bg-gray-700 px-3 py-2 rounded" to="/signin">
            Sign In
          </Link>
          <Link className="text-white hover:bg-gray-700 px-3 py-2 rounded" to="/contact">
            Contact Us
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
