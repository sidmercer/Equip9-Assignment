import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [greeting, setGreeting] = useState("");
  const [user, setUser] = useState(null); // Store user details here
  const navigate = useNavigate();
  const firstName=localStorage.getItem("firstName");
  const lastName=localStorage.getItem("lastName");
  useEffect(() => {
    // Determine the greeting based on the current time
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting("Good Morning");
    } else if (hour < 18) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }

    // Fetch user details from the backend
    const fetchUser = async () => {
      const token = localStorage.getItem("authToken"); // Retrieve token from localStorage

      if (!token) {
        alert("Unauthorized access! Please log in.");
        navigate("/login");
        return;
      }

      try {
        
        const response = await fetch("http://localhost:3000/api/users/home", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Send token in Authorization header
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data)
          setUser(data); // Set user data in state
        } else {
          alert("Session expired. Please log in again.");
          navigate("/login");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Remove token from localStorage
    navigate("/login");
    alert("You have been logged out.");
  };

  return (
    <div
      className="flex items-center justify-center h-screen"
      style={{
        background: "linear-gradient(135deg, #ffffff, #a9a9a9, #000000)",
      }}
    >
      <div className="w-full max-w-lg p-8 bg-white shadow-2xl rounded-xl text-center">
        {user ? (
          <>
            <h1 className="text-4xl font-extrabold mb-6 text-gray-900">
              {greeting}, {firstName} {lastName}!
            </h1>
            <p className="text-lg text-gray-700 mb-6">
              Welcome to the application. Enjoy your experience.
            </p>
            <button
              onClick={handleLogout}
              className="w-full bg-gray-800 text-white py-3 rounded-lg font-medium text-lg hover:bg-gray-900 transition duration-300 shadow-lg"
            >
              Logout
            </button>
          </>
        ) : (
          <p className="text-lg text-gray-700">Loading user data...</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
