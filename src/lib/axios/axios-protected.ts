import axios, { type AxiosError } from "axios";

import { env } from "@/configs/env.config";
import { clearCookie } from "@/services/api/auth";

// Set up the base URL for the API
const BACKEND_BASE_URL = env.VITE_BACKEND_BASE_URL;

// Create an axios instance with credentials
export const axiosProtectedInstance = axios.create({
  baseURL: BACKEND_BASE_URL,
  withCredentials: true,
});

// Optional: Add a response interceptor for error handling globally
axiosProtectedInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    // Determine if the error is an instance of AxiosError, otherwise create a generic error
    const rejectionError = error.isAxiosError
      ? error
      : new Error("Unknown error occurred");

    // Log the error for debugging
    console.error("API error:", rejectionError);

    // Check if the error status code is 401 or 403
    if (error.response?.status === 401 || error.response?.status === 403) {
      // Navigate to the login page by calling the logout function
      clearCookie();
      window.location.href = "/sign-in";
    }

    return Promise.reject(rejectionError);
  }
);
