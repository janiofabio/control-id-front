import React, { createContext, useState, useContext, useEffect } from 'react';
import { Group } from '../utils/types';
import { fetchGroups } from '../services/groupService';

interface GroupContextType {
  availableGroups: Group[];
  setAvailableGroups: React.Dispatch<React.SetStateAction<Group[]>>;
}

const GroupContext = createContext<GroupContextType | undefined>(undefined);

export const GroupProvider: React.FC = ({ children }) => {
  const [availableGroups, setAvailableGroups] = useState<Group[]>([]);

  useEffect(() => {
    const loadGroups = async () => {
      try {
        const groups = await fetchGroups();
        setAvailableGroups(groups);
      } catch (error) {
        console.error("Erro ao carregar grupos:", error);
      }
    };
    loadGroups();
  }, []);

  return (
    <GroupContext.Provider value={{ availableGroups, setAvailableGroups }}>
      {children}
    </GroupContext.Provider>
  );
};

export const useGroups = () => {
  const context = useContext(GroupContext);
  if (context === undefined) {
    throw new Error('useGroups must be used within a GroupProvider');
  }
  return context;
};