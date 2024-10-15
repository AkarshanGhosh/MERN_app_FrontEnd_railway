// src/TrainContext.js
import React, { createContext, useContext, useState } from 'react';

// Create the context
const TrainContext = createContext();

// Custom provider component
export const TrainProvider = ({ children }) => {
  const [selectedTrain, setSelectedTrain] = useState('');

  return (
    <TrainContext.Provider value={{ selectedTrain, setSelectedTrain }}>
      {children}
    </TrainContext.Provider>
  );
};

// Custom hook for using the context in other components
export const useTrain = () => {
  return useContext(TrainContext);
};
