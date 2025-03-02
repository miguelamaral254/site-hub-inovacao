"use client";

import { useEffect, useState } from "react";
import { getAllProjectsForManager } from "@/services/projectService";
import { getAllOpportunities } from "@/services/opportunityService";
import { AcademicProjectResponseDTO } from "@/interfaces/AcademicProjectInterface";
import NameFilter from "@/components/NameFilter";
import { OpportunityResponseDTO } from "@/interfaces/OpportunityInterfaces";
import AnsweredTicketCard from "./AnsweredTicketCard";

export default function TicketListAnswered() {
  const [projects, setProjects] = useState<AcademicProjectResponseDTO[]>([]);
  const [opportunities, setOpportunities] = useState<OpportunityResponseDTO[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<AcademicProjectResponseDTO[]>([]);
  const [filteredOpportunities, setFilteredOpportunities] = useState<OpportunityResponseDTO[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const idManager = localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData") || "").id
    : "";

  const fetchProjects = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const fetchedProjects = await getAllProjectsForManager(currentPage, 100, idManager);
      const filteredByManager = fetchedProjects.content.filter(
        (project) => project.idManager === idManager
      );

      // Ordenar projetos pela data de criação (assumindo que 'creationDate' é do tipo Date ou string)
      const sortedProjects = filteredByManager.sort((a, b) => {
        return new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime();
      });

      setProjects((prev) => [...prev, ...fetchedProjects.content]);
      setFilteredProjects(sortedProjects);
    } catch (error) {
      setError("Error loading projects.");
    } finally {
      setLoading(false);
    }
  };

  const fetchOpportunities = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const fetchedOpportunities = await getAllOpportunities(currentPage, 10, idManager);
      const filteredByManager = fetchedOpportunities.content.filter(
        (opportunity) => opportunity.idManager === idManager
      );

      // Ordenar oportunidades pela data de criação (assumindo que 'creationDate' é do tipo Date ou string)
      const sortedOpportunities = filteredByManager.sort((a, b) => {
        return new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime();
      });

      setOpportunities((prev) => [...prev, ...fetchedOpportunities.content]);
      setFilteredOpportunities(sortedOpportunities);
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
      setCurrentPage(1);
    } else {
      setFilteredProjects(projects);
    }
  };

  if (loading && currentPage === 1) {
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
      <div className="grid grid-cols-6 font-bold bg-gray-100 px-4 gap-6 border-gray-300 text-left">
        <span>Title</span>
        <span>Author</span>
        <span>Date</span>
        <span>Type</span>
        <span>Status</span>
      </div>
      <ul className="divide-y divide-gray-200 mt-4">
        {filteredProjects.map((project) => (
          <li key={project.id}>
            <AnsweredTicketCard project={project} fetchProjects={fetchProjects} />
          </li>
        ))}
        {filteredOpportunities.map((opportunity) => (
          <li key={opportunity.id}>
            <AnsweredTicketCard opportunity={opportunity} fetchProjects={fetchProjects} />
          </li>
        ))}
      </ul>
      {loading && (
        <div className="text-center py-4">
          <span>Carregando...</span>
        </div>
      )}
    </div>
  );
}