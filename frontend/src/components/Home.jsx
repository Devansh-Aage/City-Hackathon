// Home.js
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ComplaintList from "./ComplaintList";
import ComplaintForm from "./ComplaintForm";
import "../App.css";
import "./Login.css";
import "./Register.css";
import "./Home.css";
import "./ComplaintList.css";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

const Home = ({user}) => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  const goToMapPage = () => {
    navigate("/map");
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <div className="w-full flex justify-between items-center p-4 sticky top-0 z-50">
        <Navbar />
        {user && (
          <div className="hidden lg:flex items-center gap-4 bg-purple-50 rounded-lg p-2">
            <div className="text-base font-semibold">{user?.name}</div>
            <button
              onClick={logout}
              className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          </div>
        )}
      </div>
      <div className="mt-5 w-4/5">
        {!user?.isAdmin && <ComplaintForm user={user} />}
        <ComplaintList user={user} />
      </div>
    </div>
  );
};

export default Home;
