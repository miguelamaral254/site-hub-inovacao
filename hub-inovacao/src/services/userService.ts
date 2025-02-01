import { CreateUserRequestDTO, CreateUserResponseDTO, UserResponseCnpjDTO, UserResponseCpfDTO } from "@/interfaces/userInterface";
import api from "./api";
import { AxiosError } from "axios";

// Função para criar o usuário com CPF
export const createUserWithCpf = async (
  userData: CreateUserRequestDTO
): Promise<CreateUserResponseDTO> => {
  try {
    const response = await api.post<CreateUserResponseDTO>("/users/create-user-cpf", userData);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw new Error(error.response.data.message || "Erro ao criar usuário");
    }
    throw new Error("Erro de conexão com o servidor");
  }
};
export const createUserWithCnpj = async (
  userData: CreateUserRequestDTO
): Promise<UserResponseCnpjDTO> => {
  try {
    const response = await api.post<UserResponseCnpjDTO>("/users/create-user-cnpj", userData);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw new Error(error.response.data.message || "Erro ao criar usuário");
    }
    throw new Error("Erro de conexão com o servidor");
  }
};
export const getUserByEmail = async (email: string): Promise<UserResponseCnpjDTO | UserResponseCpfDTO> => {
  try {
    const response = await api.get<UserResponseCnpjDTO | UserResponseCpfDTO>("/users/by-email", {
      params: { email }
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw new Error(error.response.data.message || "Erro ao buscar dados do usuário");
    }
    throw new Error("Erro de conexão com o servidor");
  }
};