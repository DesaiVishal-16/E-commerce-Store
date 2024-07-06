"use client";

import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { signup, login } from "../utils/api"; // Ensure this import is correct

interface User {
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  signup: (username: string, email: string, password: string) => Promise<void>;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("AuthProvider mounted");
    const token = localStorage.getItem("authToken");
    if (token) {
      fetchUserData(token);
    } else {
      setIsLoading(false);
    }
  }, []);
  useEffect(() => {
    console.log("User state in AuthProvider changed:", user);
  }, [user]);

  const fetchUserData = async (token: string) => {
    try {
      const response = await fetch("http://localhost:8000/user/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const userData = await response.json();
      console.log("Fetched user data:", userData);
      setUser(userData);
    } catch (error) {
      console.error("Error fetching user data:", error);
      localStorage.removeItem("authToken");
    } finally {
      setIsLoading(false);
    }
  };

  const signupHandler = async (
    username: string,
    email: string,
    password: string
  ) => {
    setIsLoading(true);
    try {
      const data = await signup(username, email, password);
      console.log("Signup response:", data);
      setUser(data.user);
      localStorage.setItem("authToken", data.token);
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const loginHandler = async (username: string, password: string) => {
    setIsLoading(true);
    try {
      const data = await login(username, password);
      console.log("Login response in AuthContext:", data);
      if (data && data.user) {
        console.log("Setting user in AuthContext:", data.user);
        setUser(data.user);
        localStorage.setItem("authToken", data.token);
      } else {
        throw new Error("Login response doesn't contain user data");
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("authToken");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signup: signupHandler,
        login: loginHandler,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
