import axios from "./api";
import { AxiosError } from "axios";
import { Page } from "@/interfaces/PaginationInterface";
import { Opportunity } from "@/features/opportunity/opportunity.interface";

export const createOpportunity = async (opportunityData: Opportunity, imageFile: File, formData: FormData): Promise<Opportunity> => {
  try {
    const response = await axios.post<Opportunity>("/opportunities", formData, {
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
export const getOpportunitiesForManager = async (
  idManager: number,
  page: number,
  size: number
): Promise<Page<OpportunityResponseDTO>> => {
  try {
    console.log("Calling API with idManager:", idManager);  // Verificar o valor de idManager antes de fazer a solicitação
    const response = await axios.get<Page<OpportunityResponseDTO>>("/opportunities/manager/all", {
      params: { idManager, page, size },
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw new Error(error.response.data.message || "Erro ao listar oportunidades do gerente");
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