import { UserBase } from './UserDTO';
import { Phone } from './PhoneDTO';

export interface PartnerCompany extends UserBase {
    cnpj: string;
    phones: Phone[];
}