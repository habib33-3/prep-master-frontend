import { useNavigate } from "react-router";
import { toast } from "sonner";

import { useAuth } from "@/providers/AuthProvider";

const useLogOut = () => {
  const navigate = useNavigate();

  const { logout } = useAuth();

  const logOut = async () => {
    try {
      await logout();
      navigate("/sign-in");
      toast.success("Signed out successfully");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return { logOut };
};

export default useLogOut;
