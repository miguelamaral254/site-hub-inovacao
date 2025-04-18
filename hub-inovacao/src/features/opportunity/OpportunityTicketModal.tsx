"use client";
import React, { useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import { Opportunity } from "./opportunity.interface";
import { useAuth } from "@/context/useContext";
import { updateOpportunity } from "./opportunity.service";
import { StatusSolicitation } from "../core/status.interface";

interface OpportunityModalProps {
  opportunity: Opportunity;
  handleClose: () => void;
}

const OpportunityTicketModal: React.FC<OpportunityModalProps> = ({ opportunity, handleClose }) => {
  const {
    id, tituloDesafio, descricaoProblema, impactoProblema, solucoesTestadas, expectativas,
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
      alert("Oportunidade avaliada com sucesso!");
      handleClose();
    } catch (error) {
      alert("Erro ao enviar avaliação.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleClose}
    >
      <div 
        className="bg-white p-6 rounded-lg w-3/4 max-w-3xl relative"
        onClick={(e) => e.stopPropagation()}
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
          <p className="text-sm text-gray-600 mt-2"><strong>Disponibilidade de Dados:</strong> {disponibilidadeDados || "Não especificado"}</p>
          <p className="text-sm text-gray-600 mt-2"><strong>Mentoria/Suporte:</strong> {mentoriaSuporte || "Não especificado"}</p>
          <p className="text-sm text-gray-600 mt-2"><strong>Visitas Técnicas:</strong> {visitasTecnicas || "Não especificado"}</p>
          <p className="text-sm text-gray-600 mt-2"><strong>Recursos Disponíveis:</strong> {recursosDisponiveis || "Não especificado"}</p>
          <p className="text-sm text-gray-600 mt-2"><strong>Autorização:</strong> {autorizacao || "Não informado"}</p>
          <p className="text-sm text-gray-600 mt-2"><strong>Tipo:</strong> {opportunityType || "Não informado"}</p>
          <p className="text-sm text-gray-600 mt-2"><strong>Status atual:</strong> {status || "Não especificado"}</p>
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

          <div className="mb-3">
            <label className="text-sm font-medium text-gray-700">Feedback (opcional)</label>
            <textarea
              className="w-full border rounded-md p-2 mt-1"
              rows={3}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="text-sm font-medium text-gray-700">Justificativa (opcional)</label>
            <textarea
              className="w-full border rounded-md p-2 mt-1"
              rows={3}
              value={justification}
              onChange={(e) => setJustification(e.target.value)}
            />
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