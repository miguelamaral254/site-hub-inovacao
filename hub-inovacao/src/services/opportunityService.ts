import { OpportunityResponseDTO, OpportunityUpdateStatusDTO, OpportunityUpdateStatusResponseDTO, UpdateOpportunityDetailsDTO } from "@/interfaces/OpportunityInterfaces";
import axios from "./api";
import { AxiosError } from "axios";
import { Page } from "@/interfaces/PaginationInterface";

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
export const getAllOpportunities = async (
  page: number,
  size: number
): Promise<Page<OpportunityResponseDTO>> => {
  try {
    const response = await axios.get<Page<OpportunityResponseDTO>>("/opportunities/all", {
      params: { page, size },
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw new Error(error.response.data.message || "Erro ao listar oportunidades");
    }
    throw new Error("Erro de conexão com o servidor");
  }
};
// Função para obter oportunidades aprovadas e ativas
export const getApprovedActiveOpportunities = async (
  page: number,
  size: number
): Promise<Page<OpportunityResponseDTO>> => {
  try {
    const response = await axios.get<Page<OpportunityResponseDTO>>("/opportunities/approved/active", {
      params: { page, size },
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw new Error(error.response.data.message || "Erro ao listar oportunidades aprovadas e ativas");
    }
    throw new Error("Erro de conexão com o servidor");
  }
};
export const getOpportunitiesByCompanyName = async (
  companyName: string,
  page: number,
  size: number
): Promise<Page<OpportunityResponseDTO>> => {
  try {
    const url = `/opportunities/company/${companyName}`;
    const response = await axios.get<Page<OpportunityResponseDTO>>(url, {
      params: { page, size },
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw new Error(error.response.data.message || "Erro ao listar oportunidades pela empresa");
    }
    throw new Error("Erro de conexão com o servidor");
  }
};


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