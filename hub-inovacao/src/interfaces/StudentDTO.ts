import { Phone } from './PhoneDTO';
import { UserBase } from "./CadastroDTO";


export interface Student extends UserBase {
    cpf: string;
    phones: Phone[];
}