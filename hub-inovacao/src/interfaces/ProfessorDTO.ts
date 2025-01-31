import { UserBase } from './UserDTO';
import { Phone } from './PhoneDTO';

export interface Professor extends UserBase {
    cpf: string;
    phones: Phone[];
}