/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { Project } from './project.interface';

export interface Pageable {
  page: number;
  size: number;
}
const API_URL = "http://localhost:8080/projects";



export const searchProjects = async (
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

  // Filtros opcionais
  if (filters?.title) {
    params.title = filters.title;
  }

  if (filters?.status) {
    params.status = filters.status.toLowerCase();
  }
  if (filters?.projectType) {
    params.projectType = filters.projectType;
  }


  if (filters?.enabled !== undefined) {
    params.enabled = filters.enabled;
  }

  if (filters?.idManager) {
    params.idManager = filters.idManager;
  }

  if (filters?.idUser) {
    params.idUser = filters.idUser;
  }

  console.log("Parametros enviados para API:", params);

  try {
    const response = await axios.get(`${API_URL}`, { params });
    return response.data;
    console.log()
  } catch (error) {
    console.error("Erro ao buscar projetos:", error);
    throw error;
  }
};


export const createOpportunity = async (formData: FormData): Promise<Project> => {
  try {
    const response = await axios.post<Project>(API_URL, formData, {
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