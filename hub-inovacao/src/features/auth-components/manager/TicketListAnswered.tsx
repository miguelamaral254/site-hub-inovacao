/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { getAllProjectsForManager } from "@/services/projectService";
import { getAllOpportunities } from "@/services/opportunityService";
import { AcademicProjectResponseDTO } from "@/interfaces/AcademicProjectInterface";
import TicketCard from "./TicketCard";
import NameFilter from "@/components/NameFilter";
import { OpportunityResponseDTO } from "@/interfaces/OpportunityInterfaces";
import AnsweredTicketCard from "./AnsweredTicketCard";

export default function TicketListAnswered() {
  const [projects, setProjects] = useState<AcademicProjectResponseDTO[]>([]);
  const [opportunities, setOpportunities] = useState<OpportunityResponseDTO[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<AcademicProjectResponseDTO[]>([]);
  const [filteredOpportunities, setFilteredOpportunities] = useState<OpportunityResponseDTO[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const idManager = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData") || "").id : "";

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const fetchedProjects = await getAllProjectsForManager(currentPage,10 ); // Exibir sempre 20 itens
      const filteredByManager = fetchedProjects.content.filter(
        (project) => project.idManager === idManager
      );
      setProjects(fetchedProjects.content);
      setFilteredProjects(filteredByManager); // Filtrando no frontend
    } catch (error) {
      setError("Error loading projects.");
    } finally {
      setLoading(false);
    }
  };

  const fetchOpportunities = async () => {
    setLoading(true);
    try {
      const fetchedOpportunities = await getAllOpportunities(currentPage, 10); // Exibir sempre 20 itens
      const filteredByManager = fetchedOpportunities.content.filter(
        (opportunity) => opportunity.idManager === idManager
      );
      setOpportunities(fetchedOpportunities.content);
      setFilteredOpportunities(filteredByManager); // Filtrando no frontend
    } catch (error) {
      setError("Error loading opportunities.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchOpportunities();
  }, [currentPage, idManager]);

  const handleNameFilter = (name: string | null) => {
    if (name && name.trim() !== "") {
      setFilteredProjects(
        projects.filter((project) => project.title.toLowerCase().includes(name.trim().toLowerCase()))
      );
      setCurrentPage(1); // Reset to first page after filtering
    } else {
      setFilteredProjects(projects);
    }
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

  const lastIndex = currentPage * 20; // Sempre 20 itens por página
  const firstIndex = lastIndex - 20;
  const currentProjects = filteredProjects.slice(firstIndex, lastIndex);
  const currentOpportunities = filteredOpportunities.slice(firstIndex, lastIndex);

  return (
    <div className="p-6">
      <NameFilter onSelect={handleNameFilter} />
      <div className="grid grid-cols-6 font-bold bg-gray-100 px-4 gap-6 border-gray-300 text-left">
        <span>Title</span>
        <span>Author</span>
        <span>Date</span>
        <span>Type</span>
        <span>Status</span>
      </div>
      <ul className="divide-y divide-gray-200 mt-4">
        {currentProjects.map((project) => (
          <li key={project.id}>
            <AnsweredTicketCard project={project} fetchProjects={fetchProjects} />
          </li>
        ))}
        {currentOpportunities.map((opportunity) => (
          <li key={opportunity.id}>
            <AnsweredTicketCard opportunity={opportunity} fetchProjects={fetchProjects} />
          </li>
        ))}
      </ul>
      <p className="text-gray-600 text-sm mt-2">
        Page {currentPage} of {Math.ceil(filteredProjects.length / 20)} {/* Divisão baseada em 20 itens por página */}
      </p>

      <div className="flex items-center justify-between mt-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md disabled:opacity-50"
        >
          Back
        </button>
        <p className="text-gray-600 text-sm">
          Page {currentPage} of {Math.ceil(filteredProjects.length / 20)} {/* Divisão baseada em 20 itens por página */}
        </p>
        <button
          disabled={lastIndex >= filteredProjects.length}
          onClick={() =>
            setCurrentPage((prev) =>
              Math.min(prev + 1, Math.ceil(filteredProjects.length / 20))
            )
          }
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}