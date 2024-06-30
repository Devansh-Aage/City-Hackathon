// ComplaintForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const ComplaintForm = ({ user }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [dept, setDept] = useState("road");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:5000/api/complaint/addcomplaints",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({
            title,
            desc,
            dept,
            latitude: user.latitude,
            longitude: user.longitude,
          }),
        }
      );
      const data = await response.json();
      console.log("Complaint added:", data);
    } catch (error) {
      console.error("Error adding complaint:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="w-full h-full">
      <div className="mt-5 w-4/5 max-w-lg p-5  rounded-lg bg-white/20 backdrop-blur-md shadow-md mx-auto">
        <h2 className="text-center mb-5 text-2xl text-white font-semibold">
          Add Complaint
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white mb-2">Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-white mb-2">Description:</label>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded resize-y min-h-[100px]"
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-white mb-2">Department:</label>
            <select
              value={dept}
              onChange={(e) => setDept(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded appearance-none bg-no-repeat bg-right"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%232c3e50' viewBox='0 0 24 24'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E")`,
              }}
            >
              <option value="road">Road</option>
              <option value="water">Water</option>
              {/* Add other department options as needed */}
            </select>
          </div>
          <button
            type="submit"
            className="bg-pink-800 w-full font-semibold text-lg text-white px-5 py-2 rounded hover:bg-pink-700"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ComplaintForm;
