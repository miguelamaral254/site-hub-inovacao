/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useEffect, useState } from "react";
import { Project } from "@/features/projects/project.interface";
import ProjectCard from "./ProjectCard"; // Importando o ProjectCard
import { searchProjects } from "@/features/projects/project.service";

interface ProjectListProps {
  filterKey: string; // Chave do filtro a ser aplicado (ex: 'status', 'idManager', etc.)
  filterValue: string | number | boolean; // Valor do filtro (ex: 'APROVADA', 1, etc.)
}

const ProjectList: React.FC<ProjectListProps> = ({ filterKey, filterValue }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        // Prepara o filtro
        const filters = { [filterKey]: filterValue };

        // Gera os parâmetros da URL
        const params = new URLSearchParams(filters as Record<string, string>).toString();
        const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/projects?${params}`;
        
        // Exibe no console a URL completa da requisição
        console.log("Requisição enviada: ", url);

        // Faz a requisição para buscar os projetos
        const response = await searchProjects(filters); // Chama a API com o filtro
        console.log("Projetos encontrados:", response);

        // Acessa a chave "content" para obter os projetos
        const projectsData = response?.data?.content || [];
        setProjects(projectsData); // Atualiza os projetos no estado
      } catch (error) {
        console.error("Erro ao buscar projetos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [filterKey, filterValue]); // Refaz a busca sempre que o filtro mudar

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