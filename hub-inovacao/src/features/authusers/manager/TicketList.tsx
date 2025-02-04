/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { getAllProjectsForManager } from "@/services/projectService"; // Função para buscar todos os projetos
import { AcademicProjectResponseDTO } from "@/interfaces/AcademicProjectInterface";
import TicketCard from "./TicketCard";

interface TicketListProps {
  statusFilter: string;
}

export default function TicketList({ statusFilter }: TicketListProps) {
  const [projects, setProjects] = useState<AcademicProjectResponseDTO[]>([]); // Lista de projetos
  const [error, setError] = useState<string>(""); // Mensagens de erro
  const [loading, setLoading] = useState<boolean>(true); // Carregando ou não

  // Função para buscar todos os projetos
  const fetchProjects = async () => {
    setLoading(true);
    try {
      const fetchedProjects = await getAllProjectsForManager(); // Chama a função para pegar todos os projetos

      const validStatus = ["APROVADA", "PENDENTE", "REPROVADA"]; // Status válidos
      if (statusFilter && !validStatus.includes(statusFilter)) {
        setError("Status inválido.");
        setLoading(false);
        return;
      }

      // Filtra os projetos de acordo com o status
      const filteredProjects = fetchedProjects.filter((project) => {
        const status = project.status?.toUpperCase();
        return status && status === statusFilter.toUpperCase();
      });

      setProjects(filteredProjects); // Define os projetos filtrados no estado
    } catch (error) {
      console.log(error);
      setError("Erro ao carregar projetos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [statusFilter]);

  if (loading) {
    return (
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="bg-gray-200 h-40 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {projects.map((project) => (
          <TicketCard key={project.id} project={project} fetchProjects={fetchProjects} />
        ))}
      </div>
    </div>
  );
}