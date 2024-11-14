import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import {
  login as loginService,
  signup as signupService,
} from "../services/AuthService";
import { User } from "../types/User";

interface AuthContextProps {
  isAuthenticated: boolean;
  currentUser: User | null;
  login: (username: string, password: string) => Promise<void>;
  signup: (username: string, password: string, email: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const login = async (username: string, password: string) => {
    const data = await loginService(username, password);
    console.log(data); // AuthServiceを利用
    // トークンをlocalStorageに保存し、認証状態を更新
    localStorage.setItem("token", data.token);
    setCurrentUser(data.user);
    setIsAuthenticated(true);
  };

  const signup = async (username: string, password: string, email: string) => {
    await signupService(username, password, email);
    await login(username, password);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    console.log("isAuthenticatedの値:", isAuthenticated);
  }, [isAuthenticated]); // isAuthenticatedが変更されるたびにログを出力

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, currentUser, login, signup, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
