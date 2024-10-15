import React, { useEffect } from 'react';
import { useTrain } from '../TrainContext'; // Import useTrain hook
import { useLocation } from 'react-router-dom'; // Import useLocation to get current path

const Train = () => {
  const { selectedTrain } = useTrain(); // Access selectedTrain from the useTrain hook
  const location = useLocation();

  useEffect(() => {
    // Hide Navbar when in Train component
    if (location.pathname.startsWith('/train')) {
      document.body.classList.add('hide-navbar'); // Add a class to hide Navbar
    }

    const handleBeforeUnload = (event) => {
      const confirmationMessage = 'Reloading this page will remove all your data. Are you sure you want to continue?';
      event.returnValue = confirmationMessage; // Display confirmation message
      return confirmationMessage; // For some browsers
    };

    // Add event listener for beforeunload
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      // Cleanup: Remove class and event listener when leaving Train component
      document.body.classList.remove('hide-navbar');
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [location.pathname]);

  return (
    <div>
      <h1>Train Details for Train Number: {selectedTrain || 'N/A'}</h1>
      {/* Render additional train details as needed */}
    </div>
  );
};

export default Train;
