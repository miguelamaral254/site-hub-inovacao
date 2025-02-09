import { ReactNode } from "react";

export enum TypeBO {
    PROBLEMA = "PROBLEMA",
    OPORTUNIDADE = "OPORTUNIDADE",
    IDEIA = "IDEIA",
  }
  
  export enum StatusSolicitation {
    PENDENTE,
    REPROVADA,
    APROVADA,
   
  }

  export interface OpportunityCreateDTO {
    title: string;
    description: string;
    urlPhoto: string;
    pdfLink: string;
    siteLink: string;
    typeBO: TypeBO;
    authorEmail: string;
    status: StatusSolicitation;
    flagActive: boolean;
    partnerCompanyId: number;
  }
  
  export interface OpportunityResponseDTO {
    type: ReactNode;
    organizerName: ReactNode;
    id: number;
    title: string;
    description: string;
    urlPhoto: string;
    pdfLink: string;
    siteLink: string;
    typeBO: TypeBO;
    authorEmail: string;
    status: StatusSolicitation;
    creationDate: string; 
    flagActive: boolean;
    partnerCompanyId: number;
    institutionOrganization: string;
    feedback?: string;
    justification?: string;
  }
  
  export interface OpportunityUpdateStatusDTO {
    id: number;
    status: string;
    validationDate: string; // LocalDate in Java
    feedback: string;
    justification: string;
    idManager: string;
  }
  
  export interface OpportunityUpdateStatusResponseDTO {
    id: number;
    title: string;
    description: string;
    urlPhoto: string;
    pdfLink: string;
    siteLink: string;
    typeBO: TypeBO;
    authorEmail: string;
    status: StatusSolicitation;
    creationDate: string; 
    flagActive: boolean;
    partnerCompanyId: number;
    validationDate: string; 
    feedback: string;
    justification: string;
    idManager: number;
  }

  export interface UpdateOpportunityDetailsDTO {
     title: string;
     description:string;
     urlPhoto: string;
     pdfLink: string;
     siteLink:string;
  }