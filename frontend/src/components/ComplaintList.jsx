import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ComplaintList.css";

const ComplaintList = ({ user }) => {
  const [complaints, setComplaints] = useState([]);
  const [reviewText, setReviewText] = useState(""); // State to hold review text

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

      // Update local complaints state with the updated complaint
      const updatedComplaint = await response.json();
      const updatedComplaints = complaints.map((complaint) =>
        complaint._id === id ? updatedComplaint : complaint
      );
      setComplaints(updatedComplaints);
    } catch (error) {
      console.error("Error upvoting complaint:", error);
      // Handle error (show message, retry mechanism, etc.)
    }
  };

  const handleReview = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/complaint/reviewcomplaint/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
          body: JSON.stringify({ review: reviewText }), // Send review text
        }
      );

      if (!response.ok) {
        throw new Error("Failed to review complaint");
      }

      // Update local complaints state with the updated complaint
      const updatedComplaint = await response.json();
      const updatedComplaints = complaints.map((complaint) =>
        complaint._id === id ? updatedComplaint.complaint : complaint
      );
      setComplaints(updatedComplaints);

      // Clear review text after successful review
      setReviewText("");
    } catch (error) {
      console.error("Error reviewing complaint:", error);
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
            {!user.isAdmin && (
              <button onClick={() => handleUpvote(complaint._id)}>
                Upvote
              </button>
            )}
            {complaint.review && (
              <div>
                <h4>Review:</h4>
                <p>{complaint.review}</p>
              </div>
            )}
            {user.isAdmin && complaint.status !== "Responded" && (
              <div>
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Enter review here"
                />
                <button onClick={() => handleReview(complaint._id)}>
                  Review Complaint
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ComplaintList;
