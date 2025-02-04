/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { AcademicProjectResponseDTO } from "@/interfaces/AcademicProjectInterface";
import { OpportunityResponseDTO } from "@/interfaces/OpportunityInterfaces"; 
import { FaFilePdf, FaLink } from "react-icons/fa";
import ProjectStatusForm from "./ProjectStatusForm";

interface ProjectModalProps {
  project?: AcademicProjectResponseDTO;
  opportunity?: OpportunityResponseDTO;
  fetchProjects: () => void;
  handleClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, opportunity, fetchProjects, handleClose }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [statusToSet, setStatusToSet] = useState<"APROVADA" | "REPROVADA" | null>(null);

  const handleOpenModal = (status: "APROVADA" | "REPROVADA") => {
    console.log("Abrindo modal de aprovação/reprovação com status:", status);
    setStatusToSet(status);
    setIsEditMode(true);
  };

  const handleCloseModal = () => {
    setIsEditMode(false);
    setStatusToSet(null);
    handleClose();
  };

  // Verifica se estamos lidando com um Projeto ou uma Oportunidade
  const isProject = project !== undefined;
  const isOpportunity = opportunity !== undefined;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-6xl overflow-y-auto max-h-[80vh] relative">
        
        {/* Tipo de Projeto ou Oportunidade */}
        <div className="bg-blue-500 text-white mb-10 mt-[-32] text-center py-4 mx-[-32] rounded-full text-lg z-10">
          <strong>{isProject ? project.typeAP : isOpportunity ? opportunity.typeBO : "Não disponível"}</strong>
        </div>

        {/* Botão de Fechar */}
        <button
          className="absolute top-1 p-1 right-4 text-gray-600 text-3xl"
          onClick={handleCloseModal}
        >
          &times;
        </button>

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-semibold">Detalhes</h2>
        </div>

        <div className="flex flex-row gap-6 items-start">
          {/* Imagem do Projeto ou Oportunidade */}
          <div className="w-1/3 flex-shrink-0">
            {(isProject && project.urlPhoto) || (isOpportunity && opportunity.urlPhoto) ? (
              <img
                src={isProject ? project.urlPhoto : opportunity?.urlPhoto}
                alt="Imagem"
                className="w-full h-auto rounded-md shadow-md"
              />
            ) : (
              <span>Imagem não disponível</span>
            )}

            <div className="my-4 flex items-center">
              <FaFilePdf className="text-red-600 mr-2" />
              <strong className="text-lg">Link do PDF:</strong>
              {(isProject && project.pdfLink) || (isOpportunity && opportunity.pdfLink) ? (
                <a
                  href={isProject ? project.pdfLink : opportunity?.pdfLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 ml-2"
                >
                  Abrir PDF
                </a>
              ) : (
                <span>Não disponível</span>
              )}
            </div>

            <div className="my-4 flex items-center">
              <FaLink className="text-blue-600 mr-2" />
              <strong className="text-lg">Link do Site:</strong>
              {(isProject && project.siteLink) || (isOpportunity && opportunity.siteLink) ? (
                <a
                  href={isProject ? project.siteLink : opportunity?.siteLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 ml-2"
                >
                  Acessar Site
                </a>
              ) : (
                <span>Não disponível</span>
              )}
            </div>

            <div className="my-4">
              <strong className="text-lg">Status:</strong> {isProject ? project.status : isOpportunity ? opportunity.status : "Não disponível"}
            </div>

            {/* Botões de Aprovação e Reprovação (somente para Projetos) */}
            {(isProject || isOpportunity) && (
              <div className="flex justify-start align-middle text-center gap-3 items-center">
                <button
                  className="bg-green-500 text-white p-3 rounded-md mt-4 hover:bg-green-600 flex items-center"
                  onClick={() => handleOpenModal("APROVADA")}
                >
                  Aprovar
                </button>
                <button
                  className="bg-red-500 text-white p-3 rounded-md mt-4 hover:bg-red-600 flex items-center"
                  onClick={() => handleOpenModal("REPROVADA")}
                >
                  Reprovar
                </button>
              </div>
            )}
          </div>

          {/* Informações Gerais */}
          <div className="flex-1">
            <div className="my-4">
              <strong className="text-lg">Título:</strong> {isProject ? project.title : isOpportunity ? opportunity.title : "Não disponível"}
            </div>
            <div className="my-4">
              <strong className="text-lg">Descrição:</strong> {isProject ? project.description : isOpportunity ? opportunity.description : "Não disponível"}
            </div>
            <div className="my-4">
              <strong className="text-lg">Data de Criação:</strong> {isProject ? project.creationDate : isOpportunity ? opportunity.creationDate : "Não disponível"}
            </div>
          </div>
        </div>

        {/* Modal de Formulário */}
        {isEditMode && (
  <ProjectStatusForm
    project={project}
    opportunity={opportunity}
    fetchProjects={fetchProjects}
    handleClose={handleCloseModal}
    statusToSet={statusToSet!}
  />
)}
      </div>
    </div>
  );
};

export default ProjectModal;