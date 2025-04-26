import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthState, User, LoginData, RegisterData } from "../types/auth";
import authApi from "../services/auth";

interface AuthContextType extends AuthState {
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
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

  useEffect(() => {
    const initAuth = async () => {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");

      if (accessToken && refreshToken) {
        try {
          // Verify token and get user info
          const response = await authApi.refreshToken(refreshToken);
          setState((prev) => ({
            ...prev,
            accessToken: response.access,
            isAuthenticated: true,
            isLoading: false,
          }));
        } catch (error) {
          // Token invalid, clear storage
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          setState((prev) => ({
            ...prev,
            isAuthenticated: false,
            isLoading: false,
          }));
        }
      } else {
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
      const response = await authApi.login(data);

      localStorage.setItem("accessToken", response.access);
      localStorage.setItem("refreshToken", response.refresh);

      setState((prev) => ({
        ...prev,
        user: response.user,
        accessToken: response.access,
        refreshToken: response.refresh,
        isAuthenticated: true,
        isLoading: false,
      }));

      navigate("/");
    } catch (error: any) {
      setState((prev) => ({
        ...prev,
        error: error.response?.data?.error || "Đăng nhập thất bại!",
        isLoading: false,
      }));
    }
  };

  const register = async (data: RegisterData) => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      const response = await authApi.register(data);

      localStorage.setItem("accessToken", response.access);
      localStorage.setItem("refreshToken", response.refresh);

      setState((prev) => ({
        ...prev,
        user: response.user,
        accessToken: response.access,
        refreshToken: response.refresh,
        isAuthenticated: true,
        isLoading: false,
      }));

      navigate("/");
    } catch (error: any) {
      console.error("Registration error:", error.response?.data);

      // Xử lý các loại lỗi cụ thể
      let errorMessage = "Đăng ký thất bại. Vui lòng kiểm tra lại thông tin.";
      const errorData = error.response?.data;

      if (errorData) {
        if (errorData.detail) {
          errorMessage = errorData.detail;
        } else if (typeof errorData === "object") {
          // Lấy thông báo lỗi đầu tiên từ bất kỳ trường nào
          const firstError = Object.entries(errorData).find(
            ([_, value]) => Array.isArray(value) && value.length > 0,
          );
          if (firstError) {
            const [field, messages] = firstError;
            errorMessage = `${field}: ${messages[0]}`;
          }
        }
      }

      setState((prev) => ({
        ...prev,
        error: errorMessage,
        isLoading: false,
      }));
      throw error;
    }
  };

  const logout = async () => {
    try {
      if (state.refreshToken) {
        await authApi.logout(state.refreshToken);
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      setState({
        user: null,
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
      navigate("/login");
    }
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
