/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState } from "react";
import OpportunityTicketModal from "./OpportunityTicketModal";
import { Opportunity } from "./opportunity.interface";

// Mapeamento para os tipos de oportunidade
const typeMap: Record<string, { bgColor: string; label: string }> = {
  BANCO_DE_OPORTUNIDADE: { bgColor: "bg-purple-200", label: "#Banco de Oportunidade" },
  BANCO_DE_PROBLEMA: { bgColor: "bg-blue-200", label: "#Banco de Problema" },
  BANCO_DE_IDEIA: { bgColor: "bg-green-200", label: "#Banco de Ideia" },
  DESAFIO: { bgColor: "bg-yellow-200", label: "#Desafio" }
};

interface CardServicoProps {
  opportunity: Opportunity;
}

const OpportunityTicketCard: React.FC<CardServicoProps> = ({ opportunity }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { 
    tituloDesafio, createdDate, opportunityType, descricaoProblema 
  } = opportunity;

  const { bgColor, label } = typeMap[opportunityType || "BANCO_DE_OPORTUNIDADE"];

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "Data não disponível"; 
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });
  };

  return (
    <div 
      className="p-4 border-b bg-white rounded-lg shadow-md hover:shadow-xl mb-6 cursor-pointer"
      onClick={() => setIsModalOpen(true)}
    >
      {/* Título do Desafio */}
      <p className="text-sm text-gray-700 font-semibold">{tituloDesafio || "Título do Desafio Indefinido"}</p>

      {/* Informações complementares
     
      <p className="text-xs text-gray-500">{formatDate(createdDate)}</p>
      <p className="text-xs text-gray-500">{coauthors?.join(", ") || "Autor(es) Indefinido(s)"}</p>
  */}
  
      {/* Tipo da Oportunidade */}
      <p className={`mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-3xl text-white ${bgColor}`}>
        {label}
      </p>

      {/* Descrição resumida */}
      <p className="text-sm text-gray-600 mt-2 max-h-16 overflow-hidden">{descricaoProblema || "Sem descrição disponível"}</p>

      {/* Modal da Oportunidade */}
      {isModalOpen && (
        <OpportunityTicketModal opportunity={opportunity} handleClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default OpportunityTicketCard;