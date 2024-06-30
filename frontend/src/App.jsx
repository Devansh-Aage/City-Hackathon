import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
  return (
    <div className="h-screen overflow-hidden w-[100vw] bg-gradient-to-br from-fuchsia-800 via-fuchsia-600 to-pink-700">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Welcome />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/complaints" element={<ComplaintList />} />
        <Route path="/addcomplaint" element={<ComplaintForm />} />
        <Route path="/map" element={<MapComponent />} />
      </Routes>
    </div>
  );
}

export default App;
