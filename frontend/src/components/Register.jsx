import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [dept, setDept] = useState(""); // New state for department
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      isAdmin
        ? "http://localhost:5000/api/auth/createadmin"
        : "http://localhost:5000/api/auth/createuser",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          isAdmin,
          dept: isAdmin ? dept : "", // Pass department only if isAdmin is true
        }),
      }
    );
    const data = await response.json();
    if (data.success) {
      localStorage.setItem("token", data.authToken);
      navigate("/home");
    } else {
      alert("Registration failed: " + data.error);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2 className="register-title">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Email address:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {isAdmin && ( // Display department field only if isAdmin is true
            <div className="form-group">
              <label>Department:</label>
              <select
                value={dept}
                onChange={(e) => setDept(e.target.value)}
                required
              >
                <option value="">Select Department</option>
                <option value="road">road</option>
                <option value="water">water</option>
              </select>
            </div>
          )}
          <div className="form-group">
            <label>Role:</label>
            <select
              value={isAdmin ? "admin" : "user"}
              onChange={(e) => setIsAdmin(e.target.value === "admin")}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button type="submit" className="register-button">
            Submit
          </button>
        </form>
        <p className="login-link">
          Already have an account? <Link to="/">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
