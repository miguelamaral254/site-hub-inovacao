/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import UpdateProjectDetails from "./UpdateProjectDetails";
import { updateProjectDetails } from "@/services/projectService";
import useSwal from "@/hooks/useSwal";
import { AcademicProjectResponseProfessorDTO, AcademicProjectResponseStudentDTO } from "./interfaces/projectInterfaces";
import { ButtonGrande, ButtonOutline } from "@/components/Button";
import { RiTimeLine } from "react-icons/ri";
import { RiCheckLine } from "react-icons/ri";
import { RiCloseLine } from "react-icons/ri";
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });
  };

  return (
    <div className=" p-4 border-b bg-white rounded-lg ">
      <div className="grid grid-cols-6 items-center gap-4">
        <h5 className="col-span-2 text-xl font-bold text-gray-950">{project.title}</h5>
        <p className="text-base text-gray-800">{formatDate(project.creationDate)}</p>
        <p className="text-base text-gray-800">{project.typeAP}</p>
        {project && (
          <span className={`text-base flex flex-row gap-2 items-center text-gray-500 font-semibold ${project.status === "APROVADA" ? "text-green-500" : project.status === "REPROVADA" ? "text-red-500" : "text-yellow-500"}`}>          
            {project.status === "APROVADA" && <RiCheckLine className="text-lg text-green-500 "/>}
            {project.status === "REPROVADA" && <RiCloseLine className="text-lg text-red-500"/>}
            {project.status === "PENDENTE" && <RiTimeLine className="text-lg text-yellow-500"/>}
            {project.status}
          </span>
          )}
        <ButtonOutline
          text="Verificar Situação"
          onClick={handleModalToggle}
        />
      </div>
      
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-10">
          <div className="bg-white p-6 rounded-lg w-[80%] max-w-[600px] relative">
            <button
              onClick={handleModalToggle}
              className="absolute top-2 right-2 text-2xl text-blue-500 hover:text-blue-700"
            >
              <FaTimes />
            </button>

            <div className="flex justify-center mt-2 mb-4">
              <img src={project.urlPhoto} alt={project.title} className="w-full h-48 object-cover rounded-md" />
            </div>

            <h3 className="text-2xl text-[#002B8F] text-medium mb-4">{project.title}</h3>
            <p className="text-lg text-[#3355A5] text-medium flex items-center gap-2">Data de Criação: <p className="text-gray-900"> {formatDate(project.creationDate)} </p></p>
            <p className="text-lg text-[#3355A5] text-medium flex items-center gap-2">Tipo: <p className="text-gray-900">{project.typeAP}</p></p>

            <p className="mt-3 mb-4 text-[#3355A5] flex items-center gap-2">Descrição: <p className="text-gray-900">{project.description}</p></p>

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

            <ButtonGrande
              text="Editar Projeto"
              onClick={handleEditModalToggle}
            />
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