// src/components/DashboardNavbar.js
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing

const DashboardNavbar = () => {
  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold mr-8">Welcome to Dashboard</h1> {/* Add margin-right to space from search */}

        <div className="flex items-center space-x-6"> {/* Increase spacing between items */}
          <input
            type="text"
            placeholder="Search by Train Name/Number"
            className="border border-gray-300 rounded-md px-2 py-1"
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Search 
          </button>
          <select className="border border-gray-300 rounded-md px-2 py-1">
            <option value="">Select Option</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </div>

        <div className="flex items-center ml-8">
          <Link to="/profile"> {/* Link to Profile page */}
            <img
              src="/uploads/profile.png"  // Correct path for public folder image
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
