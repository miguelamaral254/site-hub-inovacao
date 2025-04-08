"use client"
import React, { useEffect, useState } from "react";
import { Project } from "@/features/projects/project.interface";
import ProjectCard from "../../../../app/(testes)/test-list-proj/ProjectCard";
import { searchProjects } from "@/features/projects/project.service";

interface ProjectListProps {
  filters: Record<string, string | number | boolean>;
}

const ProjectList: React.FC<ProjectListProps> = ({ filters }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams(filters as Record<string, string>).toString();
        const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/projects?${params}`;
        console.log("Requisição enviada: ", url);

        const response = await searchProjects(filters);
        console.log("Projetos encontrados:", response);

        const projectsData = response?.data?.content || [];
        setProjects(projectsData);
      } catch (error) {
        console.error("Erro ao buscar projetos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [filters]);

  return (
    <div className="w-full py-6">
      {loading ? (
        <div className="text-center text-xl text-gray-600">Carregando projetos...</div>
      ) : (
        <div className="flex flex-wrap gap-6 justify-center">
          {projects.length > 0 ? (
            projects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))
          ) : (
            <div className="text-center text-xl text-gray-600">Nenhum projeto encontrado</div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectList;
