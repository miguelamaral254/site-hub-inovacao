/* eslint-disable @typescript-eslint/no-explicit-any */
import { Publish } from './publish.interface';
import api from '../core/api';

export interface Pageable {
  page: number;
  size: number;
}
const resource = '/editals';


export const createPublish = async (publishData: Publish): Promise<Publish> => {
  try {
    const response = await api.post<Publish>(resource, publishData);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar publicação:", error);
    throw new Error("Erro ao criar publicação");
  }
};

export const searchPublishes = async (
  filters?: Record<string, any>,
  pageable: Pageable = { page: 0, size: 10 }, 
  sort?: string
) => {
  const params: Record<string, any> = {
    ...filters,
    page: pageable.page, 
    size: pageable.size, 
    sort, 
  };

  console.log("Parametros enviados para API:", params);

  try {
    const response = await api.get(`${resource}`, { params });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar projetos:", error);
    throw error;
  }
};

export const updatePublishStatus = async (id: number, enabled: boolean) => {
  const url = `${resource}/${id}/enabled?enabled=${enabled.toString()}`;
  console.log("URL da requisição:", url); 
  try {
    const response = await api.put(url, null);
    console.log("Resposta da API:", response); 
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar o status da publicação", error);
    throw error;
  }
};