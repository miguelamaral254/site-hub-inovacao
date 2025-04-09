//import { ReactNode } from "react";

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

  export interface Opportunity {
    title?: string;
    areaproblema?: string;
    description?: string;
    impactoArea?: string;
    solucaotestada?: string;
    expectativas?: string;
    restricoes?: string;
    restricoesDetalhes?: string;
    disponibilidadeDados?: string;
    mentoriaSuporte?: string;
    visitaTecnicas?: string;
    recursosDisponiveis?: string;
    urlPhoto?: string;
    typeBO?: TypeBO;
    authorEmail?: string;
    status?: StatusSolicitation;
    flagActive?: boolean;
    partnerCompanyId?: number;
  }
  
 
  
  export interface OpportunityUpdateStatusDTO {
    id?: number;
    status?: string;
    validationDate?: string; // LocalDate in Java
    feedback?: string;
    justification?: string;
    idManager?: string;
  }
  


