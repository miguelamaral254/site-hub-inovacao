"use client";

import React from "react";
import { FaTimes } from "react-icons/fa";
import { Opportunity, OpportunityType } from "./opportunity.interface";

interface OpportunityModalProps {
  isOpen: boolean;
  onClose: () => void;
  opportunity: Opportunity;  
}

const OpportunityModal: React.FC<OpportunityModalProps> = ({
  isOpen,
  onClose,
  opportunity,
}) => {
  if (!isOpen) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-[80%] max-w-[600px] relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-2xl text-blue-500 hover:text-blue-700">
          <FaTimes />
        </button>

        <div className="flex justify-center mb-4 mt-2">
          {opportunity.urlPhoto && (
            <img src={opportunity.urlPhoto} alt={opportunity.tituloDesafio} className="w-full h-48 object-cover rounded-md" />
          )}
        </div>

        <h3 className="text-xl font-bold mb-4">{opportunity.tituloDesafio}</h3>

        {opportunity.createdDate && (
          <p className="mb-4 text-xl text-[#3355A5]">
            Data de postagem: <span className="text-black">{formatDate(opportunity.createdDate)}</span>
          </p>
        )}

        {opportunity.enterpriseId && (
          <p className="mb-4 text-xl text-[#3355A5]">
            Instituição: <span className="text-black">{opportunity.enterpriseId}</span>
          </p>
        )}

        {opportunity.opportunityType && (
          <p className={`inline-flex text-start flex items-center mb-4 px-3 py-2 bg-[#3355A5] text-base rounded-3xl text-white w-auto`}>
          <strong>Tipo:</strong> {opportunity.opportunityType ? OpportunityType[opportunity.opportunityType as unknown as keyof typeof OpportunityType] : 'Não especificado'}
          </p>
        )}

        {opportunity.descricaoProblema && (
          <p className="mb-4">{opportunity.descricaoProblema}</p>
        )}

        {opportunity.areaProblema && (
          <p className="mb-4 text-xl text-[#3355A5]">
            <strong>Área do Problema:</strong> <span className="text-black">{opportunity.areaProblema}</span>
          </p>
        )}

        {opportunity.impactoProblema && (
          <p className="mb-4 text-xl text-[#3355A5]">
            <strong>Impacto:</strong> <span className="text-black">{opportunity.impactoProblema}</span>
          </p>
        )}

        {opportunity.expectativas && (
          <p className="mb-4 text-xl text-[#3355A5]">
            <strong>Expectativas:</strong> <span className="text-black">{opportunity.expectativas}</span>
          </p>
        )}

        {opportunity.solucoesTestadas && (
          <p className="text-lg text-[#3355A5]">
            <strong>Soluções Testadas:</strong> <span className="text-black">{opportunity.solucoesTestadas}</span>
          </p>
        )}

        {opportunity.visitasTecnicas && (
          <p className="text-lg text-[#3355A5]">
            <strong>Visitas Técnicas:</strong> <span className="text-black">Disponíveis</span>
          </p>
        )}

        {opportunity.mentoriaSuporte && (
          <p className="text-lg text-[#3355A5]">
            <strong>Mentoria e Suporte:</strong> <span className="text-black">Disponíveis</span>
          </p>
        )}

        {opportunity.urlPhoto && (
          <div className="mt-6 flex justify-start gap-4">
            <a
              href={opportunity.urlPhoto}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-start gap-2 text-sm text-blue-700 rounded-lg"
            >
              Ver Foto
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default OpportunityModal;