import React, { useEffect, useState } from 'react'; // Import React and hooks
import { useParams } from 'react-router-dom'; // Import useParams to access route parameters

const Train = () => {
  const { trainNumber } = useParams(); // Destructure trainNumber from the route parameters
  const [trainDetails, setTrainDetails] = useState(null); // State to hold train details
  const [loading, setLoading] = useState(true); // State to track loading
  const [error, setError] = useState(null); // State to track errors

  useEffect(() => {
    const fetchTrainDetails = async () => {
      try {
        const response = await fetch(`/api/train/details/${trainNumber}`); // Adjust the endpoint accordingly
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTrainDetails(data); // Assuming the data structure matches
      } catch (error) {
        setError(error.message); // Set error message
      } finally {
        setLoading(false); // Set loading to false after fetch
      }
    };

    fetchTrainDetails();
  }, [trainNumber]); // Fetch details when trainNumber changes

  if (loading) {
    return <div className="text-center">Loading...</div>; // Loading state
  }

  if (error) {
    return <div className="text-center text-red-600">{error}</div>; // Error state
  }

  return (
    <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Train Details</h1> {/* Train details heading */}
      
      <div className="bg-white p-4 rounded-lg shadow-md">
        <p className="text-center text-gray-700">Details for Train Number: {trainNumber}</p> {/* Display the train number */}
        {/* Display additional train details here */}
        {trainDetails && (
          <div>
            <p className="text-center text-gray-700">Train Name: {trainDetails.Train_Name}</p>
            {/* Add more fields as necessary */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Train; // Export the Train component
