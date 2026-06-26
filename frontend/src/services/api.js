import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "https://e-commerce-1-k50b.onrender.com";

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
});

// Always attach the latest token from localStorage on every outgoing
// request. This avoids any timing issues where a request fires before
// (or right around) the in-memory default header gets set.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;