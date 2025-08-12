// client/src/pages/register.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:3001/auth/register", {
        username,
        password,
      });
      alert("Registration completed! Please login.");
      navigate("/auth"); // go to login (we keep /auth mapping to Login)
    } catch (error) {
      console.error(error);
      alert("Error during registration. Try again.");
    }
  };

  return (
    <div className="page-container">
      <div className="card">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="primary-btn">
            Register
          </button>
        </form>

        <p style={{ marginTop: "12px" }}>
          Already have an account?{" "}
          <Link to="/auth" className="link">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
