// AuthProvider.ts
import { AuthBindings } from "@refinedev/core";
import { AuthHelper } from "@refinedev/strapi-v4";
import axios from "axios";
import { TOKEN_KEY, API_URL_AUTH } from "../constants";

type RegisterVariables = {
  username: string;
  email: string;
  password: string;
};
type UpdatePasswordVariables = {
  [x: string]: string;
  currentPassword: string;
  password: string;
  passwordConfirmation: string;
};
type ForgotPasswordVariables = {
  email: string;
};

export const axiosInstance = axios.create();
const strapiAuthHelper = AuthHelper(API_URL_AUTH);

// Interceptor to add token to all requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN_KEY);
    console.log('Request Interceptor - Token:', token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('Request Interceptor - Config:', config);
    return config;
  },
  (error) => {
    console.log('Request Interceptor - Error:', error);
    return Promise.reject(error);
  }
);

export const AuthProvider: AuthBindings = {
  login: async ({ email, password }) => {
    console.log('Login Attempt - Email:', email, 'Password:', password);
    const { data, status } = await strapiAuthHelper.login(email, password);
    console.log('Login Response - Status:', status, 'Data:', data);
    if (status === 200) {
      localStorage.setItem(TOKEN_KEY, data.jwt);
      console.log('Login Success - Token:', data.jwt);

      // set header axios instance
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${data.jwt}`;

      return {
        success: true,
        redirectTo: "/",
      };
    }
    console.log('Login Failed');
    return {
      success: false,
      error: {
        message: "Login failed",
        name: "Invalid email or password",
      },
    };
  },
  register: async ({ username, email, password }) => {
    console.log('Register Attempt - Username:', username, 'Email:', email, 'Password:', password);
    const { data, status } = await axiosInstance.post<RegisterVariables>(
      API_URL_AUTH + "/auth/local/register",
      { username, email, password },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    console.log('Register Response - Status:', status, 'Data:', data);
    if (status === 200) {
      console.log('Register Success');
      return {
        success: true,
        redirectTo: "/",
      };
    }
    console.log('Register Failed');
    return {
      success: false,
      error: new Error("Email or password is wrong"),
    };
  },
  updatePassword: async ({ currentPassword, password, confirmPassword }) => {
    const token = localStorage.getItem(TOKEN_KEY);
    console.log('Update Password Attempt - CurrentPassword:', currentPassword, 'Password:', password, 'ConfirmPassword:', confirmPassword, 'Token:', token);
    const { data, status } = await axiosInstance.post<UpdatePasswordVariables>(
      API_URL_AUTH + "/auth/change-password",
      {
        currentPassword,
        password,
        passwordConfirmation: confirmPassword,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log('Update Password Response - Status:', status, 'Data:', data);
    if (status === 200) {
      localStorage.setItem(TOKEN_KEY, data.jwt);
      console.log('Update Password Success - Token:', data.jwt);
      return {
        success: true,
        redirectTo: "/",
      };
    }
    console.log('Update Password Failed');
    return {
      success: false,
      error: new Error("password is wrong"),
    };
  },
  forgotPassword: async ({ email }) => {
    console.log('Forgot Password Attempt - Email:', email);
    const { data, status } = await axiosInstance.post<ForgotPasswordVariables>(
      API_URL_AUTH + "/auth/forgot-password",
      { email },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    console.log('Forgot Password Response - Status:', status, 'Data:', data);
    if (status === 200) {
      console.log('Forgot Password Success');
      return {
        success: true,
        redirectTo: "/",
      };
    }
    console.log('Forgot Password Failed');
    return {
      success: false,
      error: new Error("Email is wrong"),
    };
  },
  logout: async () => {
    console.log('Logout Attempt');
    localStorage.removeItem(TOKEN_KEY);
    console.log('Logout Success');
    return {
      success: true,
      redirectTo: "/login",
    };
  },
  onError: async (error) => {
    console.error('Auth Error:', error);
    return { error };
  },
  check: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    console.log('Check Auth - Token:', token);
    if (token) {
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      console.log('Check Auth - Authenticated');
      return {
        authenticated: true,
      };
    }

    console.log('Check Auth - Not Authenticated');
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
  getIdentity: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    console.log('Get Identity - Token:', token);
    if (!token) {
      console.log('Get Identity - No Token Found');
      return null;
    }

    const { data, status } = await strapiAuthHelper.me(token, {
      meta: {
        populate: ["role"],
      },
    });
    console.log('Get Identity Response - Status:', status, 'Data:', data);
    if (status === 200) {
      const { id, username, email, role } = data;
      console.log('Get Identity Success - User:', { id, username, email, role });
      return {
        id,
        name: username,
        email,
        token,
        role,
      };
    }

    console.log('Get Identity Failed');
    return null;
  },
  getPermissions: async (userToken: any) => {
    const token = localStorage.getItem(userToken);
    console.log('Get Permissions - Token:', token);
    if (!token) {
      console.log('Get Permissions - No Token Found');
      return null;
    }
    const { data, status } = await strapiAuthHelper.me(token, {
      meta: {
        populate: ["role"],
      },
    });
    console.log('Get Permissions Response - Status:', status, 'Data:', data);
    const role: string = data?.role?.name;
    console.log('User Role:', role);
    switch (role) {
      case "Super Admin":
        return "Super Admin";
      case "Admin":
        return "Admin";
      case "Authenticated":
        return "Authenticated";
      case "Support Agents":
        return "Support Agents";
      default:
        console.log('Get Permissions - No Matching Role Found');
        return null;
    }
  },
};