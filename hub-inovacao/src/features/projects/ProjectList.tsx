import React, { useEffect, useState } from "react";
import { Project } from "@/features/projects/project.interface";
import { searchProjects } from "@/features/projects/project.service";
import ModalProject from "./ProjectModal";
import ProjectCard from "./ProjectCard";
import { Select } from "@/components/Form/Select";

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

  const filteredProjects = projects.filter((project) => {
    const matchesTitle = project.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType ? project.projectType === selectedType : true;
    return matchesTitle && matchesType;
  });

  return (
    <div className="w-full py-6">

        <div className="flex gap-4 mb-6">
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
            selectText='Tipo de Projeto'
            options={[
              { label: "Projeto de Extensão", value: "PROJETO_EXTENSAO" },
              { label: "Projeto Integrador", value: "PROJETO_INTEGRADOR" },
              { label: "Projeto de Inovação", value: "PROJETO_INOVACAO" },
            ]}
          />
        </div>
      {loading ? (
        <div className="text-center text-xl text-gray-600">Carregando projetos...</div>
      ) : (
        <div 
          className='grid grid-cols-3 gap-6'
          style={{ display: filteredProjects.length > 0 ? 'grid' : 'flex' }}
        >
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <ProjectCard key={index} project={project} onClick={() => openModal(project)} />
            ))
          ) : (
            <div className="text-center text-xl text-gray-600 w-full mt-10">Nenhum projeto encontrado</div>
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