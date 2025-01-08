// Enums para tipos específicos
export enum GroupType {
  INTERNAL = 'internal',
  EXTERNAL = 'external',
  TEMPORARY = 'temporary',
  PERMANENT = 'permanent'
}

// Interface para validação de tempo máximo
export interface TimeValidation {
  hours: number;
  minutes: number;
}

// Interface principal do formulário
export interface GroupFormData {
  description: string;
  type: GroupType;
  maximumTime: string; // Formato: "HH:mm"
  doubleEntry: boolean;
  credit: boolean;
  blacklist: boolean;
  companyName: string;
  tradeName: string;
  ignoreAntiDoubleEntry: boolean;
  person_id?: number[];
  // Campos adicionais para controle interno
  createdAt?: Date;
  updatedAt?: Date;
  active?: boolean;
}

// Interface para pessoa
export interface Person {
  id: number;
  name: string;
  email?: string;
  active?: boolean;
}

// Interface para resposta da API
export interface GroupResponse {
  data: {
    id: number;
    attributes: GroupFormData;
  };
  meta: {
    status: string;
  };
}

// Funções auxiliares para validação
export const validateMaximumTime = (time: string): boolean => {
  const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
  return timeRegex.test(time);
};

export const parseMaximumTime = (time: string): TimeValidation | null => {
  if (!validateMaximumTime(time)) {
    console.error('Formato de tempo inválido:', time);
    return null;
  }

  const [hours, minutes] = time.split(':').map(Number);
  return { hours, minutes };
};

// Função para criar um grupo com valores padrão
export const createDefaultGroup = (): GroupFormData => {
  return {
    description: '',
    type: GroupType.INTERNAL,
    maximumTime: '00:00',
    doubleEntry: false,
    credit: false,
    blacklist: false,
    companyName: '',
    tradeName: '',
    ignoreAntiDoubleEntry: false,
    person_id: [],
    active: true
  };
};

// Função para validar o formulário completo
export const validateGroupForm = (data: GroupFormData): string[] => {
  const errors: string[] = [];

  if (!data.description) {
    errors.push('Descrição é obrigatória');
  }

  if (!validateMaximumTime(data.maximumTime)) {
    errors.push('Tempo máximo deve estar no formato HH:mm');
  }

  if (!data.companyName && !data.tradeName) {
    errors.push('Nome da empresa ou nome fantasia deve ser preenchido');
  }

  // Log para debug
  console.log('Validação do formulário:', {
    data,
    errors,
    isValid: errors.length === 0
  });

  return errors;
};

// Tipo para ações do grupo
export type GroupAction = 
  | { type: 'CREATE'; payload: GroupFormData }
  | { type: 'UPDATE'; payload: Partial<GroupFormData> }
  | { type: 'DELETE' }
  | { type: 'TOGGLE_ACTIVE' };

  export interface Group {
    id: number;
    description: string;
  }
  
  export interface GroupSectionEditProps {
    peopleData?: {
      groups?: {
        id: number;
        description: string;
      }[];
    };
  }
  
  