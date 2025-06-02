import { User } from "../auth/users/user.interface";
import api from "../core/api";


const resource = "/users";

export const createUser = async (formData: User): Promise<User> => {
  try {
    const response = await api.post<User>(resource, formData);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar User:", error);
    throw new Error("Erro ao criar User");
  }
};