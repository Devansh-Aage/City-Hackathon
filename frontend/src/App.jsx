import {React, useEffect,useState} from "react";
import { BrowserRouter as Router, Routes, Route,useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import ComplaintList from "./components/ComplaintList";
import ComplaintForm from "./components/ComplaintForm";
import Welcome from "./Welcome";
import MapComponent from "./components/MapComponent";
import "./App.css";
import "./components/Login.css";
import "./components/Register.css";
import "./components/Home.css";
import "./components/ComplaintList.css";
import "./components/ComplaintForm.css";

function App() {

  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
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
        navigate("/login");
      }
    };

    fetchUser();
  }, []);
  return (
    <div className="min-h-screen overflow-x-hidden w-full bg-gradient-to-br from-fuchsia-800 via-fuchsia-600 to-pink-700">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Welcome />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home user={user} />} />
        <Route path="/complaints" element={<ComplaintList user={user} />} />
        <Route path="/addcomplaint" element={<ComplaintForm user={user} />} />
      </Routes>
    </div>
  );
}

export default App;
