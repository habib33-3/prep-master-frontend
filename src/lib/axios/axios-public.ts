import { env } from "@/configs/env.config";
import axios from "axios";

const BACKEND_BASE_URL = env.VITE_BACKEND_BASE_URL;

export const axiosPublicInstance = axios.create({
  baseURL: BACKEND_BASE_URL,
  withCredentials: true,
});

// Optional: Add a response interceptor for error handling globally
axiosPublicInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const rejectionError =
      error instanceof Error ? error : new Error("Unknown error occurred");

    console.error("API error:", rejectionError);

    return Promise.reject(rejectionError);
  }
);
