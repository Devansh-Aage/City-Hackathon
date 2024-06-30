// ComplaintForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ComplaintForm.css";

const ComplaintForm = ({ user }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [dept, setDept] = useState("road"); // Default department

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
      // Redirect to home or show success message
      navigate("/home");
    } catch (error) {
      console.error("Error adding complaint:", error);
      // Handle error (show error message, retry mechanism, etc.)
    }
  };

  return (
    <div className="complaint-form">
      <h2>Add Complaint</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label>Department:</label>
          <select value={dept} onChange={(e) => setDept(e.target.value)}>
            <option value="road">Road</option>
            <option value="water">Water</option>
            {/* Add other department options as needed */}
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ComplaintForm;
