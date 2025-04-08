/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { JSX, useState } from "react";
import { FaFlask, FaProjectDiagram, FaUniversity } from "react-icons/fa";
import { Project, ProjectType } from "@/features/projects/project.interface";
import ProjectTicketModal from "./ProjectTicketModal";

// Mapeamento para os tipos de projeto
const typeMap: Record<ProjectType, { bgColor: string; icon: JSX.Element; label: string }> = {
  PROJETO_INTEGRADOR: { bgColor: "bg-purple-200", icon: <FaProjectDiagram className="text-purple-600" />, label: "#Projeto Integrador" },
  PROJETO_EXTENSAO: { bgColor: "bg-blue-200", icon: <FaFlask className="text-blue-600" />, label: "#Projeto de Extensão" },
  PROJETO_INOVACAO: { bgColor: "bg-green-200", icon: <FaUniversity className="text-green-600" />, label: "#Projeto de Inovação" },
};

interface CardServicoProps {
  project: Project;
}

const ProjectTicketCard: React.FC<CardServicoProps> = ({ project }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { 
    title, description, createdDate, 
    coauthors, status, projectType 
  } = project;

  const { bgColor, icon, label } = typeMap[projectType];

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "Data não disponível"; 
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });
  };

  return (
    <div 
      className="p-4 border-b bg-white rounded-lg shadow-md hover:shadow-xl mb-6 cursor-pointer"
      onClick={() => setIsModalOpen(true)}
    >
      {/* Título do Projeto */}
      <p className="text-sm text-gray-700 font-semibold">{title || "Título Indefinido"}</p>

      {/* Informações complementares */}
      <p className="text-xs text-gray-500">{formatDate(createdDate)}</p>
      <p className="text-xs text-gray-500">{coauthors?.join(", ") || "Autor(es) Indefinido(s)"}</p>

      {/* Tipo do Projeto */}
      <p className={`mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-3xl text-white ${bgColor}`}>
        {icon} {label}
      </p>

      {/* Descrição resumida */}
      <p className="text-sm text-gray-600 mt-2 max-h-16 overflow-hidden">{description || "Sem descrição disponível"}</p>

      {/* Modal do Projeto */}
      {isModalOpen && (
        <ProjectTicketModal project={project} handleClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default ProjectTicketCard;