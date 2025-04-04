import React, { useState } from "react";
import { AcademicProjectResponseDTO } from "@/interfaces/AcademicProjectInterface";
import { OpportunityResponseDTO, StatusSolicitation } from "@/interfaces/OpportunityInterfaces";  
import ProjectModal from "./ProjectModal";
import { ButtonGrandeSeg } from "@/components/Button";
import { RiTimeLine } from "react-icons/ri";
import { RiCheckLine } from "react-icons/ri";
import { RiCloseLine } from "react-icons/ri";

type TicketCardProps =
  | { project: AcademicProjectResponseDTO; opportunity?: never; fetchProjects: () => void }
  | { opportunity: OpportunityResponseDTO; project?: never; fetchProjects: () => void };

const AnsweredTicketCard: React.FC<TicketCardProps> = ({ project, opportunity, fetchProjects }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const cardTitle = project?.title || opportunity?.title || "Título Indefinido";
  const cardAuthor = project?.studentName || project?.professorName || opportunity?.institutionOrganization || "Autor Indefinido";
  const cardDate = project?.creationDate || opportunity?.creationDate || "Data indefinida";
  const cardType = project?.typeAP || opportunity?.typeBO || "Tipo Indefinido";

  // Função para converter StatusSolicitation para string
  const convertStatusToString = (status: StatusSolicitation | undefined): string | undefined => {
    return status ? status.toString() : undefined;
  };

  // Função de status
  const statusColor = (status: string | undefined) => {
    if (!status) return "text-gray-500"; // ou qualquer valor padrão
    switch (status) {
      case "APROVADA":
        return "text-green-500";
      case "REPROVADA":
        return "text-red-500";
      case "PENDENTE":
        return "text-yellow-500";
      default:
        return "text-gray-500"; // valor padrão se o status não for reconhecido
    }
  };

  const statusIcon = (status: string | undefined) => {
    if (!status) return null; 
    switch (status) {
      case "APROVADA":
        return <RiCheckLine className="text-lg" />;
      case "REPROVADA":
        return <RiCloseLine className="text-lg" />;
      case "PENDENTE":
        return <RiTimeLine className="text-lg" />;
      default:
        return null;
    }
  };

  // Status de projeto
  const projectStatusColor = statusColor(project?.status);
  const projectStatusIcon = statusIcon(project?.status);

  // Status de oportunidade
  const opportunityStatusColor = statusColor(convertStatusToString(opportunity?.status)); // Convertendo o status para string
  const opportunityStatusIcon = statusIcon(convertStatusToString(opportunity?.status)); // Convertendo o status para string

  return (
    <>
      <div className="p-4 border-b bg-white">
        <div className="grid grid-cols-6 bg-white items-center gap-4">
          <h4 className="text-base font-medium text-gray-500 truncate ">
            {cardTitle}
          </h4>
          <p className="text-base font-medium text-gray-500 truncate">
            {cardAuthor}
          </p>
          <p className="text-base font-medium text-gray-500 truncate">
            {cardDate}
          </p>

          {/* Colocando type antes de status */}
          <span>{cardType}</span>

          {opportunity && (
            <span className={`text-base font-semibold ${opportunityStatusColor}`}>
              {opportunityStatusIcon}
              {opportunity.status}
            </span>
          )}

          {project && (
            <span className={`text-base flex flex-row gap-2 items-center ${projectStatusColor}`}>
              {projectStatusIcon}
              {project.status}
            </span>
          )}

          <ButtonGrandeSeg text="Abrir" onClick={handleOpenModal} />
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

export default AnsweredTicketCard;