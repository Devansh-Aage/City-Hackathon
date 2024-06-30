import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ComplaintList from "./ComplaintList";
import ComplaintForm from "./ComplaintForm";
import "../App.css";
import "./Login.css";
import "./Register.css";
import "./Home.css";
import "./ComplaintList.css";

const Home = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/");
          return;
        }

        const response = await fetch("http://localhost:5000/api/auth/getuser", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user");
        }

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user:", error);
        // Handle error (redirect, show message, etc.)
        navigate("/");
      }
    };

    fetchUser();
  }, []); // Empty dependency array ensures this effect runs once on mount

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="home-container">
      <div className="home-box">
        <h2 className="home-title">Home</h2>
        {user ? (
          <div>
            <h3 className="welcome-text">
              Welcome {user.isAdmin ? "Admin" : "User"}
            </h3>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
        <button className="logout-button" onClick={logout}>
          Logout
        </button>
      </div>
      <div className="complaint-section">
        {!user?.isAdmin && <ComplaintForm />}{" "}
        {/* Render ComplaintForm only if not admin */}
        <ComplaintList user={user} />
      </div>
    </div>
  );
};

export default Home;
