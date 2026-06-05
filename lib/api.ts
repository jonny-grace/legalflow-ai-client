import axios, { AxiosError, AxiosInstance } from "axios";
import { ApiError } from "@/types";

// ── Create axios instance ──────────────────────────────────
const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000, // 30 seconds for AI analysis calls
});

// Debug: Log the baseURL
if (typeof window !== "undefined") {
  console.log("[API] baseURL:", process.env.NEXT_PUBLIC_API_URL);
}

// ── Request interceptor ────────────────────────────────────
// Automatically attach JWT token to every request
api.interceptors.request.use(
  (config) => {
    // Only runs in browser environment
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// ── Response interceptor ───────────────────────────────────
// Handle auth errors globally
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiError>) => {
    // Token expired or invalid - redirect to login
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  },
);

export default api;
