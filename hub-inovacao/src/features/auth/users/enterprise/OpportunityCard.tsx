/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
//import UpdateOpportunityDetails from "./UpdateOpportunityDetails";
import { Opportunity } from "@/features/opportunity/opportunity.interface";
import { StatusSolicitation } from "@/features/core/status.interface";

interface OpportunityCardProps {
  opportunity: Opportunity;
  fetchOpportunities: () => void;
}

const OpportunityCard: React.FC<OpportunityCardProps> = ({ opportunity, fetchOpportunities }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleEditModalToggle = () => {
    setIsEditModalOpen(!isEditModalOpen);
  };

  const getStatusClass = (status: StatusSolicitation) => {
    const statusString = StatusSolicitation[status];
    switch (statusString) {
      case 'APROVADA':
        return 'text-green-500';
      case 'PENDENTE':
        return 'text-orange-500';
      case 'INDEFERIDO':
        return 'text-red-600';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex flex-col w-full max-w-[350px] h-auto bg-white shadow-lg rounded-lg px-3 py-4 ml-[32px] transition-shadow duration-300 relative">
      <div className="absolute top-4 right-4">
        <p className={`text-sm ${getStatusClass(opportunity.status || StatusSolicitation.PENDENTE)}`}>
          {opportunity.status || "Pendente"}
        </p>
      </div>

      {opportunity.urlPhoto && (
        <div className="flex justify-center w-full">
          <div className="mb-4 mt-5">
            <img src={opportunity.urlPhoto} alt={opportunity.tituloDesafio} className="w-full h-48 object-cover rounded-md" />
          </div>
        </div>
      )}

      <div className="py-2 mt-3 mb-10">
        <h5 className="text-2xl font-bold text-gray-950">{opportunity.tituloDesafio}</h5>
        <p className="text-gray-800 mt-4 break-words max-h-24 overflow-auto">{opportunity.descricaoProblema}</p>
      </div>

      <div className="py-2 mt-3 mb-10">
        {opportunity.areaProblema && (
          <p className="text-gray-800 mt-4">
            <strong>Área do Problema: </strong>{opportunity.areaProblema}
          </p>
        )}
        {opportunity.impactoProblema && (
          <p className="text-gray-800 mt-4">
            <strong>Impacto: </strong>{opportunity.impactoProblema}
          </p>
        )}
        {opportunity.solucoesTestadas && (
          <p className="text-gray-800 mt-4">
            <strong>Soluções Testadas: </strong>{opportunity.solucoesTestadas}
          </p>
        )}
        {opportunity.expectativas && (
          <p className="text-gray-800 mt-4">
            <strong>Expectativas: </strong>{opportunity.expectativas}
          </p>
        )}
      </div>

      <div className="absolute bottom-4 right-4 flex flex-col gap-2">
        <button
          onClick={handleEditModalToggle}
          className="text-sm text-center py-1.5 px-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition duration-200"
        >
          Editar
        </button>
      </div>

      {/*isEditModalOpen && (
        <UpdateOpportunityDetails
          opportunity={opportunity}
          isOpen={isEditModalOpen}
          onClose={handleEditModalToggle}
          onSave={fetchOpportunities}
        />
      )*/}
    </div>
  );
};

export default OpportunityCard;