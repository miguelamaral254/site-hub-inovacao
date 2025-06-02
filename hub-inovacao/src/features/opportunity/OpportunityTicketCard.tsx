"use client";
import React, { useState } from "react";
import OpportunityTicketModal from "./OpportunityTicketModal";
import { Opportunity } from "./opportunity.interface";
import { formatDate } from "@/utils/formatters";

const typeMap: Record<string, { bgColor: string; label: string }> = {
  BANCO_DE_OPORTUNIDADE: {
    bgColor: "bg-purple-200",
    label: "#Banco de Oportunidade",
  },
  BANCO_DE_PROBLEMA: { bgColor: "bg-blue-200", label: "#Banco de Problema" },
  BANCO_DE_IDEIA: { bgColor: "bg-green-200", label: "#Banco de Ideia" },
  DESAFIO: { bgColor: "bg-yellow-200", label: "#Desafio" },
};

interface CardServicoProps {
  opportunity: Opportunity;
}

const OpportunityTicketCard: React.FC<CardServicoProps> = ({ opportunity }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { tituloDesafio, createdDate, opportunityType, descricaoProblema } =
    opportunity;

  const { bgColor, label } =
    typeMap[opportunityType || "BANCO_DE_OPORTUNIDADE"];

  function capitalize(word: string) {
    if (typeof word !== "string") {
      return "";
    }
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }

  return (
    <>
      <div
        className="px-4 py-2 border-b bg-white rounded-lg shadow-md hover:shadow-2xl cursor-pointer mb-0 flex items-center gap-6 relative"
        onClick={() => setIsModalOpen(true)}
      >
        <div
          className={`${bgColor} text-sm flex flex-col items-center justify-center text-center gap-2 h-24 w-24 rounded-full border-8 border-[#f7f9f9]`}
        >
          {label}
        </div>

        <div className="flex-1 flex justify-between items-center ">
          <div className="flex-1">
            <p className="text-sm text-gray-700 font-semibold">
              {tituloDesafio || "Título Indefinido"}
            </p>
            <div className="text-sm text-gray-600 mt-2 max-h-16 overflow-hidden">
              {descricaoProblema || "Sem descrição disponível"}
            </div>
          </div>

          <p className="flex-1">{capitalize(opportunity.status as string)}</p>

          <p className="text-xs text-gray-500 ">
            {createdDate ? formatDate(createdDate) : "Data Indefinida"}
          </p>
        </div>
      </div>
      {isModalOpen && (
        <OpportunityTicketModal
          opportunity={opportunity}
          handleClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default OpportunityTicketCard;
