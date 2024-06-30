// App.jsx

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import ComplaintList from "./components/ComplaintList";
import ComplaintForm from "./components/ComplaintForm";
import "./App.css";
import "./components/Login.css";
import "./components/Register.css";
import "./components/Home.css";
import "./components/ComplaintList.css";
import "./components/ComplaintForm.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/complaints" element={<ComplaintList />} />
        <Route path="/addcomplaint" element={<ComplaintForm />} />
      </Routes>
    </div>
  );
}

export default App;
