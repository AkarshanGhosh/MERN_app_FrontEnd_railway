import React, { useEffect, useState } from 'react'; // Import React and hooks for state and lifecycle management
import { useTrain } from '../TrainContext'; // Import custom hook to access train context
import { useLocation, useNavigate } from 'react-router-dom'; // Import hooks for routing

const Train = () => {
  const { selectedTrain } = useTrain(); // Access the selected train number from context
  const location = useLocation(); // Get the current location object for pathname management
  const navigate = useNavigate(); // Hook for navigation
  const [coaches, setCoaches] = useState([]); // State to hold the fetched coaches
  const [loading, setLoading] = useState(true); // State to manage loading status

  useEffect(() => {
    // Function to fetch coach data from the backend API
    const fetchCoaches = () => {
      if (selectedTrain) { // Check if a train number is selected
        // Fetch coaches from the backend based on the selected train number
        fetch(`http://localhost:5000/api/train/coaches?trainNumber=${selectedTrain}`)
          .then(response => response.json()) // Convert response to JSON
          .then(data => {
            if (data.coaches) {
              setCoaches(data.coaches); // Set fetched coaches into state
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

    // Warning message before the user reloads the page
    const handleBeforeUnload = (event) => {
      const message = 'Reloading the site will remove all the data from display.'; // Warning message
      event.preventDefault(); // Prevent default behavior
      event.returnValue = message; // Set returnValue for modern browsers
      return message; // Return message for older browsers
    };

    window.addEventListener('beforeunload', handleBeforeUnload); // Add event listener

    // Cleanup function to clear interval, remove class, and remove event listener
    return () => {
      document.body.classList.remove('hide-navbar'); // Remove class to show the Navbar
      clearInterval(intervalId); // Clear the interval to prevent memory leaks
      window.removeEventListener('beforeunload', handleBeforeUnload); // Remove event listener
    };
  }, [location.pathname, selectedTrain]); // Dependencies: re-run effect when pathname or selectedTrain changes

  // Function to handle coach click
  const handleCoachClick = (coach) => {
    navigate(`/coach/${coach}`); // Navigate to the coach details page using coach ID
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-6 bg-white"> {/* Main container */}
      {/* Box displaying the message about where coach data will be shown */}
      <div className="bg-gray-50 shadow-lg rounded-lg p-6 mb-6 w-full max-w-md"> {/* Slightly off-white background for the box */}
        <h2 className="text-lg text-gray-800 font-semibold">The coach data will show here</h2>
      </div>
      
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Train Details for Train Number: {selectedTrain || 'N/A'}</h1>

      {/* Box to display the list of coaches */}
      <div className="bg-gray-50 shadow-lg rounded-lg p-4 w-full max-w-md overflow-y-auto" style={{ maxHeight: '70vh' }}> {/* Slightly off-white background for the box */}
        {loading ? ( // Conditional rendering based on loading state
          <p className="text-gray-600">Loading coach data...</p> // Show loading message
        ) : coaches.length > 0 ? ( // Check if coaches are available
          <div className="text-gray-700">
            <h2 className="text-xl font-semibold mb-2">Coaches:</h2>
            <ul className="list-none space-y-2"> {/* Removed bullet points by changing to list-none */}
              {coaches.map((coach, index) => (
                <li key={index} className="transition-transform duration-200 ease-in-out">
                  <button
                    onClick={() => handleCoachClick(coach)} // Call the click handler on button click
                    className="w-full text-left p-3 bg-blue-100 rounded-lg shadow hover:bg-blue-200 hover:shadow-md transition duration-200"
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

export default Train; // Export the Train component
