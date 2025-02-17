import {
  AcademicProjectResponseProfessorDTO,
  AcademicProjectResponseStudentDTO,
  UpdateAcademicProjectStatusDTO,
} from "@/features/auth-components/project/interfaces/projectInterfaces";
import axios from "./api";
import { AxiosError } from "axios";
import { AcademicProjectResponseDTO } from "@/interfaces/AcademicProjectInterface";
import { UpdateProjectDetails } from "@/features/auth-components/project/interfaces/UpdateProjectDetails";
import { Page } from "@/interfaces/PaginationInterface";

// Função para criar projeto para professor
export const createProject = async (
  projectData: FormData // Alterado para FormData
): Promise<AcademicProjectResponseDTO> => {
  try {
    const userRole = localStorage.getItem("role");
    if (!userRole) {
      throw new Error("Papel do usuário não encontrado.");
    }

    console.log("Role do usuário:", userRole);

    // Verificando a URL antes de realizar a requisição
    const url = `/projects/${userRole.toLowerCase()}/create`;
    console.log("URL da requisição:", url);

    const response = await axios.post<AcademicProjectResponseDTO>(url, projectData, {
      headers: {
        "Content-Type": "multipart/form-data", // Configuração necessária para envio de arquivos
      },
    });

    console.log("Resposta do servidor:", response);

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      console.log("Erro no Axios:", error.response);
      throw new Error(error.response.data.message || "Erro ao criar projeto");
    }

    console.error("Erro de conexão:", error);
    throw new Error("Erro de conexão com o servidor");
  }
};
// Função para obter projetos por email
export const getProjectsByUserEmail = async (
  email: string,
  page: number,
  size: number
): Promise<Page<AcademicProjectResponseProfessorDTO | AcademicProjectResponseStudentDTO>> => {
  try {
    const response = await axios.get<Page<AcademicProjectResponseProfessorDTO | AcademicProjectResponseStudentDTO>>(
      "/projects/by-email", // O endpoint correto, a URL base será automaticamente combinada
      {
        params: { email, page, size },
      }
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw new Error(error.response.data.message || "Erro ao buscar projetos");
    }
    throw new Error("Erro de conexão com o servidor");
  }
};
// Função para listar todos os projetos de professor
export const getAllProjectsForProfessor = async (): Promise<
  AcademicProjectResponseProfessorDTO[]
> => {
  try {
    const response = await axios.get<AcademicProjectResponseProfessorDTO[]>(
      "/projects/all-professor"
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw new Error(
        error.response.data.message || "Erro ao listar projetos de professor"
      );
    }
    throw new Error("Erro de conexão com o servidor");
  }
};

// Função para listar todos os projetos de aluno
export const getAllProjectsForStudent = async (): Promise<
  AcademicProjectResponseStudentDTO[]
> => {
  try {
    const response = await axios.get<AcademicProjectResponseStudentDTO[]>(
      "/projects/all-student"
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw new Error(
        error.response.data.message || "Erro ao listar projetos de aluno"
      );
    }
    throw new Error("Erro de conexão com o servidor");
  }
};

// Função para listar todos os projetos
export const getAllProjects = async (
  page: number,
  size: number
): Promise<Page<AcademicProjectResponseDTO>> => {
  try {
    const response = await axios.get<Page<AcademicProjectResponseDTO>>("/projects/all", {
      params: { page, size },
    });

    return response.data;
  } catch (error) {
    console.error("Erro ao listar projetos:", error);
    throw new Error("Erro ao listar projetos.");
  }
};
export const getAllProjectsForManager = async (
  page: number,
  size: number
): Promise<Page<AcademicProjectResponseDTO>> => {
  try {
    const response = await axios.get<Page<AcademicProjectResponseDTO>>("/projects/manager/all", {
      params: { page, size },
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw new Error(
        error.response.data.message || "Erro ao listar todos os projetos"
      );
    }
    throw new Error("Erro de conexão com o servidor");
  }
};
  export const updateProjectDetails = async (
    projectId: number,
    updateData: UpdateProjectDetails
  ): Promise<void> => {
    try {
      await axios.put(`/projects/${projectId}/details`, updateData);
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        throw new Error(error.response.data.message || "Erro ao atualizar detalhes do projeto");
      }
      throw new Error("Erro de conexão com o servidor");
    }
  };

        export const updateProjectStatus = async (
          projectId: number,
          statusData: UpdateAcademicProjectStatusDTO
          ): Promise<void> => {
            try {
              await axios.put(`/projects/${projectId}/status`, statusData);
              } catch (error) {
                if (error instanceof AxiosError && error.response) {
                  throw new Error(error.response.data.message || "Erro ao atualizar status do projeto");
                  }
                  throw new Error("Erro de conexão com o servidor");
                  }
                  };

