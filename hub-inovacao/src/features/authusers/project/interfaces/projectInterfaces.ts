// interfaces/projectInterfaces.ts
export interface CoauthorDTO {
    name: string;
    email: string;
    phone: string;
  }
  
  export interface AcademicProjectResponseProfessorDTO {
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
    professorId: string;
    professorName: string;
    feedback: string;
    justification: string;
    idManager: string;
    coauthors: CoauthorDTO[];
  }
  
  export interface AcademicProjectResponseStudentDTO {
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
    studentId: string;
    studentName: string;
    feedback: string;
    justification: string;
    idManager: string;
    coauthors: CoauthorDTO[];
  }