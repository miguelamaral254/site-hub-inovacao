"use client";
import React, { JSX } from "react";
import { FaFlask, FaProjectDiagram, FaUniversity } from "react-icons/fa";
import { Project, ProjectType } from "@/features/projects/project.interface";

const typeMap: Record<ProjectType, { bgColor: string; icon: JSX.Element; label: string }> = {
  PROJETO_INTEGRADOR: { bgColor: "bg-purple-200", icon: <FaProjectDiagram className="text-purple-600" />, label: "#Projeto Integrador" },
  PROJETO_EXTENSAO: { bgColor: "bg-blue-200", icon: <FaFlask className="text-blue-600" />, label: "#Projeto de Extensão" },
  PROJETO_INOVACAO: { bgColor: "bg-green-200", icon: <FaUniversity className="text-green-600" />, label: "#Projeto de Inovação" },
};

interface CardServicoProps {
  project: Project;
  onClick: () => void;
}

const ProjectTicketCard: React.FC<CardServicoProps> = ({ project, onClick }) => {
  const { 
    title, description, projectType 
  } = project;

  const { bgColor, icon, label } = typeMap[projectType];


  return (
    <div 
      className="p-4 border-b bg-white rounded-lg shadow-md hover:shadow-xl mb-6 cursor-pointer"
      onClick={onClick} 
    >
      <p className="text-sm text-gray-700 font-semibold">{title || "Título Indefinido"}</p>

      <p className={`mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-3xl text-white ${bgColor}`}>
        {icon} {label}
      </p>

      <p className="text-sm text-gray-600 mt-2 max-h-16 overflow-hidden">{description || "Sem descrição disponível"}</p>
    </div>
  );
};

export default ProjectTicketCard;