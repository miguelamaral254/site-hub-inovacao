import { CreateUserRequestDTO, CreateUserResponseDTO, User, UserResponseCnpjDTO, UserResponseCpfDTO } from "@/interfaces/userInterface";
import api from "./api";
import { AxiosError } from "axios";
import { Page } from "@/interfaces/PaginationInterface";

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

export const getUserById = async (id: number): Promise<{ data: UserResponseCnpjDTO | UserResponseCpfDTO }> => {
  try {
    const response = await api.get<{ data: UserResponseCnpjDTO | UserResponseCpfDTO }>(`/users/${id}`);
    return response.data; // Agora o TypeScript entende que `data` existe
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw new Error(error.response.data.message || "Erro ao buscar dados do usuário");
    }
    throw new Error("Erro de conexão com o servidor");
  }
};

export const getAllPlatformUsers = async (
  page: number,
  size: number
): Promise<Page<User>> => {
  try {
    const response = await api.get<Page<User>>("/users/all-platform-users", {
      params: { page, size },
    });

    return response.data;
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    throw new Error("Erro ao buscar usuários da plataforma.");
  }
};

export const createManagerUser = async (
  userData: CreateUserRequestDTO
): Promise<CreateUserResponseDTO> => {
  try {
    const response = await api.post<CreateUserResponseDTO>("/users/create-manager", userData);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw new Error(error.response.data.message || "Erro ao criar gerente.");
    }
    throw new Error("Erro de conexão com o servidor.");
  }
};