// DashboardNavbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing

const DashboardNavbar = () => {
  const [isOpen, setIsOpen] = useState(false); // State to manage dropdown visibility

  const toggleDropdown = () => {
    setIsOpen(!isOpen); // Toggle dropdown visibility
  };

  const closeDropdown = () => {
    setIsOpen(false); // Close dropdown
  };

  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/dashboard"> {/* Wrap the text in a Link */}
          <h1 className="text-xl font-bold mr-8 cursor-pointer hover:text-blue-600"> {/* Add hover effect */}
            Welcome to Dashboard
          </h1>
        </Link>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleDropdown} aria-label="Toggle Menu">
            <img
              src="/uploads/menu-black.png" // Menu icon for mobile
              alt="Menu"
              className="w-8 h-8"
            />
          </button>
        </div>

        <div className={`flex items-center space-x-4 md:space-x-6 ${isOpen ? 'flex-col absolute bg-white w-full shadow-md z-10' : 'hidden md:flex'}`}>
          {/* Flex column for mobile view */}
          <input
            type="text"
            placeholder="Search by Train Name/Number"
            className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring focus:ring-blue-400" // Improved focus effect for accessibility
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200 ease-in-out"> {/* Hover effect for button */}
            Search
          </button>
          <select className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring focus:ring-blue-400"> {/* Improved focus effect for accessibility */}
            <option value="">Select Option</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </div>

        <div className="flex items-center ml-4 md:ml-8"> {/* Added margin for better spacing */}
          <Link to="/profile" aria-label="Profile"> {/* Link to Profile page with aria-label for accessibility */}
            <img
              src="/uploads/profile.png"  // Correct path for public folder image
              alt="Profile"
              className="w-10 h-10 rounded-full hover:opacity-80 transition duration-200 ease-in-out" // Added hover effect for profile image
            />
          </Link>
        </div>
      </div>

      {/* Dropdown Menu for Mobile */}
      {isOpen && (
        <div className="flex flex-col items-start md:hidden p-4 bg-white shadow-md"> {/* Stack items vertically in mobile */}
          <div className="flex justify-between w-full">
            <div className="flex-grow">
              {/* No additional dashboard links shown */}
            </div>
            {/* Close button */}
            <button onClick={closeDropdown} aria-label="Close Menu">
              <img
                src="/uploads/close-black.png" // Close icon
                alt="Close"
                className="w-8 h-8"
              />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default DashboardNavbar;
