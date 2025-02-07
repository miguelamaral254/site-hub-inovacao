import { PublishCreateDTO, PublishResponseDTO, UpdatePublishDetailsDTO } from "@/interfaces/publishInterface";
import axios from "./api"; 
import { AxiosError } from "axios";

export const createPublish = async (
  publishData: PublishCreateDTO
): Promise<PublishResponseDTO> => {
  try {
    const response = await axios.post<PublishResponseDTO>("/publish/create", publishData);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw new Error(error.response.data.message || "Erro ao criar publicação");
    }
    throw new Error("Erro de conexão com o servidor");
  }
};

export const getAllPublish = async (): Promise<PublishResponseDTO[]> => {
  try {
    const response = await axios.get<PublishResponseDTO[]>("/publish/all");
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw new Error(error.response.data.message || "Erro ao listar publicações");
    }
    throw new Error("Erro de conexão com o servidor");
  }
};
export const updatePublish = async (
  publishId: number,
  publishData: UpdatePublishDetailsDTO
): Promise<void> => {
  try {
    await axios.put(`/publish/${publishId}/update`, publishData); 
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw new Error(error.response.data.message || "Erro ao atualizar publicação");
    }
    throw new Error("Erro de conexão com o servidor");
  }
};