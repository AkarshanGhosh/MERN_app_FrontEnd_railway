import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { TrainProvider } from './TrainContext'; // Import the TrainProvider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <TrainProvider> {/* Wrap your App with TrainProvider */}
      <App />
    </TrainProvider>
  </React.StrictMode>
);

reportWebVitals();
