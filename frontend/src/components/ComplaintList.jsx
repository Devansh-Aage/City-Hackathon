import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ComplaintList.css";

const ComplaintList = ({ user }) => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "http://localhost:5000/api/complaint/complaints",
          {
            headers: {
              "Content-Type": "application/json",
              "auth-token": token,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch complaints");
        }

        const data = await response.json();
        setComplaints(data);
      } catch (error) {
        console.error("Error fetching complaints:", error);
        // Handle error (show message, retry mechanism, etc.)
      }
    };

    fetchComplaints();
  }, []);

  const handleUpvote = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/complaint/upvote/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upvote complaint");
      }

      // Update local complaints state to reflect upvote
      const updatedComplaints = complaints.map((complaint) =>
        complaint._id === id
          ? { ...complaint, upvotes: [...complaint.upvotes, user._id] }
          : complaint
      );
      setComplaints(updatedComplaints);
    } catch (error) {
      console.error("Error upvoting complaint:", error);
      // Handle error (show message, retry mechanism, etc.)
    }
  };

  return (
    <div className="complaint-list">
      <h2>Complaints</h2>
      <ul>
        {complaints.map((complaint) => (
          <li key={complaint._id}>
            <h3>{complaint.title}</h3>
            <p>{complaint.desc}</p>
            <p>Status: {complaint.status}</p>
            <p>Department: {complaint.dept}</p>
            <div>
              <button onClick={() => handleUpvote(complaint._id)}>
                Upvote ({complaint.upvotes.length})
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ComplaintList;
