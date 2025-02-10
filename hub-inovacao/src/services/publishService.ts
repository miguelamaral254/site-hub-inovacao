import { PublishCreateDTO, PublishResponseDTO, UpdatePublishDetailsDTO } from "@/interfaces/publishInterface";
import axios from "./api"; 
import { AxiosError } from "axios";

export const createPublish = async (
  publishData: PublishCreateDTO,
  imageFile?: File | null
): Promise<void> => {
  try {
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("dto", new Blob([JSON.stringify(publishData)], { type: "application/json" }));

    if (imageFile) {
      formData.append("imageFile", imageFile);
    }

    await axios.post("/publish/create", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    console.error("Erro ao criar publicação:", error);
    throw new Error("Erro ao criar publicação");
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