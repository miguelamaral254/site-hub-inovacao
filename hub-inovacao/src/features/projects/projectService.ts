import axios, { AxiosResponse } from 'axios';
import { Project } from './projectInterface';

export const createProject = async (formData: FormData): Promise<Project> => {
  try {
    const apiConfig = {
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
      timeout: 10000,   
    };

    const api = axios.create(apiConfig);

    api.interceptors.request.use(
      (config) => {
        // Configurações de requisição
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
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Erro ao criar projeto');
  }
};