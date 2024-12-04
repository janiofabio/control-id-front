import axios from 'axios';

// Função para buscar os grupos do backend
export const fetchGroups = async () => {
    try {
        const response = await axios.get('http://localhost:1337/api/groups');
        return response.data.data;
    } catch (error) {
        console.error("Erro ao buscar grupos:", error);
        throw error;
    }
};

// Função para atualizar os grupos do usuário no backend
export const updateUserGroups = async ({ userId, groups }) => {
    try {
        const response = await axios.put(`http://localhost:1337/api/users/${userId}`, {
            data: { groups }, // Envia os IDs dos grupos
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao atualizar grupos do usuário:", error);
        throw error;
    }
};
