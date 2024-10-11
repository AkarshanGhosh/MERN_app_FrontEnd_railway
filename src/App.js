// App.js
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./components/home";
import SignUp from "./components/signup";
import SignIn from "./components/signin";
import Contact from "./components/Contact"; // Import the Contact component

function App() {
  return (
    <tableState>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/signin" element={<SignIn />} />
          <Route exact path="/contact" element={<Contact />} />{" "}
          {/* Add Contact route */}
        </Routes>
      </Router>
    </tableState>
  );
}

export default App;
