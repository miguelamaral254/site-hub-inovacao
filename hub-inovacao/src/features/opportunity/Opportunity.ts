import { StatusSolicitation } from "../cadastro_projeto/ProjectInterface";

export interface Opportunity {
  id?: number;
  enabled?: boolean;
  createdDate?: string;
  lastModifiedDate?: string;
  urlPhoto?: string;
  tituloDesafio?: string;
  areaProblema?: string;
  descricaoProblema?: string;
  impactoProblema?: string;
  solucoesTestadas?: string;
  expectativas?: string;
  restricoes?: string;
  disponibilidadeDados?: string;
  mentoriaSuporte?: boolean;
  visitasTecnicas?: boolean;
  recursosDisponiveis?: string[];
  autorizacao?: boolean;
  opportunityType?: OpportunityType;
  enterpriseId?: number;
  managerId?: number;
  feedback?: string;
  justification?: string;
  status?: StatusSolicitation;
}

export enum OpportunityType {
  BANCO_DE_OPORTUNIDADE,
  BANCO_DE_PROBLEMA,
  BANCO_DE_IDEIA,
  DESAFIO
}