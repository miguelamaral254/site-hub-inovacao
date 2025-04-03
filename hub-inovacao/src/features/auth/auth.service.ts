import { AxiosError } from "axios";
import { LoginRequest, LoginResponse } from "./login.interface";
import api from "../core/api";

export const login = async (
  credentials: LoginRequest
): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>("/auth/login", credentials);
    console.log(response.data)
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw new Error(error.response.data.message || "Erro ao realizar login");
    }
    throw new Error("Erro de conexão com o servidor");
  }
};