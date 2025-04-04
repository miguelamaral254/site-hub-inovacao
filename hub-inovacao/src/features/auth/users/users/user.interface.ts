export interface Phone {
    id?: number;
    number?: string;
    type?: string;
  }
  
  export enum Role {
    ADMIN = "ADMIN",
    MANAGER = "MANAGER",
    ENTERPRISE = "ENTERPRISE",
    STUDENT= "STUDENT",
    PROFESSOR= "PROFESSOR",
  }
  
  export interface User {
    id?: number;
    name?: string;
    registration?: string;
    role?: Role;
    phones?: Phone[];
    email?: string;
    password?: string;
    cpf?: string;
    cnpj?: string;
    enabled?: boolean;
    createdDate?: string;
    lastModifiedDate?: string;
  }