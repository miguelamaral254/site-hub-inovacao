import { Role } from "./user.interface";

export interface Enterprise {
  id?: number;
  nomeEmpresa?: string;
  cnpj?: string;
  setorAtuacao?: string;
  email?: string;
  password?: string;
  phone?: string;
  role?: Role;
  reprentantName?: string;
  reprentantPosition?: string;
  reprentantEmail?: string;
  reprentantPhone?: string;
  address?: Address;
  enabled?: boolean;
  createdDate?: string;
  lastModifiedDate?: string;
}
export interface Address {
    id?: number;
    street?: string;
    number?:number;
    complement?:string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
    enabled?: boolean;
    createdDate?: string;
    lastModifiedDate?: string;
  }