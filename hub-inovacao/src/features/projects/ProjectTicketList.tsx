/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";
import { Project } from "@/features/projects/project.interface";
import { searchProjects } from "@/features/projects/project.service";
import ProjectTicketCard from "./ProjectTicketCard";
import ProjectTicketModal from "./ProjectTicketModal";

interface ProjectListProps {
  filters: Record<string, string | number | boolean>;
}

const ProjectTicketList: React.FC<ProjectListProps> = ({ filters }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    fetchProjects();  
  }, [filters]);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await searchProjects(filters);
      const projectsData = response?.data?.content || [];
      setProjects(projectsData);
    } catch (error) {
      console.error("Erro ao buscar projetos:", error);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const updateProjects = () => {
    fetchProjects();  
  };

  return (
    <div className="w-full py-6">
      {loading ? (
        <div className="text-center text-xl text-gray-600">Carregando projetos...</div>
      ) : (
        <div className="flex flex-col gap-4">
          {projects.length > 0 ? (
            projects.map((project, index) => (
              <div key={index} className="hover:bg-gray-100 p-4 rounded-lg shadow-sm border-b">
                <ProjectTicketCard project={project} onClick={() => openModal(project)} />
              </div>
            ))
          ) : (
            <div className="text-center text-xl text-gray-600">Nenhum projeto encontrado</div>
          )}
        </div>
      )}

      {isModalOpen && selectedProject && (
        <ProjectTicketModal
          project={selectedProject}
          handleClose={closeModal}
          updateProjects={updateProjects} 
        />
      )}
    </div>
  );
};

export default ProjectTicketList;