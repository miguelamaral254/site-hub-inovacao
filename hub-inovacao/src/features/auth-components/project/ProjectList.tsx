/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import ProjectCardSkeleton from "./ProjectCardSkeleton"; // Importando o Skeleton
import { getProjectsByUserEmail } from "@/services/projectService";
import { AcademicProjectResponseProfessorDTO, AcademicProjectResponseStudentDTO } from "./interfaces/projectInterfaces";

interface ProjectListProps {
  statusFilter: string;
}

export default function ProjectList({ statusFilter }: ProjectListProps) {
  const [projects, setProjects] = useState<(AcademicProjectResponseProfessorDTO | AcademicProjectResponseStudentDTO)[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const email = localStorage.getItem("email");
      if (!email) {
        setError("Email não encontrado.");
        setLoading(false);
        return;
      }

      const fetchedProjects = await getProjectsByUserEmail(email);
      const validStatus = ["APROVADA", "PENDENTE", "REPROVADA"];
      if (statusFilter && !validStatus.includes(statusFilter)) {
        setError("Status inválido.");
        setLoading(false);
        return;
      }

      const filteredProjects = fetchedProjects.filter((project) => {
        const status = project.status?.toUpperCase();
        return status && status === statusFilter.toUpperCase();
      });

      setProjects(filteredProjects);
    } catch (error) {
      console.log(error)
      setError("Erro ao carregar projetos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [statusFilter]);

  if (loading) {
    return (
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, index) => (
            <ProjectCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {error && <p className="text-red-500">{error}</p>}
      {projects.length === 0 && !error && <p className="text-gray-500">Nenhum projeto encontrado.</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} fetchProjects={fetchProjects} />
        ))}
      </div>
    </div>
  );
}