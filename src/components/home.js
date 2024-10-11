// home.js
import React from 'react';

const Home = () => {
  return (
    <div className="flex flex-col justify-between min-h-screen bg-gray-100">
      <div className="flex items-center justify-center flex-grow">
        <div className="w-full max-w-md bg-blue-100 p-8 rounded-2xl shadow-lg">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">Home</h2>
          <p className="text-center text-gray-700">Login to access</p>
        </div>
      </div>
      <footer className="bg-gray-200 p-4 text-center text-gray-700">
        <p>&copy; 2024 Akarshan Ghosh</p>
        <p>Phone: +123 456 7890</p>
        <p>Email: akarshan.ghosh@example.com</p>
      </footer>
    </div>
  );
};

export default Home;
