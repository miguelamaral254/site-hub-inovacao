/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { Opportunity } from "./Opportunity";

const API_URL = "http://localhost:8080/opportunities";

// Função para criar uma nova oportunidade
export const createOpportunity = async (formData: FormData): Promise<Opportunity> => {
  try {
    const response = await axios.post<Opportunity>(API_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao criar opportunity:", error);
    throw new Error("Erro ao criar opportunity");
  }
};

// Função para buscar oportunidades com filtro e paginação

export const searchOpportunities = async (
  filters?: Record<string, any>,
  page: number = 0,
  size: number = 10,
  sort?: string
) => {
  const params: Record<string, any> = {
    ...filters,
    page, // Página (indexada a partir de 0)
    size, // Tamanho da página
    sort, // Ordenação opcional
  };

  // Filtros opcionais
  if (filters?.tituloDesafio) {
    params.tituloDesafio = filters.tituloDesafio;
  }

  if (filters?.status) {
    params.status = filters.status.toLowerCase();
  }

  if (filters?.enabled !== undefined) {
    params.enabled = filters.enabled;
  }

  if (filters?.idManager) {
    params.idManager = filters.idManager;
  }

  if (filters?.enterpriseId) {
    params.enterpriseId = filters.enterpriseId;
  }

  console.log("Parametros enviados para API:", params);

  try {
    const response = await axios.get(`${API_URL}`, { params });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar oportunidades:", error);
    throw error;
  }
};
export const getOpportunityById = async (id: number) => {
  return axios.get(`${API_URL}/${id}`);
};

// Função para atualizar a oportunidade (usando PUT)
export const updateOpportunity = async (id: number, data: Opportunity) => {
  return axios.put(`${API_URL}/${id}`, data);
};

// Função para excluir a oportunidade (usando DELETE)
export const deleteOpportunity = async (id: number) => {
  return axios.delete(`${API_URL}/${id}`);
};

// Função para atualizar o status de uma oportunidade
export const updateStatus = async (id: number, status: string) => {
  return axios.patch(`${API_URL}/${id}/status?status=${status}`);
};