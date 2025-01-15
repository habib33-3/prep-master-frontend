import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { auth } from "@/configs/firebase.config";
import { clearCookie, createToken, saveUser } from "@/services/api/auth";
import {
  type User,
  type UserCredential,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

// Define the AuthContext type
type AuthContextProps = {
  register: (
    email: string,
    password: string,
    name: string
  ) => Promise<UserCredential>;
  login: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  user: User | null;
};

// Initialize the AuthContext
const AuthContext = createContext<AuthContextProps | null>(null);

// Define the provider component
const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Function to create a token for the user
  const handleCreateToken = async (email: string): Promise<void> => {
    try {
      await createToken(email);
    } catch (error) {
      console.error("Error creating token:", error);
      throw new Error("Failed to create a token. Please try again.");
    }
  };

  // Register a new user
  const register = async (
    email: string,
    password: string,
    name: string
  ): Promise<UserCredential> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (auth.currentUser) {
        await updateProfile(auth.currentUser, { displayName: name });
        await saveUser(email, name);
        await handleCreateToken(email);
      }

      return userCredential;
    } catch (error) {
      console.error("Error during registration:", error);
      throw new Error("Registration failed. Please try again.");
    }
  };

  // Login a user
  const login = async (
    email: string,
    password: string
  ): Promise<UserCredential> => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      await handleCreateToken(email);

      return userCredential;
    } catch (error) {
      console.error("Error during login:", error);
      throw new Error("Login failed. Please check your credentials.");
    }
  };

  // Logout the current user
  const logout = async (): Promise<void> => {
    try {
      await clearCookie();
      await signOut(auth);
    } catch (error) {
      console.error("Error during logout:", error);
      throw new Error("Logout failed. Please try again.");
    }
  };

  // Monitor auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user || null);
    });

    return () => unsubscribe();
  }, []);

  // Memoize context values
  const authValues = useMemo(
    () => ({
      register,
      login,
      logout,
      user: currentUser,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentUser]
  );

  return (
    <AuthContext.Provider value={authValues}>{children}</AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

export default AuthProvider;
