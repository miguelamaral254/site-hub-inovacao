/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { User } from "./user.interface";


const API_URL = "http://localhost:8080/users";


export const searchOpportunities = async (
  filters?: Record<string, any>,
  page: number = 0,
  size: number = 10,
  sort?: string
) => {
  const params: Record<string, any> = {
    ...filters,
    page, 
    size, 
    sort, 
  };

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
export const getUserById = async (id: number) => {
  return axios.get(`${API_URL}/${id}`);
};

export const updateUser = async (id: number, data: User) => {
  return axios.put(`${API_URL}/${id}`, data);
};

export const deleteUser = async (id: number) => {
  return axios.delete(`${API_URL}/${id}`);
};

export const updateStatus = async (id: number, status: string) => {
  return axios.patch(`${API_URL}/${id}/status?status=${status}`);
};
export const updateUserDetails = async (id: number, data: User) => {
  return axios.put(`${API_URL}/${id}`, data);
};
