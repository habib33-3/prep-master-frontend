import { useState } from "react";

import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router";
import { toast } from "sonner";

import { useAuth } from "@/providers/AuthProvider";

import LoadingButton from "./LoadingButton";

const GoogleLoginButton = () => {
  const { googleLogin } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      await googleLogin();
      navigate("/");
      toast.success("Signed in successfully");
    } catch (error) {
      console.error("Error during Google login:", error);
      toast.error("Google login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoadingButton
      loading={isLoading}
      onClick={handleGoogleLogin}
      className="block w-full bg-primary"
    >
      <span className="flex items-center justify-center gap-2">
        <FaGoogle
          size={16}
          className="text-green-600"
        />{" "}
        Login with Google
      </span>
    </LoadingButton>
  );
};

export default GoogleLoginButton;
