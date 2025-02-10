import { OpportunityResponseDTO, OpportunityUpdateStatusDTO, OpportunityUpdateStatusResponseDTO, UpdateOpportunityDetailsDTO } from "@/interfaces/OpportunityInterfaces";
import axios from "./api";
import { AxiosError } from "axios";

export const createOpportunity = async (formData: FormData): Promise<OpportunityResponseDTO> => {
  try {
    const response = await axios.post<OpportunityResponseDTO>("/opportunities/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw new Error(error.response.data.message || "Erro ao criar oportunidade");
    }
    throw new Error("Erro de conexão com o servidor");
  }
};
// Função para buscar todas as oportunidades
export const getAllOpportunities = async (): Promise<OpportunityResponseDTO[]> => {
  try {
    const response = await axios.get<OpportunityResponseDTO[]>("/opportunities/all");
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw new Error(error.response.data.message || "Erro ao listar oportunidades");
    }
    throw new Error("Erro de conexão com o servidor");
  }
};

// Função para obter oportunidades aprovadas e ativas
export const getApprovedActiveOpportunities = async (): Promise<OpportunityResponseDTO[]> => {
  try {
    const response = await axios.get<OpportunityResponseDTO[]>("/opportunities/approved/active");
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw new Error(error.response.data.message || "Erro ao listar oportunidades aprovadas e ativas");
    }
    throw new Error("Erro de conexão com o servidor");
  }
};

export const getOpportunitiesByCompanyName = async (
  companyName: string
): Promise<OpportunityResponseDTO[]> => {
  try {
    // Verifique a URL completa antes de fazer a requisição
    const url = `/opportunities/company/${companyName}`;

    // Fazendo a requisição para o servidor
    const response = await axios.get<OpportunityResponseDTO[]>(url);

    // Verificando a resposta

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw new Error(error.response.data.message || "Erro ao listar oportunidades pela empresa");
    }
    throw new Error("Erro de conexão com o servidor");
  }
};
// Função para atualizar o status da oportunidade


export const updateOpportunityStatus = async (
  opportunityId: number,
  statusData: OpportunityUpdateStatusDTO
): Promise<OpportunityUpdateStatusResponseDTO> => {
  try {
    const response = await axios.put<OpportunityUpdateStatusResponseDTO>(
      `/opportunities/${opportunityId}/status`,
      statusData
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw new Error(error.response.data.message || "Erro ao atualizar o status da oportunidade");
    }
    throw new Error("Erro de conexão com o servidor");
  }
};

export const updateOpportunityDetails = async (
  opportunityId: number,
  updateDTO: UpdateOpportunityDetailsDTO 
): Promise<void> => {
  try {
    await axios.put(`/opportunities/${opportunityId}/details`, updateDTO);
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw new Error(error.response.data.message || "Erro ao atualizar detalhes da oportunidade");
    }
    throw new Error("Erro de conexão com o servidor");
  }
};