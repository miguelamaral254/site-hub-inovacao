import React, { useEffect, useState } from "react";
import { Project } from "@/features/projects/project.interface";
import { searchProjects } from "@/features/projects/project.service";
import ModalProject from "./ProjectModal";
import ProjectCard from "./ProjectCard";
import { Select } from "@/components/Form/Select";
import ProjectCardSkeleton from "./ProjectCardSkeleton";

interface ProjectListProps {
  filters: Record<string, string | number | boolean>;
}

const ProjectList: React.FC<ProjectListProps> = ({ filters }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [visibleItems, setVisibleItems] = useState(6);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const response = await searchProjects(filters, { page: 0, size: 300 });
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

  const filteredProjects = projects.filter((project) => {
    const matchesTitle = project.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType ? project.projectType === selectedType : true;
    return matchesTitle && matchesType;
  });

  const handleShowMore = () => {
    setVisibleItems((prev) => prev + 6); 
  };

  return (
    <div className="w-full py-6">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Buscar por título..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
        />

        <Select
          label=""
          value={selectedType}
          onChange={(val) => setSelectedType(val)}
          selectText="Tipo de Projeto"
          options={[
            { label: "Projeto de Extensão", value: "PROJETO_EXTENSAO" },
            { label: "Projeto Integrador", value: "PROJETO_INTEGRADOR" },
            { label: "Projeto de Inovação", value: "PROJETO_INOVACAO" },
          ]}
        />
      </div>

      {loading ? (
        <div className="text-center text-xl text-gray-600">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <ProjectCardSkeleton key={index} />
              ))}
          </div>
        </div>
      ) : (
        <div
          className="list-cards"
          style={{ display: filteredProjects.length > 0 ? "grid" : "flex" }}
        >
          {filteredProjects.length > 0 ? (
            filteredProjects.slice(0, visibleItems).map((project, index) => (
              <ProjectCard key={index} project={project} onClick={() => openModal(project)} />
            ))
          ) : (
            <div className="not-found-title">Nenhum projeto encontrado</div>
          )}
        </div>
      )}

      {filteredProjects.length > visibleItems && (
        <div className="text-center mt-4">
          <button
            onClick={handleShowMore}
            className="bg-blue-500 text-white py-2 px-4 rounded-md"
          >
            Exibir mais
          </button>
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