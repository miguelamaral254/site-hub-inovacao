import { PublishCreateDTO, PublishResponseDTO, UpdatePublishDetailsDTO } from "@/interfaces/publishInterface";
import axios from "./api"; 
import { AxiosError } from "axios";
import { Page } from "@/interfaces/PaginationInterface";

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
export const getAllPublish = async (
  page: number,
  size: number
): Promise<Page<PublishResponseDTO>> => {
  try {
    const response = await axios.get<Page<PublishResponseDTO>>("/publish/all", {
      params: { page, size },
    });

    return response.data;
  } catch (error) {
    console.error("Erro ao buscar publicações:", error);
    throw new Error("Erro ao buscar publicações.");
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