import { useGetIdentity } from "@refinedev/core";

interface HistoryEntry {
  alteradoPor: string;
  alteradoEm: string;
  tipo: 'criação' | 'edição';
  entidade: string;
}

export const useHistory = () => {
  const { data: user, isLoading: isLoadingUser } = useGetIdentity<{ id: string; fullName: string }>();

  const createHistoryEntry = (tipo: 'criação' | 'edição', entidade: string): HistoryEntry => {
    return {
      alteradoPor: user?.fullName || "Usuário Desconhecido",
      alteradoEm: new Date().toISOString(),
      tipo,
      entidade
    };
  };

  const addHistoryEntry = (currentHistory: HistoryEntry[] = [], tipo: 'criação' | 'edição', entidade: string): HistoryEntry[] => {
    return [...currentHistory, createHistoryEntry(tipo, entidade)];
  };

  const formatHistoryEntry = (entry: HistoryEntry): string => {
    const date = new Date(entry.alteradoEm);
    return `${entry.tipo === 'criação' ? 'Criado' : 'Alterado'} ${entry.entidade} por ${entry.alteradoPor}, em ${date.toLocaleString('pt-BR')}`;
  };

  return {
    addHistoryEntry,
    formatHistoryEntry,
    isLoadingUser
  };
};