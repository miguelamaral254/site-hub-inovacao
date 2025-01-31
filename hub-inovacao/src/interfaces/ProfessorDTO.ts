import { UserBase } from './CadastroDTO';
import { Phone } from './PhoneDTO';

export interface Professor extends UserBase {
    cpf: string;
    phones: Phone[];
}