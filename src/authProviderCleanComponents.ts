import { AuthProvider } from "@refinedev/core";
import axios from "axios";
import { API_URL, TOKEN_KEY } from "./constants";

// Configuração da instância do axios com a URL base do backend
export const axiosInstance = axios.create({
    baseURL: API_URL,
});

export const authProvider: AuthProvider = {
    // Método de login
    login: async ({ email, password }) => {
        try {
            // Requisição para o endpoint de login
            const response = await axiosInstance.post('/auth/login', { email, password });
            const { token } = response.data;

            if (token) {
                // Armazena o token no localStorage e configura o header de autorização
                localStorage.setItem(TOKEN_KEY, token);
                axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;

                return { success: true, redirectTo: "/" };
            }
        } catch (error) {
            return { success: false, error: { message: "Login failed", name: "Invalid email or password" } };
        }
    },
    // Método de logout
    logout: async () => {
        localStorage.removeItem(TOKEN_KEY);
        delete axiosInstance.defaults.headers.common["Authorization"];
        return { success: true, redirectTo: "/login" };
    },
    // Método para verificar a autenticação
    check: async () => {
        const token = localStorage.getItem(TOKEN_KEY);
        if (token) {
            axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            return { authenticated: true };
        }

        return { authenticated: false, error: { message: "Check failed", name: "Token not found" }, logout: true, redirectTo: "/login" };
    },
    getPermissions: async () => null,
    getIdentity: async () => {
        try {
            const { data } = await axiosInstance.get('/auth/me');
            return data;
        } catch (error) {
            return null;
        }
    },
};
