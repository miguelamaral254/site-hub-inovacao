"use client";
import React, { useEffect, useState } from "react";
import { Project } from "@/features/projects/project.interface";
import { searchProjects } from "@/features/projects/project.service";
import ProjectTicketCard from "./ProjectTicketCard";

interface ProjectListProps {
  filters: Record<string, string | number | boolean>;
}

const ProjectTicketList: React.FC<ProjectListProps> = ({ filters }) => {
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
        <div className="flex flex-col gap-4">
          {projects.length > 0 ? (
            projects.map((project, index) => (
              <div key={index} className="hover:bg-gray-100 p-4 rounded-lg shadow-sm border-b">
                <ProjectTicketCard project={project} />
              </div>
            ))
          ) : (
            <div className="text-center text-xl text-gray-600">Nenhum projeto encontrado</div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectTicketList;