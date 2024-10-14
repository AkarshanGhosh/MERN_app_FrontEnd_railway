import "./App.css"; // Importing global CSS styles
import React, { useEffect } from 'react'; // Import React and useEffect hook
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"; // Import routing components from React Router
import { connectWebSocket } from './utils/websocket'; // Import the WebSocket function for real-time communication
import Navbar from "./components/navbar"; // Import the original Navbar component
import DashboardNavbar from "./components/DashboardNavbar"; // Import the DashboardNavbar component
import Home from "./components/home"; // Import the Home component
import SignUp from "./components/signup"; // Import the SignUp component
import SignIn from "./components/signin"; // Import the SignIn component
import Contact from "./components/Contact"; // Import the Contact component
import Dashboard from "./components/Dashboard"; // Import the Dashboard component
import Profile from "./components/Profile"; // Import the Profile component
import Train from "./components/Train"; // Import the Train component

// Define the main App component
function App() {
  useEffect(() => {
    connectWebSocket(); // Establish WebSocket connection when the component mounts
  }, []); // Empty dependency array ensures this runs only once on mount
  
  // Check if user is authenticated by checking for a token in local storage
  const isAuthenticated = localStorage.getItem("token") !== null; // true if token exists
  const location = useLocation(); // Get the current location to determine which navbar to display

  return (
    <>
      {/* Conditionally render Navbar and DashboardNavbar based on current location */}
      {location.pathname !== '/profile' && location.pathname !== '/dashboard' && location.pathname !== '/train' && <Navbar />} {/* Show original Navbar if not on Profile, Dashboard, or Train */}
      {(location.pathname === '/dashboard' || location.pathname === '/train') && <DashboardNavbar />} {/* Render DashboardNavbar only on the Dashboard and Train pages */}
      
      <div className="container"> {/* Main container for the application */}
        <Routes> {/* Define application routes */}
          <Route exact path="/" element={<Home />} /> {/* Home route */}
          <Route exact path="/signup" element={<SignUp />} /> {/* SignUp route */}
          <Route exact path="/signin" element={<SignIn />} /> {/* SignIn route */}
          <Route exact path="/contact" element={<Contact />} /> {/* Contact route */}
          <Route exact path="/dashboard" element={isAuthenticated ? <Dashboard /> : <SignIn />} /> {/* Dashboard route, redirect to SignIn if not authenticated */}
          <Route exact path="/profile" element={isAuthenticated ? <Profile /> : <SignIn />} /> {/* Profile route, redirect to SignIn if not authenticated */}
          <Route exact path="/train" element={isAuthenticated ? <Train /> : <SignIn />} /> {/* Train route, redirect to SignIn if not authenticated */}
        </Routes>
      </div>
    </>
  );
}

// Wrap the App component with Router to enable routing
export default function WrappedApp() {
  return (
    <Router> {/* Provides routing context to the App */}
      <App /> {/* Render the main App component */}
    </Router>
  );
}
