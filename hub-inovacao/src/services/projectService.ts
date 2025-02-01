import {
  AcademicProjectResponseProfessorDTO,
  AcademicProjectResponseStudentDTO,
} from "@/features/authusers/interfaces/projectInterfaces";
import axios from "./api";
import { AxiosError } from "axios";
import { AcademicProjectResponseDTO } from "@/interfaces/AcademicProjectInterface";

// Função para criar projeto para professor
/*
export const createProjectForProfessor = async (
    projectData: AcademicProjectCreateProfessorDTO
): Promise<AcademicProjectResponseProfessorDTO> => {
    try {
        const response = await axios.post<AcademicProjectResponseProfessorDTO>(
            "/projects/professor/create",
            projectData
        );
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError && error.response) {
            throw new Error(error.response.data.message || "Erro ao criar projeto para professor");
        }
        throw new Error("Erro de conexão com o servidor");
    }
};

// Função para criar projeto para aluno
export const createProjectForStudent = async (
    projectData: AcademicProjectCreateStudentDTO
): Promise<AcademicProjectResponseStudentDTO> => {
    try {
        const response = await axios.post<AcademicProjectResponseStudentDTO>(
            "/projects/student/create",
            projectData
        );
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError && error.response) {
            throw new Error(error.response.data.message || "Erro ao criar projeto para aluno");
        }
        throw new Error("Erro de conexão com o servidor");
    }
};
*/

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
// Função para atualizar status do projeto
/*
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
                  
// Função para atualizar detalhes do projeto
export const updateProjectDetails = async (
  projectId: number,
  updateData: UpdateAcademicProjectDetailsDTO
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
*/
