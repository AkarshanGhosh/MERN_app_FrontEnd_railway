// App.js
import "./App.css";
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { connectWebSocket } from './utils/websocket'; // Import the WebSocket function
import Navbar from "./components/navbar";
import Home from "./components/home";
import SignUp from "./components/signup";
import SignIn from "./components/signin";
import Contact from "./components/Contact"; // Import the Contact component

function App() {
  useEffect(() => {
    connectWebSocket(); // Establish WebSocket connection when component mounts
  }, []);

  return (
    <>
      <Router>
        <Navbar />
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/signup" element={<SignUp />} />
            <Route exact path="/signin" element={<SignIn />} />
            <Route exact path="/contact" element={<Contact />} />{" "}
            {/* Add Contact route */}
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
