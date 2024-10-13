// src/components/DashboardNavbar.js
import React from 'react';

const DashboardNavbar = () => {
  // Retrieve the username from localStorage
  const username = localStorage.getItem("Username") || "Guest"; // Default to "Guest" if not found

  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">{`Welcome, ${username}`}</h1> {/* Display username */}
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search..."
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
      </div>
    </nav>
  );
};

export default DashboardNavbar;
