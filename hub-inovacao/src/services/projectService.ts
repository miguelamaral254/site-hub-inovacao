import {
  AcademicProjectResponseProfessorDTO,
  AcademicProjectResponseStudentDTO,
  UpdateAcademicProjectStatusDTO,
} from "@/features/auth-components/project/interfaces/projectInterfaces";
import axios from "./api";
import { AxiosError } from "axios";
import { AcademicProjectResponseDTO } from "@/interfaces/AcademicProjectInterface";
import { UpdateProjectDetails } from "@/features/auth-components/project/interfaces/UpdateProjectDetails";

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
  email: string
): Promise<
  (AcademicProjectResponseProfessorDTO | AcademicProjectResponseStudentDTO)[]
> => {
  try {
    const response = await axios.get<
      AcademicProjectResponseProfessorDTO | AcademicProjectResponseStudentDTO[]
    >("/projects/by-email", {
      params: { email },
    });

    const data = Array.isArray(response.data) ? response.data : [response.data];

    return data;
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
export const getAllProjects = async (): Promise<AcademicProjectResponseDTO[]> => {
  try {
    const response = await axios.get<AcademicProjectResponseDTO[]>("/projects/all");
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
export const getAllProjectsForManager = async (): Promise<AcademicProjectResponseDTO[]> => {
  try {
    const response = await axios.get<AcademicProjectResponseDTO[]>("/projects/manager/all");
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
// Função para atualizar status do projeto

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

