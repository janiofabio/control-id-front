import type { AuthProvider } from "@refinedev/core";
import axios from "../utils/axios";
import { API_URL, TOKEN_KEY } from "./constants";

export const axiosInstance = axios.create();

export const authProvider: AuthProvider = {
  login: async ({ email, password }) => {
    try {
      const { data, status } = await axiosInstance.post(`${API_URL}/api/auth/local`, {
        email,
        password,
      });

      if (status === 200) {
        localStorage.setItem(TOKEN_KEY, data.token);

        // set header axios instance
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${data.token}`;

        return {
          success: true,
          redirectTo: "/",
        };
      }
    } catch (error) {
      return {
        success: false,
        error: {
          message: "Login failed",
          name: "Invalid email or password",
        },
      };
    }
  },
  logout: async () => {
    localStorage.removeItem(TOKEN_KEY);
    return {
      success: true,
      redirectTo: "/login",
    };
  },
  onError: async (error) => {
    console.error(error);
    return { error };
  },
  check: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      error: {
        message: "Check failed",
        name: "Token not found",
      },
      logout: true,
      redirectTo: "/login",
    };
  },
  getPermissions: async () => null,
  getIdentity: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      return null;
    }

    try {
      const { data, status } = await axiosInstance.get(`${API_URL}/api/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (status === 200) {
        const { id, username, email } = data;
        return {
          id,
          name: username,
          email,
        };
      }
    } catch (error) {
      return null;
    }
  },
};
