

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Leaf, Eye, EyeOff } from "lucide-react";
import api from "../services/api";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/auth/login", form);
      const data = response.data;

      const token = data.access_token || data.token;
      if (!token) {
        throw new Error("Login response did not contain an access token.");
      }

      localStorage.setItem("token", token);
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.detail ||
        err.message ||
        "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-decoration login-decoration-one"></div>
      <div className="login-decoration login-decoration-two"></div>

      <div className="login-container">
        <div className="login-brand">
          <div className="login-logo">
            <Leaf size={30} />
          </div>
          <h2>NutriCare</h2>
          <p>Your health, our priority</p>
        </div>

        <div className="login-card">
          <div className="login-heading">
            <h1>Welcome Back</h1>
            <p>Login to your nutrition account</p>
          </div>

          {error && <div className="login-error">{error}</div>}

          <form onSubmit={handleLogin}>
            <label>Email Address</label>
            <div className="login-input-group">
              <Mail size={19} />
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <label>Password</label>
            <div className="login-input-group">
              <Lock size={19} />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
              </button>
            </div>

            <button className="login-button" type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="login-register">
            Don't have an account? <Link to="/register">Register</Link>
          </div>
        </div>

        <p className="login-footer">
          Eat Healthy. Stay Healthy. Live Better.
        </p>
      </div>
    </div>
  );
}
