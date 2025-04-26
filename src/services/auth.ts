import axios from "axios";
import { LoginData, RegisterData, AuthResponse } from "../types/auth";

const API_URL =
  "https://e792-2405-4800-5717-9dc0-bd89-240-3cdf-8d4d.ngrok-free.app";

const authApi = {
  login: async (data: LoginData): Promise<AuthResponse> => {
    const response = await axios.post(`${API_URL}/api/token/`, data);
    return response.data;
  },

  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await axios.post(
      `${API_URL}/api/user/users/register/`,
      data,
    );
    return response.data;
  },

  refreshToken: async (refresh: string): Promise<{ access: string }> => {
    const response = await axios.post(`${API_URL}/api/token/refresh/`, {
      refresh,
    });
    return response.data;
  },

  logout: async (refresh: string): Promise<void> => {
    await axios.post(`${API_URL}/api/token/logout/`, { refresh });
  },
};

export default authApi;
