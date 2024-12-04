import { AuthBindings } from "@refinedev/core";
import { AuthHelper } from "@refinedev/strapi-v4";
import axios from "axios";
import { TOKEN_KEY, API_URL_AUTH } from "../constants";

type RegisterVariables = {
  username: string;
  email: string;
  password: string;
};
type UpdatePassowodVariables = {
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

export const AuthProvider: AuthBindings = {
  login: async ({ email, password }) => {
    const { data, status } = await strapiAuthHelper.login(email, password);
    if (status === 200) {
      localStorage.setItem(TOKEN_KEY, data.jwt);

      // set header axios instance
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${data.jwt}`;

      return {
        success: true,
        redirectTo: "/",
      };
    }
    return {
      success: false,
      error: {
        message: "Login failed",
        name: "Invalid email or password",
      },
    };
  },
  register: async ({ username, email, password }) => {
    const { data, status } = await axios.post<RegisterVariables>(
      API_URL_AUTH + "/auth/local/register",
      { username: username, email: email, password: password },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    if (status === 200) {
      return {
        success: true,
        redirectTo: "/",
      };
    }
    return {
      success: false,
      error: new Error("Email or password is wrong"),
    };
  },
  updatePassword: async ({ currentPassword, password, confirmPassword }) => {
    const token = localStorage.getItem(TOKEN_KEY);
    const { data, status } = await axios.post<UpdatePassowodVariables>(
      API_URL_AUTH + "/auth/change-password",
      {
        currentPassword: currentPassword,
        password: password,
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
    if (status === 200) {
      localStorage.setItem(TOKEN_KEY, data.jwt);
      return {
        success: true,
        redirectTo: "/",
      };
    }
    return {
      success: false,
      error: new Error("password is wrong"),
    };
  },
  forgotPassword: async ({ email }) => {
    const { data, status } = await axios.post<ForgotPasswordVariables>(
      API_URL_AUTH + "/auth/forgot-password",
      { email: email },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    if (status === 200) {
      return {
        success: true,
        redirectTo: "/",
      };
    }
    return {
      success: false,
      error: new Error("Email is wrong"),
    };
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
  getIdentity: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      return null;
    }

    const { data, status } = await strapiAuthHelper.me(token, {
      meta: {
        populate: ["role"],
      },
    });
    console.log("auth data", data);
    if (status === 200) {
      const { id, username, email, role } = data;
      return {
        id,
        name: username,
        email,
        token,
        role,
      };
    }

    return null;
  },
  getPermissions: async (userToken: any) => {
    const token = localStorage.getItem(userToken);
    console.log("auth token", token);
    if (!token) {
      return null;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { data, status } = await strapiAuthHelper.me(token, {
      meta: {
        populate: ["role"],
      },
    });
    const role: string = data?.role.name;
    console.log("auth role", role);
    switch (role) {
      case "Super Admin":
        return "Super Admin";
      case "Admin":
        return "Admin";
      case "Authenticated":
        return "Authenticated";
      case "Suport Agents":
        return "Suport Agents";
      default:
        break;
    }
  },
};
