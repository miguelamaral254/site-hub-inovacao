export enum ProjectType {
    PROJETO_INTEGRADOR = "PROJETO_INTEGRADOR",
    PROJETO_EXTENSAO = "PROJETO_EXTENSAO",
    PROJETO_INOVACAO = "PROJETO_INOVACAO",
    BANCO_DE_OPORTUNIDADE = "BANCO_DE_OPORTUNIDADE",
    BANCO_DE_PROBLEMA = "BANCO_DE_PROBLEMA",
    BANCO_DE_IDEIA = "BANCO_DE_IDEIA",
  }
    
  export enum StatusSolicitation {
    PENDENTE = "PENDENTE",
    APROVADO = "APROVADO",
    INDEFERIDO = "INDEFERIDO",
  }
    
    export interface Coauthor {
      id?: number;
      name: string;
      email: string;
      phone: string;
      position: string;
      enabled: boolean;
      createdDate?:string;
      lastModifiedDate?: string;
    }
    
  export interface Project {
      id?: number;
      title: string;
      description: string;
      urlPhoto: string;
      pdfLink: string;
      siteLink: string;
      thematicArea: string;
      course: string;
      problem: string;
      generalObjective: string;
      specificObjective: string;
      expectedResults: string;
      projectType: ProjectType;
      status: StatusSolicitation;
      idUser: number;
      idManager?: number;
      feedback?: string;
      justification?: string;
      enabled: boolean;
      createdDate?:string;
      lastModifiedDate?: string;
      coauthors?: Coauthor[];
    }