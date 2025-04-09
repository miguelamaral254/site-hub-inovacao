/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import { Project } from "@/features/projects/project.interface";
import { updateProject } from "@/features/projects/project.service"; // <-- importa aqui
import { useAuth } from "@/context/useContext";

interface ProjectModalProps {
  project: Project;
  handleClose: () => void;
}

const ProjectTicketModal: React.FC<ProjectModalProps> = ({ project, handleClose }) => {
  const {
    id, title, description, urlPhoto, createdDate,
    coauthors, thematicArea, course, problem, generalObjective,
    specificObjective, expectedResults, status, pdfLink, siteLink,
    feedback: initialFeedback, justification: initialJustification
  } = project;

  const [evaluation, setEvaluation] = useState<"APROVADA" | "REPROVADA" | null>(null);
  const [feedback, setFeedback] = useState(initialFeedback || "");
  const [justification, setJustification] = useState(initialJustification || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "Data não disponível"; 
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });
  };
  const {user} = useAuth();
  const userId = user?.idUser;
  
  const handleSubmitEvaluation = async () => {
    if (!evaluation || id === undefined) return; 
  
    setIsSubmitting(true);
    try {
      await updateProject(id, {
        ...project,
        status: evaluation,
        feedback,
        justification,
        idManager: userId, 

      });
      alert("Projeto avaliado com sucesso!");
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

        <h2 className="text-2xl font-semibold text-gray-700">{title || "Título Indefinido"}</h2>
        <p className="text-sm text-gray-500 mt-2">{formatDate(createdDate)}</p>
        <p className="text-sm text-gray-500">{coauthors?.join(", ") || "Autor(es) Indefinido(s)"}</p>

        <div className="mt-4 flex gap-4 items-center">
          <div className="w-1/3">
            <img src={urlPhoto || "/default-image.jpg"} alt={title} className="w-full h-32 object-cover rounded-md" />
          </div>

          <div className="w-2/3">
            <p className="text-sm text-gray-600">{description || "Sem descrição disponível"}</p>
            <p className="text-sm text-gray-600 mt-4"><strong>Objetivo Geral:</strong> {generalObjective || "Não definido"}</p>
            <p className="text-sm text-gray-600 mt-2"><strong>Objetivo Específico:</strong> {specificObjective || "Não definido"}</p>
            <p className="text-sm text-gray-600 mt-2"><strong>Resultados Esperados:</strong> {expectedResults || "Não especificado"}</p>
            <p className="text-sm text-gray-600 mt-2"><strong>Problema:</strong> {problem || "Não especificado"}</p>
            <p className="text-sm text-gray-600 mt-2"><strong>Área Temática:</strong> {thematicArea || "Não especificada"}</p>
            <p className="text-sm text-gray-600 mt-2"><strong>Link do Projeto:</strong> <a href={siteLink} className="text-blue-600" target="_blank">{siteLink || "Não disponível"}</a></p>
            <p className="text-sm text-gray-600 mt-2"><strong>PDF do Projeto:</strong> <a href={pdfLink} className="text-blue-600" target="_blank">{pdfLink || "Não disponível"}</a></p>
            <p className="text-sm text-gray-600 mt-2"><strong>Status atual:</strong> {status || "Não especificado"}</p>
          </div>
        </div>

        {/* Avaliação */}
        <div className="mt-6 border-t pt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-700">Avaliação do Projeto</h3>
         
          <div className="flex gap-6 mb-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="evaluation"
                value="APROVADO"
                checked={evaluation === "APROVADA"}
                onChange={() => setEvaluation("APROVADA")}
              />
              Aprovar
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="evaluation"
                value="REPROVADO"
                checked={evaluation === "REPROVADA"}
                onChange={() => setEvaluation("REPROVADA")}
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

export default ProjectTicketModal;
