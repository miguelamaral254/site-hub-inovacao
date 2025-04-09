import React, { useEffect, useState } from 'react';
import CardAcademicProjs from './ProjectCard';
import { Project } from './project.interface';
import { searchProjects } from './project.service'; 

const ProjectsList: React.FC = () => {
  const [projetos, setProjetos] = useState<Project[]>([]);  
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true); 
      setError('');  

      try {
        const response = await searchProjects({}, 0, 10); 
        if (response.data && Array.isArray(response.data.content)) {
          setProjetos(response.data.content);  
        } else {
          setError('Resposta da API não contém um array válido de projetos');
        }
      } catch (err) {
        setError('Erro ao buscar projetos');
        console.error(err);
      } finally {
        setLoading(false);  
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Lista de Projetos</h1>
      {loading && <p className="text-center">Carregando...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.isArray(projetos) && projetos.length > 0 ? (
          projetos.map((projeto) => (
            <CardAcademicProjs key={projeto.id} project={projeto}/>
          ))
        ) : (
          <p className="text-center">Nenhum projeto encontrado.</p>
        )}
      </div>
    </div>
  );
};

export default ProjectsList;
