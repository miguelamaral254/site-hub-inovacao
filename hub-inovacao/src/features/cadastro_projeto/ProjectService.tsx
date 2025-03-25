import axios, { AxiosResponse } from 'axios';
import { Project } from './ProjectInterface';
export interface Pageable {
  page: number;
  size: number;
}

export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}
export const createProject = async (formData: FormData): Promise<Project> => {
  try {
    const apiConfig = {
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
      timeout: 10000,
    };

    const api = axios.create(apiConfig);

    api.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    const response: AxiosResponse<Project> = await api.post(
      '/projects',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response?.data?.message || 'Erro ao criar projeto');
    } else {
      throw new Error('Erro desconhecido');
    }
  }
};

export const searchProjects = async (
  pageable: Pageable,   // Mudei para colocar pageable como o primeiro parâmetro obrigatório
  projectType?: string,
  status?: string,
  title?: string
): Promise<Page<Project>> => {
  try {
    const apiConfig = {
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
      timeout: 10000,
    };

    const api = axios.create(apiConfig);

    api.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    const params: { [key: string]: string | number } = {};

    if (projectType) params.projectType = projectType;
    if (status) params.status = status;
    if (title) params.title = title;

    const response: AxiosResponse<Page<Project>> = await api.get('/projects', {
      params: { ...params, ...pageable },
    });

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response?.data?.message || 'Erro ao buscar projetos');
    } else {
      throw new Error('Erro desconhecido');
    }
  }
};