/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { FaTimes } from "react-icons/fa";
import { Project } from "./project.interface";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project;
}

const getTypeText = (type: string) => {
  switch (type) {
    case 'PROJETO_INTEGRADOR':
      return 'Projeto de Integração';
    case 'PROJETO_INOVACAO':
      return 'Projeto de Inovação';
    case 'PROJETO_EXTENSAO':
      return 'Projeto de Extensão';
    default:
      return 'Tipo de Projeto Desconhecido';
  }
};

const ModalProject: React.FC<ProjectModalProps> = ({
  isOpen,
  onClose,
  project,
}) => {
  if (!isOpen) return null;

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-[90%] max-w-[600px] relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-2xl text-blue-500 hover:text-blue-700"
        >
          <FaTimes />
        </button>

        <div className="flex justify-center mb-4 mt-2">
          <img src={project.urlPhoto || "/default-image.jpg"} alt={project.title} className="w-full h-48 object-cover rounded-md" />
        </div>

        <h3 className="text-2xl text-[#002B8F] font-bold mb-4">{project.title}</h3>
        <p className="mb-4 text-xl text-[#3355A5]">Data de postagem: <span className="text-black">{formatDate(project.createdDate)}</span></p>
        <p className={`text-start inline-flex items-center mb-4 px-3 py-2 bg-[#3355A5] text-base rounded-3xl text-white w-auto`}>
          <strong>#</strong> {getTypeText(project.projectType)}
        </p>
        <p className="">{project.description}</p>

        {project.coauthors && project.coauthors.length > 0 && (
          <div className="mt-4">
            <h4 className="font-semibold mb-2">Coautores:</h4>
            <div className="space-y-2">
              {project.coauthors.map((coauthor, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div>
                    <p className="text-gray-600">Coautor: <span className="text-black"> {coauthor.name} </span></p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6 flex justify-start gap-4">
          {project.siteLink && (
            <a
              href={project.siteLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-start gap-2 text-sm text-blue-700 rounded-lg"
            >
              Link para uma página web ou protótipo
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalProject;