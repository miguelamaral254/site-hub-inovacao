import { useState } from "react";
import { AcademicProjectResponseProfessorDTO, AcademicProjectResponseStudentDTO } from "../interfaces/projectInterfaces";
import UpdateProjectDetails from "./UpdateProjectDetails";
import { updateProjectDetails } from "@/services/projectService";
import useSwal from "@/hooks/useSwal"; 

interface ProjectCardProps {
  project: AcademicProjectResponseProfessorDTO | AcademicProjectResponseStudentDTO;
  fetchProjects: () => void; 
}

export default function ProjectCard({ project, fetchProjects }: ProjectCardProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { showSuccess, showError } = useSwal(); 

  const openEditModal = () => setIsEditModalOpen(true);
  const closeEditModal = () => setIsEditModalOpen(false);

  const saveUpdatedProject = async (updatedProject: { title: string, description: string, urlPhoto: string, pdfLink: string, siteLink: string }) => {
    try {
      const projectId = Number(project.id); 
      if (isNaN(projectId)) {
        throw new Error('ID do projeto inválido');
      }
  
      await updateProjectDetails(projectId, updatedProject); 
      showSuccess("Projeto atualizado com sucesso!");
  
      fetchProjects();  
      closeEditModal();  
    } catch (error: unknown) {
      if (error instanceof Error) {
        showError("Erro ao atualizar o projeto", error.message || "Tente novamente.");
      } else {
        showError("Erro desconhecido", "Tente novamente.");
      }
    }
  };

  const isProfessorProject = (
    project: AcademicProjectResponseProfessorDTO | AcademicProjectResponseStudentDTO
  ): project is AcademicProjectResponseProfessorDTO => {
    return (project as AcademicProjectResponseProfessorDTO).professorName !== undefined;
  };

  const renderIfExists = (value: string | null | undefined, label: string) => {
    return value ? (
      <p><strong>{label}:</strong> {value}</p>
    ) : null;
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'APROVADA':
        return 'text-green-500'; 
      case 'PENDENTE':
        return 'text-orange-500'; 
      case 'REPROVADA':
        return 'text-red-600'; 
      default:
        return 'bg-gray-100 text-gray-800'; 
    }
  };

  const renderCoauthors = () => {
    if (project.coauthors && project.coauthors.length > 0) {
      return project.coauthors.map((coauthor, index) => (
        <div
          key={index}
          className="bg-gray-100 p-4 rounded-md mb-4 shadow-md"
        >
          <p><strong>Nome:</strong> {coauthor.name}</p>
          <p><strong>Email:</strong> {coauthor.email}</p>
          {project.status !== 'APROVADA' && (
            <>
              <p><strong>Telefone:</strong> {coauthor.phone}</p>
            </>
          )}
        </div>
      ));
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold">{project.title}</h3>
        <p className={`text-sm ${getStatusClass(project.status)}`}>{project.status}</p>
        <button 
          onClick={openEditModal} 
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Editar
        </button>
      </div>

      <div className="mb-4">
        <img src={project.urlPhoto} alt={project.title} className="w-full h-48 object-cover rounded-md" />
      </div>

      <p className="text-gray-800 mb-4">{project.description}</p>

      <div className="text-sm text-gray-500 mb-4">
        <p><strong>Tipo de Projeto:</strong> {project.typeAP}</p>
        <p><strong>Autor:</strong> {isProfessorProject(project) ? project.professorName : project.studentName}</p>
        
        {renderIfExists(project.currentUserEmail, 'Email do Autor')}
        {renderIfExists(project.creationDate, 'Data de Criação')}
        {renderIfExists(project.idManager, 'ID do Manager')}
      </div>

      <div className="text-sm text-gray-500">
        {renderIfExists(project.feedback, 'Feedback')}
        {renderIfExists(project.justification, 'Justificação')}
      </div>

      {/* Renderizando coautores, caso existam */}
      <div className="mt-4">
        {project.coauthors && project.coauthors.length > 0 && (
          <>
            <h4 className="font-semibold mb-2">Coautores:</h4>
            {renderCoauthors()}
          </>
        )}
      </div>

      <UpdateProjectDetails
        project={project}
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        onSave={saveUpdatedProject}
      />
    </div>
  );
}