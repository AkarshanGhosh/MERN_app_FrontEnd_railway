import React, { useState } from "react";

const Dashboard = () => {
  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [trains, setTrains] = useState([]);
  const [noDataMessage, setNoDataMessage] = useState("");

  const handleDivisionChange = (e) => {
    const division = e.target.value;
    setSelectedDivision(division);
    setSelectedCity(""); // Reset city when division changes
    setTrains([]); // Clear trains when division changes
    setNoDataMessage("");

    // Reset city options based on selected division
    if (division === "NFR") {
      setAvailableCities(["Guwahati"]); //Add citiess under NFR
    } else if (division === "ER") {
      setAvailableCities(["Kolkata", "Agartala"]); // Added Cities under ER
    } else {
      setAvailableCities([]);
    }
  };

  const handleCityChange = (e) => {
    const city = e.target.value;
    setSelectedCity(city);
    if (selectedDivision && city) {
      fetchTrains(selectedDivision, city);
    }
  };

  const fetchTrains = async (division, city) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/division/city?division=${division}&city=${city}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();

      if (data.trains && data.trains.length > 0) {
        setTrains(data.trains);
        setNoDataMessage("");
      } else {
        setTrains([]);
        setNoDataMessage("The service hasn't started in the respective location.");
      }
    } catch (error) {
      console.error("Error fetching trains:", error);
      setTrains([]);
      setNoDataMessage("The service hasn't started in the respective location.");
    }
  };

  const [availableCities, setAvailableCities] = useState([]); // State for available cities based on division

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow p-4">
        <h2 className="text-2xl font-bold mb-4">Welcome to the Dashboard!</h2>

        {/* Notice box */}
        <div className="bg-yellow-200 p-4 rounded-md shadow-md mt-4">
          No emergency brakes are applied on the train.
        </div>

        {/* Dropdown selectors for division and city */}
        <div className="flex space-x-4 mt-6">
          <select
            className="border border-gray-300 rounded-md px-2 py-1"
            value={selectedDivision}
            onChange={handleDivisionChange}
          >
            <option value="">Select Division</option>
            <option value="NFR">NFR</option>
            <option value="ER">ER</option>
          </select>

          <select
            className="border border-gray-300 rounded-md px-2 py-1"
            value={selectedCity}
            onChange={handleCityChange}
            disabled={!selectedDivision}
          >
            <option value="">Select City</option>
            {availableCities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        {/* Display selected options as tags */}
        <div className="mt-4 flex flex-wrap gap-2">
          {selectedDivision && (
            <span className="bg-blue-200 text-blue-700 py-1 px-3 rounded-full text-sm font-medium">
              {selectedDivision}
            </span>
          )}
          {selectedCity && (
            <span className="bg-green-200 text-green-700 py-1 px-3 rounded-full text-sm font-medium">
              {selectedCity}
            </span>
          )}
        </div>

        {/* Data display box for trains */}
        <div className="bg-gray-100 p-4 rounded-lg shadow-lg mt-8 w-full max-w-4xl mx-auto" style={{ maxHeight: '400px', overflowY: 'auto' }}>
          <h3 className="text-xl font-semibold mb-4">Train Data</h3>
          {trains.length > 0 ? (
            trains.map((train) => (
              <div key={train.Train_Number} className="border-b py-2">
                <p className="font-semibold">{train.Train_Name}</p>
                <p>Train Number: {train.Train_Number}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-700">{noDataMessage || "Please select the division and city to display the data."}</p>
          )}
        </div>
      </div>

      {/* Curved footer */}
      <footer className="bg-gray-800 p-4 text-center text-gray-300 relative">
        <div className="absolute -top-5 left-0 w-full h-8 bg-gray-800 rounded-t-full"></div>
        <p className="text-sm md:text-base">&copy; 2024 Akarshan Ghosh</p>
        <p className="text-sm md:text-base">Phone: +91 .......</p>
        <p className="text-sm md:text-base">Email: akarshanghosh28@gmail.com</p>
      </footer>
    </div>
  );
};

export default Dashboard;
