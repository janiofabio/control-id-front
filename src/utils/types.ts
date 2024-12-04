export interface Person {
    id?: number;
    name: string;
    email: string;
    registration?: string;
    phoneNumber: string;
    personPhoto?: string;
    documents: Document[];
    groups: Group[];
    iDSecureAccess: boolean;
    deviceAdmin: boolean;
    blockList: boolean;
    iDSecurePassword?: string;
    accessProfile?: string;
  }
  
  export interface Document {
    id?: number;
    type: 'RG' | 'CPF';
    number: string;
    date: string;
    attachmentUrl?: string;
    attachmentId?: number;
  }
  
  export interface Group {
    id: number;
    name: string;
    description?: string;
  }