import axios from "axios";

const ADMIN_API = axios.create({
  baseURL: "http://localhost:1001/admin",
});

// 🔐 Attach token automatically
ADMIN_API.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ===== ADMIN LOGIN =====
export const adminLogin = async (data) => {
  const res = await ADMIN_API.post("/login", data);
  return res.data;
};

// ===== GET DASHBOARD =====

export const getAdminDashboard = async () => {
  const res = await ADMIN_API.get("/dashboard");
  return res.data;
};

// get all users for admin
export const getAllUsers = async () => {
  const res = await ADMIN_API.get("/users");
  return res.data;
};
