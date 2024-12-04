import axios from 'axios';

// Defina a interface dos dados de grupo
interface Group {
    id: string;
    description: string;
    type: 'Persons' | 'Company';
    maximumTime?: string;
    doubleEntry: boolean;
    credit: boolean;
    blacklist: boolean;
    companyID?: string;
    companyName?: string;
    tradeName?: string;
    igonreAntiDoubleEntry: boolean;
}

// Função para buscar os grupos do backend
export const fetchGroups = async (): Promise<Group[]> => {
    try {
        const response = await axios.get('http://localhost:1337/api/groups');
        return response.data.data;
    } catch (error) {
        console.error("Erro ao buscar grupos:", error);
        throw error;
    }
};
