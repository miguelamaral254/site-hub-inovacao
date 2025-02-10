import React, { useState } from "react";
import { AcademicProjectResponseDTO } from "@/interfaces/AcademicProjectInterface";
import { OpportunityResponseDTO } from "@/interfaces/OpportunityInterfaces"; 
import { updateProjectStatus } from "@/services/projectService";
import { updateOpportunityStatus } from "@/services/opportunityService";
import useSwal from "@/hooks/useSwal";

interface ProjectStatusFormProps {
  project?: AcademicProjectResponseDTO;
  opportunity?: OpportunityResponseDTO;
  fetchProjects: () => void;
  handleClose: () => void;
  statusToSet: "APROVADA" | "REPROVADA";
}

const ProjectStatusForm: React.FC<ProjectStatusFormProps> = ({
  project,
  opportunity,
  fetchProjects,
  handleClose,
  statusToSet,
}) => {
  const [feedback, setFeedback] = useState(project?.feedback || opportunity?.feedback || "");
  const [justification, setJustification] = useState(project?.justification || opportunity?.justification || "");
  const { showSuccess, showError } = useSwal();

  const handleSaveClick = async () => {
    try {
      const storedUserData = localStorage.getItem("userData");
      let idManager = "";
      if (storedUserData) {
        const userData = JSON.parse(storedUserData);
        idManager = userData.id;
      }

      const validationDate = new Date().toISOString().split("T")[0];

      if (project) {
        await updateProjectStatus(Number(project.id), {
          id: Number(project.id),
          status: statusToSet,
          feedback,
          justification,
          idManager,
        });
      } else if (opportunity) {
        await updateOpportunityStatus(Number(opportunity.id), {
          id: Number(opportunity.id),
          status: statusToSet,
          validationDate,
          feedback,
          justification,
          idManager,
        });
      }

      showSuccess("Status atualizado com sucesso!");
      fetchProjects();
      handleClose();
    } catch (error: unknown) {
      showError(error instanceof Error ? error.message : "Erro ao atualizar status.");
    }
  };

  return (
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl relative">
        {/* Botão de Fechar */}
        <button
          className="absolute top-2 right-2 text-gray-600 text-2xl"
          onClick={handleClose}
        >
          &times;
        </button>

        <h2 className="text-2xl font-semibold mb-4">
          {statusToSet === "APROVADA" ? "Aprovar" : "Reprovar"} {project ? "Projeto" : "Oportunidade"}
        </h2>

        <div className="mt-4">
          <label className="block text-gray-700 mb-2">Feedback</label>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="w-full p-2 border rounded-md"
            rows={4}
          />
        </div>

        <div className="mt-4">
          <label className="block text-gray-700 mb-2">Justificativa</label>
          <textarea
            value={justification}
            onChange={(e) => setJustification(e.target.value)}
            className="w-full p-2 border rounded-md"
            rows={3}
          />
        </div>

        <div className="mt-4 flex justify-end gap-2">
         
          <button
            className={`p-2 rounded-md ${
              statusToSet === "APROVADA" ? "bg-green-500" : "bg-red-500"
            } text-white hover:${statusToSet === "APROVADA" ? "bg-green-600" : "bg-red-600"}`}
            onClick={handleSaveClick}
          >
            {statusToSet === "APROVADA" ? "Aprovar" : "Reprovar"}
          </button>
        </div>
      </div>

  );
};

export default ProjectStatusForm;