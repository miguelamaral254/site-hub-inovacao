import { Book } from "./Book";  // Ajuste o caminho conforme necessário
import { Page } from "@/interfaces/PaginationInterface";  // Ajuste o caminho conforme necessário
import api from "@/services/api";  // Importe o api configurado
import axios, { AxiosError } from "axios";

// Função para criar um livro
const API_URL = "http://localhost:8080/books";

export const createBook = async (formData: FormData): Promise<Book> => {
    try {
      const response = await axios.post<Book>(API_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao criar livro:", error);
      throw new Error("Erro ao criar livro");
    }
  };
  

// Função para buscar todos os livros com paginação
export const getAllBooks = async (page: number = 0, size: number = 10): Promise<Page<Book>> => {
  try {
    const response = await api.get<Page<Book>>("/books/all", {
      params: { page, size },
    });
    return response.data;  // Retorna os livros com base na paginação
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw new Error(error.response.data.message || "Erro ao listar livros");
    }
    throw new Error("Erro de conexão com o servidor");
  }
};

// Função para buscar livros por usuário com paginação
export const getBooksByUserId = async (userId: number, page: number = 0, size: number = 10): Promise<Page<Book>> => {
  try {
    const response = await api.get<Page<Book>>("/books/user", {
      params: { userId, page, size },
    });
    return response.data;  // Retorna os livros do usuário com base na paginação
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw new Error(error.response.data.message || "Erro ao listar livros por usuário");
    }
    throw new Error("Erro de conexão com o servidor");
  }
};

// Função para atualizar os detalhes de um livro
export const updateBookDetails = async (bookId: number, bookData: Book): Promise<void> => {
  try {
    await api.put(`/books/${bookId}/details`, bookData);  // Envia os dados atualizados do livro
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw new Error(error.response.data.message || "Erro ao atualizar detalhes do livro");
    }
    throw new Error("Erro de conexão com o servidor");
  }
};

// Função para atualizar o status de um livro
export const updateBookStatus = async (bookId: number, statusData: { available: boolean }): Promise<void> => {
  try {
    await api.put(`/books/${bookId}/status`, statusData);  // Atualiza o status do livro
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw new Error(error.response.data.message || "Erro ao atualizar o status do livro");
    }
    throw new Error("Erro de conexão com o servidor");
  }
};