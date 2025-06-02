import axios from "axios";
import { User } from "./user.interface";
import api from "@/features/core/api";

const resource = "/users";
export const getUserById = async (id: number) => {
  return api.get(`${resource}/${id}`);
};
export const updateUser = async (id: number, data: User) => {
  return axios.put(`${resource}/${id}`, data);
};
export const deleteUser = async (id: number) => {
  return axios.delete(`${resource}/${id}`);
};
export const updateStatus = async (id: number, status: string) => {
  return axios.patch(`${resource}/${id}/status?status=${status}`);
};
export const updateUserDetails = async (id: number, data: User) => {
  return axios.put(`${resource}/${id}`, data);
};
