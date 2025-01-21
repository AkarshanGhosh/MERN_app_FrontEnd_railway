import React, { useEffect, useState } from 'react';
import { useTrain } from '../TrainContext';
import { useParams } from 'react-router-dom';

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
                    const response = await fetch(`https://51.20.2.163/api/train/fetch?trainNumber=${selectedTrain}&coach=${coachId}`);
                    const data = await response.json(); // Convert response to JSON

                    if (data && data.trains) {
                        setTrainData(data.trains); // Set fetched train data
                    } else {
                        setTrainData([]); // Reset train data if no data is found
                    }
                } catch (error) {
                    console.error('Error fetching train data:', error);
                    setError('Error fetching data.');
                } finally {
                    setLoading(false); // Set loading to false
                }
            }
        };

        fetchTrainData(); // Fetch data on mount

        // Refresh data every 10 seconds
        const intervalId = setInterval(() => {
            fetchTrainData();
        }, 10000);

        // Hide Navbar in Coach component
        document.body.classList.add('hide-navbar');

        // Cleanup function
        return () => {
            document.body.classList.remove('hide-navbar');
            clearInterval(intervalId); // Clear the interval on unmount
        };
    }, [selectedTrain, coachId]);

    // Download the data as a JSON file
    const handleDownload = () => {
        const fileName = `train_data_${coachId}.json`;
        const json = JSON.stringify(trainData, null, 2); // Format JSON data
        const blob = new Blob([json], { type: 'application/json' });
        const href = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = href;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="container mx-auto my-4">
            <h1 className="text-2xl font-bold mb-4">Coach Details for Coach ID: {coachId}</h1>
            <div className="flex justify-end mb-4">
                <button
                    onClick={handleDownload}
                    className="bg-blue-600 text-white px-4 py-2 rounded transition duration-300 ease-in-out hover:bg-blue-500 hover:shadow-lg"
                >
                    Download
                </button>
            </div>
            {loading ? (
                <p className="text-center">Loading...</p>
            ) : error ? (
                <p className="text-red-500 text-center">{error}</p>
            ) : trainData.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse border border-gray-300">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 px-4 py-2">Train Number</th>
                                <th className="border border-gray-300 px-4 py-2">Coach</th>
                                <th className="border border-gray-300 px-4 py-2">Latitude</th>
                                <th className="border border-gray-300 px-4 py-2">Longitude</th>
                                <th className="border border-gray-300 px-4 py-2">Chain Status</th>
                                <th className="border border-gray-300 px-4 py-2">Temperature</th>
                                <th className="border border-gray-300 px-4 py-2">Humidity</th>
                                <th className="border border-gray-300 px-4 py-2">Memory</th>
                                <th className="border border-gray-300 px-4 py-2">Error</th>
                                <th className="border border-gray-300 px-4 py-2">Date</th>
                                <th className="border border-gray-300 px-4 py-2">Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {trainData.map((train, index) => {
                                const [date, time] = train.date ? train.date.split('T') : ['N/A', 'N/A'];
                                return (
                                    <tr key={index} className="border-b">
                                        <td className="border border-gray-300 px-4 py-2">{train.trainNumber || 'N/A'}</td>
                                        <td className="border border-gray-300 px-4 py-2">{train.coach || 'N/A'}</td>
                                        <td className="border border-gray-300 px-4 py-2">{train.latitude || 'N/A'}</td>
                                        <td className="border border-gray-300 px-4 py-2">{train.longitude || 'N/A'}</td>
                                        <td className="border border-gray-300 px-4 py-2">{train.chain_status || 'N/A'}</td>
                                        <td className="border border-gray-300 px-4 py-2">{train.temperature || 'N/A'}</td>
                                        <td className="border border-gray-300 px-4 py-2">{train.humidity || 'N/A'}</td>
                                        <td className="border border-gray-300 px-4 py-2">{train.memory || 'N/A'}</td>
                                        <td className="border border-gray-300 px-4 py-2">{train.error || 'N/A'}</td>
                                        <td className="border border-gray-300 px-4 py-2">{date}</td>
                                        <td className="border border-gray-300 px-4 py-2">{time.replace('Z', '')}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-center">No data found for this coach.</p>
            )}
        </div>
    );
};

export default Coach;
