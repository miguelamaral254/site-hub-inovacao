import { UserBase } from './CadastroDTO';
import { Phone } from './PhoneDTO';

export interface Manager extends UserBase {
    cpf: string;
    phones: Phone[];
}