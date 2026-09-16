import axios from "axios";

const API_URL = "http://localhost:3000";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

// Get all jobs
export const getJobs = async () => {
  const response = await api.get("/jobs");
  return response.data;
};

// Get single job
export const getJobById = async (id) => {
  const response = await api.get(`/jobs/${id}`);
  return response.data;
};

// Register user
export const registerUser = async (userData) => {
  const existingUsers = await api.get(
    `/users?email=${encodeURIComponent(userData.email)}`
  );

  if (existingUsers.data.length > 0) {
    const error = new Error("User already exists");
    error.response = {
      status: 409
    };
    throw error;
  }

  const response = await api.post("/users", userData);

  return response.data;
};

// Login user
export const loginUser = async (email, password) => {
  const response = await api.get(
    `/users?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
  );

  if (response.data.length === 0) {
    const error = new Error("Invalid email or password");
    error.response = {
      status: 401
    };
    throw error;
  }

  return response.data[0];
};

// Add job
export const addJob = async (jobData) => {
  const response = await api.post("/jobs", jobData);
  return response.data;
};

// Update job
export const updateJob = async (id, jobData) => {
  const response = await api.put(`/jobs/${id}`, jobData);
  return response.data;
};

// Delete job
export const deleteJob = async (id) => {
  const response = await api.delete(`/jobs/${id}`);
  return response.data;
};

// Get jobs by search
export const searchJobs = async (searchText) => {
  const response = await api.get(
    `/jobs?q=${encodeURIComponent(searchText)}`
  );

  return response.data;
};

export default api;