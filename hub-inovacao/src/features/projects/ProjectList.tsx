import React, { useEffect, useState } from "react";
import { Project } from "@/features/projects/project.interface";
import { searchProjects } from "@/features/projects/project.service";
import ModalProject from "./ProjectModal";
import ProjectCard from "./ProjectCard";

interface ProjectListProps {
  filters: Record<string, string | number | boolean>;
}

const ProjectList: React.FC<ProjectListProps> = ({ filters }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
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

    fetchProjects();
  }, [filters]);

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null); 
  };

  return (
    <div className="w-full py-6">
      {loading ? (
        <div className="text-center text-xl text-gray-600">Carregando projetos...</div>
      ) : (
        <div className="flex flex-wrap gap-6 justify-center">
          {projects.length > 0 ? (
            projects.map((project, index) => (
              <ProjectCard key={index} project={project} onClick={() => openModal(project)} />
            ))
          ) : (
            <div className="text-center text-xl text-gray-600">Nenhum projeto encontrado</div>
          )}
        </div>
      )}

      {isModalOpen && selectedProject && (
        <ModalProject
          isOpen={isModalOpen}
          onClose={closeModal}
          project={selectedProject}
        />
      )}
    </div>
  );
};

export default ProjectList;