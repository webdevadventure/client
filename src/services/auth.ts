import axios, { AxiosError } from "axios";
import { API_ENDPOINTS } from "../config/api";

// Types
export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  user_type: "landlord" | "tenant";
  kyc_status: string;
}

export interface AuthResponse {
  refresh: string;
  access: string;
  user: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  confirm_password: string;
  first_name: string;
  last_name: string;
  phone: string;
  user_type: "landlord" | "tenant";
}

// Auth Service
class AuthService {
  private static instance: AuthService;
  private accessToken: string | null = null;
  private refreshToken: string | null = null;

  private constructor() {
    // Initialize tokens from localStorage if they exist
    this.accessToken = localStorage.getItem("accessToken");
    this.refreshToken = localStorage.getItem("refreshToken");
    console.log("AuthService initialized with tokens:", {
      hasAccessToken: !!this.accessToken,
      hasRefreshToken: !!this.refreshToken,
    });
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  // Get current access token
  public getAccessToken(): string | null {
    return this.accessToken;
  }

  // Set tokens
  private setTokens(access: string, refresh: string): void {
    this.accessToken = access;
    this.refreshToken = refresh;
    localStorage.setItem("accessToken", access);
    localStorage.setItem("refreshToken", refresh);
    console.log("Tokens set:", {
      hasAccessToken: !!this.accessToken,
      hasRefreshToken: !!this.refreshToken,
    });
  }

  // Clear tokens
  private clearTokens(): void {
    this.accessToken = null;
    this.refreshToken = null;
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    console.log("Tokens cleared");
  }

  // Login
  public async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await axios.post<AuthResponse>(
        API_ENDPOINTS.LOGIN,
        credentials,
      );
      this.setTokens(response.data.access, response.data.refresh);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Register
  public async register(
    credentials: RegisterCredentials,
  ): Promise<AuthResponse> {
    try {
      const response = await axios.post<AuthResponse>(
        API_ENDPOINTS.REGISTER,
        credentials,
      );
      this.setTokens(response.data.access, response.data.refresh);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Refresh token
  public async refreshAccessToken(): Promise<string> {
    if (!this.refreshToken) {
      throw new Error("No refresh token available");
    }

    try {
      const response = await axios.post<{ access: string }>(
        API_ENDPOINTS.TOKEN_REFRESH,
        { refresh: this.refreshToken },
      );
      this.accessToken = response.data.access;
      localStorage.setItem("accessToken", response.data.access);
      return response.data.access;
    } catch (error) {
      this.clearTokens();
      throw this.handleError(error);
    }
  }

  // Logout
  public logout(): void {
    this.clearTokens();
  }

  // Check if user is authenticated
  public isAuthenticated(): boolean {
    const isAuth = !!this.accessToken;
    console.log("isAuthenticated check:", isAuth);
    return isAuth;
  }

  // Get auth headers for API requests
  public getAuthHeaders(): Record<string, string> {
    return this.accessToken
      ? { Authorization: `Bearer ${this.accessToken}` }
      : {};
  }

  // Error handler
  private handleError(error: unknown): Error {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<{ detail: string }>;
      const message = axiosError.response?.data?.detail || axiosError.message;
      return new Error(message);
    }
    return error instanceof Error
      ? error
      : new Error("An unknown error occurred");
  }
}

export const authService = AuthService.getInstance();
