/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { User } from "./user";

// Função para criar um livro
const API_URL = "http://localhost:8080/users";

export const createUser = async (formData: FormData): Promise<User> => {
    try {
      const response = await axios.post<User>(API_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao criar livro:", error);
      throw new Error("Erro ao criar livro");
    }
  };
  

// Função para buscar todos os livros com paginação
export const searchUsers = async (
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
