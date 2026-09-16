import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, role }) {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  // If user is not logged in
  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  // If a specific role is required
  if (role && user.role !== role) {
    return (
      <Navigate
        to="/jobs"
        replace
      />
    );
  }

  return children;
}

export default ProtectedRoute;