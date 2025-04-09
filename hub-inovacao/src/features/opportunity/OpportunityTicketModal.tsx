/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React from "react";
import { RiCloseLine } from "react-icons/ri";
import { Opportunity } from "./opportunity.interface";

interface OpportunityModalProps {
  opportunity: Opportunity;
  handleClose: () => void;
}

const OpportunityTicketModal: React.FC<OpportunityModalProps> = ({ opportunity, handleClose }) => {
  const { 
    tituloDesafio, descricaoProblema, impactoProblema, solucoesTestadas, expectativas,
    restricoes, disponibilidadeDados, mentoriaSuporte, visitasTecnicas, recursosDisponiveis,
    autorizacao, opportunityType, createdDate, feedback, justification, status 
  } = opportunity;

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "Data não disponível"; 
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleClose} // Fecha o modal quando clica fora
    >
      <div 
        className="bg-white p-6 rounded-lg w-3/4 max-w-3xl relative"
        onClick={(e) => e.stopPropagation()} // Impede o clique fora de fechar o modal
      >
        <button 
          onClick={handleClose} 
          className="absolute top-4 right-4 text-xl text-gray-600 hover:text-gray-900"
        >
          <RiCloseLine />
        </button>

        <h2 className="text-2xl font-semibold text-gray-700">{tituloDesafio || "Título do Desafio Indefinido"}</h2>
        <p className="text-sm text-gray-500 mt-2">{formatDate(createdDate)}</p>

        <div className="mt-4">
          <p className="text-sm text-gray-600"><strong>Descrição do Problema:</strong> {descricaoProblema || "Não disponível"}</p>
          <p className="text-sm text-gray-600 mt-2"><strong>Impacto do Problema:</strong> {impactoProblema || "Não disponível"}</p>
          <p className="text-sm text-gray-600 mt-2"><strong>Soluções Testadas:</strong> {solucoesTestadas || "Não disponível"}</p>
          <p className="text-sm text-gray-600 mt-2"><strong>Expectativas:</strong> {expectativas || "Não especificado"}</p>
          <p className="text-sm text-gray-600 mt-2"><strong>Restrições:</strong> {restricoes || "Não especificado"}</p>
          <p className="text-sm text-gray-600 mt-2"><strong>Disponibilidade de Dados:</strong> {disponibilidadeDados || "Não disponível"}</p>
          <p className="text-sm text-gray-600 mt-2"><strong>Mentoria e Suporte:</strong> {mentoriaSuporte ? "Disponível" : "Não disponível"}</p>
          <p className="text-sm text-gray-600 mt-2"><strong>Visitas Técnicas:</strong> {visitasTecnicas ? "Disponível" : "Não disponível"}</p>
          <p className="text-sm text-gray-600 mt-2"><strong>Recursos Disponíveis:</strong> {recursosDisponiveis?.join(", ") || "Não disponível"}</p>
          <p className="text-sm text-gray-600 mt-2"><strong>Autorização:</strong> {autorizacao ? "Autorizada" : "Não autorizada"}</p>
          <p className="text-sm text-gray-600 mt-2"><strong>Tipo de Oportunidade:</strong> {opportunityType || "Não especificado"}</p>
          <p className="text-sm text-gray-600 mt-2"><strong>Status:</strong> {status || "Não especificado"}</p>
        </div>
      </div>
    </div>
  );
};

export default OpportunityTicketModal;