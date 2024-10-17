import React, { useEffect, useState } from 'react';
import { useTrain } from '../TrainContext'; // Import custom hook to access train context
import { useLocation, useNavigate } from 'react-router-dom'; // Import useLocation and useNavigate for navigation

const Train = () => {
  const { selectedTrain } = useTrain(); // Access selectedTrain (the current train number) from context
  const location = useLocation(); // Get the current location object to manage the pathname
  const navigate = useNavigate(); // Hook for navigation
  const [coaches, setCoaches] = useState([]); // State to hold the fetched coaches
  const [loading, setLoading] = useState(true); // State to manage loading status

  useEffect(() => {
    // Function to fetch coach data from backend API
    const fetchCoaches = () => {
      if (selectedTrain) { // Check if a train number is selected
        fetch(`http://localhost:5000/api/train/coaches?trainNumber=${selectedTrain}`) // API call to fetch coaches by train number
          .then(response => response.json()) // Convert response to JSON
          .then(data => {
            // Update the coaches state with the fetched data
            if (data.coaches) {
              setCoaches(data.coaches); // Set fetched coaches
            } else {
              setCoaches([]); // Reset coaches if no data is found
            }
            setLoading(false); // Update loading status
          })
          .catch(error => {
            console.error('Error fetching coach data:', error); // Log any errors
            setLoading(false); // Update loading status
          });
      }
    };

    // Initial fetch of coach data
    fetchCoaches();

    // Set up interval to fetch coach data every 5 seconds
    const intervalId = setInterval(fetchCoaches, 5000);

    // Hide Navbar when in Train component
    if (location.pathname.startsWith('/train')) {
      document.body.classList.add('hide-navbar'); // Add class to hide the Navbar
    }

    // Cleanup function to clear interval and remove class on component unmount
    return () => {
      document.body.classList.remove('hide-navbar'); // Remove class to show the Navbar
      clearInterval(intervalId); // Clear the interval to prevent memory leaks
    };
  }, [location.pathname, selectedTrain]); // Dependencies: re-run effect when pathname or selectedTrain changes

  // Function to handle coach click
  const handleCoachClick = (coach) => {
    // Navigate to a coach details page using the coach ID or name (adjust the path as needed)
    navigate(`/coach-details/${coach}`); // Replace with the actual path you want to navigate to
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      {/* Box displaying the message about where coach data will be shown */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-6 w-full max-w-md">
        <h2 className="text-lg text-gray-800">The coach data will show here</h2>
      </div>
      
      <h1 className="text-2xl font-semibold mb-4">Train Details for Train Number: {selectedTrain || 'N/A'}</h1>

      {/* Box to display the list of coaches */}
      <div className="bg-gray-50 p-4 rounded-lg shadow-lg w-full max-w-md overflow-y-auto" style={{ maxHeight: '70vh' }}>
        {loading ? ( // Conditional rendering based on loading state
          <p className="text-gray-600">Loading coach data...</p> // Show loading message
        ) : coaches.length > 0 ? ( // Check if coaches are available
          <div className="text-gray-700">
            <h2 className="text-xl font-semibold mb-2">Coaches:</h2>
            <ul className="list-disc list-inside space-y-2"> {/* List of coaches */}
              {coaches.map((coach, index) => (
                <li key={index} className="p-2 bg-white rounded shadow-sm">
                  <button
                    onClick={() => handleCoachClick(coach)} // Call the click handler on button click
                    className="text-blue-500 hover:text-blue-700" // Tailwind CSS classes for styling
                  >
                    {coach} {/* Display coach name */}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-gray-600">No coaches found for this train number.</p> // Show message if no coaches found
        )}
      </div>
    </div>
  );
};

export default Train;
