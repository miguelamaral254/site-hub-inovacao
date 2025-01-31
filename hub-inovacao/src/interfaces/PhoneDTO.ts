import { Admin } from "./AdminDTO";
import { Manager } from "./ManagerDTO";
import { Student } from "./StudentDTO";
import { Professor } from "./ProfessorDTO";
import { PartnerCompany } from "./PartnerCompanyDTO";

export interface Phone {
    id: number;
    number: string;
    admin?: Admin;
    manager?: Manager;
    student?: Student;
    professor?: Professor;
    partnerCompany?: PartnerCompany;
}