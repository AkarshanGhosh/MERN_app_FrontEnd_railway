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
      <footer className="bg-gray-800 p-4 text-center text-gray-300 rounded-t-2xl">
        <p>&copy; 2024 Akarshan Ghosh</p>
        <p className="text-sm md:text-base">Phone: +91 .....</p>
        <p className="text-sm md:text-base">Email: akarshanghosh28@gmail.com</p>
      </footer>
    </div>
  );
};

export default Home;
