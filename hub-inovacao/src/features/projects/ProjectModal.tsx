/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { FaTimes, FaUser } from "react-icons/fa";
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
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 overflow-y-auto px-4 py-6">
      <div className="bg-white p-6 py-10 rounded-lg w-full max-w-[1200px] relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-2xl text-blue-500 hover:text-blue-700"
        >
          <FaTimes />
        </button>

        {/* Conteúdo em colunas para desktop, empilhado no mobile */}
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* BLOCO 1 */}
          <div className="flex flex-col w-full md:w-1/3 ">
            <div className="flex justify-center mb-4 mt-2">
              <img src={project.urlPhoto || "/default-image.jpg"} alt={project.title} className="w-full h-48 object-cover rounded-md" />
            </div>
            <h3 className="text-2xl text-[#002B8F] font-bold mb-4">{project.title}</h3>
            <p className="mb-4 text-xl text-[#3355A5]">Data de postagem: <span className="text-black">{formatDate(project.createdDate)}</span></p>
            <p className="inline-flex items-center mb-4 px-3 py-2 bg-[#3355A5] text-base rounded-3xl text-white w-auto">
              <strong>#</strong> {getTypeText(project.projectType)}
            </p>
            <p className="">{project.description}</p>

            {project.siteLink && (
              <div className="mt-4">
                <a
                  href={project.siteLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-start gap-2 text-sm text-blue-700 rounded-lg"
                >
                  Link para uma página web ou protótipo
                </a>
              </div>
            )}
          </div>

          {/* BLOCO 2 */}
          <div className="flex flex-col w-full md:w-1/3">
            <div className="mt-4">
              <h4 className="font-semibold mb-2">Área Temática:</h4>
              <p>{project.thematicArea}</p>
            </div>
            <div className="mt-4">
              <h4 className="font-semibold mb-2">Curso:</h4>
              <p>{project.course}</p>
            </div>
            <div className="mt-4">
              <h4 className="font-semibold mb-2">Problema:</h4>
              <p>{project.problem}</p>
            </div>
            <div className="mt-4">
              <h4 className="font-semibold mb-2">Objetivos Gerais:</h4>
              <p>{project.generalObjective}</p>
            </div>
            <div className="mt-4">
              <h4 className="font-semibold mb-2">Objetivos Específicos:</h4>
              <p>{project.specificObjective}</p>
            </div>
          </div>

          {/* BLOCO 3 */}
          <div className="flex flex-col w-full md:w-1/3">
            {project.coauthors && project.coauthors.length > 0 && (
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Coautores:</h4>
                <div className="space-y-4">
                  {project.coauthors.map((coauthor, index) => (
                    <div key={index} className="flex items-center space-x-3 bg-gray-100 p-3 rounded-md">
                      <FaUser className="text-gray-600" />
                      <div className="text-sm">
                        <p className="text-gray-600">Nome: <span className="text-black">{coauthor.name}</span></p>
                        <p className="text-gray-600">Email: <span className="text-black">{coauthor.email}</span></p>
                        <p className="text-gray-600">Telefone: <span className="text-black">{coauthor.phone}</span></p>
                        <p className="text-gray-600">Cargo: <span className="text-black">{coauthor.position}</span></p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalProject;