import React, { useState } from "react";
import { AcademicProjectResponseDTO } from "@/interfaces/AcademicProjectInterface";
import { OpportunityResponseDTO } from "@/interfaces/OpportunityInterfaces";
import ProjectModal from "./ProjectModal";
import ProjectCard from "../project/ProjectCard";
import { ButtonGrandeSeg } from "@/components/Button";
import { RiTimeLine } from "react-icons/ri";
import { RiCheckLine } from "react-icons/ri";
import { RiCloseLine } from "react-icons/ri";
// Tipo discriminado que permite apenas um dos objetos
type TicketCardProps =
  | { project: AcademicProjectResponseDTO; opportunity?: never; fetchProjects: () => void }
  | { opportunity: OpportunityResponseDTO; project?: never; fetchProjects: () => void };

const TicketCard: React.FC<TicketCardProps> = ({ project, opportunity, fetchProjects }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
   
      <div
        className="p-4 border-b bg-white">
        <div className="grid grid-cols-6 bg-white flex items-center gap-4">
          <h4 className="text-base font-medium text-gray-500 truncate ">
            {project?.title || opportunity?.title || "Título Indefinido"}
          </h4>
          <p className="text-base font-medium text-gray 500 truncate">
            {project?.studentName || project?.professorName || opportunity?.institutionOrganization || ""}
          </p>
          <p className="text-base font-medium text-gray 500 truncate">
            {project?.creationDate || opportunity?.creationDate || "Data indefinida"}
          </p>
          {opportunity && <span className="text-base font-semibold text-gray-500">{opportunity.status}</span>}
          <span>{project?.typeAP || opportunity?.typeBO || "Tipo Indefinido"}</span>
            {project && (
          <span className={`text-base flex flex-row gap-2 items-cente text-gray-500 font-semibold ${project.status === "APROVADA" ? "text-green-500" : project.status === "REPROVADA" ? "text-red-500" : "text-yellow-500"}`}>
              
              {project.status === "APROVADA" && <RiCheckLine className="text-lg text-green-500 "/>}
              {project.status === "REPROVADA" && <RiCloseLine className="text-lg text-red-500"/>}
              {project.status === "PENDENTE" && <RiTimeLine className="text-lg text-yellow-500"/>}

              {project.status}
          </span>
            )}
          <ButtonGrandeSeg text="Abrir" onClick={handleOpenModal}/>
        </div>
      </div>

      {isModalOpen && (
        <ProjectModal
          project={project}
          opportunity={opportunity}
          fetchProjects={fetchProjects}
          handleClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default TicketCard;