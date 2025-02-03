import { CoauthorDTO } from "@/features/authusers/project/interfaces/projectInterfaces";

export interface AcademicProjectResponseDTO {
  id: string;
  title: string;
  description: string;
  urlPhoto: string;
  pdfLink: string;
  siteLink: string;
  typeAP: string;
  currentUserEmail: string;
  creationDate: string;
  status: string;
  idManager: string;
  coauthors?: CoauthorDTO[];
  // Campos específicos para Professor
  professorId?: string;
  professorName?: string;
  feedback?: string;
  justification?: string;
  // Campos específicos para Student
  studentId?: string;
  studentName?: string;
}


export interface AcademicProjectCreateDTO {
  title: string;
  description: string;
  urlPhoto: string;
  pdfLink: string;
  siteLink: string;
  typeAP: string;
  userEmail: string;
  status: string;
  coauthors?: CoauthorDTO[];
  professorId?: string;
  studentId?: string;
}

export interface AcademicProjectResponseDTO {
  id: string;
  title: string;
  description: string;
  urlPhoto: string;
  pdfLink: string;
  siteLink: string;
  typeAP: string;
  currentUserEmail: string;
  creationDate: string;
  status: string;
  idManager: string;
  coauthors?: CoauthorDTO[];
  professorId?: string;
  professorName?: string;
  feedback?: string;
  justification?: string;
  studentId?: string;
  studentName?: string;
}