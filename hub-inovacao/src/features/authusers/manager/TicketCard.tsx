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
        className="bg-white p-4 rounded-lg shadow-lg border border-gray-200 cursor-pointer"
        onClick={handleOpenModal}
      >
        <div className="flex justify-between items-center">
          <h4 className="text-xl font-semibold">{project.title}</h4>
          <span className={`text-${project.status === "APROVADA" ? "green" : project.status === "REPROVADA" ? "red" : "yellow"}-500 font-semibold`}>
            {project.status}
          </span>
        </div>
        <p className="text-gray-600 my-2">{project.description}</p>
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