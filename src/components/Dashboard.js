import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow p-4">
        <h2 className="text-2xl font-bold mb-4">Welcome to the Dashboard!</h2>

        {/* Notice box */}
        <div className="bg-yellow-200 p-4 rounded-md shadow-md mt-4">
          No emergency brakes are applied on the train.
        </div>

        {/* Link to train details */}
        <div className="mt-4">
          <Link to="/train" className="text-blue-600 hover:underline">
            Go to Train Details
          </Link>
        </div>
      </div>
      
      {/* Curved footer */}
      <footer className="bg-gray-800 p-4 text-center text-gray-300 relative">
        <div className="absolute -top-5 left-0 w-full h-8 bg-gray-800 rounded-t-full"></div>
        <p className="text-sm md:text-base">&copy; 2024 Akarshan Ghosh</p>
        <p className="text-sm md:text-base">Phone: +91 .....</p>
        <p className="text-sm md:text-base">Email: akarshanghosh123@gmail.com</p>
      </footer>
    </div>
  );
};

export default Dashboard;
