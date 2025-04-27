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

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  confirm_password: string;
  first_name: string;
  last_name: string;
  phone: string;
  user_type: "landlord" | "tenant";
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
