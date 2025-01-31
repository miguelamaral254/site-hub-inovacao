import { UserBase } from './CadastroDTO';
import { Phone } from './PhoneDTO';

export interface PartnerCompany extends UserBase {
    cnpj: string;
    phones: Phone[];
}