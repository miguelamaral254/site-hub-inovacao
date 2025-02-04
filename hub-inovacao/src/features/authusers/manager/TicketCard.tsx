import React, { useState } from "react";
import ProjectModal from "./ProjectModal";
import { AcademicProjectResponseDTO } from "@/interfaces/AcademicProjectInterface";

interface TicketCardProps {
  project: AcademicProjectResponseDTO;
  fetchProjects: () => void;
}

const TicketCard: React.FC<TicketCardProps> = ({ project, fetchProjects }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        className="p-4 border-b bg-white border-gray-200 hover:bg-gray-50 cursor-pointer"
        onClick={handleOpenModal}
      >
        <div className="flex justify-between items-center">
          <h4 className="text-lg font-medium text-gray-900 truncate">
            {project.title}
          </h4>
          
          <div className="flex flex-col justify-center align-middle items-center gap-3">
              <span
                className={`text-sm font-semibold ${
                  project.status === "APROVADA"
                    ? "text-green-500"
                    : project.status === "REPROVADA"
                    ? "text-red-500"
                    : "text-yellow-500"
                }`}
              >
                {project.status}
              </span>
              <span>{project.typeAP}</span>
          </div>
        </div>
        <p className="text-xs text-gray-600 truncate mt-1">
          {project.description} 
        </p>
      </div>

      {isModalOpen && (
        <ProjectModal
          project={project}
          fetchProjects={fetchProjects}
          handleClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default TicketCard;