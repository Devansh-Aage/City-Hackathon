import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const MapComponent = () => {
  const [complaints, setComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [filterByDept, setFilterByDept] = useState("all");
  const [filterByStatus, setFilterByStatus] = useState("all");

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

  useEffect(() => {
    let filteredData = complaints;

    // Filter by department
    if (filterByDept !== "all") {
      filteredData = filteredData.filter(
        (complaint) => complaint.dept === filterByDept
      );
    }

    // Filter by status
    if (filterByStatus !== "all") {
      filteredData = filteredData.filter(
        (complaint) => complaint.status === filterByStatus
      );
    }

    setFilteredComplaints(filteredData);
  }, [complaints, filterByDept, filterByStatus]);

  // Function to determine marker color based on department
  const getMarkerColor = (dept) => {
    switch (dept) {
      case "road":
        return "red";
      case "water":
        return "blue";
      default:
        return "green";
    }
  };

  return (
    <div className="map-container">
      <div className="filters">
        <label>
          Filter by Department:
          <select
            value={filterByDept}
            onChange={(e) => setFilterByDept(e.target.value)}
          >
            <option value="all">All Departments</option>
            <option value="road">Road</option>
            <option value="water">Water</option>
            {/* Add more department options as needed */}
          </select>
        </label>

        <label>
          Filter by Status:
          <select
            value={filterByStatus}
            onChange={(e) => setFilterByStatus(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="Sent">Sent</option>
            <option value="Reviewed">Reviewed</option>
          </select>
        </label>
      </div>

      <MapContainer
        center={[19.1861, 72.9757]}
        zoom={12}
        style={{ width: "100%", height: "calc(100vh - 120px)" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {filteredComplaints.map((complaint) => (
          <Marker
            key={complaint._id}
            position={[
              parseFloat(complaint.latitude),
              parseFloat(complaint.longitude),
            ]}
            icon={L.icon({
              iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${getMarkerColor(
                complaint.dept
              )}.png`,
              iconSize: [25, 41],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34],
              shadowSize: [41, 41],
            })}
          >
            <Popup>
              <div>
                <h3>{complaint.title}</h3>
                <p>{complaint.desc}</p>
                <p>Status: {complaint.status}</p>
                {complaint.status === "Reviewed" && (
                  <p style={{ color: "red", fontWeight: "bold" }}>
                    REVIEWED Complaint
                  </p>
                )}
                {/* Add more details as needed */}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
