/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from "react";
import { RiCloseLine } from "react-icons/ri";
import { Opportunity } from "./opportunity.interface";
import { useAuth } from "@/context/useContext";
import { updateOpportunity } from "./opportunity.service";
import { StatusSolicitation } from "../core/status.interface";
import useSwal from "@/hooks/useSwal";

const typeMap: Record<string, { bgColor: string; label: string }> = {
  BANCO_DE_OPORTUNIDADE: { bgColor: "bg-purple-200", label: "#Banco de Oportunidade" },
  BANCO_DE_PROBLEMA: { bgColor: "bg-blue-200", label: "#Banco de Problema" },
  BANCO_DE_IDEIA: { bgColor: "bg-green-200", label: "#Banco de Ideia" },
  DESAFIO: { bgColor: "bg-yellow-200", label: "#Desafio" }
};

interface OpportunityModalProps {
  opportunity: Opportunity;
  handleClose: () => void;
}

const OpportunityTicketModal: React.FC<OpportunityModalProps> = ({ opportunity, handleClose }) => {
  const {
    id, tituloDesafio, urlPhoto, descricaoProblema, impactoProblema, solucoesTestadas, expectativas,
    restricoes, disponibilidadeDados, mentoriaSuporte, visitasTecnicas, recursosDisponiveis,
    autorizacao, opportunityType, createdDate, feedback: initialFeedback, justification: initialJustification, status
  } = opportunity;

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "Data não disponível"; 
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });
  };

  const [evaluation, setEvaluation] = useState<StatusSolicitation | null>(null);
  const [feedback, setFeedback] = useState(initialFeedback || "");
  const [justification, setJustification] = useState(initialJustification || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { user } = useAuth();
  const userId = user?.idUser;
  const { showSuccess, showError } = useSwal();

  const handleSubmitEvaluation = async () => {
    if (!evaluation || id === undefined) return;

    setIsSubmitting(true);
    try {
      await updateOpportunity(id, {
        ...opportunity,
        status: evaluation,
        feedback,
        justification,
        managerId: userId,
      });
      showSuccess("Oportunidade avaliada com sucesso!");
      handleClose();
    } catch (error) {
      showError("Erro ao enviar avaliação.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const typeKey = opportunityType || "BANCO_DE_OPORTUNIDADE"; 
  const { bgColor, label } = typeMap[typeKey];

  useEffect(() => {
    if (status === "APROVADA") {
      setEvaluation(StatusSolicitation.APROVADA);
    } else if (status === "REPROVADA") {
      setEvaluation(StatusSolicitation.REPROVADA);
    } else {
      setEvaluation(null);
    }
  }, [status]);

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleClose}
    >
      <div 
        className="bg-white p-6 rounded-lg w-full max-w-6xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={handleClose} 
          className="absolute top-4 right-4 text-xl text-gray-600 hover:text-gray-900"
        >
          <RiCloseLine />
        </button>

        <div className="flex gap-8">
          <div className="flex-1">
            <img src={urlPhoto} className="w-full h-48 object-cover rounded-md" />
            <h2 className="text-2xl font-semibold text-gray-700 mt-4">{tituloDesafio || "Título do Desafio Indefinido"}</h2>
            <p className="text-sm text-gray-500 mt-2">{formatDate(createdDate)}</p>
            <p className="text-sm text-gray-600 mt-2"><strong>Descrição do Problema:</strong> {descricaoProblema || "Não disponível"}</p>
          </div>

          <div className="flex-1 space-y-4">
            <p className="text-sm text-gray-600"><strong>Impacto do Problema:</strong> {impactoProblema || "Não disponível"}</p>
            <p className="text-sm text-gray-600"><strong>Soluções Testadas:</strong> {solucoesTestadas || "Não disponível"}</p>
            <p className="text-sm text-gray-600"><strong>Expectativas:</strong> {expectativas || "Não especificado"}</p>
            <p className="text-sm text-gray-600"><strong>Restrições:</strong> {restricoes || "Não especificado"}</p>
            <p className="text-sm text-gray-600"><strong>Disponibilidade de Dados:</strong> {disponibilidadeDados || "Não especificado"}</p>
          </div>

          <div className="flex-1 space-y-4">
            <p className="text-sm text-gray-600"><strong>Mentoria/Suporte:</strong> {mentoriaSuporte || "Não especificado"}</p>
            <p className="text-sm text-gray-600"><strong>Visitas Técnicas:</strong> {visitasTecnicas || "Não especificado"}</p>
            <p className="text-sm text-gray-600"><strong>Recursos Disponíveis:</strong>
                </p>
              <div className="list-disc pl-5">
                {recursosDisponiveis && Array.isArray(recursosDisponiveis) && recursosDisponiveis.map((item, index) => (
                  <p key={index} className="text-sm text-gray-600">{item}</p>
                ))}
              </div>
            <p className="text-sm text-gray-600"><strong>Autorização:</strong> {autorizacao || "Não informado"}</p>
            <p className="text-sm text-gray-600"><strong>Tipo:</strong> 
              <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-3xl text-white ${bgColor}`}>
                {label}
              </span>
            </p>
            <p className="text-sm text-gray-600"><strong>Status atual:</strong> {status || "Não especificado"}</p>
          </div>
        </div>

        <div className="mt-6 border-t pt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-700">Avaliação da Oportunidade</h3>
          <div className="flex gap-6 mb-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="evaluation"
                value={StatusSolicitation.APROVADA}
                checked={evaluation === StatusSolicitation.APROVADA}
                onChange={() => setEvaluation(StatusSolicitation.APROVADA)}
              />
              Aprovar
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="evaluation"
                value={StatusSolicitation.REPROVADA}
                checked={evaluation === StatusSolicitation.REPROVADA}
                onChange={() => setEvaluation(StatusSolicitation.REPROVADA)}
              />
              Reprovar
            </label>
          </div>

          <div className="flex gap-6 mb-4">
            <div className="w-full">
              <label className="text-sm font-medium text-gray-700">Feedback (opcional)</label>
              <textarea
                className="w-full border rounded-md p-2 mt-1"
                rows={3}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />
            </div>

            <div className="w-full">
              <label className="text-sm font-medium text-gray-700">Justificativa (opcional)</label>
              <textarea
                className="w-full border rounded-md p-2 mt-1"
                rows={3}
                value={justification}
                onChange={(e) => setJustification(e.target.value)}
              />
            </div>
          </div>

          <button
            onClick={handleSubmitEvaluation}
            disabled={!evaluation || isSubmitting}
            className={`mt-2 px-4 py-2 rounded-md text-white ${
              evaluation ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {isSubmitting ? "Enviando..." : "Avaliar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OpportunityTicketModal;