import "./App.css"; // Importing global CSS styles
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { connectWebSocket } from './utils/websocket';
import Navbar from "./components/navbar"; // Main Navbar
import DashboardNavbar from "./components/DashboardNavbar"; // Dashboard Navbar
import Home from "./components/home"; // Home Component
import SignUp from "./components/signup"; // Sign Up Component
import SignIn from "./components/signin"; // Sign In Component
import Contact from "./components/Contact"; // Contact Component
import Dashboard from "./components/Dashboard"; // Dashboard Component
import Profile from "./components/Profile"; // Profile Component
import Train from "./components/Train"; // Train Component
import Coach from "./components/Coach"; // Coach Component (newly added)

function App() {
  useEffect(() => {
    connectWebSocket();
  }, []);
  
  const isAuthenticated = localStorage.getItem("token") !== null; // Check if user is authenticated
  const location = useLocation();

  console.log("Current location:", location.pathname); // Debugging line

  return (
    <>
      {/* Hide Main Navbar on specific routes */}
      {!(location.pathname === '/dashboard' || location.pathname === '/profile' || location.pathname.startsWith('/train') || location.pathname.startsWith('/coach')) && <Navbar />}
      
      {/* Show Dashboard Navbar on specific routes */}
      {(location.pathname === '/dashboard' || location.pathname.startsWith('/train') || location.pathname.startsWith('/coach')) && <DashboardNavbar />}
      
      <div className="container">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/signin" element={<SignIn />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/dashboard" element={isAuthenticated ? <Dashboard /> : <SignIn />} />
          <Route exact path="/profile" element={isAuthenticated ? <Profile /> : <SignIn />} />
          <Route exact path="/train/:trainNumber" element={isAuthenticated ? <Train /> : <SignIn />} />
          <Route exact path="/coach/:coachId" element={isAuthenticated ? <Coach /> : <SignIn />} /> {/* New route for Coach */}
        </Routes>
      </div>
    </>
  );
}

export default function WrappedApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}
