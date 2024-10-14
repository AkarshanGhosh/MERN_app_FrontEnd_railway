// src/components/Profile.js
import React, { useEffect, useState } from 'react'; // Import React and hooks
import axios from 'axios'; // Import Axios for making API requests
import DashboardNavbar from './DashboardNavbar'; // Import the Dashboard Navbar component

// Define the Profile component
const Profile = () => {
  // State variables to hold user data and error messages
  const [userData, setUserData] = useState(null); // Initial user data state set to null
  const [error, setError] = useState(null); // Initial error state set to null

  // useEffect hook to fetch user data when the component mounts
  useEffect(() => {
    const fetchUserData = async () => { // Define an asynchronous function to fetch user data
      try {
        // Get the auth token from local storage
        const token = localStorage.getItem("token");

        // Check if token is present
        if (!token) {
          setError("No authentication token found. Please log in."); // Set error message if token is not found
          return; // Exit the function early if no token
        }

        // Make API call to fetch user data
        const response = await axios.post('http://localhost:5000/api/auth/getuser', null, {
          headers: {
            'auth-token': token, // Set auth token in headers for authentication
          },
        });

        // Set user data to state
        setUserData(response.data); // Update userData state with the fetched data
      } catch (err) {
        console.error("Error fetching user data:", err); // Log the error to the console
        setError("Failed to fetch user data. Please try again."); // Set error message for UI feedback
      }
    };

    fetchUserData(); // Call the fetchUserData function
  }, []); // Empty dependency array to run only on component mount

  return (
    <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-md"> {/* Container for the profile page */}
      <DashboardNavbar /> {/* Render the Dashboard Navbar component */}
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">User Profile</h1> {/* Profile heading */}

      {error && <p className="text-red-500 text-center">{error}</p>} {/* Show error message if it exists */}

      {userData ? ( // Check if userData is available
        <div className="bg-white p-4 rounded-lg shadow-md"> {/* Container for user details */}
          <p className="text-xl font-semibold text-gray-700">Username: <span className="font-normal">{userData.Username}</span></p> {/* Display username */}
          <p className="text-xl font-semibold text-gray-700">Email: <span className="font-normal">{userData.Email}</span></p> {/* Display email */}
          <p className="text-xl font-semibold text-gray-700">Phone Number: <span className="font-normal">{userData.Phone_Number}</span></p> {/* Display phone number */}
          <p className="text-xl font-semibold text-gray-700">ID: <span className="font-normal">{userData._id}</span></p> {/* Display user ID */}
          {/* Add additional profile details here */}
        </div>
      ) : (
        <p className="text-center text-gray-500">Loading user data...</p> // Show loading message while fetching data
      )}
    </div>
  );
};

// Export the Profile component
export default Profile;
