// App.js
import "./App.css";
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { connectWebSocket } from './utils/websocket'; // Import the WebSocket function
import Navbar from "./components/navbar";
import Home from "./components/home";
import SignUp from "./components/signup";
import SignIn from "./components/signin";
import Contact from "./components/Contact"; // Import the Contact component
import Dashboard from "./components/Dashboard"; // Import the Dashboard component

function App() {
  useEffect(() => {
    connectWebSocket(); // Establish WebSocket connection when component mounts
  }, []);
  
  const isAuthenticated = localStorage.getItem("token") !== null; // Check if user is authenticated
  const location = useLocation(); // Get the current location

  return (
    <>
      {location.pathname !== '/dashboard' && <Navbar />} {/* Render Navbar unless on Dashboard */}
      <div className="container">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/signin" element={<SignIn />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/dashboard" element={isAuthenticated ? <Dashboard /> : <SignIn />} />
        </Routes>
      </div>
    </>
  );
}

// Wrap the App component with Router
export default function WrappedApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}
