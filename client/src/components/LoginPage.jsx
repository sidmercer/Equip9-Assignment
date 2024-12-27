import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apple from "./Images/AppleIcon.png";
import facebook from "./Images/facebookIcon.png";
import google from "./Images/GoogleIcon.png";

const LoginPage = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const loginData = { mobileNumber, password };

    try {
      const response = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Login successful!");
        // Navigate to a landing page or dashboard
        navigate("/home", { state: { firstName: result.firstName, lastName: result.lastName } });
      } else {
        alert(result.error);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div
      className="flex items-center justify-center h-screen"
      style={{
        background: "linear-gradient(135deg, #ffffff, #a9a9a9, #000000)",
      }}
    >
      <div className="w-full max-w-lg p-8 bg-white shadow-2xl rounded-xl">
        <h1 className="text-4xl font-extrabold mb-6 text-gray-900 text-center">Login</h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="text-left">
            <label className="block text-lg font-semibold text-gray-700">Mobile Number</label>
            <input
              type="text"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              placeholder="Enter your mobile number"
              className="w-full mt-2 border border-gray-300 rounded-lg shadow-md focus:ring-gray-500 focus:border-gray-500 p-3 text-gray-900"
              required
            />
          </div>
          <div className="text-left">
            <label className="block text-lg font-semibold text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full mt-2 border border-gray-300 rounded-lg shadow-md focus:ring-gray-500 focus:border-gray-500 p-3 text-gray-900"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gray-800 text-white py-3 rounded-lg font-medium text-lg hover:bg-gray-900 transition duration-300 shadow-lg"
          >
            Login
          </button>
        </form>
         {/* Divider */}
        <div className="my-6 flex items-center justify-center">
          <span className="flex-grow border-t border-gray-300"></span>
          <span className="text-sm text-gray-500 px-2">OR</span>
          <span className="flex-grow border-t border-gray-300"></span>
        </div>

        {/* Social Logins */}
        <div className="flex justify-between space-x-4">
          <button className="flex items-center justify-center w-1/3 px-4 py-3 border rounded-lg hover:bg-gray-100 transition duration-300 shadow-md">
            <img
              src={google}
              alt="Google"
              className="h-6 w-6 mr-2"
            />
            Google
          </button>
          <button className="flex items-center justify-center w-1/3 px-4 py-3 border rounded-lg hover:bg-gray-100 transition duration-300 shadow-md">
            <img
              src={facebook}
              alt="Facebook"
              className="h-6 w-6 mr-2"
            />
            Facebook
          </button>
          <button className="flex items-center justify-center w-1/3 px-4 py-3 border rounded-lg hover:bg-gray-100 transition duration-300 shadow-md">
            <img
              src={apple}
              alt="Apple"
              className="h-6 w-6 mr-2"
            />
            Apple
          </button>
        </div>
        <p className="mt-6 text-center text-gray-800">
          Don’t have an account?{" "}
          <a href="/" className="text-blue-400 font-bold hover:text-blue-700">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
