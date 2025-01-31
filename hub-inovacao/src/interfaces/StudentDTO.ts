import { Phone } from './PhoneDTO';
import { UserBase } from "./UserDTO";


export interface Student extends UserBase {
    cpf: string;
    phones: Phone[];
}