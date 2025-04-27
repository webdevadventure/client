import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthState, LoginData, RegisterData } from "../types/auth";
import { authService } from "../services/auth";

interface AuthContextType extends AuthState {
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();
  const [state, setState] = useState<AuthState>({
    user: null,
    accessToken: localStorage.getItem("accessToken"),
    refreshToken: localStorage.getItem("refreshToken"),
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  // Debug initial state
  useEffect(() => {
    console.log("Initial auth state:", state);
  }, []);

  useEffect(() => {
    const initAuth = async () => {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");

      console.log("Checking tokens:", { accessToken, refreshToken });

      if (accessToken && refreshToken) {
        try {
          // Verify token and get user info
          await authService.refreshAccessToken();
          setState((prev) => ({
            ...prev,
            accessToken,
            isAuthenticated: true,
            isLoading: false,
          }));
          console.log("Authentication successful");
        } catch (error) {
          // Token invalid, clear storage
          console.error("Authentication failed:", error);
          authService.logout();
          setState((prev) => ({
            ...prev,
            isAuthenticated: false,
            isLoading: false,
          }));
        }
      } else {
        console.log("No tokens found, user is not authenticated");
        setState((prev) => ({
          ...prev,
          isLoading: false,
        }));
      }
    };

    initAuth();
  }, []);

  const login = async (data: LoginData) => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      const response = await authService.login(data);

      setState((prev) => ({
        ...prev,
        user: response.user,
        accessToken: response.access,
        refreshToken: response.refresh,
        isAuthenticated: true,
        isLoading: false,
      }));

      navigate("/");
    } catch {
      setState((prev) => ({
        ...prev,
        error: "Đăng nhập thất bại!",
        isLoading: false,
      }));
    }
  };

  const register = async (data: RegisterData) => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      const response = await authService.register(data);

      setState((prev) => ({
        ...prev,
        user: response.user,
        accessToken: response.access,
        refreshToken: response.refresh,
        isAuthenticated: true,
        isLoading: false,
      }));

      navigate("/");
    } catch {
      console.error("Registration failed");
      setState((prev) => ({
        ...prev,
        error: "Đăng ký thất bại. Vui lòng kiểm tra lại thông tin.",
        isLoading: false,
      }));
    }
  };

  const logout = () => {
    authService.logout();
    setState({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
