/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { Opportunity } from "./opportunity.interface";
import { Page } from "../core/page.interface";

const API_URL = "http://localhost:8080/opportunities";

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

export const searchOpportunities = async (
  filters?: Record<string, any>,
  pageable: { page: number; size: number } = { page: 0, size: 10 }, 
  sort?: string
):Promise<Page<Opportunity>>  => {
  const params: Record<string, any> = {
    ...filters,
    page: pageable.page, 
    size: pageable.size, 
    sort, 
  };

  //console.log("Parametros enviados para API:", params);

  try {
    const response = await axios.get(`${API_URL}`, { params });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar projetos:", error);
    throw error;
  }
};
export const getOpportunityById = async (id: number) => {
  return axios.get(`${API_URL}/${id}`);
};

export const updateOpportunity = async (id: number, data: Opportunity) => {
  return axios.put(`${API_URL}/${id}`, data);
};

export const deleteOpportunity = async (id: number) => {
  return axios.delete(`${API_URL}/${id}`);
};

export const updateStatus = async (id: number, status: string) => {
  return axios.patch(`${API_URL}/${id}/status?status=${status}`);
};
export const updateOpportunityDetails = async (id: number, data: Opportunity) => {
  return axios.put(`${API_URL}/${id}`, data);
};
