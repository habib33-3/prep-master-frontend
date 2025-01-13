import { useAuth } from "@/providers/AuthProvider";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const useLogOut = () => {
  const navigate = useNavigate();

  const { logout } = useAuth();

  const logOut = async () => {
    await logout();
    navigate("/sign-in");
    toast.success("Signed out successfully");
  };

  return logOut;
};

export default useLogOut;
