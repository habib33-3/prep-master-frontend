import { useState } from "react";

import { useAuth } from "@/providers/AuthProvider";
import { FaGoogle } from "react-icons/fa";
import { toast } from "sonner";

import LoadingButton from "../LoadingButton";

const GoogleLoginButton = () => {
  const { googleLogin } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      await googleLogin();
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
      className="block w-full bg-blue-700"
    >
      <span className="flex items-center justify-center gap-2">
        <FaGoogle /> Login with Google
      </span>
    </LoadingButton>
  );
};

export default GoogleLoginButton;
