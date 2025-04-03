import { StatusSolicitation } from "../projects/cadastro_projeto/ProjectInterface";

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
  BANCO_DE_OPORTUNIDADE = "Banco de Oportunidade",
  BANCO_DE_PROBLEMA = "Banco de Problema",
  BANCO_DE_IDEIA = "Banco de Ideia",
  DESAFIO = "Desafio"
}
