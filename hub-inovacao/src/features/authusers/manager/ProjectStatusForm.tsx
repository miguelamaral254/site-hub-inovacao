import React, { useState } from "react";
import { AcademicProjectResponseDTO } from "@/interfaces/AcademicProjectInterface";
import { updateProjectStatus } from "@/services/projectService";
import useSwal from "@/hooks/useSwal";

interface ProjectFormProps {
  project: AcademicProjectResponseDTO;
  fetchProjects: () => void;
  handleClose: () => void;
  statusToSet: "APROVADA" | "REPROVADA";
}

const ProjectStatusForm: React.FC<ProjectFormProps> = ({
  project,
  fetchProjects,
  handleClose,
  statusToSet,
}) => {
  const [feedback, setFeedback] = useState(project.feedback || "");
  const [justification, setJustification] = useState(project.justification || "");
  const { showSuccess, showError } = useSwal();

  const handleSaveClick = async () => {
    try {
      const storedUserData = localStorage.getItem("userData");
      let idManager = "";
      if (storedUserData) {
        const userData = JSON.parse(storedUserData);
        idManager = userData.id;
      }

      const statusData = {
        id: Number(project.id),
        status: statusToSet,
        feedback,
        justification,
        idManager,
      };

      console.log("Dados enviados para atualização:", statusData);
      await updateProjectStatus(Number(project.id), statusData);
      showSuccess("Status atualizado com sucesso!");
      fetchProjects();
      handleClose();
    } catch (error: unknown) {
      if (error instanceof Error) {
        showError(error.message || "Erro ao atualizar status do projeto.");
      } else {
        showError("Erro desconhecido ao atualizar status do projeto.");
      }
    }
  };

  return (
    <div>
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

      <div className="mt-4 flex justify-between">
        <button
          className="bg-gray-300 text-black p-2 rounded-md"
          onClick={handleClose}
        >
          Fechar
        </button>
        <button
          className={`p-2 rounded-md ${
            statusToSet === "APROVADA" ? "bg-green-500" : "bg-red-500"
          } text-white`}
          onClick={handleSaveClick}
        >
          {statusToSet === "APROVADA" ? "Aprovar" : "Reprovar"}
        </button>
      </div>
    </div>
  );
};

export default ProjectStatusForm;