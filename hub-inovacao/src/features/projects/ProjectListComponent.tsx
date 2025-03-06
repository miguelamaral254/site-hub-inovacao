import React, { useState, useEffect } from 'react';
import { Project } from './projectInterface';
import { Page, Pageable, searchProjects } from './projectService';
import CardComponent from './CardComponent';

const ProjectListComponent: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const pageable: Pageable = {
    page: 1,  // Página inicial
    size: 10, // Quantidade de projetos por página
  };

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      setError('');
      try {
        const response: Page<Project> = await searchProjects(pageable); // Passando o pageable corretamente
        console.log(response);  // Verifique se a estrutura é realmente a mesma
        if (response.data && response.data.content && Array.isArray(response.data.content)) {
          setProjects(response.data.content);  // Acessando o campo correto: response.data.content
        } else {
          setError('Nenhum projeto encontrado');
        }
      } catch (err) {
        setError('Erro ao carregar projetos');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);  // Dependência vazia para que a busca seja feita apenas uma vez ao montar o componente

  return (
    <div className="p-4">
      {loading && <p className="text-center text-lg text-gray-500">Carregando...</p>}
      {error && <p className="text-center text-lg text-red-500">{error}</p>}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {projects.length > 0 ? (
            projects.map((project) => (
              <CardComponent key={project.id} project={project} />
            ))
          ) : (
            <p className="text-center text-lg text-gray-500">Nenhum projeto disponível.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectListComponent;
