/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { AcademicProjectResponseDTO } from "@/interfaces/AcademicProjectInterface";
import { CoauthorDTO } from "../project/interfaces/projectInterfaces";
import { FaFilePdf, FaLink } from "react-icons/fa";
import ProjectStatusForm from "./ProjectStatusForm";

interface ProjectModalProps {
  project: AcademicProjectResponseDTO;
  fetchProjects: () => void;
  handleClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, fetchProjects, handleClose }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [statusToSet, setStatusToSet] = useState<"APROVADA" | "REPROVADA" | null>(null);

  const handleOpenModal = (status: "APROVADA" | "REPROVADA") => {
    setStatusToSet(status); // Define o status com base no botão clicado
    setIsEditMode(true); // Abre o modal de edição
  };

  const handleCloseModal = () => {
    setIsEditMode(false);
    setStatusToSet(null); // Limpa o status ao fechar
    handleClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-6xl overflow-y-auto max-h-[80vh] relative">
        {/* Tipo de Projeto */}
        <div className="bg-blue-500 text-white mb-10 mt-[-32] text-center py-4 mx-[-32] rounded-full text-lg z-10">
          <strong>{project.typeAP || "Não disponível"}</strong>
        </div>

        {/* Botão de Fechar - Canto superior direito */}
        <button
          className="absolute top-1 p-1 right-4 text-white text-3xl"
          onClick={handleCloseModal}
        >
          &times;
        </button>

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-semibold">Detalhes do Projeto</h2>
        </div>

        <div className="flex flex-row gap-6 items-start">
          {/* Imagem do Projeto */}
          <div className="w-1/3 flex-shrink-0">
            {project.urlPhoto ? (
              <img
                src={project.urlPhoto}
                alt="Imagem do projeto"
                className="w-full h-auto rounded-md shadow-md"
              />
            ) : (
              <span>Não disponível</span>
            )}
            <div className="my-4 flex items-center">
              <FaFilePdf className="text-red-600 mr-2" />
              <strong className="text-lg">Link do PDF:</strong>
              {project.pdfLink ? (
                <a
                  href={project.pdfLink}
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
              {project.siteLink ? (
                <a
                  href={project.siteLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 ml-2"
                >
                  Acessar Site
                </a>
              ) : (
                <span>Não disponível</span>
              )}
              
            </div><div className="my-4">
                <strong className="text-lg">Status:</strong> {project.status || "Não disponível"}
              </div>

            <div className="flex justify-start align-middle text-center gap-3 items-center">
              {/* Botões para Aprovar e Reprovar */}
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
          </div>

          {/* Título, Descrição e Restante das Informações */}
          <div className="flex-1">
            <div className="my-4">
              <strong className="text-lg">Título:</strong> {project.title || "Não disponível"}
            </div>
            <div className="my-4">
              <strong className="text-lg">Descrição:</strong> {project.description || "Não disponível"}
            </div>

            <div className="my-4">
              <strong className="text-lg">Data de Criação:</strong> {project.creationDate || "Não disponível"}
            </div>
            <div className="my-4">
              <strong className="text-lg">Autor do projeto:</strong> {project.studentName || project.professorName || "Não disponível"}
            </div>

            {project.coauthors && project.coauthors.length > 0 && (
  <div className="my-8">
    <strong className="text-lg">Coautores:</strong>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
      {project.coauthors.slice(0, 6).map((coauthor: CoauthorDTO, index: number) => (
        <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md">
          <p className="font-medium"><strong>Nome:</strong> {coauthor.name}</p>
          <p><strong>Email:</strong> {coauthor.email}</p>
          <p><strong>Telefone:</strong> {coauthor.phone}</p>
        </div>
      ))}
    </div>
  </div>
 )}
          </div>
        </div>

        {/* Modal em modo de edição */}
        {isEditMode && statusToSet && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-60">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl overflow-y-auto max-h-[80vh] relative">
              {/* Botão de Fechar do Modal de Edição */}
              <button
                className="absolute top-1 p-1 right-4 text-white text-3xl"
                onClick={handleCloseModal}
              >
                &times;
              </button>

              {/* Passa o status a ser atualizado no formulário */}
              <ProjectStatusForm
                project={project}
                fetchProjects={fetchProjects}
                handleClose={handleCloseModal}
                statusToSet={statusToSet}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectModal;