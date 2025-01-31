import { UserBase } from './UserDTO';
import { Phone } from './PhoneDTO';

export interface Manager extends UserBase {
    cpf: string;
    phones: Phone[];
}