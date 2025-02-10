/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { getAllProjectsForManager } from "@/services/projectService";
import { getAllOpportunities } from "@/services/opportunityService";  // Adicione a importação
import { AcademicProjectResponseDTO } from "@/interfaces/AcademicProjectInterface";
import TicketCard from "./TicketCard";
import NameFilter from "@/components/NameFilter";
import { Dropdown } from "@/components/Dropdown";
import { OpportunityResponseDTO, StatusSolicitation, TypeBO } from "@/interfaces/OpportunityInterfaces";
interface TicketListProps {
  statusFilter: string;
}

export default function TicketList({ statusFilter }: TicketListProps) {
  const [projects, setProjects] = useState<AcademicProjectResponseDTO[]>([]);
  const [opportunities, setOpportunities] = useState<OpportunityResponseDTO[]>([]);  // Adiciona estado para oportunidades
  const [filteredProjects, setFilteredProjects] = useState<AcademicProjectResponseDTO[]>([]);
  const [filteredOpportunities, setFilteredOpportunities] = useState<OpportunityResponseDTO[]>([]); // Filtro de oportunidades
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  
 
  const validStatus = ["ABERTA", "FECHADA", "PENDENTE"]; 
 
    const fetchProjects = async () => {
    setLoading(true);
    try {
      const fetchedProjects = await getAllProjectsForManager();
      if (statusFilter && !validStatus.includes(statusFilter)) {
        setError("Status inválido.");
        setLoading(false);
        return;
      }
      const filteredByStatus = fetchedProjects.filter((project) => project.status?.toUpperCase() === statusFilter.toUpperCase());
      setProjects(filteredByStatus);
      setFilteredProjects(filteredByStatus);
    } catch (error) {
      console.log(error);
      setError("Erro ao carregar projetos.");
    } finally {
      setLoading(false);
    }
  };

  // Função para buscar oportunidades
  const fetchOpportunities = async () => {
    setLoading(true);
    try {
      const fetchedOpportunities = await getAllOpportunities();
      if (statusFilter && !validStatus.includes(statusFilter)) {
        setError("Status inválido.");
        setLoading(false);
        return;
      }
      const filteredByStatus = fetchedOpportunities.filter(
        (opportunity) => opportunity.status && opportunity.status.toString().toUpperCase() === statusFilter.toUpperCase()
      );
      setOpportunities(filteredByStatus);
      setFilteredOpportunities(filteredByStatus);
    } catch (error) {
      console.log(error);
      setError("Erro ao carregar oportunidades.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchOpportunities(); // Chama a função para oportunidades também
  }, [statusFilter]);

  const handleNameFilter = (name: string | null) => {
    if (name && name.trim() !== "") {
      setFilteredProjects(
        projects.filter((project) => project.title.toLowerCase().includes(name.trim().toLowerCase()))
      );
      setCurrentPage(1);
    } else {
      setFilteredProjects(projects);
    }
  };

  const handleSortOrder = (order: "asc" | "desc" | null) => {
    if (order) {
      setSortOrder(order);
      const sortedProjects = [...filteredProjects].sort((a, b) => {
        const dateA = new Date(a.creationDate || "").getTime();
        const dateB = new Date(b.creationDate || "").getTime();
        return order === "asc" ? dateA - dateB : dateB - dateA;
      });
      setFilteredProjects(sortedProjects);
    }
  };

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentProjects = filteredProjects.slice(firstIndex, lastIndex);
  const currentOpportunities = filteredOpportunities.slice(firstIndex, lastIndex);

  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <div className="p-6">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="bg-gray-200 h-16 rounded-md mb-1 animate-pulse"></div>
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="p-6">
      <NameFilter onSelect={handleNameFilter} />
      <div className="mt-4 mb-4 flex justify-end ">
        <Dropdown
          options={["Projeto Integrador", "Rec'n'Play", "Projeto de Extensão", "Startup"]}
          defaultText="Tipos de Projetos"
          onSelect={(option) => handleSortOrder(option === "Mais novo" ? "desc" : "asc")}
        />
      </div>
      <div className="grid grid-cols-6 font-bold bg-gray-100 px-4 gap-6 border-gray-300 text-left">
        <span>Título</span>
        <span>Autor</span>
        <span>Data</span>
        <span>Tipo</span>
        <span>Status</span>
      </div>
      <ul className="divide-y divide-gray-200 mt-4">
        {currentProjects.map((project) => (
          <li key={project.id}>
            <TicketCard project={project} fetchProjects={fetchProjects} />
          </li>
        ))}
        {/* Renderiza as oportunidades */}
        {currentOpportunities.map((opportunity) => (
          <li key={opportunity.id}>
            <TicketCard opportunity={opportunity} fetchProjects={fetchProjects} />
          </li>
        ))}
        {currentOpportunities.map((opportunity) => (
          <li key={opportunity.id}>
            <TicketCard opportunity={opportunity} fetchProjects={fetchProjects} />
          </li>
        ))}
      </ul>
      <p className="text-gray-600 text-sm mt-2">
        Página {currentPage} de {Math.ceil(filteredProjects.length / itemsPerPage)}
      </p>

      <div className="flex items-center justify-between mt-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md disabled:opacity-50"
        >
          Voltar
        </button>
        <p className="text-gray-600 text-sm">
          Página {currentPage} de {Math.ceil(filteredProjects.length / itemsPerPage)}
        </p>
        <button
          disabled={lastIndex >= filteredProjects.length}
          onClick={() =>
            setCurrentPage((prev) =>
              Math.min(prev + 1, Math.ceil(filteredProjects.length / itemsPerPage))
            )
          }
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md disabled:opacity-50"
        >
          Avançar
        </button>
      </div>

      <div className="mt-4">
        <label className="mr-2">Itens por página:</label>
        <select
          value={itemsPerPage}
          onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
          className="p-2 border rounded-md"
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
        </select>
      </div>
    </div>
  );
}