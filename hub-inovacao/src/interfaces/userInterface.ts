export interface User {
  id: number;
  name: string;
  email: string;
  registration: string;
  role: string;
  institutionOrganization: string;
  userStatus: boolean;
  cnpj?: string;
  cpf?: string;
  phones: { id: number; number: string }[];
}


export interface CreateUserRequestDTO {
    name: string;
    email: string;
    password: string;
    role: string; 
    cpf: string;
    registration: string;
    phones: { number: string }[];
  }
  export interface UserCreateCnpjDTO {
    name: string;
    email: string;
    password: string;
    registration: string;
    role: Role;
    institutionOrganization: string;
    userStatus: boolean;
    cnpj: string;
    phones: PhoneResponseDTO[];
  }
  
  export interface CreateUserResponseDTO {
    id: string;
    name: string;
    email: string;
    role: string;
    cpf: string;
    registration: string;
    phones: { number: string }[];
    createdAt: string;
    updatedAt: string;
  }
  export interface PhoneResponseDTO {
    id: string;
    number: string;
  }
  
  export interface UserResponseCnpjDTO {
    id: string;
    name: string;
    email: string;
    registration: string;
    role: Role;
    institutionOrganization: string;
    userStatus: boolean;
    cnpj: string;
    phones: PhoneResponseDTO[];
  }
  
  export interface UserResponseCpfDTO {
    id: string;
    name: string;
    email: string;
    registration: string;
    role: Role;
    institutionOrganization: string;
    userStatus: boolean;
    cpf: string;
    phones: PhoneResponseDTO[];
  }

  export enum Role {
      ADMIN = 'ADMIN',
      PROFESSOR = 'PROFESSOR',
      STUDENT = 'STUDENT',
      MANAGER = 'MANAGER',
      PARTNER_COMPANY = 'PARTNER_COMPANY'
      }