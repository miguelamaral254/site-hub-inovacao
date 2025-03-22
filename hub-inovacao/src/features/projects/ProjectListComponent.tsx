import React, { useState, useEffect } from 'react';
import { Project } from './projectInterface';
import { Page, Pageable, searchProjects } from './projectService';
import CardComponent from './CardComponent';

const ProjectListComponent: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1); // Página atual

  const pageable: Pageable = {
    page: currentPage - 1,  // A API geralmente usa 0-indexed, então subtraímos 1
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
  }, [currentPage]);  // Dependência para que a busca seja feita toda vez que a página mudar

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="p-4">
      {loading && <p className="text-center text-lg text-gray-500">Carregando...</p>}
      {error && <p className="text-center text-lg text-red-500">{error}</p>}
      {!loading && !error && (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {projects.length > 0 ? (
              projects.map((project) => (
                <CardComponent key={project.id} project={project} />
              ))
            ) : (
              <p className="text-center text-lg text-gray-500">Nenhum projeto disponível.</p>
            )}
          </div>

          {/* Paginação */}
          <div className="flex justify-center mt-4">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-l hover:bg-blue-600"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Anterior
            </button>
            <span className="px-4 py-2 text-lg text-gray-700">
              Página {currentPage}
            </span>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-r hover:bg-blue-600"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={projects.length < 10}  // Se os projetos carregados forem menores que o limite, desabilita o botão "Próximo"
            >
              Próxima
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectListComponent;