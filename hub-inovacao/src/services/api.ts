import axios from "axios";

type ApiConfig = {
  baseURL?: string;
  timeout?: number;
};

const apiConfig: ApiConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 10000,   
};

const api = axios.create(apiConfig);

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;