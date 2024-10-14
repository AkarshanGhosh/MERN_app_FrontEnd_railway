// Dashboard.js
import React from "react";

const Dashboard = () => {
  return (
    <div className="flex flex-col min-h-screen"> {/* Ensures the container fills the screen */}
      <div className="flex-grow p-4"> {/* Allow this section to grow and push the footer down */}
        <h2 className="text-2xl font-bold mb-4">Welcome to the Dashboard!</h2>
        {/* Notice box */}
        <div className="bg-yellow-200 p-4 rounded-md shadow-md mt-4">
          No emergency brakes are applied on the train.
        </div>
      </div>
      <footer className="bg-gray-800 p-4 text-center text-gray-300">
        <p className="text-sm md:text-base">&copy; 2024 Akarshan Ghosh</p>
        <p className="text-sm md:text-base">Phone: +123 456 7890</p>
        <p className="text-sm md:text-base">Email: akarshan.ghosh@example.com</p>
      </footer>
    </div>
  );
};

export default Dashboard;
