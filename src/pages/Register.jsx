import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "jobseeker"
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
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
    setSuccess("");

    const name = formData.name.trim();
    const email = formData.email.trim().toLowerCase();
    const password = formData.password;

    if (!name || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      await registerUser({
        name,
        email,
        password,
        role: formData.role
      });

      setSuccess(
        "Account created successfully! Redirecting to login..."
      );

      setFormData({
        name: "",
        email: "",
        password: "",
        role: "jobseeker"
      });

      setTimeout(() => {
        navigate("/login");
      }, 1200);

    } catch (error) {
      console.error("Registration error:", error);

      if (
        error.response &&
        error.response.status === 409
      ) {
        setError(
          "An account with this email already exists."
        );
      } else if (
        error.code === "ERR_NETWORK" ||
        !error.response
      ) {
        setError(
          "Unable to connect to JSON Server. Please start the backend on port 3000."
        );
      } else {
        setError(
          "Registration failed. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">

      <style>{`

        * {
          box-sizing: border-box;
        }

        .register-page {
          min-height: calc(100vh - 72px);
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 50px 20px;

          background:
            linear-gradient(
              rgba(2, 6, 23, 0.78),
              rgba(15, 23, 42, 0.88)
            ),
            url("https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=2000&q=85");

          background-size: cover;
          background-position: center;
          background-attachment: fixed;
        }

        .register-card {
          width: 100%;
          max-width: 500px;

          padding: 42px;

          background: rgba(255, 255, 255, 0.97);

          border-radius: 24px;

          box-shadow:
            0 30px 80px rgba(0, 0, 0, 0.35);

          animation: registerCardAnimation 0.6s ease;
        }

        .register-icon {
          width: 62px;
          height: 62px;

          margin: 0 auto 18px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 18px;

          background:
            linear-gradient(
              135deg,
              #2563eb,
              #06b6d4
            );

          color: white;

          font-size: 28px;

          box-shadow:
            0 12px 30px rgba(37, 99, 235, 0.3);
        }

        .register-card h1 {
          margin: 0;

          text-align: center;

          font-size: 32px;

          font-weight: 800;

          color: #0f172a;
        }

        .register-subtitle {
          text-align: center;

          color: #64748b;

          margin: 10px 0 30px;

          font-size: 15px;
        }

        .message {
          padding: 13px 15px;

          border-radius: 10px;

          margin-bottom: 20px;

          font-size: 14px;

          line-height: 1.5;
        }

        .error-message {
          background: #fef2f2;

          border: 1px solid #fecaca;

          color: #dc2626;
        }

        .success-message {
          background: #f0fdf4;

          border: 1px solid #bbf7d0;

          color: #15803d;
        }

        .form-group {
          margin-bottom: 19px;
        }

        .form-group label {
          display: block;

          margin-bottom: 8px;

          font-size: 14px;

          font-weight: 700;

          color: #334155;
        }

        .form-group input,
        .form-group select {
          width: 100%;

          height: 52px;

          padding: 0 16px;

          border: 1px solid #dbe3ef;

          border-radius: 12px;

          outline: none;

          font-size: 15px;

          color: #0f172a;

          background: #f8fafc;

          transition: all 0.25s ease;
        }

        .form-group input::placeholder {
          color: #94a3b8;
        }

        .form-group input:focus,
        .form-group select:focus {
          border-color: #2563eb;

          background: white;

          box-shadow:
            0 0 0 4px rgba(37, 99, 235, 0.1);
        }

        .register-btn {
          width: 100%;

          height: 53px;

          margin-top: 5px;

          border: none;

          border-radius: 12px;

          background:
            linear-gradient(
              135deg,
              #2563eb,
              #06b6d4
            );

          color: white;

          font-size: 16px;

          font-weight: 700;

          cursor: pointer;

          transition: all 0.25s ease;
        }

        .register-btn:hover {
          transform: translateY(-2px);

          box-shadow:
            0 14px 30px rgba(37, 99, 235, 0.3);
        }

        .register-btn:disabled {
          opacity: 0.65;

          cursor: not-allowed;

          transform: none;

          box-shadow: none;
        }

        .auth-footer {
          margin-top: 25px;

          text-align: center;

          color: #64748b;

          font-size: 14px;
        }

        .auth-footer a {
          color: #2563eb;

          font-weight: 700;

          text-decoration: none;

          margin-left: 4px;
        }

        .auth-footer a:hover {
          text-decoration: underline;
        }

        @keyframes registerCardAnimation {

          from {
            opacity: 0;

            transform:
              translateY(30px)
              scale(0.97);
          }

          to {
            opacity: 1;

            transform:
              translateY(0)
              scale(1);
          }

        }

        @media (max-width: 600px) {

          .register-page {
            padding: 30px 15px;
          }

          .register-card {
            padding: 30px 22px;

            border-radius: 20px;
          }

          .register-card h1 {
            font-size: 28px;
          }

        }

      `}</style>

      <div className="register-card">

        <div className="register-icon">
          🚀
        </div>

        <h1>Create Account</h1>

        <p className="register-subtitle">
          Join JobPortal and find your next opportunity
        </p>

        {error && (
          <div className="message error-message">
            {error}
          </div>
        )}

        {success && (
          <div className="message success-message">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <div className="form-group">

            <label>
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />

          </div>

          <div className="form-group">

            <label>
              Email Address
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />

          </div>

          <div className="form-group">

            <label>
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              minLength="6"
              required
            />

          </div>

          <div className="form-group">

            <label>
              Account Type
            </label>

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
            >

              <option value="jobseeker">
                Job Seeker
              </option>

              <option value="recruiter">
                Recruiter
              </option>

            </select>

          </div>

          <button
            type="submit"
            className="register-btn"
            disabled={loading}
          >

            {loading
              ? "Creating Account..."
              : "Create Account"}

          </button>

        </form>

        <div className="auth-footer">

          Already have an account?

          <Link to="/login">
            Login
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Register;