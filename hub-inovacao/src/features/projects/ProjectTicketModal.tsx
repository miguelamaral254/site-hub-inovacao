/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React from "react";
import { RiCloseLine } from "react-icons/ri";
import { Project } from "@/features/projects/project.interface";

interface ProjectModalProps {
  project: Project;
  handleClose: () => void;
}

const ProjectTicketModal: React.FC<ProjectModalProps> = ({ project, handleClose }) => {
  const { 
    title, description, urlPhoto, projectType, createdDate, 
    coauthors, thematicArea, course, problem, generalObjective, 
    specificObjective, expectedResults, status, idUser, idManager, 
    feedback, justification, enabled, pdfLink, siteLink 
  } = project;

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "Data não disponível"; 
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleClose} // Fecha o modal quando clica fora
    >
      <div 
        className="bg-white p-6 rounded-lg w-3/4 max-w-3xl relative"
        onClick={(e) => e.stopPropagation()} // Impede o clique fora de fechar o modal
      >
        <button 
          onClick={handleClose} 
          className="absolute top-4 right-4 text-xl text-gray-600 hover:text-gray-900"
        >
          <RiCloseLine />
        </button>

        <h2 className="text-2xl font-semibold text-gray-700">{title || "Título Indefinido"}</h2>
        <p className="text-sm text-gray-500 mt-2">{formatDate(createdDate)}</p>
        <p className="text-sm text-gray-500">{coauthors?.join(", ") || "Autor(es) Indefinido(s)"}</p>

        <div className="mt-4 flex gap-4 items-center">
          <div className="w-1/3">
            <img src={urlPhoto || "/default-image.jpg"} alt={title} className="w-full h-32 object-cover rounded-md" />
          </div>

          <div className="w-2/3">
            <p className="text-sm text-gray-600">{description || "Sem descrição disponível"}</p>
            <p className="text-sm text-gray-600 mt-4"><strong>Objetivo Geral:</strong> {generalObjective || "Não definido"}</p>
            <p className="text-sm text-gray-600 mt-2"><strong>Objetivo Específico:</strong> {specificObjective || "Não definido"}</p>
            <p className="text-sm text-gray-600 mt-2"><strong>Resultados Esperados:</strong> {expectedResults || "Não especificado"}</p>
            <p className="text-sm text-gray-600 mt-2"><strong>Problema:</strong> {problem || "Não especificado"}</p>
            <p className="text-sm text-gray-600 mt-2"><strong>Área Temática:</strong> {thematicArea || "Não especificada"}</p>
            <p className="text-sm text-gray-600 mt-2"><strong>Link do Projeto:</strong> <a href={siteLink} className="text-blue-600">{siteLink || "Não disponível"}</a></p>
            <p className="text-sm text-gray-600 mt-2"><strong>PDF do Projeto:</strong> <a href={pdfLink} className="text-blue-600">{pdfLink || "Não disponível"}</a></p>
            <p className="text-sm text-gray-600 mt-2"><strong>Status:</strong> {status || "Não especificado"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectTicketModal;