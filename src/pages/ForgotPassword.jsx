import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function ForgotPassword() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {

    e.preventDefault();

    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    try {

      setLoading(true);

      const response = await api.get(
        `/users?email=${encodeURIComponent(email)}`
      );

      if (response.data.length === 0) {

        setError("No account found with this email.");

        return;
      }

      const user = response.data[0];

      await api.patch(
        `/users/${user.id}`,
        {
          password: password
        }
      );

      setSuccess(
        "Password reset successfully. Redirecting to login..."
      );

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (error) {

      console.error(error);

      setError(
        "Unable to reset password. Please start JSON Server."
      );

    } finally {

      setLoading(false);

    }
  }

  return (

    <div className="auth-page">

      <div className="auth-overlay"></div>

      <div className="auth-card">

        <div className="auth-icon">
          🔑
        </div>

        <h1>Reset Password</h1>

        <p className="auth-subtitle">
          Create a new password for your account
        </p>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {success && (
          <div className="success-message">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <label>
            Email Address
          </label>

          <input
            type="email"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />

          <label>
            New Password
          </label>

          <input
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />

          <label>
            Confirm Password
          </label>

          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }
            required
          />

          <button
            type="submit"
            className="auth-btn"
            disabled={loading}
          >

            {loading ? "Resetting..." : "Reset Password"}

          </button>

        </form>

        <p className="auth-footer">

          Remember your password?

          <Link to="/login">
            Back to Login
          </Link>

        </p>

      </div>

    </div>

  );
}

export default ForgotPassword;