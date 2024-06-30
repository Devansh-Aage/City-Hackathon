import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ComplaintList from "./ComplaintList";
import ComplaintForm from "./ComplaintForm";
import "../App.css";
import "./Login.css";
import "./Register.css";
import "./Home.css";
import "./ComplaintList.css";
import "./ComplaintForm.css";

const Home = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/");
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/auth/getuser", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        });
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user:", error);
        // Handle error (redirect, show message, etc.)
      }
    };

    fetchUser();
  }, [navigate]);

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
        <ComplaintForm />
        <ComplaintList />
      </div>
    </div>
  );
};

export default Home;
