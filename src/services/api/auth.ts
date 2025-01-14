/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosPublicInstance } from "@/lib/axios/axios-public";

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
}

export const saveUser = async (
  email: string,
  name: string
): Promise<ApiResponse> => {
  try {
    const res = await axiosPublicInstance.post<ApiResponse>("/user/save-user", {
      email,
      name,
    });

    if (!res.data.success) {
      throw new Error(res.data.message ?? "Failed to save user.");
    }

    return res.data;
  } catch (error: any) {
    console.error("Error saving user:", error.message || error);
    throw new Error("Unable to save user. Please try again later.");
  }
};

export const createToken = async (email: string): Promise<ApiResponse> => {
  try {
    const res = await axiosPublicInstance.post<ApiResponse>(
      "/auth/access-token",
      { email }
    );

    if (!res.data.success) {
      throw new Error(res.data.message ?? "Failed to create token.");
    }

    return res.data;
  } catch (error: any) {
    console.error("Error creating token:", error.message || error);
    throw new Error("Unable to create token. Please try again later.");
  }
};

export const clearCookie = async (): Promise<ApiResponse> => {
  try {
    const res =
      await axiosPublicInstance.post<ApiResponse>("/auth/clear-cookie");

    if (!res.data.success) {
      throw new Error(res.data.message ?? "Failed to clear cookie.");
    }

    return res.data;
  } catch (error: any) {
    console.error("Error clearing cookie:", error.message || error);
    throw new Error("Unable to clear cookie. Please try again later.");
  }
};
