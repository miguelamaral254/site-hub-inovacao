import React, { useState } from "react";
import { AcademicProjectResponseDTO } from "@/interfaces/AcademicProjectInterface";
import { OpportunityResponseDTO } from "@/interfaces/OpportunityInterfaces";
import ProjectModal from "./ProjectModal";

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
        className="p-4 border-b bg-white border-gray-200 hover:bg-gray-50 cursor-pointer"
        onClick={handleOpenModal}
      >
        <div className="flex justify-between items-center">
          <h4 className="text-lg font-medium text-gray-900 truncate">
            {project?.title || opportunity?.title || "Título Indefinido"}
          </h4>

          <div className="flex flex-col justify-center items-center gap-3">
            {project && (
              <span className={`text-sm font-semibold ${project.status === "APROVADA" ? "text-green-500" : project.status === "REPROVADA" ? "text-red-500" : "text-yellow-500"}`}>
                {project.status}
              </span>
            )}
            {opportunity && <span className="text-sm font-semibold text-blue-500">{opportunity.status}</span>}
            <span>{project?.typeAP || opportunity?.typeBO || "Tipo Indefinido"}</span>
          </div>
        </div>
        <p className="text-xs text-gray-600 truncate mt-1">
          {project?.description || opportunity?.description || "Descrição Indefinida"}
        </p>
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