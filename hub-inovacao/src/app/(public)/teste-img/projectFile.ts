// services/projectService.ts
import axios from 'axios';

export const createProject = async (formData: FormData) => {
  try {
    const apiConfig = {
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
      timeout: 10000,   
    };

    const api = axios.create(apiConfig);

    api.interceptors.request.use(
      (config) => {
        // Não inclui a parte do token, pois você pediu para remover a lógica de autenticação
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    const response = await api.post(
      '/projects',  // A URL base já está configurada
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