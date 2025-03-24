import { LoginRequestDTO, LoginResponseDTO } from "@/interfaces/loginInterface";
import api from "./api";
import { AxiosError } from "axios";

export const login = async (
  credentials: LoginRequestDTO
): Promise<LoginResponseDTO> => {
  try {
    const response = await api.post<LoginResponseDTO>("/auth/login", credentials);
    console.log(response.data)
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw new Error(error.response.data.message || "Erro ao realizar login");
    }
    throw new Error("Erro de conexão com o servidor");
  }
};