/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useAuth } from '@/context/useContext';
import { Project } from '@/features/projects/project.interface';
import { searchProjects } from '@/features/projects/project.service';
import React, { useState, useEffect } from 'react';

interface Filters {
  idUser: number;
  title?: string;
  status?: string;
  projectType?: string;
  enabled?: boolean;
  idManager?: number;
}

const ProjectSearch: React.FC = () => {
  const { user } = useAuth();

  const [filters, setFilters] = useState<Filters>({
    idUser: user?.idUser || 0,
    title: '',
    status: '',
    projectType: '',
    enabled: undefined,
    idManager: undefined,
  });

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFilters(prevFilters => ({
        ...prevFilters,
        idUser: user.idUser,
      }));
    }
  }, [user]); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSearch = async () => {
    setLoading(true);

    const cleanFilters = Object.fromEntries(
      Object.entries(filters).filter(([key, value]) => value !== undefined && value !== '' && value !== null)
    );

    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/projects`;
    const params = new URLSearchParams(cleanFilters as Record<string, string>).toString();
    console.log('Requisição enviada: ', `${url}?${params}`);

    try {
      const response = await searchProjects(cleanFilters);
      console.log('Resposta da API: ', response); // Verifique a resposta da API
      if (response && response.length > 0) {
        setProjects(response);
      } else {
        console.log('Nenhum projeto encontrado');
      }
    } catch (error) {
      console.error('Erro ao buscar projetos:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Pesquisar Projetos</h2>
      <div className="space-y-4">

        
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Título:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={filters.title}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status:</label>
          <select
            id="status"
            name="status"
            value={filters.status || ''}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="">Selecione o Status</option>
            <option value="APROVADA">Aprovada</option>
            <option value="PENDENTE">Pendente</option>
            <option value="REPROVADA">Reprovada</option>
          </select>
        </div>

        <div>
          <label htmlFor="projectType" className="block text-sm font-medium text-gray-700">Tipo de Projeto:</label>
          <input
            type="text"
            id="projectType"
            name="projectType"
            value={filters.projectType}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="enabled" className="block text-sm font-medium text-gray-700">Habilitado:</label>
          <select
            id="enabled"
            name="enabled"
            value={filters.enabled === undefined ? '' : filters.enabled.toString()}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="">Selecione</option>
            <option value="true">Sim</option>
            <option value="false">Não</option>
          </select>
        </div>

        <div>
          <label htmlFor="idManager" className="block text-sm font-medium text-gray-700">ID do Gerente:</label>
          <input
            type="number"
            id="idManager"
            name="idManager"
            value={filters.idManager || ''}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <button
          onClick={handleSearch}
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-400"
        >
          {loading ? 'Carregando...' : 'Buscar Projetos'}
        </button>
      </div>

      {projects.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Projetos Encontrados</h3>
          <ul className="space-y-2">
            {projects.map((project, index) => (
              <li key={index} className="bg-gray-100 p-4 rounded-md shadow-sm">
                <pre className="text-sm text-gray-700">{JSON.stringify(project, null, 2)}</pre>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProjectSearch;