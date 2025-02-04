/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import { FaFilePdf, FaExternalLinkAlt, FaTimes } from "react-icons/fa";
import { AcademicProjectResponseProfessorDTO, AcademicProjectResponseStudentDTO } from "../interfaces/projectInterfaces";
import UpdateProjectDetails from "./UpdateProjectDetails";
import { updateProjectDetails } from "@/services/projectService";
import useSwal from "@/hooks/useSwal";

interface ProjectCardProps {
  project: AcademicProjectResponseProfessorDTO | AcademicProjectResponseStudentDTO;
  fetchProjects: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, fetchProjects }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { showSuccess, showError } = useSwal();

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleEditModalToggle = () => {
    setIsEditModalOpen(!isEditModalOpen);
  };

  const renderIfExists = (value: string | null | undefined, label: string) => {
    return value ? (
      <p><strong>{label}:</strong> {value}</p>
    ) : null;
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'APROVADA':
        return 'text-green-500'; 
      case 'PENDENTE':
        return 'text-orange-500'; 
      case 'REPROVADA':
        return 'text-red-600'; 
      default:
        return 'bg-gray-100 text-gray-800'; 
    }
  };

  const renderCoauthors = () => {
    if (project.coauthors && project.coauthors.length > 0) {
      return project.coauthors.map((coauthor, index) => (
        <div key={index} className="bg-gray-100 p-4 rounded-md mb-4 shadow-md">
          <p><strong>Nome:</strong> {coauthor.name}</p>
          <p><strong>Email:</strong> {coauthor.email}</p>
          {project.status !== 'APROVADA' && (
            <>
              <p><strong>Telefone:</strong> {coauthor.phone}</p>
            </>
          )}
        </div>
      ));
    }
  };

  const saveUpdatedProject = async (updatedProject: { title: string; description: string; urlPhoto: string; pdfLink: string; siteLink: string }) => {
    try {
      const projectId = Number(project.id);
      if (isNaN(projectId)) {
        throw new Error('ID do projeto inválido');
      }

      await updateProjectDetails(projectId, updatedProject);
      showSuccess("Projeto atualizado com sucesso!");
      fetchProjects();
      setIsEditModalOpen(false);
    } catch (error: unknown) {
      if (error instanceof Error) {
        showError("Erro ao atualizar o projeto", error.message || "Tente novamente.");
      } else {
        showError("Erro desconhecido", "Tente novamente.");
      }
    }
  };

  return (
    <div className="flex flex-col w-full max-w-[350px] h-auto bg-white shadow-[0_0px_30px_rgba(162,166,188,0.25)] rounded-lg px-3 py-4 ml-[32px] transition-shadow duration-300 relative">
      <div className="absolute top-4 right-4 ">
        <p className={`text-sm ${getStatusClass(project.status)}`}>{project.status}</p>
      </div>

      <div className="flex justify-center w-full">
        <div className="mb-4 mt-5">
          <img src={project.urlPhoto} alt={project.title} className="w-full h-48 object-cover rounded-md" />
        </div>
      </div>

      <div className="py-2 mt-3 mb-10">
        <h5 className="text-2xl font-bold text-gray-950">{project.title}</h5>
        <p className="text-gray-800 mt-4">{project.description}</p>
      </div>

      <div className="absolute bottom-4 right-4 flex flex-col gap-2">
        <button
          onClick={handleEditModalToggle}
          className="text-sm text-center py-1.5 px-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition duration-200"
        >
          Editar
        </button>
      </div>

      <div className="text-sm mt-4">
        <div className="flex items-center mb-2">
          <FaFilePdf className="mr-2" />
          {project.pdfLink && (
            <a href={project.pdfLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              Download PDF
            </a>
          )}
        </div>
        <div className="flex items-center mb-2">
          <FaExternalLinkAlt className="mr-2" />
          {project.siteLink && (
            <a href={project.siteLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              Visitar Site
            </a>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-[80%] max-w-[600px] relative">
            <button
              onClick={handleModalToggle}
              className="absolute top-2 right-2 text-2xl text-blue-500 hover:text-blue-700"
            >
              <FaTimes />
            </button>

            <div className="flex justify-center mb-4">
              <img src={project.urlPhoto} alt={project.title} className="w-full h-48 object-cover rounded-md" />
            </div>

            <h3 className="text-xl font-bold mb-4">{project.title}</h3>
            <p className="mb-4">{project.description}</p>

            <p className="text-gray-600">Data de Criação: {project.creationDate}</p>
            <p className="text-gray-600">Tipo: {project.typeAP}</p>

            

            <div className="text-sm text-gray-500 mt-4">
              <p><strong>Status:</strong> <span className={getStatusClass(project.status)}>{project.status}</span></p>
              {renderIfExists(project.idManager, "ID do Manager")}
              {renderIfExists(project.feedback, "Feedback")}
              {renderIfExists(project.justification, "Justificação")}
            </div>

            {project.coauthors && project.coauthors.length > 0 && (
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Coautores:</h4>
                {renderCoauthors()}
              </div>
            )}

            <button
              onClick={handleModalToggle}
              className="mt-4 py-1.5 px-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              Fechar
            </button>
          </div>
        </div>
      )}

      {isEditModalOpen && (
        <UpdateProjectDetails
          project={project}
          isOpen={isEditModalOpen}
          onClose={handleEditModalToggle}
          onSave={saveUpdatedProject}
        />
      )}
    </div>
  );
};

export default ProjectCard;