import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "../../assets/Logo/Logo.png";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        loginForm,
      );

      const { token, user } = res.data;

      // 1. I-save ang token sa LocalStorage (para hindi ma-logout pag refresh)
      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);
      localStorage.setItem("lastName", user.lastName);
      localStorage.setItem("firstName", user.firstName);
      localStorage.setItem("middleName", user.middleName);

      const nameToSave = user.username || user.username || "User";
      localStorage.setItem("username", nameToSave);

      if (user.role === "admin") {
        alert("Welcome" + nameToSave);
        navigate("/AdminDashboard", { replace: true });
      } else {
        navigate("/HomeUser", { replace: true });
      }
    } catch (err) {
      console.error("Login Error:", err.response?.data || err.message);
      alert("Mali: " + (err.response?.data?.message || "Check connection"));
    }
    setLoginForm({
      username: "",
      password: "",
    });
  };
  return (
    <div className="login-container">
      <div className="login-card">
        {/* Left Side: Branding */}
        <div className="login-side-info">
          <img
            style={{ width: "80%" }}
            src={Logo}
            alt="Barangay Logo"
            className="login-logo"
          />
          <h2>PAPA BARANGAY</h2>
          <p>Rosario, Cavite</p>
          <div className="overlay"></div>
        </div>

        {/* Right Side: Form */}
        <div className="login-form-section">
          <form className="login-form" onSubmit={handleLogin}>
            <h2>Welcome Back</h2>
            <p>Mangyaring mag-login sa inyong account.</p>

            <div className="input-group">
              <label>Username</label>
              <input
                type="text"
                placeholder="Enter your username"
                value={loginForm.username}
                onChange={(e) =>
                  setLoginForm({ ...loginForm, username: e.target.value })
                }
                required
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={loginForm.password || ""}
                onChange={(e) =>
                  setLoginForm({ ...loginForm, password: e.target.value })
                }
                required
              />
            </div>

            <button type="submit" className="login-btn">
              Sign In
            </button>

            <div className="form-footer">
              <span>
                Wala pang account? <a href="/register">Register dito</a>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
