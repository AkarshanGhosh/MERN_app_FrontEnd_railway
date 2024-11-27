import React, { useEffect, useState } from 'react'; // Import React and hooks for state and lifecycle management
import { useTrain } from '../TrainContext'; // Import custom hook to access train context
import { useParams } from 'react-router-dom'; // Import useParams for route parameters

const Coach = () => {
    const { selectedTrain } = useTrain(); // Access the selected train number from context
    const { coachId } = useParams(); // Get the coach ID from the URL
    const [trainData, setTrainData] = useState([]); // State to hold train data
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    useEffect(() => {
        // Function to fetch train data from the backend API
        const fetchTrainData = async () => {
            if (selectedTrain && coachId) { // Check if both train number and coach ID are available
                try {
                    // Fetch data from the API with the selected train number and coach ID
                    const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/train/fetch?trainNumber=${selectedTrain}&coach=${coachId}`);
                    const data = await response.json(); // Convert response to JSON

                    // Check if the data contains train information
                    if (data && data.trains) {
                        setTrainData(data.trains); // Set fetched train data
                    } else {
                        setTrainData([]); // Reset train data if no data is found
                    }
                } catch (error) {
                    console.error('Error fetching train data:', error);
                    setError('Error fetching data.'); // Set error message
                } finally {
                    setLoading(false); // Set loading to false
                }
            }
        };

        fetchTrainData(); // Fetch data on mount

        // Set an interval to refresh data every 10 seconds
        const intervalId = setInterval(() => {
            fetchTrainData(); // Refresh train data
        }, 10000); // 10000 ms = 10 seconds

        // Hide Navbar when in Coach component
        document.body.classList.add('hide-navbar');

        // Cleanup function to remove the class when the component unmounts
        return () => {
            document.body.classList.remove('hide-navbar'); // Remove class on unmount
            clearInterval(intervalId); // Clear the interval on unmount
        };
    }, [selectedTrain, coachId]); // Dependencies: re-run effect when selectedTrain or coachId changes

    return (
        <div className="container mx-auto my-4"> {/* Main container for the component */}
            <h1 className="text-2xl font-bold mb-4">Coach Details for Coach ID: {coachId}</h1>
            {/* Add a download button styled to the right */}
            <div className="flex justify-end mb-4">
                <button className="bg-blue-600 text-white px-4 py-2 rounded transition duration-300 ease-in-out hover:bg-blue-500 hover:shadow-lg">
                    Download
                </button>
            </div>
            {loading ? (
                <p className="text-center">Loading...</p> // Show loading text while fetching data
            ) : error ? (
                <p className="text-red-500 text-center">{error}</p> // Show error message if any
            ) : trainData.length > 0 ? (
                <div className="overflow-x-auto"> {/* Make the table scrollable */}
                    <table className="min-w-full border-collapse border border-gray-300">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 px-4 py-2">Train Number</th>
                                <th className="border border-gray-300 px-4 py-2">Coach</th>
                                <th className="border border-gray-300 px-4 py-2">Latitude</th>
                                <th className="border border-gray-300 px-4 py-2">Longitude</th>
                                <th className="border border-gray-300 px-4 py-2">Chain Status</th>
                                <th className="border border-gray-300 px-4 py-2">Temperature</th>
                                <th className="border border-gray-300 px-4 py-2">Date</th> {/* New Date column */}
                                <th className="border border-gray-300 px-4 py-2">Time</th> {/* New Time column */}
                            </tr>
                        </thead>
                        <tbody>
                            {trainData.map((train, index) => (
                                <tr key={index} className="border-b">
                                    <td className="border border-gray-300 px-4 py-2">{train.trainNumber}</td>
                                    <td className="border border-gray-300 px-4 py-2">{train.coach}</td>
                                    <td className="border border-gray-300 px-4 py-2">{train.latitude}</td>
                                    <td className="border border-gray-300 px-4 py-2">{train.longitude}</td>
                                    <td className="border border-gray-300 px-4 py-2">{train.chain_status}</td>
                                    <td className="border border-gray-300 px-4 py-2">{train.temperature}</td>
                                    <td className="border border-gray-300 px-4 py-2">{train.date || 'N/A'}</td> {/* Fetch date from API response */}
                                    <td className="border border-gray-300 px-4 py-2">{train.time || 'N/A'}</td> {/* Fetch time from API response */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-center">No data found for this coach.</p> // Message when no data is available
            )}
        </div>
    );
};

export default Coach; // Export the Coach component
