import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  type User,
  type UserCredential,
} from "firebase/auth";

import { auth } from "@/configs/firebase.config";
import { clearCookie, createToken, saveUser } from "@/services/api/auth";

type AuthContextProps = {
  register: (
    email: string,
    password: string,
    name: string
  ) => Promise<UserCredential>;
  login: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  user: User | null;
  googleLogin: () => Promise<UserCredential>;
};

const AuthContext = createContext<AuthContextProps | null>(null);

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleCreateToken = async (email: string): Promise<void> => {
    try {
      await createToken(email);
    } catch (error) {
      console.error("Error creating token:", error);
      throw new Error("Failed to create a token. Please try again.");
    }
  };

  const register = useCallback(
    async (
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
    },
    []
  );

  const login = useCallback(
    async (email: string, password: string): Promise<UserCredential> => {
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
    },
    []
  );

  const googleLogin = useCallback(async (): Promise<UserCredential> => {
    try {
      const user = await signInWithPopup(auth, googleProvider);

      await saveUser(user.user.email!, user.user.displayName!);

      await handleCreateToken(user.user.email!);

      return user;
    } catch (error) {
      console.error("Error during Google login:", error);
      throw new Error("Google login failed. Please try again.");
    }
  }, []);

  const logout = async (): Promise<void> => {
    try {
      await clearCookie();
      await signOut(auth);
    } catch (error) {
      console.error("Error during logout:", error);
      throw new Error("Logout failed. Please try again.");
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user || null);
    });

    return () => unsubscribe();
  }, []);

  const authValues = useMemo(
    () => ({
      register,
      login,
      logout,
      user: currentUser,
      googleLogin,
    }),

    [currentUser, googleLogin, login, register]
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
