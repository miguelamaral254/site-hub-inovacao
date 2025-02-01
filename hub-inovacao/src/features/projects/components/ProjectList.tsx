import { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import { AcademicProjectResponseProfessorDTO, AcademicProjectResponseStudentDTO } from "../interfaces/projectInterfaces";
import { getProjectsByUserEmail } from "@/services/projectService";

interface ProjectListProps {
  statusFilter: string;
}

export default function ProjectList({ statusFilter }: ProjectListProps) {
  const [projects, setProjects] = useState<(AcademicProjectResponseProfessorDTO | AcademicProjectResponseStudentDTO)[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const email = localStorage.getItem("email");
        if (!email) {
          setError("Email não encontrado.");
          setLoading(false);
          return;
        }

        console.log("Email encontrado:", email);

        const fetchedProjects = await getProjectsByUserEmail(email);

        console.log("Projetos retornados pela API:", fetchedProjects);
        fetchedProjects.forEach((project) => {
          console.log(`Projeto ${project.id} - Status: ${project.status}`);
        });

        const validStatus = ["APROVADA", "PENDENTE", "REPROVADA"];
        if (statusFilter && !validStatus.includes(statusFilter)) {
          setError("Status inválido.");
          setLoading(false);
          return;
        }

        console.log("Filtro de status aplicado:", statusFilter);

        const filteredProjects = fetchedProjects.filter((project) => {
          const status = project.status?.toUpperCase();
          return status && status === statusFilter.toUpperCase();
        });

        console.log("Projetos filtrados:", filteredProjects);

        setProjects(filteredProjects);
      } catch (error) {
        setError("Erro ao carregar projetos.");
        console.error("Erro ao carregar projetos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [statusFilter]);

  if (loading) {
    return <div className="p-6">Carregando projetos...</div>;
  }

  return (
    <div className="p-6">
      {error && <p className="text-red-500">{error}</p>}
      {projects.length === 0 && !error && <p className="text-gray-500">Nenhum projeto encontrado.</p>}

      <div className="space-y-4">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </div>
  );
}