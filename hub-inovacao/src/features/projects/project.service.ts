/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { Project } from './project.interface';
import { Page } from '../core/page.interface';

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_URL = `${baseURL}/projects`;

export const searchProjects = async (
  filters?: Record<string, any>,
  pageable: { page: number; size: number } = { page: 0, size: 10 }, 
  sort?: string
): Promise<Page<Project>> => { 
  const params: Record<string, any> = {
    ...filters,
    page: pageable.page, 
    size: pageable.size, 
    sort, 
  };

  try {
    const response = await axios.get(`${API_URL}`, { params });
    return response.data; // Retorna um objeto do tipo Page<Project>
  } catch (error) {
    console.error("Erro ao buscar projetos:", error);
    throw error;
  }
};
export const createProject = async (formData: FormData): Promise<Project> => {
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
export const updateProject = async (id: number, projectData: any): Promise<Project> => {
  try {
    const response = await axios.put<Project>(`${API_URL}/${id}`, projectData);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar projeto:", error);
    throw new Error("Erro ao atualizar projeto");
  }
};
export const updateProjectStatus = async (id: number, status: string): Promise<string> => {
  try {
    const response = await axios.patch<string>(`${API_URL}/${id}/status`, null, {
      params: { status }
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar status do projeto:", error);
    throw new Error("Erro ao atualizar status do projeto");
  }
};
export const deleteProject = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error("Erro ao deletar projeto:", error);
    throw new Error("Erro ao deletar projeto");
  }
};
