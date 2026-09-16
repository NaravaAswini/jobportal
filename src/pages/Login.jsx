import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!formData.email.trim() || !formData.password.trim()) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const user = await loginUser(
        formData.email.trim(),
        formData.password
      );

      localStorage.setItem("user", JSON.stringify(user));

      // Redirect based on user role
      if (user.role === "recruiter") {
        navigate("/add-job");
      } else {
        navigate("/jobs");
      }

    } catch (error) {
      console.error("Login error:", error);

      if (error.message === "Invalid email or password") {
        setError("Invalid email or password.");
      } else {
        setError(
          "Unable to connect to server. Please make sure JSON Server is running."
        );
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      <style>{`

        * {
          box-sizing: border-box;
        }

        .login-page {
          min-height: calc(100vh - 72px);
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 50px 20px;

          background:
            linear-gradient(
              135deg,
              rgba(15, 23, 42, 0.92),
              rgba(30, 64, 175, 0.82)
            ),
            url("https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=2000&q=85");

          background-size: cover;
          background-position: center;
          background-attachment: fixed;
        }

        .login-container {
          width: 100%;
          max-width: 440px;
        }

        .login-card {
          width: 100%;
          padding: 42px;
          border-radius: 24px;
          background: rgba(255, 255, 255, 0.97);

          box-shadow:
            0 25px 70px rgba(0, 0, 0, 0.35),
            0 0 0 1px rgba(255, 255, 255, 0.2);

          animation: loginCard 0.6s ease;
        }

        .login-icon {
          width: 64px;
          height: 64px;
          margin: 0 auto 20px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 18px;

          background: linear-gradient(
            135deg,
            #2563eb,
            #06b6d4
          );

          color: white;
          font-size: 28px;

          box-shadow:
            0 12px 30px rgba(
              37,
              99,
              235,
              0.3
            );
        }

        .login-card h1 {
          margin: 0;
          text-align: center;
          color: #0f172a;
          font-size: 32px;
          font-weight: 800;
        }

        .login-subtitle {
          margin: 10px 0 30px;
          text-align: center;
          color: #64748b;
          font-size: 15px;
        }

        .error-message {
          margin-bottom: 20px;
          padding: 13px 15px;
          border-radius: 10px;
          background: #fef2f2;
          border: 1px solid #fecaca;
          color: #dc2626;
          font-size: 14px;
          line-height: 1.5;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          margin-bottom: 8px;
          color: #1e293b;
          font-size: 14px;
          font-weight: 700;
        }

        .form-group input {
          width: 100%;
          height: 52px;
          padding: 0 16px;
          border: 1px solid #dbe3ef;
          border-radius: 12px;
          outline: none;
          background: #f8fafc;
          color: #0f172a;
          font-size: 15px;
          transition: all 0.2s ease;
        }

        .form-group input::placeholder {
          color: #94a3b8;
        }

        .form-group input:focus {
          background: white;
          border-color: #2563eb;

          box-shadow:
            0 0 0 4px rgba(
              37,
              99,
              235,
              0.12
            );
        }

        .forgot-row {
          display: flex;
          justify-content: flex-end;
          margin-top: -5px;
          margin-bottom: 22px;
        }

        .forgot-link {
          color: #2563eb;
          text-decoration: none;
          font-size: 14px;
          font-weight: 700;
        }

        .forgot-link:hover {
          text-decoration: underline;
        }

        .login-btn {
          width: 100%;
          height: 52px;
          border: none;
          border-radius: 12px;

          background: linear-gradient(
            135deg,
            #2563eb,
            #06b6d4
          );

          color: white;
          font-size: 16px;
          font-weight: 800;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .login-btn:hover {
          transform: translateY(-2px);

          box-shadow:
            0 14px 30px rgba(
              37,
              99,
              235,
              0.3
            );
        }

        .login-btn:active {
          transform: translateY(0);
        }

        .login-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }

        .login-footer {
          margin-top: 25px;
          text-align: center;
          color: #64748b;
          font-size: 14px;
        }

        .login-footer a {
          color: #2563eb;
          font-weight: 800;
          text-decoration: none;
        }

        .login-footer a:hover {
          text-decoration: underline;
        }

        @keyframes loginCard {

          from {
            opacity: 0;
            transform: translateY(25px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }

        }

        @media (max-width: 600px) {

          .login-page {
            padding: 30px 15px;
          }

          .login-card {
            padding: 32px 22px;
          }

          .login-card h1 {
            font-size: 28px;
          }

        }

      `}</style>

      <div className="login-container">

        <div className="login-card">

          <div className="login-icon">
            🔐
          </div>

          <h1>Welcome Back</h1>

          <p className="login-subtitle">
            Sign in to continue to JobPortal
          </p>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            <div className="form-group">

              <label htmlFor="email">
                Email Address
              </label>

              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                autoComplete="email"
                required
              />

            </div>


            <div className="form-group">

              <label htmlFor="password">
                Password
              </label>

              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                autoComplete="current-password"
                required
              />

            </div>


            <div className="forgot-row">

              <Link
                to="/forgot-password"
                className="forgot-link"
              >
                Forgot Password?
              </Link>

            </div>


            <button
              type="submit"
              className="login-btn"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Login"}
            </button>

          </form>


          <div className="login-footer">

            Don't have an account?{" "}

            <Link to="/register">
              Create Account
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;