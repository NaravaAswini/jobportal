import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Jobs from "../pages/Jobs";
import JobDetails from "../pages/JobDetails";
import AddJob from "../pages/AddJob";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import Logout from "../pages/Logout";

import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>

      {/* Public Routes */}
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route
        path="/forgot-password"
        element={<ForgotPassword />}
      />

      {/* Login Required */}
      <Route
        path="/jobs"
        element={
          <ProtectedRoute>
            <Jobs />
          </ProtectedRoute>
        }
      />

      <Route
        path="/jobs/:id"
        element={
          <ProtectedRoute>
            <JobDetails />
          </ProtectedRoute>
        }
      />

      {/* Logout */}
      <Route path="/logout" element={<Logout />} />

      {/* Recruiter Only */}
      <Route
        path="/add-job"
        element={
          <ProtectedRoute role="recruiter">
            <AddJob />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default AppRoutes;