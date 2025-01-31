import { Phone } from "./PhoneDTO";

export interface UserBase {
    id: number;
    name: string;
    email: string;
    registration: string;
    role: Role;
    institutionOrganization: string;
    userStatus: boolean;
    phones: Phone[];
    password: string;
}
    
export enum Role {
    ADMIN = 'ADMIN',
    PROFESSOR = 'PROFESSOR',
    STUDENT = 'STUDENT',
    MANAGER = 'MANAGER',
    PARTNER_COMPANY = 'PARTNER_COMPANY'
}

export interface User extends UserBase {
    id: number;
    name: string;
    email: string;
    password: string;
    registration: string;
    institutionOrganization: string;
    userStatus: boolean;
    role: Role;
    getPhones(): Phone[];
}


    