import { ReactNode, createContext, useContext, useMemo } from "react";

import { auth } from "@/configs/firebase.config";
import { UserCredential, createUserWithEmailAndPassword } from "firebase/auth";

// Define the context type
type AuthContextType = {
  registerUser: (email: string, password: string) => Promise<UserCredential>;
} | null;

// Use the defined type in createContext
const AuthContext = createContext<AuthContextType>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const registerUser = async (email: string, password: string) => {
    return await createUserWithEmailAndPassword(auth, email, password);
  };

  const authInfo = useMemo(() => ({ registerUser }), [registerUser]);

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return auth;
};
