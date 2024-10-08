import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from './components/navbar';
import Home from './components/home';
import SignUp from './components/signup';
import SignIn from './components/signin'; // Make sure this path is correct

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/signin" element={<SignIn />} />
      </Routes>
    </Router>
  );
}

export default App;
