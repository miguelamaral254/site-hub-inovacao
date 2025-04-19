/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React from "react";
import { FaTimes, FaUser } from "react-icons/fa";
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

  function getFormattedOpportunityType(value: string | OpportunityType | undefined): string {
    if (value === undefined) return "Não especificado";
    
    const typeMap: Record<OpportunityType, string> = {
      [OpportunityType.BANCO_DE_OPORTUNIDADE]: "Banco de Oportunidades",
      [OpportunityType.BANCO_DE_PROBLEMA]: "Banco de Problemas",
      [OpportunityType.BANCO_DE_IDEIA]: "Banco de Ideias",
      [OpportunityType.DESAFIO]: "Desafio",
    };

    if (typeof value === "string") {
      const opportunityTypeEnum = OpportunityType[value as keyof typeof OpportunityType];
      return typeMap[opportunityTypeEnum] || "Não especificado";
    }

    return typeMap[value] || "Não especificado";
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });
  };

  return (
    <div className="fixed top-0 left-0 right-0 flex justify-center items-center bg-black bg-opacity-50 z-50 h-[100vh] px-4 py-6">
      <div className="bg-white p-6 py-10 rounded-lg w-full max-w-[1200px] h-full relative overflow-y-auto">

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="text-2xl text-blue-500 hover:text-blue-700"
          >
            <FaTimes />
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex flex-col w-full md:w-1/3">
            <div className="flex justify-center mb-4 mt-2">
              {opportunity.urlPhoto && (
                <img src={opportunity.urlPhoto} alt={opportunity.tituloDesafio} className="w-full h-auto object-cover rounded-md" />
              )}
            </div>
            <h3 className="text-2xl text-[#002B8F] font-bold mb-4">{opportunity.tituloDesafio}</h3>
            {opportunity.createdDate && (
              <p className="mb-4 text-xl text-[#3355A5]">
                Data de postagem: <span className="text-black">{formatDate(opportunity.createdDate)}</span>
              </p>
            )}
            {opportunity.opportunityType !== undefined && (
              <p className="text-start flex items-center mb-4 px-3 py-2 bg-[#3355A5] text-base rounded-3xl text-white w-auto">
                <strong className="mr-1">Tipo:</strong>
                {getFormattedOpportunityType(opportunity.opportunityType)}
              </p>
            )}
            {opportunity.descricaoProblema && (
              <p className="mb-4 text-xl text-[#3355A5]"><strong>Descrição:</strong> <span>{opportunity.descricaoProblema}</span></p>
            )}
          </div>

          <div className="flex flex-col w-full md:w-1/3">
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
            {opportunity.restricoes && (
              <p className="mb-4 text-xl text-[#3355A5]">
                <strong>Restrições:</strong> <span className="text-black">{opportunity.restricoes}</span>
              </p>
            )}
            {opportunity.disponibilidadeDados && (
              <p className="mb-4 text-xl text-[#3355A5]">
                <strong>Disponibilidade de Dados:</strong> <span className="text-black">{opportunity.disponibilidadeDados}</span>
              </p>
            )}
          </div>

          <div className="flex flex-col w-full md:w-1/3">
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
            {opportunity.autorizacao !== undefined && (
              <p className="text-lg text-[#3355A5]">
                <strong>Autorização:</strong> <span className="text-black">{opportunity.autorizacao ? "Autorizado" : "Não autorizado"}</span>
              </p>
            )}
          </div>
        </div>

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