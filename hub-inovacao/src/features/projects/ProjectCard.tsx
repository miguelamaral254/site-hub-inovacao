/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ButtonGrandeSeg } from "@/components/Button";
import { Project, ProjectType } from "./project.interface";
import { FaFlask, FaProjectDiagram, FaUniversity } from "react-icons/fa";
import { JSX } from "react";

interface CardServicoProps {
  project: Project;
  onClick: () => void; 
}

const typeMap: Record<ProjectType, { bgColor: string; icon: JSX.Element; label: string }> = {
  PROJETO_INTEGRADOR: { bgColor: "bg-purple-200", icon: <FaProjectDiagram className="text-purple-600" />, label: "#Projeto Integrador" },
  PROJETO_EXTENSAO: { bgColor: "bg-blue-200", icon: <FaFlask className="text-blue-600" />, label: "#Projeto de Extensão" },
  PROJETO_INOVACAO: { bgColor: "bg-green-200", icon: <FaUniversity className="text-green-600" />, label: "#Projeto de Inovação" },
};

const ProjectCard: React.FC<CardServicoProps> = ({ project, onClick }) => {
  const { title, description, urlPhoto, projectType, createdDate } = project;
  const { bgColor, icon, label } = typeMap[projectType];

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "Data não disponível"; 
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });
  };

  return (
    <div className="flex flex-col w-full max-w-[390px] h-auto bg-white shadow-[0_0px_30px_rgba(162,166,188,0.25)] 
      rounded-lg px-3 py-3 transition-shadow duration-300 hover:shadow-[0_0px_30px_rgba(78,95,181,0.44)] flex-grow relative"
      onClick={onClick}>
      <div className="flex justify-center w-full mt-6">
        <img src={urlPhoto || "/default-image.jpg"} alt={title} className="w-full h-48 object-cover rounded-md" />
      </div>

      <div className="py-2 mt-3 mb-10">
        <h5 className="text-2xl font-bold text-gray-950 truncate">{title}</h5>
        <p className="text-lg mt-4 text-gray-800">{formatDate(createdDate)}</p>
        <p className={`text-start inline-flex items-center gap-2 mt-3 px-3 py-2 bg-[#3355A5] text-sm rounded-3xl text-white w-auto`}>{label}</p>
        <p className="text-gray-800 mt-4 break-words max-h-24 overflow-auto">{description}</p>
      </div>

      <div className="absolute bottom-4 right-4 flex flex-col gap-2">
        <ButtonGrandeSeg text="Conheça mais o projeto" onClick={onClick} />
      </div>
    </div>
  );
};

export default ProjectCard;