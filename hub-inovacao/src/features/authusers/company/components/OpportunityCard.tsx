"use client";

import React, { useState } from "react";
import { FaFilePdf, FaExternalLinkAlt, FaTimes } from "react-icons/fa";
import { OpportunityResponseDTO, StatusSolicitation } from "@/interfaces/OpportunityInterfaces";
import UpdateOpportunityDetails from "./UpdateOpportunityDetails";

interface OpportunityCardProps {
  opportunity: OpportunityResponseDTO;
  fetchOpportunities: () => void;
}

const OpportunityCard: React.FC<OpportunityCardProps> = ({ opportunity }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleEditModalToggle = () => {
    setIsEditModalOpen(!isEditModalOpen);
  };

  const getStatusClass = (status: StatusSolicitation) => {
    // Ensure that the status is converted to a string if necessary
    const statusString = StatusSolicitation[status];
    switch (statusString) {
      case 'APROVADA':
        return 'text-green-500';
      case 'PENDENTE':
        return 'text-orange-500';
      case 'REPROVADA':
        return 'text-red-600';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex flex-col w-full max-w-[350px] h-auto bg-white shadow-[0_0px_30px_rgba(162,166,188,0.25)] rounded-lg px-3 py-4 ml-[32px] transition-shadow duration-300 relative">
      <div className="absolute top-4 right-4 ">
        <p className={`text-sm ${getStatusClass(opportunity.status)}`}>{opportunity.status}</p>
      </div>

      <div className="flex justify-center w-full">
        <div className="mb-4 mt-5">
          <img src={opportunity.urlPhoto} alt={opportunity.title} className="w-full h-48 object-cover rounded-md" />
        </div>
      </div>

      <div className="py-2 mt-3 mb-10">
        <h5 className="text-2xl font-bold text-gray-950">{opportunity.title}</h5>
        <p className="text-gray-800 mt-4 text-ellipsis overflow-hidden h-16 line-clamp-3">{opportunity.description}</p>  {/* Adjusted description overflow */}
      </div>

      <div className="py-2 mt-3 mb-10">
        <h5 className="text-2xl font-bold text-gray-950">{opportunity.typeBO}</h5>
      </div>

      <div className="absolute bottom-4 right-4 flex flex-col gap-2">
        <button
          onClick={handleEditModalToggle}
          className="text-sm text-center py-1.5 px-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition duration-200"
        >
          Editar
        </button>
      </div>

      <div className="text-sm mt-4">
        <div className="flex items-center mb-2">
          <FaFilePdf className="mr-2" />
          {opportunity.pdfLink && (
            <a href={opportunity.pdfLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              Download PDF
            </a>
          )}
        </div>
        <div className="flex items-center mb-2">
          <FaExternalLinkAlt className="mr-2" />
          {opportunity.siteLink && (
            <a href={opportunity.siteLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              Visitar Site
            </a>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-[80%] max-w-[600px] relative">
            <button
              onClick={handleModalToggle}
              className="absolute top-2 right-2 text-2xl text-blue-500 hover:text-blue-700"
            >
              <FaTimes />
            </button>

            <div className="flex justify-center mb-4">
              <img src={opportunity.urlPhoto} alt={opportunity.title} className="w-full h-48 object-cover rounded-md" />
            </div>

            <h3 className="text-xl font-bold mb-4">{opportunity.title}</h3>
            <p className="mb-4">{opportunity.description}</p>

            <p className="text-gray-600">Data de Criação: {opportunity.creationDate}</p>
            <p className="text-gray-600">Tipo: {opportunity.typeBO}</p>

            <div className="text-sm text-gray-500 mt-4">
              <p><strong>Status:</strong> <span className={getStatusClass(opportunity.status)}>{opportunity.status}</span></p>
            </div>

            <button
              onClick={handleModalToggle}
              className="mt-4 py-1.5 px-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              Fechar
            </button>
          </div>
        </div>
      )}

      {isEditModalOpen && (
        <UpdateOpportunityDetails
          opportunity={opportunity}
          isOpen={isEditModalOpen}
          onClose={handleEditModalToggle}
          onSave={() => {}}
        />
      )}
    </div>
  );
};

export default OpportunityCard;