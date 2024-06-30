import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const ComplaintList = ({ user }) => {
  const [complaints, setComplaints] = useState([]);
  const [reviewText, setReviewText] = useState("");

  const navigate = useNavigate();

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

      const updatedComplaint = await response.json();
      const updatedComplaints = complaints.map((complaint) =>
        complaint._id === id
          ? { ...complaint, upvotes: [...complaint.upvotes, user._id] }
          : complaint
      );
      setComplaints(updatedComplaints);
    } catch (error) {
      console.error("Error upvoting complaint:", error);
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
          body: JSON.stringify({ review: reviewText }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to review complaint");
      }

      const updatedComplaint = await response.json();
      const updatedComplaints = complaints.map((complaint) =>
        complaint._id === id ? updatedComplaint.complaint : complaint
      );
      setComplaints(updatedComplaints);
      setReviewText("");
    } catch (error) {
      console.error("Error reviewing complaint:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="w-full h-full">
      <div className="">
        <h2 className="text-center mb-4 text-xl font-bold">Complaints</h2>
        <ul className="list-none max-w-[70vw] mx-auto">
          {complaints.map((complaint) => (
            <li
              key={complaint._id}
              className="bg-white border border-gray-300 rounded-lg p-4 mb-4"
            >
              <h3 className="text-lg font-semibold">{complaint.title}</h3>
              <p className="text-gray-700">{complaint.desc}</p>
              <p className="text-sm text-gray-500">
                Status: {complaint.status}
              </p>
              <p className="text-sm text-gray-500">
                Department: {complaint.dept}
              </p>
              {!user?.isAdmin && (
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => handleUpvote(complaint._id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Upvote
                  </button>
                  <span className="text-gray-700">
                    {complaint.upvotes.length} Upvotes
                  </span>
                </div>
              )}
              {complaint.review && (
                <div className="mt-2">
                  <h4 className="font-medium">Review:</h4>
                  <p className="text-gray-700">{complaint.review}</p>
                </div>
              )}
              {user?.isAdmin && complaint.status !== "Responded" && (
                <div className="mt-2">
                  <textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Enter review here"
                    className="w-full border border-gray-300 rounded p-2 mb-2"
                  />
                  <button
                    onClick={() => handleReview(complaint._id)}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  >
                    Review Complaint
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ComplaintList;
