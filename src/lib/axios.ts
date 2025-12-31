// 📂 src/lib/axios.ts

import config from "@/config";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: config.baseUrl,
  withCredentials: true, // <------------------ cookies allowed
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for token refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest: any = error.config;

    // If accessToken expired
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // backend sets new accessToken cookie automatically
        await axiosInstance.get("/auth/refresh-token");
        return axiosInstance(originalRequest);
      } catch (err) {
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);
