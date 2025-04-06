import axios from "axios";
import { User } from "../auth/users/user.interface";


const API_URL = "http://localhost:8080/users";

export const createUser = async (formData: User): Promise<User> => {
  try {
    const response = await axios.post<User>(API_URL, formData);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar User:", error);
    throw new Error("Erro ao criar User");
  }
};