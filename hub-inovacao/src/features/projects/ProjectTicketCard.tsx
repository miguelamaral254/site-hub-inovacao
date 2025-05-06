"use client";
import React, { JSX } from "react";
import { FaFlask, FaProjectDiagram, FaUniversity } from "react-icons/fa";
import { Project, ProjectType } from "@/features/projects/project.interface";
import { formatDate } from "@/utils/formatters";

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
    title, description, projectType, createdDate 
  } = project;

  const { bgColor, icon, label } = typeMap[projectType];

  // Função para formatar a data
  

  const formatLabel = (label: string) => {
    if(label === '#Projeto de Inovação'){
      return 'Inovação'
    } if (label === '#Projeto de Extensão') {
      return 'Extensão'
    } else {
      return 'Integrador'
    }
  }


  function capitalize(word: string) {
    if (typeof word !== 'string') {
        return '';
    }
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }

  return (
    <div 
      className="px-4 py-2 border-b bg-white rounded-lg shadow-md hover:shadow-2xl cursor-pointer mb-0 flex items-center gap-6 relative"
      onClick={onClick} 
    >

      <div className={`${bgColor} text-sm flex flex-col items-center justify-center gap-2 h-24 w-24 rounded-full border-8 border-[#f7f9f9]`}>
        {icon}
        {formatLabel(label)}
      </div>

      <div className="flex-1 flex justify-between items-center ">
        <div className="flex-1">
          <p className="text-sm text-gray-700 font-semibold">{title || "Título Indefinido"}</p>
          <div className="text-sm text-gray-600 mt-2 max-h-16 overflow-hidden">
            {description || "Sem descrição disponível"}
          </div>
        </div>

        <p className="flex-1">{capitalize(project.status)}</p>

        <p className="text-xs text-gray-500 ">{createdDate ? formatDate(createdDate) : "Data Indefinida"}</p>
      </div>

      
    </div>
  );
};

export default ProjectTicketCard;