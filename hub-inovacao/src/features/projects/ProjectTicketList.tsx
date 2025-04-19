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
  const [currentPage, setCurrentPage] = useState(0); 
  const [totalPages, setTotalPages] = useState(1); 
  const pageSize = 10;

  useEffect(() => {
    fetchProjects();  
  }, [filters, currentPage]); 

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await searchProjects({ ...filters }, { page: currentPage, size: pageSize });
      if (response && response.data && response.data.content) {
        const projectsData = response.data.content || [];
        setProjects(projectsData);
        const totalPages = response.data.page.totalPages || 1; 
        setTotalPages(totalPages);
      } else {
        console.error("Resposta da API está faltando a estrutura esperada.");
      }
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

  const goToPage = (page: number) => {
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page); 
    }
  };

  return (
    <div className="w-full py-6">
      {loading ? (
        <div className="text-center text-xl text-gray-600">Carregando projetos...</div>
      ) : (
        <div className="flex flex-col gap-3">
          {projects.length > 0 ? (
            projects.map((project, index) => (
              <div key={index} className="hover:bg-gray-100   rounded-lg shadow-sm border-b">
                <ProjectTicketCard project={project} onClick={() => openModal(project)} />
              </div>
            ))
          ) : (
            <div className="text-center text-xl text-gray-600">Nenhum projeto encontrado</div>
          )}
        </div>
      )}

      <div className="flex justify-center mt-4">
        <button
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-2"
          onClick={() => goToPage(currentPage - 1)} 
          disabled={currentPage === 0} 
        >
          Anterior
        </button>
        <span className="text-sm text-gray-600 py-2">
          Página {currentPage + 1} de {totalPages}  
        </span>
        <button
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md ml-2"
          onClick={() => goToPage(currentPage + 1)} 
          disabled={currentPage === totalPages - 1} 
          >
          Próxima
        </button>
      </div>

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