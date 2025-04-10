export enum Role {
    SUPER_USER = "SUPER_USER",
    MONITOR = "MONITOR",
    USER = "USER"
  }
  
  export enum Institution {
    SENAC = "SENAC",
    UNIT = "UNIT",
    UNICAP = "UNICAP",
    CESAR = "CESAR",
    UNINASSAU = "UNINASSAU"
  }
  
  export enum Course {
    ADS = "ADS",
    SPI = "SPI"
  }
  
  export interface Phone {
    number?: string;
    countryCode?: string;
    enabled?: boolean;
    createdDate?: string;
    lastModifiedDate?: string;
  }
  
  export interface User {
    id?: number;
    imageUrl?: string;
    name?: string;
    role?: Role;
    phones?: Phone[];
    email?: string;
    password?: string;
    enabled?: boolean;
    cpf?: string;
    institution?: Institution;
    course?: Course;
    createdDate?: string;
    lastModifiedDate?: string;
  }