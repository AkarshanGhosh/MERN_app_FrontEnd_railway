import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null); // To store error messages
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ identifier, password });
    setError(null); // Reset error state on new submit

    // Construct the body based on whether identifier is an email or a phone number
    const body = {
      Email: identifier.includes('@') ? identifier : "", // If identifier contains '@', treat it as an email
      Phone_Number: !identifier.includes('@') ? identifier : "", // Otherwise, treat it as a phone number
      password,
    };

    try {
      const response = await fetch("${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body), // Send constructed body
      });

      const data = await response.json();
      

      if (response.ok) {
        // If login is successful, save the auth token and navigate to the dashboard
        localStorage.setItem("token", data.authToken); // Assuming you return a token
        localStorage.setItem("Username", data.Username); // Save the username
        navigate("/dashboard"); // Redirect to the dashboard
      } else {
        setError(data.error || "Failed to log in");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error("Error:", err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-blue-100 p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">Sign In</h2>
        {error && <p className="text-red-500 text-center">{error}</p>} {/* Display error message */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Email or Phone Number"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
            />
            <button 
              type="button"
              className="absolute right-3 top-3 text-gray-600 focus:outline-none"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          <button
            type="submit"
            className="w-full py-3 mt-4 text-white font-semibold bg-black rounded-md hover:bg-gray-800 transition-colors"
          >
            Sign In
          </button>
        </form>
        <div className="mt-4 flex justify-between">
          <Link to="/forgot-password" className="text-blue-600 hover:underline">
            Forgot Password?
          </Link>
        </div>
        <p className="mt-4 text-center text-gray-600">
          Don't have an account? <Link to="/signup" className="text-black font-semibold hover:underline">Create one</Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
