/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import OpportunityModal from "./OpportunityModal";
import { Opportunity, OpportunityType } from "./opportunity.interface";

interface OpportunityCardProps {
  opportunity: Opportunity;
}

const OpportunityCard: React.FC<OpportunityCardProps> = ({ opportunity }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  function getFormattedOpportunityType(
    value: string | OpportunityType | undefined
  ): string {
    if (value === undefined) return "Não especificado";

    const typeMap: Record<OpportunityType, string> = {
      [OpportunityType.BANCO_DE_OPORTUNIDADE]: "Banco de Oportunidades",
      [OpportunityType.BANCO_DE_PROBLEMA]: "Banco de Problemas",
      [OpportunityType.BANCO_DE_IDEIA]: "Banco de Ideias",
      [OpportunityType.DESAFIO]: "Desafio",
    };
    if (typeof value === "string") {
      const opportunityTypeEnum =
        OpportunityType[value as keyof typeof OpportunityType];
      return typeMap[opportunityTypeEnum] || "Não especificado";
    }
    return typeMap[value] || "Não especificado";
  }

  return (
    <div className="flex flex-col w-full h-auto bg-white shadow-[0_0px_30px_rgba(162,166,188,0.25)] rounded-lg px-3 py-4">
      {opportunity.urlPhoto && (
        <div className="flex justify-center w-full">
          <div className="mb-4">
            <img
              src={opportunity.urlPhoto}
              alt={opportunity.tituloDesafio}
              className="w-full h-48 object-cover rounded-md"
            />
          </div>
        </div>
      )}

      <div className="py-2 mt-3 mb-10">
        <h5 className="text-2xl font-bold text-gray-950">
          {opportunity.tituloDesafio}
        </h5>
        <p className="text-gray-800 mt-4">{opportunity.descricaoProblema}</p>
        <p className="text-gray-600 mt-4">
          <strong>Área do Problema:</strong> {opportunity.areaProblema}
        </p>
        <p className="text-gray-600 mt-4">
          <strong>Impacto:</strong> {opportunity.impactoProblema}
        </p>
        <p className="text-gray-600 mt-4">
          <strong>Expectativas:</strong> {opportunity.expectativas}
        </p>

        <p className="text-start flex items-center mb-4 px-3 py-2 bg-[#3355A5] text-base rounded-3xl text-white w-auto">
          <strong className="mr-1">Tipo:</strong>
          {getFormattedOpportunityType(opportunity.opportunityType)}
        </p>

        {opportunity.mentoriaSuporte && (
          <p className="text-green-500 mt-4">Mentoria e Suporte disponível</p>
        )}
        {opportunity.visitasTecnicas && (
          <p className="text-blue-500 mt-4">Visitas Técnicas disponíveis</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <button
          onClick={openModal}
          className="text-sm text-center py-1.5 px-3 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition duration-200"
        >
          Conheça mais a oportunidade
        </button>
      </div>
      <OpportunityModal
        isOpen={isModalOpen}
        onClose={closeModal}
        opportunity={opportunity}
      />
    </div>
  );
};

export default OpportunityCard;
