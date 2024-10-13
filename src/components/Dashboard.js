// src/components/Dashboard.js
import React from 'react';
import DashboardNavbar from './DashboardNavbar'; // Ensure this line is correct

const Dashboard = () => {
  return (
    <div>
      <DashboardNavbar />
      <div className="p-4">
        <h2>Welcome to the Dashboard!</h2>
        {/* Notice box */}
        <div className="bg-yellow-200 p-4 rounded-md shadow-md mt-4">
          No emergency brakes are applied on the train.
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
