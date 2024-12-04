import { API_URL_UPLOAD, TOKEN_KEY } from "../constants";

export const uploadFileToStrapi = async (file: File) => {
    if (!file || file.size === 0) {
        throw new Error("Arquivo para upload vazio");
    }
5
    const formData = new FormData();
    formData.append("files", file);

    const token = localStorage.getItem(TOKEN_KEY);

    try {
        const response = await fetch(`${API_URL_UPLOAD}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("Erro detalhado do Strapi:", data);
            throw new Error(`Erro ao fazer upload: ${response.status} ${response.statusText}`);
        }

        return data[0];
    } catch (error) {
        console.error("Erro durante o upload:", error);
        throw error;
    }
};