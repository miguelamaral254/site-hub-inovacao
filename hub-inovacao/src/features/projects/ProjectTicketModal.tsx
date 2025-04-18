/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from "react";
import { RiCloseLine } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { Project } from "@/features/projects/project.interface";
import { updateProject } from "@/features/projects/project.service";
import { useAuth } from "@/context/useContext";
import useSwal from "@/hooks/useSwal";

interface ProjectModalProps {
  project: Project;
  handleClose: () => void;
  updateProjects: () => void;
}

const ProjectTicketModal: React.FC<ProjectModalProps> = ({
  project,
  handleClose,
  updateProjects,
}) => {
  const {
    id, title, description, urlPhoto, createdDate,
    coauthors, thematicArea, course, problem, generalObjective,
    specificObjective, expectedResults, siteLink,
    feedback: initialFeedback, justification: initialJustification,
    status: initialStatus
  } = project;

  const [evaluation, setEvaluation] = useState<"APROVADA" | "REPROVADA" | null>(null);
  const [feedback, setFeedback] = useState(initialFeedback || "");
  const [justification, setJustification] = useState(initialJustification || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const userId = user?.idUser;
  const { showSuccess, showError } = useSwal();

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "Data não disponível"; 
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });
  };

  useEffect(() => {
    if (initialStatus === "APROVADA") {
      setEvaluation("APROVADA");
    } else if (initialStatus === "REPROVADA") {
      setEvaluation("REPROVADA");
    } else {
      setEvaluation(null); 
    }
  }, [initialStatus]);

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

      showSuccess("Projeto avaliado com sucesso!");
      updateProjects();  
      handleClose();  
    } catch (error) {
      showError("Erro ao enviar avaliação.");
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
        className="bg-white p-8 rounded-lg w-full max-w-6xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={handleClose} 
          className="absolute top-4 right-4 text-xl text-gray-600 hover:text-gray-900"
        >
          <RiCloseLine />
        </button>

        <div className="flex gap-8">
          <div className="w-1/4">
            <img src={urlPhoto || "/default-image.jpg"} alt={title} className="w-full h-48 object-cover rounded-md" />
            <p className="text-sm text-gray-600 mt-2">{description || "Sem descrição disponível"}</p>
            <p className="text-sm text-gray-500 mt-4">
              <strong>Data de Criação:</strong> {formatDate(createdDate)}
            </p>
            {siteLink && (
              <div className="mt-2">
                <a href={siteLink} target="_blank" className="text-blue-600">
                  Link para o projeto
                </a>
              </div>
            )}
          </div>

          <div className="w-1/4">
            <p className="text-sm text-gray-600"><strong>Área Temática:</strong> {thematicArea || "Não especificada"}</p>
            <p className="text-sm text-gray-600"><strong>Curso:</strong> {course || "Não especificado"}</p>
            <p className="text-sm text-gray-600"><strong>Problema:</strong> {problem || "Não especificado"}</p>
            <p className="text-sm text-gray-600"><strong>Objetivo Geral:</strong> {generalObjective || "Não especificado"}</p>
            <p className="text-sm text-gray-600"><strong>Objetivo Específico:</strong> {specificObjective || "Não especificado"}</p>
            <p className="text-sm text-gray-600"><strong>Resultados Esperados:</strong> {expectedResults || "Não especificado"}</p>
          </div>

          <div className="w-1/4">
            {coauthors && coauthors.length > 0 && (
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Coautores:</h4>
                <div className="space-y-4">
                  {coauthors.map((coauthor, index) => (
                    <div key={index} className="flex items-center space-x-3 bg-gray-100 p-3 rounded-md">
                      <FaUser className="text-gray-600" />
                      <div className="text-sm">
                        <p className="text-gray-600">Nome: <span className="text-black">{coauthor.name}</span></p>
                        <p className="text-gray-600">Email: <span className="text-black">{coauthor.email}</span></p>
                        <p className="text-gray-600">Telefone: <span className="text-black">{coauthor.phone}</span></p>
                        <p className="text-gray-600">Cargo: <span className="text-black">{coauthor.position}</span></p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="w-1/4">
            <h3 className="text-lg font-semibold mb-2 text-gray-700">Avaliação do Projeto</h3>
            <div className="flex gap-6 mb-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="evaluation"
                  value="APROVADA"
                  checked={evaluation === "APROVADA"}
                  onChange={() => setEvaluation("APROVADA")}
                />
                Aprovar
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="evaluation"
                  value="REPROVADA"
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
    </div>
  );
};

export default ProjectTicketModal;