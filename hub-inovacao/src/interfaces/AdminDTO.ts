import { UserBase } from './UserDTO';
import { Phone } from './PhoneDTO';

export interface Admin extends UserBase {
    cnpj: string;
    phones: Phone[];
}
    