import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTrain } from '../TrainContext'; // Import the useTrain hook

const DashboardNavbar = () => {
  const { setSelectedTrain } = useTrain(); // Access setSelectedTrain from the context
  const [isOpen, setIsOpen] = useState(false);
  const [trainNumber, setTrainNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const handleSearch = async () => {
    setErrorMessage('');

    try {
      const response = await fetch(`http://localhost:5000/api/division/check-train`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ trainNumber }),
      });

      if (response.ok) {
        setSelectedTrain(trainNumber); // Save the train number in context
        navigate(`/train/${trainNumber}`); // Redirect to the Train page
      } else {
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

        <div className="md:hidden flex items-center">
          <button onClick={toggleDropdown} aria-label="Toggle Menu">
            <img src="/uploads/menu-black.png" alt="Menu" className="w-8 h-8" />
          </button>
        </div>

        <div className={`flex items-center space-x-4 md:space-x-6 ${isOpen ? 'flex-col absolute bg-white w-full shadow-md z-10' : 'hidden md:flex'}`}>
          <input
            type="text"
            placeholder="Search by Train Number"
            value={trainNumber}
            onChange={(e) => setTrainNumber(e.target.value)}
            className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring focus:ring-blue-400"
          />
          <button 
            onClick={handleSearch}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200 ease-in-out">
            Search
          </button>
        </div>

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

      {isOpen && (
        <div className="flex flex-col items-start md:hidden p-4 bg-white shadow-md">
          <div className="flex justify-between w-full">
            <div className="flex-grow"></div>
            <button onClick={closeDropdown} aria-label="Close Menu">
              <img src="/uploads/close-black.png" alt="Close" className="w-8 h-8" />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default DashboardNavbar;
