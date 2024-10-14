// src/components/Profile.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DashboardNavbar from './DashboardNavbar'; // Import the Dashboard Navbar

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Get the auth token from local storage
        const token = localStorage.getItem("token");

        // Check if token is present
        if (!token) {
          setError("No authentication token found. Please log in.");
          return;
        }

        // Make API call to fetch user data
        const response = await axios.post('http://localhost:5000/api/auth/getuser', null, {
          headers: {
            'auth-token': token, // Set auth token in headers
          },
        });

        // Set user data to state
        setUserData(response.data);
      } catch (err) {
        console.error("Error fetching user data:", err);
        //setError("Failed to fetch user data. Please try again.");
      }
    };

    fetchUserData();
  }, []); // Empty dependency array to run only on component mount

  return (
    <div className="container mx-auto p-6">
      <DashboardNavbar /> {/* Show the Dashboard Navbar */}
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>

      {error && <p className="text-red-500">{error}</p>} {/* Show error if exists */}

      {userData ? ( // Check if userData is available
        <div>
          <p className="text-lg font-medium">Username: {userData.Username}</p>
          <p className="text-lg">Email: {userData.Email}</p>
          <p className="text-lg">Phone Number: {userData.Phone_Number}</p>
          <p className="text-lg">ID: {userData._id}</p>
          {/* Add additional profile details here */}
        </div>
      ) : (
        <p>Loading user data...</p> // Show loading message while fetching data
      )}
    </div>
  );
};

export default Profile;
