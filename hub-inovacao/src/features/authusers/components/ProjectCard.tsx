/* eslint-disable @next/next/no-img-element */
import { 
  AcademicProjectResponseProfessorDTO,
  AcademicProjectResponseStudentDTO
} from "../interfaces/projectInterfaces";

interface ProjectCardProps {
  project: AcademicProjectResponseProfessorDTO | AcademicProjectResponseStudentDTO;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const isProfessorProject = (
    project: AcademicProjectResponseProfessorDTO | 
    AcademicProjectResponseStudentDTO):project is AcademicProjectResponseProfessorDTO => {
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
        return ' text-orange-500'; 
      case 'REPROVADA':
        return 'text-red-600'; 
      default:
        return 'bg-gray-100 text-gray-800'; 
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold">{project.title}</h3>
        <p className={`text-sm ${getStatusClass(project.status)}`}>{project.status}</p>
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

      {project.coauthors && project.coauthors.length > 0 && (
        <div className="mt-4 text-sm text-gray-500">
          <strong>Coautores:</strong>
          <ul>
            {project.coauthors.map((coauthor, index) => (
              <li key={index}>
                {coauthor.name} ({coauthor.email})
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-4">
        {project.pdfLink && (
          <a href={project.pdfLink} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Baixar PDF</a>
        )}
      </div>

      <div className="mt-4">
        {project.siteLink && (
          <a href={project.siteLink} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Visitar Site do Projeto</a>
        )}
      </div>
    </div>
  );
}