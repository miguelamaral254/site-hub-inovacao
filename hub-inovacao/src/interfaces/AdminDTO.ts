import { UserBase } from './CadastroDTO';
import { Phone } from './PhoneDTO';

export interface Admin extends UserBase {
    cnpj: string;
    phones: Phone[];
}
    