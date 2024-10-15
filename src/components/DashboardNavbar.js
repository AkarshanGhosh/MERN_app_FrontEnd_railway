import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const DashboardNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [trainNumber, setTrainNumber] = useState(''); // State to hold the train number input
  const [errorMessage, setErrorMessage] = useState(''); // State to hold error message
  const navigate = useNavigate(); // Hook for navigation

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const handleSearch = async () => {
    setErrorMessage(''); // Clear previous error messages

    try {
      // Call the backend API to check if the train number exists
      const response = await fetch('http://localhost:5000/api/division/check-train', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ trainNumber }), // Send train number in the request body
      });

      if (response.ok) {
        // If the response is okay, redirect to the Train page
        navigate(`/train/${trainNumber}`);
      } else {
        // If the response is not okay, set an error message
        setErrorMessage('Entered train number is incorrect. Please try again.');
      }
    } catch (error) {
      console.error('Error occurred while checking train number:', error);
      setErrorMessage('Error occurred. Please try again later.');
    }
  };

  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/dashboard">
          <h1 className="text-xl font-bold mr-8 cursor-pointer hover:text-blue-600">
            Welcome to Dashboard
          </h1>
        </Link>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleDropdown} aria-label="Toggle Menu">
            <img
              src="/uploads/menu-black.png"
              alt="Menu"
              className="w-8 h-8"
            />
          </button>
        </div>

        {/* Search bar and button */}
        <div className={`flex items-center space-x-4 md:space-x-6 ${isOpen ? 'flex-col absolute bg-white w-full shadow-md z-10' : 'hidden md:flex'}`}>
          <input
            type="text"
            placeholder="Search by Train Number"
            value={trainNumber} // Set the value from state
            onChange={(e) => setTrainNumber(e.target.value)} // Update state on change
            className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring focus:ring-blue-400"
          />
          <button 
            onClick={handleSearch} // Call handleSearch on button click
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200 ease-in-out">
            Search
          </button>
        </div>

        {/* Error Message */}
        {errorMessage && (
          <div className="text-red-600 text-sm mt-2">{errorMessage}</div>
        )}

        <div className="flex items-center ml-4 md:ml-8">
          <Link to="/profile" aria-label="Profile">
            <img
              src="/uploads/profile.png"
              alt="Profile"
              className="w-10 h-10 rounded-full hover:opacity-80 transition duration-200 ease-in-out"
            />
          </Link>
        </div>
      </div>

      {/* Dropdown Menu for Mobile */}
      {isOpen && (
        <div className="flex flex-col items-start md:hidden p-4 bg-white shadow-md">
          <div className="flex justify-between w-full">
            <div className="flex-grow"></div>
            <button onClick={closeDropdown} aria-label="Close Menu">
              <img
                src="/uploads/close-black.png"
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
